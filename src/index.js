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
import reachable from './lib/reachable';

const providerStore = store();

function updateNavigatorOnline() {
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

function startNetPingCheck() {
	if ( !navigator.onLine ) { log.warn('offline, cannot run speedtest request'); return; }
	if ( window.speedRunner ) { log.info('already running speed test, ignoring until after'); return; }

	const fetchIdx = parseInt(Math.random() * constants.ping.servers.length);
	const website = constants.ping.servers[fetchIdx];
	reachable.canReach(website, function(result){
		var processor = actions.actionProcessorForEvent(result.isOnline()
			? actions.types.INTERNETSTATUS.ONLINE
			: actions.types.INTERNETSTATUS.OFFLINE);

		providerStore.dispatch(processor());
	});
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

const windowLoadCb = function() {
	window.addEventListener('online',  updateNavigatorOnline);
	window.addEventListener('offline', updateNavigatorOnline);
	updateNavigatorOnline();
	startNetSpeedCheck();
	window.removeEventListener('load', windowLoadCb);
};

window.addEventListener('load', windowLoadCb);

setInterval(startNetPingCheck, Math.max(constants.ping.testInterval, 5) * 1000);
setInterval(startNetSpeedCheck, Math.max(constants.speedtest.testInterval, 60) * 1000);

ReactDOM.render(
    <Provider store={providerStore}>
        <App />
	</Provider>, 
	document.getElementById('root'));
