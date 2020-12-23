
import IOC from '../../ioc'
import { IConfig } from '../../interfaces/config';
import { ILogger } from '../../interfaces/log';
import { IServiceStatus } from '../interface';
import { IOnlineStatusConfig, IOnlineStatusService } from './interface';
import reachable from './reachable';


const isNavigatorOnline = () => navigator.onLine;

function isRunning(service: IOnlineStatusService): boolean {
	return service.status === IServiceStatus.Idle || service.status === IServiceStatus.Busy;
}

function startNetPingCheck(
	config: IOnlineStatusConfig, 
	callback: (isOnline: boolean) => void, 
	log: ILogger = IOC().logger(), 
	constants: IConfig = IOC().config()) {
	if ( !navigator.onLine ) { log.warn('offline, cannot run speedtest request'); return; }

	const fetchIdx = Math.round(Math.random() * constants.ping.servers.length);
	const website = constants.ping.servers[fetchIdx];
	reachable.canReach(website, function(result){
		const isOnline = result.isOnline();
		callback(isOnline);
	});
}

let notifyCallbacks = (service: IOnlineStatusService) => {
	Object.values(service.callbackUpdates).forEach((callback) => callback(service));
}

const exports = {
    isRunning,
    isNavigatorOnline,
    startNetPingCheck,
    notifyCallbacks,
}

export default exports;
