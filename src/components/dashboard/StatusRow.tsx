
import React from 'react';
import IOC from '../../ioc'
import { ILogger } from '../../interfaces/log';
import Icon from '../common/icon';
import styling from './StatusRow.style';
import { Status, IStatusProps } from './StatusRow.if';


const iconForStatus = (statusVal: Status, style={}, log: ILogger = IOC().logger()): JSX.Element => {
    let elem = Icon.ExclamationTriangle(style);

    switch (statusVal) {
        case Status.Good:
            elem = Icon.TickCircle(style);
            break;

        case Status.Warning:
            elem = Icon.QuestionMarkCircle(style);
            break;

        case Status.Bad:
            elem = Icon.ExclamationTriangle(style);
            break;

        default:
            log.error('Unrecognised status: ' + statusVal);
    }

    return elem;
}

function StatusRow(props: IStatusProps) {
    return (
        <div
            key='statusrow-container'
            style={styling('Container', props)}
            className="row alert statusRowContainer">
            <div className="statusRowInnerContainer" style={styling('InnerContainer', props)} role="alert">
                {iconForStatus(props.status, styling('StatusIcon', props))}
                <span id="status-name" style={styling('SpanName', props)}>{props.name}</span>
                <span id="status-value" style={styling('SpanValue', props)}>{props.value}</span>
            </div>
        </div>
    );
}

export default StatusRow;
