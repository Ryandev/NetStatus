
import { INetworkSpeedState } from "./networkspeed/interface";
import { IOnlineStatusState } from "./onlinestatus/interface";


export interface IGlobalState {
    OnlineStatus: IOnlineStatusState;
    SpeedTest: INetworkSpeedState;
}
