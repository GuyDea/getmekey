import {Settings} from "./components/settings.js";
import {Elements} from "./elements.js";

export class Router {
    private static _lastStateId = 0;
    private static _routes: Route[] = [
        {
            path: '/settings',
            component: () => new Settings().create()
        }
    ]

    public static initialize(){
        window.addEventListener('popstate', () => this.handleRoute(location.pathname, false));
        window.addEventListener('click', ev => {
            const anchor = (ev.target as HTMLElement).closest('a');
            if (anchor) {
                this.handleRoute(anchor.getAttribute('href') ?? '', true);
                ev.preventDefault();
                ev.stopPropagation();
                ev.stopImmediatePropagation();
            }
        }, {capture: true});
    }

    public static handleRoute(route: string, addHistory?: boolean) {
        const component = this._routes.find(r => route.match(r.path))?.component();
        if(component){
            Elements.mainPage().style.display = 'none';
            Elements.subPageContainer().innerHTML = '';
            Elements.subPageContainer().append(component);
        } else {
            Elements.mainPage().style.display = 'flex';
            Elements.subPageContainer().innerHTML = '';
        }
        if(addHistory) {
            history.pushState(++this._lastStateId, '', route);
        }
    }
}

type Route = {
    path: string,
    component: () => HTMLElement;
}