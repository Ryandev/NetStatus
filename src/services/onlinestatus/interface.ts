
import { IService } from "../interface";


export interface IOnlineStatusService extends IService<IOnlineStatusState> {
	callbackUpdates: Record<string, (service: IService<IOnlineStatusState>) => void>;
	timer: any;
}

export interface IOnlineStatusState {
    isOnline: boolean;
    dateWasLastOnline?: Date;
    updateWithData: (isOnline: boolean) => void;
    apply: (data: Partial<IOnlineStatusState>) => IOnlineStatusState;
}

export interface IOnlineStatusConfig {
    testInterval: number;
    servers: string[];
}
