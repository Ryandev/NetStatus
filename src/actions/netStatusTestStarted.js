import types from './types';

const netStatusTestStarted = (payload) => {
    return {
        type: types.SPEEDTEST.STARTED,
        ...payload
    }
}

export default netStatusTestStarted;