import React from 'react';
import {connect} from "react-redux";
import {ConnectionLost as styling} from '../constants/styling';
import constants from '../constants';
import icon from '../lib/icon';


function ConnectionLost(props) {
    const plugIcon = icon.drawableComponentForIcon(constants.icon.name.plug);
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
                    {plugIcon}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (stateGlobal, props) => {
    return props;
};

export default connect(mapStateToProps)(ConnectionLost);
