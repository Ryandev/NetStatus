import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Router from './router';
import serviceInit from './services';
import { IServiceStatus } from './services/interface';
import state from './state';
import IOC from './ioc';


const services = serviceInit();
const providerStore = state.store()

const startServices = () => services.allServices.map((service) => service.start());
const updateServices = () => services.allServices.map((service) => service.forceUpdate());

window.addEventListener('load', () => {
	Promise.all(startServices())
		.then(()=>IOC().logger().info("Services started"))

	const rootElem = document.getElementById('root');
	if ( rootElem ) {
		rootElem.onclick = function() {
			Promise.all(updateServices())
				.then(()=>IOC().logger().info("Services statuses force-updated"))
		}
	}
});

services.onlineStatus.subscribeForUpdates("OnlineStatus-CB", (service) => {
	const isOnline = service.state.isOnline;
	const action = state.onlinestatus.dispatcher.isOnline(providerStore, isOnline);
	providerStore.dispatch(action);
})

services.networkSpeed.subscribeForUpdates("NetSpeed-CB", (service) => {
	switch ( service.status ) {
		case IServiceStatus.Busy:
		{
			const action = state.networkspeed.dispatcher.speedTestStarted(providerStore);
			providerStore.dispatch(action);
		}
		break;
			
		case IServiceStatus.Idle:
		{
			const actionEnded = state.networkspeed.dispatcher.speedTestEnded(providerStore);
			providerStore.dispatch(actionEnded);
			const actionUpdate = state.networkspeed.dispatcher.updateResults(providerStore, service.state);
			providerStore.dispatch(actionUpdate);
		}
		break;
	}
})

providerStore.subscribe(() => {
	const history = Router.history();
	if ( !history ) { return; }

	const state = providerStore.getState();

	const isShowingDashboard = Router.routes.dashboard.isShowing(history);
	const isOnline = state.OnlineStatus.isOnline;
	const isFetchingNetworkSpeed = !( services.networkSpeed.status === IServiceStatus.Idle ); /* it may be uninit'ed at this point, so don't assume == Busy */

	const showOffline = (!isFetchingNetworkSpeed || isShowingDashboard) && !isOnline;
	const showDashboard = !isFetchingNetworkSpeed && isOnline;

	if ( showOffline ) {
		Router.routes.offline.navigate(history);
	} else if ( showDashboard ) {
		Router.routes.dashboard.navigate(history)
	}
})

ReactDOM.render(
	<React.StrictMode>
		<Provider store={providerStore}>
			<Router.Render />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'));

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	reportWebVitals(console.log);
}
