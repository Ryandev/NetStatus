
import React from 'react';
import { ILoadingProps } from './Container.if';


type Element = "Container" | "Col" | "P" | "Row" | "Icon" | "SpanTitle" | "SpanSubTitle";

const DEFAULT_STYLE: Record<string, React.CSSProperties> = {
    CONTAINER: {
        backgroundColor: '#000',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '10vh',
        paddingBottom: '10vh',
        width: '100%',
        height: '100%'
    },
    COL: {
        width: '100%'
    },
    P: {
        width: '100%',
        fontFamily: 'Inconsolata'
    },
    ROW: {
        textAlign: 'center',
        color: '#fff',
        height: '30%',
        width: '100%',
        marginLeft: 0,
        marginRight: 0,
    },
    ICON: {
        fontSize: '18vmin',
        textAlign: 'center',
        color: '#fff'
    },
    SPANTITLE: {
        fontSize: '12vmin',
        lineHeight: '10vmin',
    },
    SPANSUBTITLE: {
        fontSize: '8vmin',
        lineHeight: '6vmin',
    },
};

function stylingForElement(element: Element, props: ILoadingProps): React.CSSProperties {
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

        case 'SpanTitle':
            Object.assign(styling, DEFAULT_STYLE.SPANTITLE);
            break;

        case 'SpanSubTitle':
            Object.assign(styling, DEFAULT_STYLE.SPANSUBTITLE);
            break;
        }

    return styling;
}

export default stylingForElement;
