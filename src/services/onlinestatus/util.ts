
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

function retryOperation<T>(operation: () => Promise<T>, delay: number, retries: number): Promise<T> {
	const wait = (ms:number) => new Promise(r => setTimeout(r, ms));

	return new Promise((resolve, reject) => {
		return operation()
		  .then(resolve)
		  .catch((reason) => {
			if (retries <= 0) { reject(reason); }

			return wait(delay)
				.then((): Promise<T> => {
					return retryOperation(operation, delay, retries-1);
					// let op = retryOperation;
					// op.bind(null, operation, delay, retries - 1);
					// return op;
				})
				.then(resolve)
				.catch(reject);
		  });
	});
}

function startNetPingCheck(
	config: IOnlineStatusConfig, 
	callback: (isOnline: boolean) => void, 
	log: ILogger = IOC().logger(), 
	constants: IConfig = IOC().config()) {
	if ( !navigator.onLine ) { 
		log.warn('offline, cannot run speedtest request');
		callback(false);
		return; 
	}

	const getWebsiteURL = (): string => {
		const fetchIdx = Math.round(Math.random() * (constants.ping.servers.length-1));
		const website = constants.ping.servers[fetchIdx];
		return website;
	}

	function canReachAsync(website: string): Promise<boolean> {
		log.verbose('Checking can access site' + website);
		return new Promise<boolean>(function(resolve, reject) {
			reachable.canReach(getWebsiteURL(), function(result){
				const isOnline = result.isOnline();
				resolve(isOnline);
			});
		})
	}

	retryOperation(()=>canReachAsync(getWebsiteURL()), 1000, 3)
		.then(function(isOnline: boolean) {
				if ( isOnline ) {
					log.info('Successfully reached website');
				} else {
					log.error('Failed to reach website');
				}
				callback(isOnline);
			})
			.catch(function(error: Error) {
				log.error('Failed to reach website, error:' + JSON.stringify(error));
				callback(false);
			})
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
