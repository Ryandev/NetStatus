import types from './types';

const netStatusTestUpdated = (payload) => {
    return {
        type: types.SPEEDTEST.UPDATED,
        ...payload
    }
}

export default netStatusTestUpdated;