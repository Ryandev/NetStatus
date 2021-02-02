
import React from "react";


const styleContainer: React.CSSProperties = {
    width: '100%',
    marginLeft: '0px',
    marginRight: '0px',
    borderRadius: '0px',
    padding: '0px',
    height: '14vmin',
    fontSize: '10vmin',
    color: '#fff',
    overflow: 'hidden',
    paddingLeft: '4vw',
    paddingRight: '4vw',
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

const style = {
    container: styleContainer,
    colLeft: styleColLeft,
    colRight: styleColRight,
}

export default style;
