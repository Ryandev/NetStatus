
import IOC from '../../ioc'
import { ILogger } from '../../interfaces/log';
import Icon from '../common/icon';
import { IOfflineProps } from './Container.if';
import styling from './Container.style';


const iconForStatus = (statusVal: "plug"|"spinner", log: ILogger = IOC().logger()): JSX.Element => {
    let elem = Icon.ExclamationTriangle();

    switch (statusVal) {
        case "plug":
            elem = Icon.Plug();
            break;

        case "spinner":
            elem = Icon.Spinner();
            break;

        default:
            log.error('Unrecognised status: ' + statusVal);
    }

    return elem;
}

function Container(props: IOfflineProps) {
    return (
        <div
            key="offline-container"
            style={styling('Container', props)}
            className="container">
            <div style={styling('Row', props)} className="row">
                <div style={styling('Col', props)} className="col-xs-12 center-block text-center">
                    <p style={styling('P', props)}>
                        {props.title}
                    </p>
                </div>
            </div>

            <div style={styling('Row', props)} className="row">
                <div style={styling('Col', props)} className="col-xs-12 center-block text-center">
                    {iconForStatus(props.iconName)}
                </div>
            </div>

            <div style={styling('Row', props)} className="row">
                <div style={styling('Col', props)} className="col-xs-12 center-block text-center">
                    <p style={styling('P', props)}>
                        {props.subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
}


export default Container;
