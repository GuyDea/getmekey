import {IndexElements} from "./index-related/index-elements.js";

export class Router {
    private static _lastStateId = 0;
    private static _routes: Route[] = [
        {
            path: '/preferences',
            component: () => import('/src/components/preferences/gmk-preferences-page.js').then(() => document.createElement('gmk-settings-page')),
        },
        {
            path: '/hash-settings',
            component: () => import('/src/components/password-options/gmk-password-options-page.js').then(() => document.createElement('gmk-password-options-page')),
        }
    ]

    public static initialize(){
        window.addEventListener('popstate', () => this.handleRoute(location.pathname, false));
        window.addEventListener('click', ev => {
            const anchor = (ev.target as HTMLElement).closest('a')?.getAttribute('href');
            if (anchor != null && !['http://', 'https://'].some(p => anchor.startsWith(p))) {
                ev.preventDefault();
                ev.stopPropagation();
                ev.stopImmediatePropagation();
                this.handleRoute(anchor, true).then();
            }
        }, {capture: true});
        this.handleRoute(location.pathname, false).then();
        setTimeout(() => {
            console.log('[Router] Started: Lazy loading components');
            this._routes.forEach(async r => await r.component())
            console.log('[Router] Finished: Lazy loading components');
        }, 10_000);
    }

    public static canGoBack(){
        return history.state > 0;
    }

    public static async handleRoute(route: string, addHistory?: boolean) {
        const component = this._routes.find(r => route.match(r.path))?.component();
        if(component){
            IndexElements.mainPage().style.display = 'none';
            IndexElements.subPageContainer().innerHTML = '';
            IndexElements.subPageContainer().append(await component);
        } else {
            IndexElements.mainPage().style.display = 'flex';
            IndexElements.subPageContainer().innerHTML = '';
        }
        if(addHistory) {
            history.pushState(++this._lastStateId, '', route);
        } else {
            history.replaceState(history.state, '', route || '/');
        }
    }
}

type Route = {
    path: string,
    component: () => Promise<HTMLElement>;
}