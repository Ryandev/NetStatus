
import {createStore, combineReducers, StoreEnhancer } from "redux";
import OnlineStatus from './onlinestatus/reducer';
import SpeedTest from './networkspeed/reducer';


function store(initialiState = {}, reducers={}, enhancers?: StoreEnhancer<any>) {
    let rootReducers = combineReducers({OnlineStatus, SpeedTest, ...reducers});

    let store = createStore(rootReducers, initialiState, enhancers);

    return store;
}

export default store;
