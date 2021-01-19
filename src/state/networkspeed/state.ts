import { INetworkSpeedState } from "./interface"


function State(): INetworkSpeedState {
    const state = {
        jitter: 0,
        latency: 0,
        uploadSpeed: 0,
        downloadSpeed: 0,
        isTestRunning: false,
        dateOfLastTest: new Date(0),
        ispLocation: 'unknown',
    }

    return state;
}

export default State
