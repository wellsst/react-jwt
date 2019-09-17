// Place your Spring DSL code here

import auth.AuthException
import graphql.schema.DataFetchingEnvironment
import groovy.util.logging.Slf4j
import org.grails.gorm.graphql.fetcher.GraphQLDataFetcherType
import org.grails.gorm.graphql.interceptor.GraphQLFetcherInterceptor
import org.grails.gorm.graphql.interceptor.impl.BaseGraphQLFetcherInterceptor
import org.grails.gorm.graphql.interceptor.manager.GraphQLInterceptorManager
import org.grails.gorm.graphql.plugin.DefaultGraphQLContextBuilder
import org.grails.web.servlet.mvc.GrailsWebRequest

import org.grails.gorm.graphql.plugin.GraphQLPostProcessor
import react.auth.AuthService

@Slf4j
class MyGraphQLCustomizer extends GraphQLPostProcessor {

    @Override
    void doWith(GraphQLInterceptorManager interceptorManager) {
        interceptorManager.registerInterceptor(Object, new MyFetcherInterceptor())
    }
}
@Slf4j
class MyFetcherInterceptor extends BaseGraphQLFetcherInterceptor {
/*    def onQuery() {
        log.info " ********************  "
    }*/

    @Override
    boolean onQuery(DataFetchingEnvironment environment, GraphQLDataFetcherType type) {
        log.info " ********************  onQuery ${environment.arguments}"
        log.info " ********************  onQuery ${environment.context}"
        log.info " ********************  onQuery ${environment.source}"
        return true
    }

    @Override
    boolean onMutation(DataFetchingEnvironment environment, GraphQLDataFetcherType type) {
        return false
    }

    @Override
    boolean onCustomQuery(String name, DataFetchingEnvironment environment) {
        return false
    }

    @Override
    boolean onCustomMutation(String name, DataFetchingEnvironment environment) {
        return false
    }
}

@Slf4j
class AuthGraphQLContextBuilder extends DefaultGraphQLContextBuilder {
    AuthService authService

    @Override
    Map buildContext(GrailsWebRequest request) {
        Map context = super.buildContext(request)
        def loginToken = request.getHeader("loginToken")
        log.info "***** graphql buildContext ${ loginToken} ........"
        try {
            authService.checkPermissions(loginToken)
            log.info "You are auth'd to use this"
            context
        } catch (all) {
            log.error("Login error", all)
            log.info "You are NOT auth'd to use this: ${all.message}"
            //null
            throw new AuthException(all.message)
        }
    }
}

beans = {

    // myGraphQLCustomizer(MyGraphQLCustomizer)
    graphQLContextBuilder(AuthGraphQLContextBuilder) {
        authService = ref("authService")
    }
}
