import {combineReducers} from 'redux'

import OnlineStatus from './netstatus';
import SpeedTest from './netspeed';

export default combineReducers({OnlineStatus, SpeedTest});