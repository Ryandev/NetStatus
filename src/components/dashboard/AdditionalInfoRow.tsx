
import React from 'react';
import IOC from '../../ioc'
import { ILogger } from '../../interfaces/log';
import Icon from '../common/icon';
import styling from './AdditionalInfoRow.style';
import { IAdditionalInfoRowProps } from './AdditionalInfoRow.if';


const iconForStatus = (statusVal: "wifi"|"spinner", log: ILogger = IOC().logger()): JSX.Element => {
    let elem = Icon.ExclamationTriangle();

    switch (statusVal) {
        case "wifi":
            elem = Icon.WiFi();
            break;

        case "spinner":
            elem = Icon.Spinner();
            break;

        default:
            log.error('Unrecognised status: ' + statusVal);
    }

    return elem;
}

function AdditionalInfoRow(props: IAdditionalInfoRowProps): JSX.Element {
    const iconLeft = (props.showIconLeft ? iconForStatus(props.iconLeft) : '');

    return (
        <div style={styling.container} className="row">
            <div style={styling.colLeft} className="col-xs-3">
                {iconLeft}
                <span>{props.textLeft}</span>
            </div>
            <div style={styling.colRight} className="col-xs-9">
                <span>{props.textRight}</span>
            </div>
        </div>
    );
}

export default AdditionalInfoRow;
