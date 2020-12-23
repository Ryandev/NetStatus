
import React from 'react';
import IOC from '../../ioc'
import { ILogger } from '../../interfaces/log';
import Icon from '../common/icon';
import styling from './StatusRow.style';
import { Status, IStatusProps } from './StatusRow.if';


const iconForStatus = (statusVal: Status, log: ILogger = IOC().logger()): JSX.Element => {
    let elem = Icon.ExclamationTriangle();

    switch (statusVal) {
        case Status.Good:
            elem = Icon.TickCircle();
            break;

        case Status.Warning:
            elem = Icon.QuestionMarkCircle();
            break;

        case Status.Bad:
            elem = Icon.ExclamationTriangle();
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
            className="row alert">
            <div className="" role="alert">
                {iconForStatus(props.status)}
                &nbsp;
                <span id="status-name">{props.name}</span>
                &nbsp;
                <span id="status-value">{props.value}</span>
            </div>
        </div>
    );
}

export default StatusRow;
