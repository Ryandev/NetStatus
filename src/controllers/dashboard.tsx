
import React, { useEffect } from 'react';
import {connect} from "react-redux";
import View from '../components/dashboard';
import { IDashboardProps } from "../components/dashboard/Container.if";
import mapping from './dashboard.map';


function Controller(props: IDashboardProps): JSX.Element {
    /* redraw page, to trigger seconds since last update timer */
    const [, updateState] = React.useState<{}>();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        const timer = setInterval(() => {
            console.log('Updating');
            forceUpdate();
        }, 
            1000 * props.refreshPageInterval);
        clearInterval(timer);
    }, [props, forceUpdate])

    return (
        <View {...props} />
    )
}

export default connect(mapping)(Controller);
