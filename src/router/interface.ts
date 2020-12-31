
import { RouteComponentProps } from 'react-router-dom';
import { History } from 'history';


export interface IRouteComponentProps {
    history: any,
    location: any,
    match: any,
}

export interface IRoute {
    path: string;
    isShowing: (history: History) => boolean;
    component: (props: any) => JSX.Element;
    navigate: (history: History, props?: RouteComponentProps<{}>) => void;
}
