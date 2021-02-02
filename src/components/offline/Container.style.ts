
import React from 'react';
import { IOfflineProps } from './Container.if';


type Element = "Container" | "Col" | "P" | "Row" | "Icon";

const DEFAULT_STYLE: Record<string, React.CSSProperties> = {
    CONTAINER: {
        backgroundColor: '#000',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '18vh',
        paddingBottom: '18vh',
        width: '100%',
        height: '100%'
    },
    COL: {
        height: '100%',
        width: '100%'
    },
    P: {
        height: '100%',
        width: '100%',
        margin: 0,
        fontFamily: 'Inconsolata',
    },
    ROW: {
        fontSize: '12vmin',
        textAlign: 'center',
        color: '#fff',
        height: '20vmin',
        width: '100%',
        marginLeft: 0,
        marginRight: 0,
    },
    ICON: {
        fontSize: '25vmin',
        textAlign: 'center',
        color: '#fff'
    }
};

function stylingForElement(element: Element, props: IOfflineProps): React.CSSProperties {
    let styling: React.CSSProperties = {};

    switch (element) {
        case 'Container':
            Object.assign(styling, DEFAULT_STYLE.CONTAINER);
            break;

        case 'Col':
            Object.assign(styling, DEFAULT_STYLE.COL);
            break;
    
        case 'P':
            Object.assign(styling, DEFAULT_STYLE.P);
            break;

        case 'Row':
            Object.assign(styling, DEFAULT_STYLE.ROW);
            break;
    
        case 'Icon':
            Object.assign(styling, DEFAULT_STYLE.ICON);
            break;
    }

    return styling;
}

export default stylingForElement;
