import { IOnlineStatusState, StateModifier } from "./interface";


function isOnline(store: any, isOnline: boolean): StateModifier<IOnlineStatusState> {
    return {
        type: 'OnlineStatus-Change',
        apply: (model: IOnlineStatusState) => {
            let newModel = {...model};
            
            newModel.isOnline = isOnline;

            if ( isOnline ) {
                newModel.dateWasLastOnline = new Date();
            }

            return newModel;
        }
    }    
}

const exports = {
    isOnline,
}

export default exports;
