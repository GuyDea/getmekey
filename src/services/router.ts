import {IndexElements} from "../index-related/index-elements.js"
import {HistoryService} from "/src/services/history-service.js"

export class Router {
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
        window.addEventListener('click', ev => {
            const anchor = (ev.composedPath().find(e => (e as any)?.tagName?.toLowerCase() === 'a') as HTMLElement)?.getAttribute('href');
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

    public static async handleRoute(route: string, addHistory?: boolean) {
        if(addHistory){
            const currentRoute = location.pathname;
            HistoryService.addToHistory(() => {
                this._display(route);
                return () => this._display(currentRoute)
            }, route)
        } else {
            this._display(route);
        }
    }

    private static _display(route: string){
        let foundRoute = this._routes.find(r => route.match(r.path));
        if(foundRoute){
            foundRoute.component().then(component => {
                IndexElements.mainPage().style.display = 'none';
                IndexElements.subPageContainer().innerHTML = '';
                IndexElements.subPageContainer().append(component);
            })
        } else {
            IndexElements.mainPage().style.display = 'flex';
            IndexElements.subPageContainer().innerHTML = '';
        }
    }
}

type Route = {
    path: string,
    component: () => Promise<HTMLElement>;
}