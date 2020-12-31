
import { ILogger, LOGSEVERITY } from '../interfaces/log';

export interface ILogConfig {
    levels: LOGSEVERITY[];
}

function log(config: ILogConfig, severityLevel: LOGSEVERITY, msg: string) {
    if ( severityLevel == null ) { return; }
    if ( msg == null ) { return; }
    if ( !config.levels.includes(severityLevel) ) { return; }

    switch (severityLevel) {
        case LOGSEVERITY.FATAL:
            console.error(msg);
            break;

        case LOGSEVERITY.ERROR:
            console.error(msg);
            break;

        case LOGSEVERITY.WARN:
            console.warn(msg);
            break;

        case LOGSEVERITY.INFO:
            console.log(msg);
            break;

        case LOGSEVERITY.VERBOSE:
            console.log(msg);
            break;

        default:
            console.error('Unexpected severity level: ' + severityLevel);
            break;
    }
}

function Logger(config: ILogConfig): ILogger {
    return {
        fatal: function(msg: string) {
            log(config, LOGSEVERITY.FATAL, msg);
        },
        error: function(msg: string) {
            log(config, LOGSEVERITY.ERROR, msg);
        },
        warn: function(msg: string) {
            log(config, LOGSEVERITY.WARN, msg);
        },
        info: function(msg: string) {
            log(config, LOGSEVERITY.INFO, msg);
        },
        verbose: function(msg: string) {
            log(config, LOGSEVERITY.VERBOSE, msg);
        }
    }
}

export default Logger;
