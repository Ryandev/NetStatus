
import { IOnlineStatusState } from "./interface"


function State(): IOnlineStatusState {
    const state = {
        isOnline: true,
        dateWasLastOnline: new Date(0),
    }

    return state;
}

export default State
