
export interface INetworkSpeedState {
    jitter: number;
    latency: number;
    uploadSpeed: number;
    downloadSpeed: number;
    ispLocation: string;
    isTestRunning: boolean;
    dateOfLastTest: Date;
}

export interface StateModifier<T> {
    type: string;
    apply(modelIn: T): T;
}
