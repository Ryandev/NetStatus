

import { IServiceStatus } from "../interface";
import { INetworkSpeedService, INetworkSpeedConfig } from "./interface";
import IOC from '../../ioc';


function isRunning(service: INetworkSpeedService): boolean {
	return service.status === IServiceStatus.Idle || service.status === IServiceStatus.Busy;
}

function startSpeedTest(service: INetworkSpeedService, config: INetworkSpeedConfig, log=IOC().logger()) {
	clearTimeout(service.timer);
	service.timer = null;

	service.status = IServiceStatus.Busy;
	notifyCallbacks(service);

	service.worker.run()
		.then((result) => {
			if ( !isRunning(service) ) { return; }
			service.state = service.state.apply(result);
			service.status = IServiceStatus.Idle;
			notifyCallbacks(service);
			service.timer = setTimeout(()=>startSpeedTest(service, config), 
				Math.max(config.testInterval, 60) * 1000);
		})
		.catch((error: Error) => {
			log.error('Speed test run failed: ' + JSON.stringify(error));
			if ( !isRunning(service) ) { return; }
			service.status = IServiceStatus.Error;
			service.timer = setTimeout(()=>startSpeedTest(service, config), 
				Math.max(config.testInterval, 60) * 1000);
		})
}

const notifyCallbacks = (service: INetworkSpeedService) => {
	Object.values(service.callbackUpdates).forEach((callback) => callback(service));
}

const exports = {
	isRunning,
	startSpeedTest,
	notifyCallbacks,
};

export default exports;
