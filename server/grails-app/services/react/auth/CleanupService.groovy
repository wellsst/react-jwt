package react.auth

import groovy.time.TimeCategory
import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.scheduling.annotation.Scheduled
import react.jwt.RegistrationRequest

import java.text.SimpleDateFormat

@Slf4j
// @CompileStatic
class CleanupService extends BaseService {

    boolean lazyInit = false

    // final String cleanupDelaySeconds = getAppConfigValue('cleanupDelaySeconds', 15)
    // https://issues.apache.org/jira/browse/GROOVY-3278
    // TODO: 5 minutes fixedDelay, need to move to config, can do this: "${cleanupDelaySeconds}000" under groovy 3.x (current 2.x)
    @Scheduled(fixedDelay = 300000L, initialDelay = 30000L)
    void registrationRequestCleanup() {
        log.info " Checking to remove old registration requests..."
        List<RegistrationRequest> candidatesToDelete
        use (TimeCategory) {
            int cleanupOlderThan = getAppConfigValue('cleanupRequestsOlderThanMinutes', 15) as int
            Date deleteBeforeDate = new Date() - cleanupOlderThan.minutes
            candidatesToDelete = RegistrationRequest.findAllByDateCreatedLessThan(deleteBeforeDate)
        }
        log.info(" ... removing ${candidatesToDelete.size()} registration requests")
        RegistrationRequest.deleteAll(candidatesToDelete)
    }

    @Scheduled(fixedDelay = 10000L)
    void executeEveryTen() {
        log.info "Simple Job every 10 seconds :{}", new SimpleDateFormat("dd/M/yyyy hh:mm:ss").format(new Date())
    }
}
