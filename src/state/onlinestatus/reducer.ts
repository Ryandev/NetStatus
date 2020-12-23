
import { IOnlineStatusState, StateModifier } from './interface';
import newState from './state';


function reducer(state = newState(), action: StateModifier<IOnlineStatusState>) {
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
