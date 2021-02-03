
import React from 'react';
import { ILoadingProps } from './Container.if';


type Element = "Container" | "Col" | "P" | "Row" | "Icon";

const DEFAULT_STYLE: Record<string, React.CSSProperties> = {
    CONTAINER: {
        backgroundColor: '#000',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '21%',
        paddingBottom: '21%',
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
        fontSize: '12vh',
        textAlign: 'center',
        color: '#fff',
        height: '30%',
        width: '100%',
        marginLeft: 0,
        marginRight: 0,
    },
    ICON: {
        fontSize: '26vh',
        textAlign: 'center',
        color: '#fff'
    }
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
    }

    return styling;
}

export default stylingForElement;
