import {createStore} from "redux";
import reducer from "./reducers/index.js";

function store(state = {}) {
    return createStore(reducer, state);
}

export default store;