
import { IConfig } from "../interfaces/config";
import IOC from '../ioc';
import { IGlobalState } from "../state/interface";
import { DashboardStatusValue, IDashboardProps, IDashboardStatusItem } from "../components/dashboard/Container.if";
import util from './dashboard.util';


const mapStateToProps = (state: IGlobalState, config: IConfig = IOC().config()): IDashboardProps => {
    const latencyProps: IDashboardStatusItem = {
        name : "LATENCY",
        value : Math.round(state?.SpeedTest?.latency ?? -1) + "ms",
        status : (state?.SpeedTest?.latency ?? config.threshold.latency.error) >= config.threshold.latency.error
            ? DashboardStatusValue.Bad
            : state?.SpeedTest?.latency > config.threshold.latency.warning
                ? DashboardStatusValue.Warning
                : DashboardStatusValue.Good
    };

    const jitterProps: IDashboardStatusItem = {
        name : "JITTER",
        value : Math.round(state?.SpeedTest?.jitter ?? -1) + "ms",
        status : (state?.SpeedTest?.jitter ?? config.threshold.jitter.error) >= config.threshold.jitter.error
            ? DashboardStatusValue.Bad
            : state?.SpeedTest?.jitter > config.threshold.jitter.warning
                ? DashboardStatusValue.Warning
                : DashboardStatusValue.Good
    };

    const ulProps: IDashboardStatusItem = {
        name : "UPLOAD",
        value : Math.round(state?.SpeedTest?.uploadSpeed ?? -1) + "Mbps",
        status : state?.SpeedTest?.uploadSpeed <= config.threshold.upload.error
            ? DashboardStatusValue.Bad
            : state?.SpeedTest?.uploadSpeed < config.threshold.upload.warning
                ? DashboardStatusValue.Warning
                : DashboardStatusValue.Good
    };

    const dlProps: IDashboardStatusItem = {
        name : "DOWNLOAD",
        value : Math.round(state?.SpeedTest?.downloadSpeed ?? -1) + "Mbps",
        status : state?.SpeedTest?.downloadSpeed < config.threshold.download.error
            ? DashboardStatusValue.Bad
            : state?.SpeedTest?.downloadSpeed < config.threshold.download.warning
                ? DashboardStatusValue.Warning
                : DashboardStatusValue.Good
    };

    const isTestRunning = state?.SpeedTest?.isTestRunning ?? false;
    const dateOfLastTest = state?.SpeedTest?.dateOfLastTest ?? null;
    const clientIp = state?.SpeedTest?.clientIp ?? state?.SpeedTest?.ispInfo ?? 'missing';
    const infoTextLeft = isTestRunning
        ? ''
        : util.describeDifferenceBetweenDates(dateOfLastTest, new Date());
    
    return {
        statusItems: [latencyProps, jitterProps, dlProps, ulProps],
        showInfoIcon: true,
        infoIcon: isTestRunning ? "wifi" : "clock",
        infoTextLeft: infoTextLeft,
        infoTextRight: clientIp,
        infoIconRight: "map-marker",
        refreshPageInterval: Math.max(1, config.view.refreshPageInterval)
    
    };
};

export default mapStateToProps;
