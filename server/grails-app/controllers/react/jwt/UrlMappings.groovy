package react.jwt

class UrlMappings {

    static mappings = {

        "/signup" (controller: "login", action: "signup")
        "/login" (controller: "login", action: "login")
        "/logout" (controller: "login", action: "logout")
        "/registerRequest" (controller: "login", action: "registerRequest")
        "/registerConfirm/$requestId" (controller: "login", action: "registerConfirm")
        "/registerAccept" (controller: "login", action: "registerAccept")
        "/loginWithJWT" (controller: "login", action: "loginWithJWT")

        "/confirmLoggedIn" (controller: "login", action: "confirmLoggedIn")
        "/testSecurePost" (controller: "util", action: "testSecurePost")

        "/listRegReqs" (controller: "util", action: "listRegReqs")
        "/users" (controller: "util", action: "users")
        "/genkey" (controller: "util", action: "genkey")

        delete "/$controller/$id(.$format)?"(action:"delete")
        get "/$controller(.$format)?"(action:"index")
        get "/$controller/$id(.$format)?"(action:"show")
        post "/$controller(.$format)?"(action:"save")
        put "/$controller/$id(.$format)?"(action:"update")
        patch "/$controller/$id(.$format)?"(action:"patch")

        "/"(controller: 'application', action:'index')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
