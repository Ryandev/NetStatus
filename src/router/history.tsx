
import React from 'react';
import { withRouter } from 'react-router';
import { History } from 'history';


let globalHistory: History|null = null;

class HistoryFetch extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        globalHistory = props.history;
    }

    render = () => null;
}

export const ReactRouterSaveHistory = withRouter(HistoryFetch);

const exports = {
    ReactRouterSaveHistory,
    getHistory: (): History|null => globalHistory,
};

export default exports;
