
import {createStore, combineReducers, StoreEnhancer } from "redux";
import OnlineStatus from './onlinestatus/reducer';
import SpeedTest from './networkspeed/reducer';


function store(initialiState = {}, reducers={}, enhancers?: StoreEnhancer<any>) {
    const rootReducers = combineReducers({OnlineStatus, SpeedTest, ...reducers});

    const store = createStore(rootReducers, initialiState, enhancers);

    return store;
}

export default store;
