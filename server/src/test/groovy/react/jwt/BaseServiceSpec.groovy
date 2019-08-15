package react.jwt

import grails.testing.services.ServiceUnitTest
import react.auth.BaseService
import spock.lang.Specification

class BaseServiceSpec extends Specification implements ServiceUnitTest<BaseService>{

    def setup() {
    }

    def cleanup() {
    }

    void "test something"() {
        expect:"fix me"
            true == false
    }
}
