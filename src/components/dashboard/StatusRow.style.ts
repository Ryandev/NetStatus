
import React from "react";
import IOC from '../../ioc'
import { ILogger } from "../../interfaces/log";
import { Status, IStatusProps } from './StatusRow.if';


type Element = 'Container' | 'InnerContainer' | 'SpanName' | 'SpanValue' | 'StatusIcon';

const DEFAULTS: Record<string, Record<string, React.CSSProperties>> = {
    CONTAINER: {
        DEFAULT: {
            width: '100%',
            height: '15vh',
            marginTop: '0px',
            marginBottom: '5vh',
            marginLeft: '0px',
            marginRight: '0px',
            borderRadius: '0px',
            overflow: 'hidden',
            textOverflow: 'hidden',
            whiteSpace: 'nowrap',
            padding: '0%',
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
    },
    INNERCONTAINER: {
        DEFAULT: {
            width: '100%',
            height: '100%;',
            padding: '0px',
            paddingLeft: '5%',
        }
    },
    STATUSICON: {
        DEFAULT: {
            width: '9vh',
            height: '9vh',
        }
    },
    SPANNAME: {
        DEFAULT: {
            fontSize: '10vh',
            fontFamily: 'Inconsolata',
            width: '36%',
            display: 'inline-block',
            paddingLeft: '2%',
            paddingRight: '2%',
        }
    },
    SPANVALUE: {
        DEFAULT: {
            fontSize: '10vh',
            fontFamily: 'Inconsolata',
            width: '30%',
            paddingLeft: '2%',
            paddingRight: '2%',
        }
    },
};

const styling = (element: Element, props: IStatusProps, log: ILogger = IOC().logger()): React.CSSProperties => {
    var elemStyle = {};

    switch (element) {
        case "Container":
            Object.assign(elemStyle, 
                DEFAULTS.CONTAINER.DEFAULT, 
                props.status === Status.Good    && DEFAULTS.CONTAINER.STATUS_GOOD, 
                props.status === Status.Warning && DEFAULTS.CONTAINER.STATUS_WARNING, 
                props.status === Status.Bad     && DEFAULTS.CONTAINER.STATUS_BAD);
            break;
              
        case "StatusIcon":
            Object.assign(elemStyle, DEFAULTS.STATUSICON.DEFAULT);
            break;
    
            case "InnerContainer":
            Object.assign(elemStyle, DEFAULTS.INNERCONTAINER.DEFAULT);
            break;

        case "SpanName":
            Object.assign(elemStyle, DEFAULTS.SPANNAME.DEFAULT);
            break;

        case "SpanValue":
            Object.assign(elemStyle, DEFAULTS.SPANVALUE.DEFAULT);
            break;
    
        default:
            log.error("Unknown property: " + element);
            break;
    }

    return elemStyle;
}

export default styling;
