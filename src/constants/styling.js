const App = {
    container: {
        primary: {
            backgroundColor: '#000',
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        }
    }
};

const ConnectionLost = {
    container: {
        primary: {
            backgroundColor: '#000',
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingTop: '21%',
            paddingBottom: '21%',
            width: '100%',
            height: '100%'
        }
    },
    col: {
        width: '100%'
    },
    p: {
        width: '100%',
        fontFamily: 'Inconsolata'
    },
    row: {
        fontSize: '12vmin',
        textAlign: 'center',
        color: '#fff',
        height: '30%',
        width: '100%'
    },
    icon: {
        fontSize: '26vmin',
        textAlign: 'center',
        color: '#fff'
    }
};

const Grid = {
    container: {
        primary: {
            backgroundColor: '#000',
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingTop: '4vmin',
            marginLeft: '0',
            marginRight: '0',
            width: '100%',
            height: '100%',
            maxWidth: '100%'
        }
    }
};

const StatusRow = {
    container: {
        primary: {
            width: '100%',
            marginLeft: '0px',
            marginRight: '0px',
            borderRadius: '0px',
            padding: '0px',
            paddingLeft: '5%',
            height: '15vmin',
            fontSize: '10vmin',
            fontFamily: 'Inconsolata',
            overflow: 'hidden',
            textOverflow: 'hidden',
            whiteSpace: 'nowrap'
        },
        statusGood: {
            backgroundColor: '#9ae94e',
            borderColor: '#9ae94e',
            color: '#000'
        },
        statusWarning: {
            backgroundColor: '#f56e07',
            borderColor: '#f56e07',
            color: '#fff'
        },
        statusBad: {
            backgroundColor: '#e63010',
            borderColor: '#e63010',
            color: '#fff'
        }
    }
};

const AdditionalInfoRow = {
    container: {
        primary: {
            width: '100%',
            marginLeft: '0px',
            marginRight: '0px',
            borderRadius: '0px',
            padding: '0px',
            height: '20vmin',
            fontSize: '10vmin',
            color: '#fff',
            overflow: 'hidden',
            paddingLeft: '4vmin',
            paddingRight: '0vmin'
        }
    },
    colLeft: {
        width: '30%',
        overflow: 'hidden',
        textOverflow: 'hidden',
        whiteSpace: 'nowrap'
    },
    colRight: {
        width: '70%',
        overflow: 'hidden',
        textOverflow: 'hidden',
        whiteSpace: 'nowrap'
    }
}

export {App, ConnectionLost, Grid, StatusRow, AdditionalInfoRow};
