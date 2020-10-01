import types from './types';

const internetConnectionLost = (payload) => {
    return {
        type: types.INTERNETSTATUS.OFFLINE,
        ...payload
    }
}

export default internetConnectionLost;