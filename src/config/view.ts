
import { IEnv } from '../interfaces/env';
import IOC from '../ioc';


const DEFAULTS_REFRESHPAGEINTERVAL = 60;

const exports = (env: IEnv = IOC().env()) => {
    return {
        refreshPageInterval : env.getInt('REACT_VIEW_TESTINTERVAL', DEFAULTS_REFRESHPAGEINTERVAL),
    }
};

export default exports
