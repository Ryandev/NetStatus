
import { IEnv } from '../interfaces/env';
import IOC from '../ioc';


const exports = (env: IEnv = IOC().env()) => {
    return {
        levels: {
            verbose:    env.getBool('REACT_APP_ENABLELOGGINGVERBOSE', false),
            info:       env.getBool('REACT_APP_ENABLELOGGINGINFO', false),
            warn:       env.getBool('REACT_APP_ENABLELOGGINGWARN', true),
            error:      env.getBool('REACT_APP_ENABLELOGGINGERROR', true),
            fatal:      env.getBool('REACT_APP_ENABLELOGGINGFATAL', true),
        },
    }
};

export default exports
