import {connect} from "react-redux";

import React from 'react';
import Head from './components/Head';
import Grid from './components/Grid';
import {App as styling} from './constants/styling';

import './App.css';

function App(props) {
    return (
        <div key='app-container' style={Object.assign({}, styling.container.primary,)}>
            <Head/>
            <Grid/>
        </div>
    );
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(App);
