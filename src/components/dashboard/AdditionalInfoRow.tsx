
import React from 'react';
import IOC from '../../ioc'
import { ILogger } from '../../interfaces/log';
import Icon from '../common/icon';
import styling from './AdditionalInfoRow.style';
import { IAdditionalInfoRowProps } from './AdditionalInfoRow.if';


const iconForStatus = (statusVal: "wifi"|"spinner"|"clock"|"map-marker", log: ILogger = IOC().logger()): JSX.Element => {
    let elem = Icon.ExclamationTriangle();

    switch (statusVal) {
        case "wifi":
            elem = Icon.WiFi();
            break;

        case "spinner":
            elem = Icon.Spinner();
            break;

        case "clock":
            elem = Icon.Clock();
            break;

        case "map-marker":
            elem = Icon.MapMarker();
            break;

        default:
            log.error('Unrecognised status: ' + statusVal);
    }

    return elem;
}

function AdditionalInfoRow(props: IAdditionalInfoRowProps): JSX.Element {
    const iconLeft = (props.showIconLeft ? iconForStatus(props.iconLeft) : '');
    const iconRight = iconForStatus(props.iconRight);

    return (
        <div style={styling.container} className="row">
            <div style={styling.colLeft} className="col-xs-3">
                {iconLeft}
                <span style={styling.spanLeft}>{props.textLeft}</span>
            </div>
            <div style={styling.colRight} className="col-xs-9">
                <span style={styling.spanRight}>{props.textRight}</span>
                {iconRight}
            </div>
        </div>
    );
}

export default AdditionalInfoRow;
