
import { IEnv } from '../interfaces/env';
import IOC from '../ioc';


const DEFAULTS = {
    TESTINTERVAL: 15,
    WEBSITES: ["https://www.google.com", "https://www.youtube.com", "https://www.twitter.com", "https://www.facebook.com", "https://www.ebay.com", "https://www.walmart.com", "https://www.bing.com"]
};

const exports = (env: IEnv = IOC().env()) => {
    return {
        testInterval : env.getInt('REACT_APP_PINGINTERVAL', DEFAULTS.TESTINTERVAL),
        servers : env.getArray<string>('REACT_APP_PINGWEBSITES', DEFAULTS.WEBSITES),
    }
};

export default exports
