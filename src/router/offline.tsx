
import { RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import { IRoute } from './interface';
import Controller from '../controllers/offline';
import util from './util';


let route: IRoute = {
    path: "/offline",
    isShowing: (history: History) => util.historyMatchesLocation(history, route.path),
    component: (props: any) => <Controller {...props} />,
    navigate: (history: History, props?: RouteComponentProps<{}>) => { 
        if ( route.isShowing(history) ) { return; }  
        history.push(route.path)
    }
}

export default route;
