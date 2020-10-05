import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import {Provider} from "react-redux";

import store from "./store.js";
import actions from './actions/index';

import constants from './constants';

import App from './App';
import {testRunner as runner} from './lib';
import log from './lib/log';

const providerStore = store();

function updateNetworkConnectionStatus() {
	const isOnline = navigator.onLine;
	log.info('online status changed to: ' + (isOnline ? 'online' : 'offline'));

    var processor = actions.actionProcessorForEvent(isOnline
        ? actions.types.INTERNETSTATUS.ONLINE
        : actions.types.INTERNETSTATUS.OFFLINE);

		providerStore.dispatch(processor());

	if ( isOnline ) { 
		log.info('Starting net-speed check after re-establishing connection');
		startNetSpeedCheck(); 
	}
}

function startNetSpeedCheck() {
	if ( !navigator.onLine ) { log.warn('offline, cannot run speedtest request'); return; }
	if ( window.speedRunner ) { log.info('already running, ignoring speedtest request'); return; }

	const dispatchEventTestStart = (eventStore, result) => {
		var processor = actions.actionProcessorForEvent(actions.types.SPEEDTEST.STARTED);
		eventStore.dispatch(processor(result));
	};

	const dispatchEventTestEnded = (eventStore, result) => {
		var processor = actions.actionProcessorForEvent(actions.types.SPEEDTEST.ENDED);
		eventStore.dispatch(processor(result));
	};

	window.speedRunner = true;
	dispatchEventTestStart(providerStore);

    runner
		.start(constants.speedtest.serverConfigurations)
        .then(function (result) {
			window.speedRunner = false;
			dispatchEventTestEnded(providerStore, result);
        })
        .catch(function (err) {
			window.speedRunner = false;
			dispatchEventTestEnded(providerStore);
        });
}

window.addEventListener('load', function() {
	window.addEventListener('online',  updateNetworkConnectionStatus);
	window.addEventListener('offline', updateNetworkConnectionStatus);
	updateNetworkConnectionStatus();
	startNetSpeedCheck();
});

setInterval(startNetSpeedCheck, Math.max(constants.speedtest.testInterval, 60) * 1000);

ReactDOM.render(
    <Provider store={providerStore}>
        <App/>
	</Provider>, 
	document.getElementById('root'));
