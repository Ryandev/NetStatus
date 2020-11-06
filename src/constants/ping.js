import env from '../lib/env';

const DEFAULTS = {
    TESTINTERVAL: 5,
    WEBSITES: ["https://www.google.com", "https://www.youtube.com", "https://www.twitter.com", "https://www.facebook.com", "https://www.yahoo.com"]
};

export default {
    testInterval : env.getInt('REACT_APP_PINGINTERVAL', DEFAULTS.TESTINTERVAL),
    servers : env.getObject('REACT_APP_PINGWEBSITES', DEFAULTS.WEBSITES),
};

