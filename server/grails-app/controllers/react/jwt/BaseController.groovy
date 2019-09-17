package react.jwt


import react.auth.AuthService

class BaseController {
	static responseFormats = ['json', 'xml']

    AuthService authService

    protected String getUserToken() {
        request.getHeader("loginToken")
    }

    def checkPermissions(String token) {
        authService.checkPermissions(token)
    }

    def index() { }
}
