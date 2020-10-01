import logging from '../constants/logging';

const SEVERITY = {
    FATAL: 'fatal',
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    VERBOSE: 'verbose'
};

function log(severityLevel, msg) {
    if ( severityLevel == null ) { return; }
    if ( msg == null ) { return; }

    switch (severityLevel) {
        case SEVERITY.FATAL:
            if ( !logging.levels.fatal ) { return; }
            console.error(msg);
            break;

        case SEVERITY.ERROR:
            if ( !logging.levels.error ) { return; }
            console.error(msg);
            break;

        case SEVERITY.WARN:
            if ( !logging.levels.warn ) { return; }
            console.warn(msg);
            break;

        case SEVERITY.INFO:
            if ( !logging.levels.info ) { return; }
            console.log(msg);
            break;

        case SEVERITY.VERBOSE:
            if ( !logging.levels.verbose ) { return; }
            console.log(msg);
            break;

        default:
            console.error('Unexpected severity level: ' + severityLevel);
            break;
    }
}

export default {
    fatal: function(msg) {
        log(SEVERITY.FATAL, msg);
    },
    error: function(msg) {
        log(SEVERITY.ERROR, msg);
    },
    warn: function(msg) {
        log(SEVERITY.WARN, msg);
    },
    warning: function(msg) {
        log(SEVERITY.WARN, msg);
    },
    info: function(msg) {
        log(SEVERITY.INFO, msg);
    },
    verbose: function(msg) {
        log(SEVERITY.VERBOSE, msg);
    }
};