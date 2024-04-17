import {IndexElements} from "../index-related/index-elements.js"
import {HistoryService} from "/src/services/history-service.js"
import {popupService} from "/src/services/popup-service.js"
import {state} from "/src/state/state-holder.js"
import {GmkPopupConfirmationContent} from "/src/components/popup/gmk-popup-confirmation-content.js";
import {html} from "/src/utils/helper-functions.js";

export class Router {
    private static _routes: Route[] = [
        {
            path: '/preferences',
            component: () => import('/src/components/preferences/gmk-preferences-page.js').then(() => document.createElement('gmk-settings-page')),
        },
        {
            path: '/hash-settings',
            component: () => import('/src/components/password-options/gmk-password-options-page.js').then(() => document.createElement('gmk-password-options-page')),
            conditional: () => new Promise((resolve, reject) => {
                if (state.value.userPreferences.visibility.topSecret) {
                    popupService.open('Confirm', new GmkPopupConfirmationContent(html`
                                <div style="text-align: center; font-size: 1.3rem; font-weight: lighter;"><span style="color: var(--color-danger)">You are in Top-Secret Mode</span><br/><br/>
                                    Opening this window might reveal information related to your password generation<br/><br/>
                                    Are you sure?</div>`,
                        async () => {
                            await popupService.close(false);
                            resolve();
                        }, async () => {
                            await popupService.close(false);
                            reject();
                        }), {
                        doOnDismiss: reject
                    });
                } else {
                    resolve()
                }
            })
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
            this._routes.forEach(async r => await r.component?.())
            console.log('[Router] Finished: Lazy loading components');
        }, 10_000);
    }

    public static async handleRoute(route: string, addHistory?: boolean) {
        let currentRoute = this._routes.find(r => location.pathname.match(r.path));
        let newRoute = this._routes.find(r => route.match(r.path));
        let previousComponent = currentRoute?.component ? await currentRoute.component() : undefined;
        let newComponent = newRoute?.component ? await newRoute.component() : undefined;
        if(newRoute?.conditional){
            try {
                await newRoute.conditional();
            } catch (e){
                return;
            }
        }
        if(addHistory){
            HistoryService.addToHistory(() => {
                this._display(newComponent);
                return () => this._display(previousComponent)
            }, route)
        } else {
            this._display(newComponent);
        }
    }

    private static _display(component?: HTMLElement){
        if(component){
            IndexElements.mainPage().style.display = 'none';
            IndexElements.subPageContainer().innerHTML = '';
            IndexElements.subPageContainer().append(component);
        } else {
            IndexElements.mainPage().style.display = 'flex';
            IndexElements.subPageContainer().innerHTML = '';
        }
    }
}

type Route = {
    path: string,
    component?: () => Promise<HTMLElement>;
    conditional?: () => Promise<void>;
}