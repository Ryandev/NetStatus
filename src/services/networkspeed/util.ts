

import { IServiceStatus } from "../interface";
import runner from './speedRunner';
import { INetworkSpeedService, INetworkSpeedConfig } from "./interface";


function isRunning(service: INetworkSpeedService): boolean {
	return service.status === IServiceStatus.Idle || service.status === IServiceStatus.Busy;
}

function startSpeedTest(service: INetworkSpeedService, config: INetworkSpeedConfig) {
	clearTimeout(service.timer);
	service.timer = null;

	service.status = IServiceStatus.Busy;
	notifyCallbacks(service);

	runner(config.serverConfigurations)
		.then((result) => {
			if ( !isRunning(service) ) { return; }
			service.state = service.state.apply(result);
			service.status = IServiceStatus.Idle;
			notifyCallbacks(service);
			service.timer = setTimeout(()=>startSpeedTest(service, config), 
				Math.max(config.testInterval, 60) * 1000);
		})
		.catch((error: Error) => {
			if ( !isRunning(service) ) { return; }
			service.status = IServiceStatus.Error;
			service.timer = setTimeout(()=>startSpeedTest(service, config), 
				Math.max(config.testInterval, 60) * 1000);
		})
}

let notifyCallbacks = (service: INetworkSpeedService) => {
	Object.values(service.callbackUpdates).forEach((callback) => callback(service));
}

const exports = {
	isRunning,
	startSpeedTest,
	notifyCallbacks,
};

export default exports;
