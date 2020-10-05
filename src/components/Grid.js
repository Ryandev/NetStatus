import React from "react";
import {connect} from "react-redux";
import StatusRow from "./StatusRow";
import AdditionalInfoRow from "./AdditionalInfoRow";
import ConnectionLost from "./ConnectionLost";
import {Grid as styling} from "../constants/styling";
import threshold from "../constants/threshold";
import {status as statusContants} from  '../constants/statusrow';


function Grid(props) {
    if (props.showConnectionLost) 
        return <ConnectionLost/>;
    
    const statusRows = props
        .statuses
        .map((data) => {
            return (<StatusRow
                key={data.name}
                name={data.name}
                value={data.value}
                status={data.status}/>);
        });

    return (
        <div
            key="grid-container"
            style={styling.container.primary}
            className="grid container">
            {statusRows}
            <AdditionalInfoRow/>
        </div>
    );
}

const mapStateToProps = (state) => {
    const latencyProps = {
        name : "LATENCY",
        value : Math.round(state.SpeedTest.latency ?? -1) + "ms",
        status : (state.SpeedTest.latency ?? threshold.Settings.latency.error) >= threshold.Settings.latency.error
            ? statusContants.bad
            : state.SpeedTest.latency > threshold.Settings.latency.warning
                ? statusContants.warn
                : statusContants.good
    };

    const jitterProps = {
        name : "JITTER",
        value : Math.round(state.SpeedTest.jitter ?? -1) + "ms",
        status : (state.SpeedTest.jitter ?? threshold.Settings.jitter.error) >= threshold.Settings.jitter.error
            ? statusContants.bad
            : state.SpeedTest.jitter > threshold.Settings.jitter.warning
                ? statusContants.warn
                : statusContants.good
    };

    const ulProps = {
        name : "UPLOAD",
        value : Math.round(state.SpeedTest.uploadSpeed ?? -1) + "mbit/s",
        status : state.SpeedTest.uploadSpeed <= threshold.Settings.upload.error
            ? statusContants.bad
            : state.SpeedTest.uploadSpeed < threshold.Settings.upload.warning
                ? statusContants.warn
                : statusContants.good
    };

    const dlProps = {
        name : "DOWNLOAD",
        value : Math.round(state.SpeedTest.downloadSpeed ?? -1) + "mbit/s",
        status : state.SpeedTest.downloadSpeed < threshold.Settings.download.error
            ? statusContants.bad
            : state.SpeedTest.downloadSpeed < threshold.Settings.download.warning
                ? statusContants.warn
                : statusContants.good
    };

    return {
        state: state,
        showConnectionLost: !state.OnlineStatus.isOnline,
        statuses: [latencyProps, jitterProps, dlProps, ulProps]
    };
};

export default connect(mapStateToProps)(Grid);
