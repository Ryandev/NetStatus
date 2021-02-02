
import { INetworkSpeedState, StateModifier } from "./interface";


function updateResults(store: any, state: Partial<{
        latency: number;
        jitter: number;
        downloadSpeed: number;
        uploadSpeed: number;
        ispInfo: string;
        clientIp: string;
    }>): StateModifier<INetworkSpeedState> {
    return {
        type: 'NetworkSpeed-UpdateResult',
        apply: (model: INetworkSpeedState) => {
            let newModel = {...model};
            newModel.jitter = state?.jitter ?? newModel.jitter;
            newModel.latency = state?.latency ?? newModel.latency;
            newModel.downloadSpeed = state?.downloadSpeed ?? newModel.downloadSpeed;
            newModel.uploadSpeed = state?.uploadSpeed ?? newModel.uploadSpeed;
            if ( ( state?.ispInfo?.length ?? 0 ) > 0 ) {
                newModel.ispInfo = state?.ispInfo ?? '';
            }
            if ( ( state?.clientIp?.length ?? 0 ) > 0 ) {
                newModel.clientIp = state?.clientIp ?? '';
            }
            return newModel;
        }
    }
}

function speedTestStarted(store: any): StateModifier<INetworkSpeedState> {
    return {
        type: 'NetworkSpeed-TestStart',
        apply: (model: INetworkSpeedState) => {
            let newModel = {...model};
            newModel.isTestRunning = true;
            return newModel;
        }
    }
}

function speedTestEnded(store: any): StateModifier<INetworkSpeedState> {
    return {
        type: 'NetworkSpeed-TestEnd',
        apply: (model: INetworkSpeedState) => {
            let newModel = {...model};
            newModel.isTestRunning = false;
            newModel.dateOfLastTest = new Date();
            return newModel;
        }
    }
}

const exports = {
    speedTestStarted,
    speedTestEnded,
    updateResults,
}

export default exports;
