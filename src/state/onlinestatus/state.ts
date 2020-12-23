
import { IOnlineStatusState } from "./interface"


function State(): IOnlineStatusState {
    let state = {
        isOnline: true,
        dateWasLastOnline: new Date(0),
    }

    return state;
}

export default State
