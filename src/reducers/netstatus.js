import model from '../model';
import actions from '../actions';
import { log } from '../lib';

/* state is stored in yx order & NOT xy due to the bootstrap layout where grid->rows->columns (grid->y->x). Hence the lookup order is reflected here too */
function _initialState() {
    return new model.OnlineStatus();
}

function reducer(state = _initialState(), action) {
    if (state === undefined) {
        state = {};
    }
    if (action === undefined) {
        return state;
    }

    var stateReturn = {
        ...state
    };

    if (stateReturn === undefined) {
        return state;
    }

    const updateInetStatus = (stateIn, newStatus) => {
        var newModel = model
            .OnlineStatus
            .deserialize(stateIn);
		newModel.updateWithData(newStatus);
		return newModel;
	}

    switch (action.type) {
        case actions.types.INTERNETSTATUS.ONLINE:
            stateReturn = updateInetStatus(stateReturn, true);
			log.info('Processed event: ' + action.type + ', to: ' + JSON.stringify(stateReturn));
            break;

        case actions.types.INTERNETSTATUS.OFFLINE:
            stateReturn = updateInetStatus(stateReturn, false);
			log.info('Processed event: ' + action.type + ', to: ' + JSON.stringify(stateReturn));
            break;

        default:
            /* ignoring unknown actions */
            break;
    }

    return stateReturn;
}

export default reducer;