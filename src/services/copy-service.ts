import {toastService} from "/src/services/toast-service.js";

import {state} from "/src/state/initial-state.js"

export class CopyService {
    private _appNamePrefilled: 'Clipboard' | 'URL' | null = null;
    public initialize(){
        state.subscribe(s => {
            if(s.userPreferences.usability.autoCopy && s.passwordValue){
                this.copy(s.passwordValue, `Auto Copied${this._appNamePrefilled ? `: ${this._appNamePrefilled}` : ''}`);
                if(this._appNamePrefilled){
                    this._appNamePrefilled = null;
                }
            }
        }, {
            diffMatcher: s => JSON.stringify({enabled: s.userPreferences.usability.autoCopy, password: s.passwordValue})
        })
        this._tryAppNameInit().then();
    }

    private _isIpAddress(string: string) {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(string);
    }

    private _getAppNameFromString(string: string | null): string | null {
        if(!string){
            return null;
        }
        const tempUrl = string.match(/https?:\/\/.+\./) ? string : `https://${string}`;
        try {
            const hostname = new URL(tempUrl).hostname;
            const parts = hostname.split('.');
            if(parts.length > 1 && !this._isIpAddress(hostname)){
                return parts.splice(-2)[0].toLowerCase();
            }
        } catch (e){
        }
        return null;
    }

    private async _tryAppNameInit(){
        const [clipboard, url] = await Promise.all([navigator.clipboard.readText().catch(() => null), CopyService._getUrlAsChromeExtension()]);
        let appNameFromUrl = this._getAppNameFromString(url);
        let appNameFromClipboard = this._getAppNameFromString(clipboard);
        let appName: string | null = null;
        if(appNameFromUrl){
            this._appNamePrefilled = 'URL';
            appName = appNameFromUrl;
        } else if(appNameFromClipboard) {
            this._appNamePrefilled = 'Clipboard';
            appName = appNameFromClipboard;
        }
        if(typeof appName === 'string') {
            state.update(s => s.saltValue = (appName as string));
            return
        }
    }

    private static _getUrlAsChromeExtension(): Promise<string | null>{
        return new Promise(resolve => (window as any).chrome?.tabs ? (window as any).chrome?.tabs?.query({active: true, lastFocusedWindow: true}, (tabs: {url: string}[]) => {
            resolve(tabs[0]?.url)
        }) : resolve(null))
    }

    public copy(text: string, message: string){
        navigator.clipboard.writeText(text)
            .then(() => message ? toastService.addToast(message) : null)
            .catch(() => toastService.addToast('Failed To Copy', "ERROR"));
    }
}

export const copyService = new CopyService();