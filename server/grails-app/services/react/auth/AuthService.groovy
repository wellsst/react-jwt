package react.auth

import auth.AuthException
import grails.gorm.transactions.Transactional
import groovy.time.TimeCategory
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jws
import io.jsonwebtoken.JwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import react.jwt.RegistrationRequest
import react.jwt.User

import javax.crypto.SecretKey

@Transactional
class AuthService extends BaseService {

    EmailService emailService

    /* User wants to signup with the service, we gen a short lived key and send an email */

    def signupRequest(String userEmail, String remoteAddr) {
        // Lookup user?
        User user = User.findByUsername(userEmail)
        if (user) {
            // Already has a reg request?
            log.info "registerRequest: ${userEmail}, already exists"
            if (user.registrationRequest) {
                log.info "User ${userEmail} already exists with requestId: ${user.registrationRequest.requestId}"
                // Note: This allows the old request to be overridden, if you dont like this then uncomment and return a msg to the user
                return user
            }
        } else {
            user = new User(username: userEmail)
        }
        log.info "registerRequest: ${userEmail}, creating a new request"
        RegistrationRequest registrationRequest = new RegistrationRequest()
        registrationRequest.requestId = UUID.randomUUID() as String
        registrationRequest.challengeId = RegistrationRequest.generateChallengeId(getAppConfigValue("jwt.challengeKeyLength", 4) as Integer)
        registrationRequest.user = user
        registrationRequest.requestRemoteAddr = remoteAddr
        registrationRequest.save(flush: true)
        user.registrationRequest = registrationRequest

        // Dev only: Just check for errors
        if (!user.validate()) {
            log.info "${user.errors.allErrors}"
        }

        user.save(flush: true)

        // Send email
        String loginLink = emailService.sendLoginRequest(user)
        log.info "Login link: ${loginLink}, ${user}"
        user
    }

    private String createJWTForUser(RegistrationRequest registrationRequest) {

        User requestingUser = registrationRequest.user// User.findByRegistrationRequest(registrationRequest)

        SecretKey key = Keys.hmacShaKeyFor((getAppConfigValue('jwt.key', '') as String).bytes)

        // Create a signed JWT - a JWS
        Date now = new Date()
        Date expirationDate = now //  = now + (getAppConfigValue("jwt.daysToExpire", 365) as Integer)
        use (TimeCategory) {
            expirationDate =  (getAppConfigValue("jwt.daysToExpire", 365) as Integer).days.from.now
        }
        String jws = Jwts.builder().
                setIssuer(getAppConfigValue("jwt.issuer", "https://github.com/wellsst/jwt-template") as String).
                setSubject(requestingUser.username).
                setIssuedAt(now).
                setNotBefore(now).
                setExpiration(expirationDate).
                signWith(key).compact()

        // question: would setting the ID, saving it and rechecking on each request add a layer of security?
        // like: .setId(UUID.randomUUID()) and using as a nonce
        // https://tools.ietf.org/html/rfc7519#section-4.1.7 says:
        // 'The "jti" claim can be used to prevent the JWT from being replayed'
        // So I'm thinking no, in this case the email will prevent the replay
        //  or will it?  https://en.wikipedia.org/wiki/Replay_attack

        requestingUser.loginToken = jws

        requestingUser.registrationRequest = null
        requestingUser.save(flush: true)
        registrationRequest.delete()
        jws
    }

    def logout(String token) {
        if (!token) {
            throw new AuthException("No loginToken provided for logout")
        }
        User user = User.findByLoginToken(token)
        if (user) {
            user.loginToken = null
            user.save()
        } else {
            throw new AuthException("COuld not logout user, token not found")
        }
    }

    /* User has clicked on the email link */

    def jwtFromRequestId(String loginRequestId, String challengeId) {
        RegistrationRequest registrationRequest = RegistrationRequest.findByRequestIdAndChallengeId loginRequestId, challengeId

        if (registrationRequest) {
            String jws = createJWTForUser(registrationRequest)
            //registrationRequest.delete(flush: true)
            return jws
        } else {
            String msg = "User signup attempt but no login loginToken found for ${loginRequestId} and challengeId: ${challengeId} "
            throw new AuthException(msg)
        }
    }

    def jwtFromRequestId(String loginRequestId) {
        RegistrationRequest registrationRequest = RegistrationRequest.findByRequestId loginRequestId

        if (registrationRequest) {
            return createJWTForUser(registrationRequest)
        } else {
            String msg = "User signup attempt but no login loginToken found for ${loginRequestId}"
            throw new AuthException(msg)
        }
    }

    def checkPermissions(String token) {
        if (!token) {
            throw new AuthException("No loginToken provided")
        }
        log.info "Check permissions: ${token}"
        /*User user = User.findByUsername(loginToken, [cache: true])
        if (!user) {
            throw new AuthException("No user found for loginToken: ${loginToken}")
        }
        user */
        loginFromJWT(token)
    }

    def loginFromJWT(String token) {
        SecretKey serverKey = Keys.hmacShaKeyFor((getAppConfigValue('jwt.key', '') as String).bytes)

        // No point in checking the email that the browser request would have provided anyway (same source of data)
        // If the JWT was signed by us and the connection is secure the email in the token will be trustworthy
        /*if (Jwts.parser().setSigningKey(serverKey).parseClaimsJws(loginToken).getBody().getSubject().equals(email)) {
            return
        } else {
            throw new AuthException()
        }*/

        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(serverKey).parseClaimsJws(token)

            // Check for claims
            Date now = new Date()
            if (now > claims.body.getExpiration()) {
                throw new AuthException("Token expired on: ${claims.body.getExpiration()}")
            }
            if (claims.body.getNotBefore() > now) {
                throw new AuthException("Token is not authorized for use until: ${claims.body.getNotBefore()}, it is now ${now}")
            }
            if (claims.body.getIssuer() != getAppConfigValue("jwt.issuer", "https://github.com/wellsst/jwt-template") as String) {
                throw new AuthException("Invalid issuer: ${claims.body.getIssuer()}")
            }

            //OK, we can trust this JWT
            String username = claims.getBody().getSubject()
            User user = User.findByUsername(username, [cache: true])
            if (!user) {
                throw new AuthException("No user found for loginToken: ${username}")
            }
            return user
        } catch (JwtException e) {
            throw new AuthException(e.message, e)
        }
    }
}
