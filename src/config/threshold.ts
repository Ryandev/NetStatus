
import { IEnv } from '../interfaces/env';
import IOC from '../ioc';


const DEFAULTS = {
    UPLOAD: {
        WARNING: 4,
        ERROR: 1
    },
    DOWNLOAD: {
        WARNING: 8,
        ERROR: 1
    },
    LATENCY: {
        WARNING: 40,
        ERROR: 100
    },
    JITTER: {
        WARNING: 50,
        ERROR: 100
    }
};

const exports = (env: IEnv = IOC().env()) => {
    return {
        upload: {
            warning: env.getInt('REACT_APP_UPLOADWARN', DEFAULTS.UPLOAD.WARNING),
            error: env.getInt('REACT_APP_UPLOADERROR', DEFAULTS.UPLOAD.ERROR)
        },
        download: {
            warning: env.getInt('REACT_APP_DOWNLOADWARN', DEFAULTS.DOWNLOAD.WARNING),
            error: env.getInt('REACT_APP_DOWNLOADERROR', DEFAULTS.DOWNLOAD.ERROR)
        },
        latency: {
            warning: env.getInt('REACT_APP_LATENCYWARN', DEFAULTS.LATENCY.WARNING),
            error: env.getInt('REACT_APP_LATENCYERROR', DEFAULTS.LATENCY.ERROR)
        },
        jitter: {
            warning: env.getInt('REACT_APP_JITTERWARN', DEFAULTS.JITTER.WARNING),
            error: env.getInt('REACT_APP_JITTERERROR', DEFAULTS.JITTER.ERROR)
        }
    }
};

export default exports;
