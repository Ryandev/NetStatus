
import { Container } from "inversify";
import { IInjectable } from "../interfaces/di";
import { IConfig } from "../interfaces/config";
import { IEnv } from "../interfaces/env";
import config from './index';


const type = Symbol.for('IConfig');

const exports: IInjectable<IConfig> = {
    addBinding: (container) => {
        const env = container.get<IEnv>(Symbol.for('IEnv'));
        container
            .bind<IConfig>(type)
            .toConstantValue(config(env));
    },
    resolve: (container: Container) => {
        return container.get<IConfig>(type);
    },
    type,
}

export default exports;
