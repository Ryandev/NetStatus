
import React from "react";
import IOC from '../../ioc'
import { ILogger } from "../../interfaces/log";
import { Status, IStatusProps } from './StatusRow.if';


type Element = 'Container';

const DEFAULTS: Record<string, Record<string, React.CSSProperties>> = {
    CONTAINER: {
        DEFAULT: {
            width: '100%',
            marginTop: '0px',
            marginBottom: '5vh',
            marginLeft: '0px',
            marginRight: '0px',
            borderRadius: '0px',
            padding: '0px',
            paddingLeft: '5%',
            height: '15vh',
            fontSize: '10vh',
            fontFamily: 'Inconsolata',
            overflow: 'hidden',
            textOverflow: 'hidden',
            whiteSpace: 'nowrap',
        },
        STATUS_GOOD: {
            backgroundColor: '#9ae94e',
            borderColor: '#9ae94e',
            color: '#000',
        },
        STATUS_WARNING: {
            backgroundColor: '#f56e07',
            borderColor: '#f56e07',
            color: '#fff',
        },
        STATUS_BAD: {
            backgroundColor: '#e63010',
            borderColor: '#e63010',
            color: '#fff',
        }
    }
};

const styling = (element: Element, props: IStatusProps, log: ILogger = IOC().logger()): React.CSSProperties => {
    var elemStyle = {};

    switch (element) {
        case "Container":
            Object.assign(elemStyle, 
                DEFAULTS.CONTAINER.PRIMARY, 
                props.status === Status.Good    && DEFAULTS.CONTAINER.STATUS_GOOD, 
                props.status === Status.Warning && DEFAULTS.CONTAINER.STATUS_WARNING, 
                props.status === Status.Bad     && DEFAULTS.CONTAINER.STATUS_BAD);
              break;

        default:
            log.error("Unknown property: " + element);
            break;
    }

    return elemStyle;
}

export default styling;
