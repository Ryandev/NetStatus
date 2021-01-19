
import React from "react";


const styleContainer: React.CSSProperties = {
    width: '100%',
    marginLeft: '0px',
    marginRight: '0px',
    borderRadius: '0px',
    padding: '0px',
    height: '20vmin',
    fontSize: '10vmin',
    color: '#fff',
    overflow: 'hidden',
    paddingLeft: '4vw',
    paddingRight: '0px',
};

const styleColLeft: React.CSSProperties = {
    width: '30%',
    overflow: 'hidden',
    textOverflow: 'hidden',
    whiteSpace: 'nowrap',
};

const styleColRight: React.CSSProperties = {
    width: '70%',
    overflow: 'hidden',
    textOverflow: 'hidden',
    whiteSpace: 'nowrap',
};

const style = {
    container: styleContainer,
    colLeft: styleColLeft,
    colRight: styleColRight,
}

export default style;
