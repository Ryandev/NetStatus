
import log from '../lib/log';

import netStatusTestStarted from './netStatusTestStarted';
import netStatusTestUpdated from './netStatusTestUpdated';
import netStatusTestEnded from './netStatusTestEnded';
import internetConnectionEstablished from './internetConnectionEstablished';
import internetConnectionLost from './internetConnectionLost';
import types from './types';

const actionProcessorForEvent = function (typeSearch) {
    switch (typeSearch) {
        case types.SPEEDTEST.STARTED:
            return netStatusTestStarted;

        case types.SPEEDTEST.UPDATED:
            return netStatusTestUpdated;

        case types.SPEEDTEST.ENDED:
            return netStatusTestEnded;

        case types.INTERNETSTATUS.ONLINE:
            return internetConnectionEstablished;

        case types.INTERNETSTATUS.OFFLINE:
            return internetConnectionLost;

        default:
            log.error('unknown: ' + typeSearch);
            return null;
    }
};

export default {
    actionProcessorForEvent,
    types,
}