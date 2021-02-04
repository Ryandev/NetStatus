
import { ILogger } from '../../interfaces/log';
import IOC from '../../ioc'
import Icon from '../common/icon';
import styling from './Container.style';
import { ILoadingProps } from './Container.if';


const iconForStatus = (statusVal: "exclamation"|"spinner", style: React.CSSProperties = {}, log: ILogger = IOC().logger()): JSX.Element => {
    let elem = Icon.ExclamationTriangle();

    switch (statusVal) {
        case "exclamation":
            elem = Icon.ExclamationTriangle(style);
            break;

        case "spinner":
            elem = Icon.Spinner(style);
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
                        <span style={styling('SpanTitle',props)}>{props.title}</span>
                    </p>
                </div>
            </div>

            <div style={styling('Row', props)} className="row">
                <div style={styling('Col', props)} className="col-xs-12 center-block text-center">
                    <p style={styling('P', props)}>
                    <span style={styling('SpanSubTitle',props)}>{props.subtitle}</span>
                    </p>
                </div>
            </div>

            <div style={styling('Row', props)} className="row">
                <div style={styling('Col', props)} className="col-xs-12 center-block text-center">
                    {iconForStatus(props.iconName, styling('Icon', props))}
                </div>
            </div>
        </div>
    );
}

export default Container;
