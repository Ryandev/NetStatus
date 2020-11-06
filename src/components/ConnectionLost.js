import React from 'react';
import {connect} from "react-redux";
import {ConnectionLost as styling} from '../constants/styling';
import constants from '../constants';
import icon from '../lib/icon';


function ConnectionLost(props) {
    return (
        <div
            key="connectionlost-container"
            style={styling.container.primary}
            className="container">
            <div style={styling.row} className="row">
                <div style={styling.col} className="col-xs-12 center-block text-center">
                    <p style={styling.p}>
                        {props.title}
                    </p>
                </div>
            </div>

            <div style={styling.row} className="row">
                <div style={styling.col} className="col-xs-12 center-block text-center">
                    {props.icon}
                </div>
            </div>

            <div style={styling.row} className="row">
                <div style={styling.col} className="col-xs-12 center-block text-center">
                    <p style={styling.p}>
                        {props.subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (stateGlobal, props) => {
    const timeFormat = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' });
    return {
        ...props,
        title: "Connection Lost!",
        subtitle: "Last online at " + timeFormat.format(stateGlobal.OnlineStatus.dateWasLastOnline),
        icon: icon.drawableComponentForIcon(constants.icon.name.plug),
    };
};

export default connect(mapStateToProps)(ConnectionLost);
