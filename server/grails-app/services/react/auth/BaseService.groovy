package react.auth

class BaseService {

    def grailsApplication

    def getAppConfigValue(String appKey, def defaultValue) {
        grailsApplication.config.getProperty("app.${appKey}") ?: defaultValue
    }
}
