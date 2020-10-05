import React from 'react';
import {connect} from "react-redux";
import {StatusRow as styling} from '../constants/styling';
import {status} from '../constants/statusrow';
import {name as iconType} from '../constants/icon';
import icon from '../lib/icon';
import log from '../lib/log';


function StatusRow(props) {
    const iconDrawable = icon.drawableComponentForIcon(props.icon);
    return (
        <div
            key='statusrow-container'
            style={mapPropsToStyling(props, 'statusrow-container')}
            className="row alert">
            <div className="" role="alert">
                {iconDrawable}
                &nbsp;
                <span id="status-name">{props.name}</span>
                &nbsp;
                <span id="status-value">{props.value}</span>
            </div>
        </div>
    );
}

const mapPropsToStyling = (props, elementKey) => {
    var elemStyle = {};

    switch (elementKey) {
        case 'statusrow-container':
        default:
            Object.assign(elemStyle, 
              styling.container.primary, 
              props.status === status.good && styling.container.statusGood, 
              props.status === status.warn && styling.container.statusWarning, 
              props.status === status.bad && styling.container.statusBad);
            break;
    }

    return elemStyle;
}

const mapStateToProps = (stateGlobal, props) => {
    var returnProps = {
        ...props,
    };

    const iconNameForStatus = (statusVal) => {
        var iconName = '';

        switch (statusVal) {
            case status.good:
                iconName = iconType.tickCircle;
                break;

            case status.warn:
                iconName = iconType.questionMarkCircle;
                break;

            case status.bad:
                iconName = iconType.exclamationTriangle;
                break;

            default:
                log.error('Unrecognised status: ' + statusVal);
        }

        return iconName; 
    }

    returnProps.icon = iconNameForStatus(props.status);

    return returnProps
};

export default connect(mapStateToProps)(StatusRow);
