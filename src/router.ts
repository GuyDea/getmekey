import {Elements} from "./elements.js";

export class Router {
    private static _lastStateId = 0;
    private static _routes: Route[] = [
        {
            path: '/preferences',
            component: () => import('/src/components/gmk-preferences-page.js').then(() => document.createElement('gmk-settings-page')),
        },
        {
            path: '/password-options',
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
            console.log('[Router] Lazy loading components');
            this._routes.forEach(r => r.component())
        }, 10_000);
    }

    public static canGoBack(){
        return history.state > 0;
    }

    public static async handleRoute(route: string, addHistory?: boolean) {
        const component = this._routes.find(r => route.match(r.path))?.component();
        if(component){
            Elements.mainPage().style.display = 'none';
            Elements.subPageContainer().innerHTML = '';
            Elements.subPageContainer().append(await component);
        } else {
            Elements.mainPage().style.display = 'flex';
            Elements.subPageContainer().innerHTML = '';
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