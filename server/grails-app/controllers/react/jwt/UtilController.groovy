package react.jwt

import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys

import javax.crypto.SecretKey
import javax.xml.bind.DatatypeConverter

import static org.springframework.http.HttpStatus.*

class UtilController extends BaseController {
	static responseFormats = ['json', 'xml']

    def index() {

        // Generate a secret key we could use for the JWT
        log.info("Generate secret key...")
        String random = UUID.randomUUID().toString()

        // Store this in config
        String base64Key = DatatypeConverter.printBase64Binary(random.getBytes())
        byte[] secretBytes = DatatypeConverter.parseBase64Binary(base64Key)

        // use this in your app code
        SecretKey secretKey = Keys.hmacShaKeyFor(secretBytes)

        //def keyString = Keys.secretKeyFor(SignatureAlgorithm.HS256)
        log.info(base64Key)
        render base64Key
    }

    def testSecurePost() {
        try {
            User user = checkPermissions(getUserToken())
            String data = request.JSON.data
            String msg = "At ${new Date()} the server says you sent: ${data}"
            def response = [message: msg]
            respond response
        } catch (all) {
            log.error(all.message)
            render status: UNAUTHORIZED
        }
    }


    def genkey() {
        log.info("Generate secret key...")
        // note: You can dial up the keys by selecting different algorithms, a PS512 elliptic curve would be super
        // safe but you require JDK 11 or a compatible JCA Provider (like BouncyCastle) in the runtime classpath
        // see: https://github.com/jwtk/jjwt - Creating Safe Keys
        // but also check first the front-end can handle these algs as well!
        def keyString = Keys.secretKeyFor(SignatureAlgorithm.HS256).toString()
        log.info(keyString)
        render keyString
    }

    def listRegReqs() {
        try {
            User user = checkPermissions(getUserToken())
            List<RegistrationRequest> requests = RegistrationRequest.list()
            requests.each {
                log.info it.toString()
            }
            render requests
        } catch (all) {
            log.error(all.message)
            render status: UNAUTHORIZED
        }

    }

    def removeAllTokens() {
        try {
            checkPermissions(getUserToken())

            List<User> users = User.list()
            users.each { user ->
                user.registrationRequest.delete()
            }
            render "Tokens deleted"
        } catch (all) {
            log.error(all.message)
            render status: UNAUTHORIZED
        }
    }
}
