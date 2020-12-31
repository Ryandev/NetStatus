
import { IOnlineStatusState } from './interface';


function OnlineStatus(isOnline: boolean = false) : IOnlineStatusState {
    function _updateWithData(onlineStatus: IOnlineStatusState, newStatus: boolean) {
        const wasOnline = onlineStatus.isOnline;
        onlineStatus.isOnline = newStatus;
        if (!onlineStatus.isOnline && wasOnline) {
            onlineStatus.dateWasLastOnline = new Date();
        }
    }

    return {
        isOnline,
        updateWithData: function(this: IOnlineStatusState, isOnline: boolean) {
            _updateWithData(this, isOnline);
        },
        apply: function (data: Partial<IOnlineStatusState>) {
            let copy = OnlineStatus(
                data?.isOnline ?? false,
            );
            return copy;
        },
    }
}

export default OnlineStatus;
