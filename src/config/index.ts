
import IOC from '../ioc';
import { IConfig } from '../interfaces/config';
import { IEnv } from '../interfaces/env';
import logging from './logging';
import speedtest from './speedtest';
import ping from './ping';
import threshold from './threshold';
import view from './view';


const exports = (env: IEnv = IOC().env()): IConfig => {
    return {
        logging: logging(env),
        speedtest: speedtest(env),
        threshold: threshold(env),
        view: view(env),
        ping: ping(env),
    }
};

export default exports