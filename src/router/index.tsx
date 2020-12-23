
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import BrowserHistory from './history';
import { IRoute } from './interface';
import loading from './loading';
import offline from './offline';
import dashboard from './dashboard';


let routes = {
    loading,
    dashboard,
    offline,
}

function Render(): JSX.Element {
    const routesComponents = Object.values(routes).map(
        ((route: IRoute, x: number) => {
            return <Route 
                key={'route-'+route.path}
                exact
                path={route.path}
                render={route.component}
            />
        })
    )

    return (
        <BrowserRouter>
            <BrowserHistory.ReactRouterSaveHistory />
            <Switch>
                {routesComponents}
                <Redirect from="" to={loading.path} />
            </Switch>
        </BrowserRouter>
    )
}

const exports = {
    Render,
    routes,
    history: () => BrowserHistory.getHistory(),
};

export default exports;
