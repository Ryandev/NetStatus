
import { Container } from "inversify";

import { IEnv } from "./interfaces/env";
import { ILogger } from "./interfaces/log";
import { IConfig } from "./interfaces/config";

import LogDi from './util/log.di';
import EnvDI from './util/env.di';
import ConfigDI from './config/index.di';


let symbol = Symbol.for('IOC');

export interface IIOC {
    logger: () => ILogger;
    env: () => IEnv;
    config: () => IConfig;
}

const newContainer = (): IIOC => {

    const container = new Container();

    EnvDI.addBinding(container);
    ConfigDI.addBinding(container);
    LogDi.addBinding(container);
    
    let mapped: IIOC = {
        env: () => EnvDI.resolve(container),
        config: () => ConfigDI.resolve(container),
        logger: () => LogDi.resolve(container),
    };
    
    (global as any)[symbol] = mapped;

    return mapped;
}

const getIOC = (): IIOC|null => {
    return (global as any)[symbol];
}

let get = (): IIOC => {
    let ioc: IIOC|null = getIOC(); 
    if ( !ioc ) {
        ioc = newContainer();
    }
    return ioc;
};

export default get
