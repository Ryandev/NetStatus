
import { IService, IServiceStatus } from "../interface";
import { INetworkSpeedState, INetworkSpeedService, INetworkSpeedConfig } from "./interface";
import model from './model';
import util from './util';
import newRunner from './speedRunner';


function createService(config: INetworkSpeedConfig): IService<INetworkSpeedState> {
    const runner = newRunner(config.serverConfigurations);

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
        forceUpdate: function(this: INetworkSpeedService) {
            runSpeedTest();
            return Promise.resolve();
        },

        callbackUpdates: {},
        timer: null,
        worker: runner,
    };
    
    const runSpeedTest = () => {
        service.worker.ready()
            .then(function(){
                util.startSpeedTest(service, config);
            })
    };

    return service;
}

export default createService;
