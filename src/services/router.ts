import {IndexElements} from "../index-related/index-elements.js"
import {HistoryService} from "/src/services/history-service.js"
import {popupService} from "/src/services/popup-service.js"
import {GmkPopupConfirmationContent} from "/src/components/popup/gmk-popup-confirmation-content.js";
import {html} from "/src/utils/helper-functions.js";
import {state} from "/src/state/initial-state.js"

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
                    popupService.open('Confirm', new GmkPopupConfirmationContent({
                        htmlText: html`
                            <div style="text-align: center; font-size: 1.3rem; font-weight: lighter;"><span
                                    style="color: var(--color-danger)">You are in Top-Secret Mode</span><br/><br/>
                                Opening this window might reveal information related to your password
                                generation<br/><br/>
                                Are you sure?
                            </div>`,
                        yesCallback: async () => {
                            await popupService.close(false);
                            resolve();
                        },
                        noCallback: async () => {
                            await popupService.close(false);
                            reject();
                        }
                    }), {
                        doOnDismiss: reject
                    });
                } else {
                    resolve()
                }
            })
        },
        {
            path: `/(${['info-secret','why-strong-secret','disclaimer','about', 'info-user-interface', 'info-usability', 'info-recall', 'info-app-name',
            'what-is-hash', 'info-password', 'info-hash-selection', 'info-password-format', 'generation-steps', 'policy'].join('|')})`,
            component: (path: string) => import('/src/components/gmk-info-page.js').then(m => new m.default(path.replace('/', '').split('?')[0])),
        },
        {
            path: '/install',
            component: () => import('/src/components/subpages/gmk-install-options.js').then(m => document.createElement('gmk-install-options')),
        },
    ]

    public static initialize(){
        window.addEventListener('click', async ev => {
            let aHref = ev.composedPath().find(e => (e as any)?.tagName?.toLowerCase() === 'a') as HTMLElement;
            const anchor = aHref?.getAttribute('href');
            if (anchor != null && !['http://', 'https://'].some(p => anchor.startsWith(p)) && aHref.getAttribute('target') !== '_blank') {
                ev.preventDefault();
                ev.stopPropagation();
                ev.stopImmediatePropagation();
                this.handleRoute(anchor, true).then();
            }
        }, {capture: true});
        this.handleRoute(location.pathname, false).then();
    }

    public static async handleRoute(route: string, addHistory?: boolean) {
        let currentRoute = this._routes.find(r => location.pathname.match(r.path));
        let newRoute = this._routes.find(r => route.match(r.path));
        let previousComponent = currentRoute?.component ? await currentRoute.component(location.pathname) : undefined;
        let newComponent = newRoute?.component ? await newRoute.component(route) : undefined;
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
    component?: (path: string) => Promise<HTMLElement>;
    conditional?: () => Promise<void>;
}