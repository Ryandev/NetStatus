
import React from 'react';
import {connect} from "react-redux";
import View from '../components/offline';
import { IOfflineProps } from "../components/offline/Container.if";
import mapping from './offline.map';


function Controller(props: IOfflineProps): JSX.Element {
    return (
        <View {...props} />
    )
}

export default connect(mapping)(Controller);
