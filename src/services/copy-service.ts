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
        if(state.value.userPreferences.usability.autoCopy){
            this._tryAppNameInit().then();
        }
    }

    private _extractMainDomain(url: string) {
        try {
            let parsedUrl = new URL(url);
            let hostname = parsedUrl.hostname;

            // Split the hostname into parts
            let parts = hostname.split('.');

            // Handle commonly known TLDs with second-level domains
            let commonSLDs = ['co.uk', 'com.au', 'co.in', 'co.nz', 'co.za', 'com.br'];

            // Check if the last two parts form a common second-level domain
            if (parts.length > 2) {
                let lastTwoParts = parts[parts.length - 2] + '.' + parts[parts.length - 1];

                if (commonSLDs.includes(lastTwoParts)) {
                    // Return the last three parts
                    return parts.slice(-3)[0];
                }
            }

            // Otherwise, return the last two parts for standard TLDs
            return parts.slice(-2)[0];
        } catch (error) {
            console.error("The input is not a valid URL");
            return null;
        }
    }

    private _isIpAddress(string: string) {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(string);
    }

    private _getAppNameFromString(string: string | null): string | undefined {
        if(!string){
            return undefined;
        }
        const tempUrl = string.match(/https?:\/\/.+\./) ? string : `https://${string}`;
        try {
            const hostname = new URL(tempUrl).hostname;
            const parts = hostname.split('.');
            if(parts.length > 1 && !this._isIpAddress(hostname)){
                return this._extractMainDomain(tempUrl)?.toLowerCase();
            }
        } catch (e){
        }
        return undefined;
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