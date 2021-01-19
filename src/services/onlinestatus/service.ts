
import { ILogger } from '../../interfaces/log';
import IOC from '../../ioc'
import { IService, IServiceStatus } from '../interface';
import { IOnlineStatusConfig, IOnlineStatusService, IOnlineStatusState } from './interface'
import util from './util';
import model from './model';


function createService(config: IOnlineStatusConfig, log: ILogger = IOC().logger()): IOnlineStatusService {
	const service: IOnlineStatusService = {
        status: IServiceStatus.Initialized,
		name: 'OnlineStatus',
		state: model(),
		subscribeForUpdates: function(this: IOnlineStatusService, subscriberKey: string, callback: (service: IService<IOnlineStatusState>) => void) {
			this.callbackUpdates[subscriberKey] = callback;
		},
		unsubscribeFromUpdates: function(this: IOnlineStatusService, subscriberKey: string) {
			delete this.callbackUpdates[subscriberKey];
		},
		unsubscribeAll: function(this: IOnlineStatusService) {
			this.callbackUpdates = {};
		},
		start: function(this: IOnlineStatusService) {
			if ( util.isRunning(this) ) { return Promise.resolve(); }
            this.status = IServiceStatus.Idle;
			
			const pingCheckCallback = function(this: IOnlineStatusService, isOnline: boolean) {
				this.state.isOnline = isOnline;
				util.notifyCallbacks(service);

				setTimeout(()=>util.startNetPingCheck(config, pingCheckCallback),
					Math.max(config.testInterval, 5) * 1000)
			}.bind(this);

			util.startNetPingCheck(config, pingCheckCallback);

			window.addEventListener('online',  updateNavigatorOnline);
			window.addEventListener('offline', updateNavigatorOnline);

            return Promise.resolve();
        },
		stop: function(this: IOnlineStatusService) {
			if ( !util.isRunning(this) ) { return Promise.resolve(); }
            this.status = IServiceStatus.Stopped;

			clearTimeout(this.timer);
			this.timer = null;

			window.removeEventListener('online',  updateNavigatorOnline);
            window.removeEventListener('offline', updateNavigatorOnline);
            
            return Promise.resolve();
		},
        forceUpdate: function(this: IOnlineStatusService) {
            updateNavigatorOnline();
            return Promise.resolve();
        },

        callbackUpdates: {},
        timer: null,
	};

	const updateNavigatorOnline = () => {
		service.state.isOnline = util.isNavigatorOnline();
		log.info('online status changed to: ' + (service.state.isOnline ? 'online' : 'offline'));
		util.notifyCallbacks(service);
	}

	return service;
}

export default createService;
