
import { IOfflineProps } from "../components/offline/Container.if";
import { IGlobalState } from "../state/interface";


const mapStateToProps = (state: IGlobalState): IOfflineProps => {
    const timeFormat = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' });
    return {
        title: "Connection Lost!",
        subtitle: "Last online at " + timeFormat.format(state.OnlineStatus.dateWasLastOnline),
        iconName: "plug",
    };
}

export default mapStateToProps;
