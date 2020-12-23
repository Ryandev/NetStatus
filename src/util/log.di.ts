
import { Container } from "inversify";
import { IInjectable } from "../interfaces/di";
import { IConfig } from "../interfaces/config";
import { ILogger, LOGSEVERITY } from "../interfaces/log";
import createLogger from './log';


const type = Symbol.for('ILogger');

const exports: IInjectable<ILogger> = {
    addBinding: (container) => {
        const config = container.get<IConfig>(Symbol.for('IConfig'));
        let levels = [];

        if ( config.logging.levels.verbose ) {
            levels.push(LOGSEVERITY.VERBOSE);
        }

        if ( config.logging.levels.info ) {
            levels.push(LOGSEVERITY.INFO);
        }

        if ( config.logging.levels.warn ) {
            levels.push(LOGSEVERITY.WARN);
        }

        if ( config.logging.levels.error ) {
            levels.push(LOGSEVERITY.ERROR);
        }

        if ( config.logging.levels.fatal ) {
            levels.push(LOGSEVERITY.FATAL);
        }

        const settings = {
            levels,
        }
        const logger = createLogger(settings);
        container
            .bind<ILogger>(type)
            .toConstantValue(logger);
    },
    resolve: (container: Container) => {
        return container.get<ILogger>(type);
    },
    type,
}

export default exports;
