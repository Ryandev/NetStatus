
export interface INetworkSpeedState {
    jitter: number;
    latency: number;
    uploadSpeed: number;
    downloadSpeed: number;
    ispInfo: string;
    clientIp: string;
    isTestRunning: boolean;
    dateOfLastTest: Date;
}

export interface StateModifier<T> {
    type: string;
    apply(modelIn: T): T;
}
