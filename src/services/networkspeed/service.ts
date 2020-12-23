
import { IService, IServiceStatus } from "../interface";
import { INetworkSpeedState, INetworkSpeedService, INetworkSpeedConfig } from "./interface";
import model from './model';
import util from './util';


function createService(config: INetworkSpeedConfig): INetworkSpeedService {
    const service: INetworkSpeedService = {
        status: IServiceStatus.Initialized,
        name: 'NetSpeed',
        state: model(),
        subscribeForUpdates: function(this: INetworkSpeedService, subscriberKey: string, callback: (service: IService<INetworkSpeedState>) => void) {
		    this.callbackUpdates[subscriberKey] = callback;
        },
        unsubscribeFromUpdates: function(this: INetworkSpeedService, subscriberKey: string) {
			delete this.callbackUpdates[subscriberKey];
        },
        unsubscribeAll: function(this: INetworkSpeedService) {
			this.callbackUpdates = {};
        },
        start: function(this: INetworkSpeedService) {
            if ( util.isRunning(this) ) { return Promise.resolve(); }
            this.status = IServiceStatus.Idle;
            
            runSpeedTest();

			window.addEventListener('online',  runSpeedTest);

            return Promise.resolve();
        },
        stop: function(this: INetworkSpeedService) {
			if ( !util.isRunning(this) ) { return Promise.resolve(); }
            this.status = IServiceStatus.Stopped;

			clearTimeout(this.timer);
			this.timer = null;

			window.removeEventListener('online',  runSpeedTest);

            return Promise.resolve();
        },

        callbackUpdates: {},
        timer: null,
    };
    
    const runSpeedTest = () => {
        util.startSpeedTest(service, config);
    };

    return service;
}

export default createService;
