package react.jwt
//@Resource(uri='/user')
/*

http://localhost:8080/graphql/browser

OR

curl -X "POST" "http://localhost:8080/graphql" \
     -H "Content-Type: application/graphql" \
     -d $'
{
  userList(max: 3) {
    id
    username
    registrationRequest {
      requestId
      dateCreated
    }
  }
}'
 */
class User {
    static graphql = true

    String username
    String loginToken

    static hasOne = [registrationRequest:RegistrationRequest]
    // static fetchMode = [registrationRequest: 'lazy']
    RegistrationRequest registrationRequest

    static constraints = {
        username email: true, nullable: false, blank: false, unique: true
        loginToken nullable: true
        registrationRequest nullable: true
    }

    static mapping = {
        table 'app_user'
        username index: "idx_username"
        loginToken length: 500
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", version=" + version +
                ", username='" + username + '\'' +
                ", loginToken='" + loginToken + '\'' +
                '}'
    }
}
