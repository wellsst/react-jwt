package react.jwt

import org.apache.commons.lang3.RandomStringUtils

class RegistrationRequest {
    static graphql = true

    String requestId  // a UUID that will be sent as part of the email to the user

    /* Could use the challengeId to strengthen the process, it's a kind of one time pin
    when the user makes the registration request they are shown this generated string,
    then they are challenged for it when they click on the link in the email
    */
    String challengeId
    Date dateCreated
    String requestRemoteAddr

    static belongsTo = [user: User]

    static constraints = {
        challengeId nullable: true, blank: false
    }

    static mapping = {
        requestRemoteAddr index: "idx_remote_addr"
        requestId index: "idx_requestId,idx_requestId_challengeId"
        challengeId index: "idx_requestId_challengeId"
    }

    static String generateChallengeId(int nrChars) {
        RandomStringUtils.random(nrChars, false, true)
    }

    def beforeInsert() {
        requestId = UUID.randomUUID().toString()
        // Originally I thought it a good idea to hash this but really...not required?
        /*println "challengeId: ${challengeId}"
        if (challengeId) {
            challengeId = challengeId.encodeAsSHA256()
            log.info "Updated challengeId: ${challengeId}"
        }*/
    }


    @Override
    public String toString() {
        return "RegistrationRequest{" +
                "id=" + id +
                ", version=" + version +
                ", user=" + user +
                ", requestId='" + requestId + '\'' +
                ", challengeId='" + challengeId + '\'' +
                ", dateCreated=" + dateCreated +
                '}';
    }
}
