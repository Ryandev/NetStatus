
import React from 'react';
import {connect} from "react-redux";
import View from '../components/loading';
import { ILoadingProps } from "../components/loading/Container.if";
import mappings from './loading.map';


function Controller(props: ILoadingProps): JSX.Element {
    return (
        <View {...props} />
    )
}

export default connect(mappings)(Controller);
