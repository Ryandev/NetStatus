
import { IOfflineProps } from "../components/offline/Container.if";
import { IGlobalState } from "../state/interface";

const dateDeltaDays = (dateLow: Date, dateHigh: Date) => {
    const deltaMS  = Math.abs(dateHigh.getTime() - dateLow.getTime());
    const deltaS   = deltaMS / 1000;
    const deltaMin = deltaS / 60;
    const deltaHr  = deltaMin / 60;
    const deltaDay = deltaHr / 24;
    return deltaDay;
}

const mapStateToProps = (state: IGlobalState): IOfflineProps => {
    const dateNow = new Date();
    const dateOffline = state.OnlineStatus.dateWasLastOnline;

    let formatParams: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' }

    /* show the date if the time elapsed offline is > 24hrs */
    if ( dateDeltaDays(dateOffline, dateNow) >= 1 ) {
        Object.assign(formatParams, { year: 'numeric', month: 'numeric', day: 'numeric' });
    }

    const timeFormat = new Intl.DateTimeFormat('default', formatParams);

    return {
        title: "Connection Lost!",
        subtitle: `Last online at ${timeFormat.format(dateOffline)}`,
        iconName: "plug",
    };
}

export default mapStateToProps;
