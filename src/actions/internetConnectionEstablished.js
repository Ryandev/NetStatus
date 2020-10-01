import types from './types';

const internetConnectionEstablished = (payload) => {
    return {
        type: types.INTERNETSTATUS.ONLINE,
        ...payload
    }
}

export default internetConnectionEstablished;