import React from 'react';
import {connect} from "react-redux";
import {ConnectionLost as styling} from '../constants/styling';

function ConnectionLost(props) {
    return (
        <div
            key="connectionlost-container"
            style={styling.container.primary}
            className="container">
            <div style={styling.row} className="row">
                <div style={styling.col} className="col-xs-12 center-block text-center">
                    <p style={styling.p}>
                        Connection Lost!
                    </p>
                </div>
            </div>

            <div style={styling.row} className="row">
                <div style={styling.col} className="col-xs-12 center-block text-center">
                    <i style={styling.icon} className={["far", 'fa-plug'].join(" ")}></i>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (stateGlobal, props) => {
    return props;
};

export default connect(mapStateToProps)(ConnectionLost);
