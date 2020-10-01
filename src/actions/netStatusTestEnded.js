import types from './types';

const netStatusTestEnded = (payload) => {
    return {
        type: types.SPEEDTEST.ENDED,
        ...payload
    }
}

export default netStatusTestEnded;