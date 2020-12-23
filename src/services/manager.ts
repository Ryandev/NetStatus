
import IOC from '../ioc';
import { IServiceManager } from "./interface";
import onlinestatus from './onlinestatus';
import speedtest from './networkspeed';
import { IOnlineStatusConfig } from "./onlinestatus/interface";
import { INetworkSpeedConfig } from "./networkspeed/interface";


function manager(
    onlineStatusConfig: IOnlineStatusConfig = IOC().config().ping, 
    networkSpeedConfig: INetworkSpeedConfig = IOC().config().speedtest): IServiceManager {
    const onlineStatus = onlinestatus(onlineStatusConfig);
    const networkSpeed = speedtest(networkSpeedConfig);

    return {
        allServices: [onlineStatus, networkSpeed],
        onlineStatus,
        networkSpeed,
    }
}

export default manager;
