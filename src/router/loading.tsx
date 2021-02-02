
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import { IRoute } from './interface';
import Controller from '../controllers/loading';
import util from './util';


const route: IRoute = {
    path: "/loading",
    isShowing: (history: History) => util.historyMatchesLocation(history, route.path),
    component: (props: any) => {
        return (
            <Controller {...props} />
        )
    } ,
    navigate: (history: History, props?: RouteComponentProps<{}>) => { 
        if ( route.isShowing(history) ) { return; }  
        history.push(route.path) 
    }
}

export default route;
