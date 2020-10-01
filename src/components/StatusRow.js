import React from 'react';
import {connect} from "react-redux";
import {StatusRow as styling} from '../constants/styling';

function StatusRow(props) {
    return (
        <div
            key='statusrow-container'
            style={mapPropsToStyling(props, 'statusrow-container')}
            className="row alert">
            <div className="" role="alert">
                <i className={["far", props.fontAwesomeClassName].join(" ")}></i>
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
              props.status === "good" && styling.container.statusGood, 
              props.status === "warning" && styling.container.statusWarning, 
              props.status === "bad" && styling.container.statusBad);
            break;
    }

    return elemStyle;
}

const mapStateToProps = (stateGlobal, props) => {
    var returnProps = {
        ...props
    };

    switch (props.status) {
        case "good":
            returnProps.fontAwesomeClassName = 'fa-check-circle';
            break;

        case "warning":
            returnProps.fontAwesomeClassName = 'fa-question-circle';
            break;

        case "bad":
        default:
            returnProps.fontAwesomeClassName = 'fa-exclamation-triangle';
            break;
    }

    return returnProps
};

export default connect(mapStateToProps)(StatusRow);
