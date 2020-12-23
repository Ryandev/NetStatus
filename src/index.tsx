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

window.addEventListener('load', () => {
	let promises = services.allServices.map((service) => service.start());
	Promise.all(promises)
		.then(()=>IOC().logger().info("Services started"))
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
	let history = Router.history();
	if ( !history ) { return; }

	let state = providerStore.getState();

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
