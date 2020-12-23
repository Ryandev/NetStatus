
import { ILogger } from '../../interfaces/log';
import IOC from '../../ioc'
import Icon from '../common/icon';
import styling from './Container.style';
import { ILoadingProps } from './Container.if';


const iconForStatus = (statusVal: "exclamation"|"spinner", log: ILogger = IOC().logger()): JSX.Element => {
    let elem = Icon.ExclamationTriangle();

    switch (statusVal) {
        case "exclamation":
            elem = Icon.ExclamationTriangle();
            break;

        case "spinner":
            elem = Icon.Spinner();
            break;

        default:
            log.error('Unrecognised status: ' + statusVal);
    }

    return elem;
}

function Container(props: ILoadingProps) {
    return (
        <div
            key="loading-container"
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
