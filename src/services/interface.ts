
import { INetworkSpeedState } from "./networkspeed/interface";
import { IOnlineStatusState } from "./onlinestatus/interface";


export interface IServiceManager {
    allServices: IService<any>[];
    onlineStatus: IService<IOnlineStatusState>;
    networkSpeed: IService<INetworkSpeedState>;
}

export interface IServiceState {}

export enum IServiceStatus {
    Unitialized,
    Initialized,
    Idle,
    Busy,
    Stopped,
    Error,
}

export interface IService<T extends IServiceState> {
    name: string;
    status: IServiceStatus;
    state: T;
    subscribeForUpdates: (subscriberKey: string, callback: (service: IService<T>) => void) => void;
    unsubscribeFromUpdates: (subscriberKey: string) => void;
    unsubscribeAll: () => void;
    start: () => Promise<void>;
    stop: () => Promise<void>;
    forceUpdate: () => Promise<void>;
}
