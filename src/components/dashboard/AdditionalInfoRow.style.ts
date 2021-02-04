
import React from "react";


const styleContainer: React.CSSProperties = {
    width: '100%',
    marginLeft: '0px',
    marginRight: '0px',
    marginTop: '-2vmin',
    borderRadius: '0px',
    padding: '0px',
    height: '14vmin',
    fontSize: '9vmin',
    color: '#fff',
    overflow: 'hidden',
    paddingLeft: '5vw',
    paddingRight: '3vw',
    letterSpacing: '-1px',
};

const styleColLeft: React.CSSProperties = {
    width: '36%',
    height: '100%',
    overflow: 'hidden',
    textOverflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
};

const styleColRight: React.CSSProperties = {
    width: '64%',
    height: '100%',
    overflow: 'hidden',
    textOverflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
};

const styleSpanLeft: React.CSSProperties = {
    marginLeft: '2vmin',
}

const styleSpanRight: React.CSSProperties = {
    marginRight: '2vmin',
}

const style = {
    container: styleContainer,
    colLeft: styleColLeft,
    colRight: styleColRight,
    spanLeft: styleSpanLeft,
    spanRight: styleSpanRight,
}

export default style;
