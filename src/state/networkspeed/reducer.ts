
import { INetworkSpeedState, StateModifier } from './interface';
import newState from './state';


function reducer(state = newState(), action: StateModifier<INetworkSpeedState>) {
    if (state === undefined) {
        state = newState();
    }

    if (action === undefined) {
        return state;
    }

    let stateReturn = state;

    if ( 'apply' in action ) {
        stateReturn = action.apply(state);
    }

    return stateReturn;
}

export default reducer;
