import model from '../model';
import actions from '../actions';
import { log } from '../lib';

/* state is stored in yx order & NOT xy due to the bootstrap layout where grid->rows->columns (grid->y->x). Hence the lookup order is reflected here too */
function _initialState() {
    return new model.SpeedTest();
}

function reducer(state = _initialState(), action) {
    if (state === undefined) {
        state = {};
    }
    if (action === undefined) {
        return state;
    }

    var stateReturn = state;

    if (stateReturn === undefined) {
        return state;
    }

    const updateState = (stateIn, newState) => {
        if (newState === undefined) {
            return stateIn;
        }
        const newModel = model
            .SpeedTest
            .deserialize(stateIn);
		newModel.updateWithData(newState);
        return newModel;
    };

    switch (action.type) {
        case actions.types.SPEEDTEST.STARTED:
            stateReturn = updateState(stateReturn, {isTestRunning: true});
	
			log.info('Processed event: ' + action.type + ', to: ' + JSON.stringify(stateReturn));
            break;

        case actions.types.SPEEDTEST.UPDATED:
            stateReturn = updateState(stateReturn, action);
            stateReturn = updateState(stateReturn, action.data);
	
			log.info('Processed event: ' + action.type + ', to: ' + JSON.stringify(stateReturn));
            break;

        case actions.types.SPEEDTEST.ENDED:
            stateReturn = _initialState();/* clear off old test results */
            stateReturn = updateState(stateReturn, action);
            stateReturn = updateState(stateReturn, action.data);
            stateReturn = updateState(stateReturn, {
                isTestRunning: false,
                dateOfLastTest: new Date()
            });
	
			log.info('Processed event: ' + action.type + ', to: ' + JSON.stringify(stateReturn));
            break;

        default:
            /* ignoring unknown actions */
            break;
	}

    return stateReturn;
}

export default reducer;