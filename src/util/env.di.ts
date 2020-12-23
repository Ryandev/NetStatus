
import { Container } from "inversify";
import { IInjectable } from "../interfaces/di";
import { IEnv } from "../interfaces/env";
import env from './env';


const type = Symbol.for('IEnv');

const exports: IInjectable<IEnv> = {
    addBinding: (container) => {
        container
            .bind<IEnv>(type)
            .toConstantValue(env);
    },
    resolve: (container: Container) => {
        return container.get<IEnv>(type);
    },
    type,

}

export default exports;
