import env from '../lib/env';

export default {
    levels: {
        verbose: env.getBool('REACT_APP_ENABLELOGGINGVERBOSE', false),
        info: env.getBool('REACT_APP_ENABLELOGGINGINFO', false),
        warn: env.getBool('REACT_APP_ENABLELOGGINGWARN', true),
        error: env.getBool('REACT_APP_ENABLELOGGINGERROR', true),
    },
};
