
import { History } from 'history';


function historyMatchesLocation(history: History, path: string): boolean {
    let location = history.location.pathname;

    if ( location === path ) { return true; }

    if ( location[0] === '/' ) {
        location = history.location.pathname.substring(1); /* remove leading / */
    }

    let matched = path === location;

    return matched;
}

const exports = {
    historyMatchesLocation,
}

export default exports;