package react.jwt

import auth.AuthException
import react.auth.AuthService

class BaseController {
	static responseFormats = ['json', 'xml']

    AuthService authService

    protected String getUserToken() {
        request.getHeader("loginToken")
    }

    def checkPermissions(String loginToken) {
        if(!loginToken) {
            throw new AuthException("No loginToken provided in the request header")
        }
        authService.checkPermissions(loginToken)
    }

    def index() { }
}
