
import { IService } from "../interface";


export interface INetworkSpeedService extends IService<INetworkSpeedState> {
	callbackUpdates: Record<string, (service: IService<INetworkSpeedState>) => void>;
    timer: any;
    worker: ISpeedRunner;
}

export interface ISpeedRunner {
    isReady: () => boolean;
    ready: () => Promise<void>;
    run: () => Promise<INetworkSpeedState>;
}

export interface INetworkSpeedState {
    clientIp: string;
    ispInfo: string;
    downloadSpeed: number;
    uploadSpeed: number;
    latency: number;
    jitter: number;
    isTestRunning: boolean;
    dateOfLastTest?: Date;

    updateWithData: (data: object) => void;
    apply: (data: Partial<INetworkSpeedState>) => INetworkSpeedState;
}

export enum SpeedTestState {
    Idle,
    Starting,
    Running,
    Ended,
}

export interface IServerConfiguration {
    name: string;
    server: string;
    id: number;
    dlURL: string;
    ulURL: string;
    pingURL: string;
    getIpURL: string;
    sponsorName: string|null;
    sponsorURL: string|null;
}

export interface INetworkSpeedConfig {
    testInterval: number;
    serverConfigurations: Array<IServerConfiguration>;
}
