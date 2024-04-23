import {IndexListeners} from "./index-related/index-listeners.js";
import {IndexElements} from "./index-related/index-elements.js";
import {IndexRenderer} from "./index-related/index-renderer.js";
import {Router} from "./services/router.js"
import '/src/components/gmk-info-icon.js';
import '/src/utils/crypto-functions.js';
import '/src/components/gmk-countdown.js';
import {preferencesService} from "/src/services/preferences-service.js"
import {passwordGenerator} from "/src/services/password-generator-service.js"
import {recallService} from "/src/services/recall-service.js"
import {HistoryService} from "/src/services/history-service.js"
import {copyService} from "/src/services/copy-service.js"

export class Bootstrap {
    public static async runBootstrap(){
        IndexElements.secretInput().focus();
        IndexListeners.initialize();
        IndexRenderer.initialize();
        copyService.initialize();
        await recallService.initialize();
        HistoryService.initialize();
        Router.initialize();
        preferencesService.initialize();
        passwordGenerator.initialize();
    }

    private static _getUrlAsChromeExtension(): Promise<string | null>{
        return new Promise(resolve => (window as any).chrome?.tabs ? (window as any).chrome?.tabs?.query({active: true, lastFocusedWindow: true}, (tabs: {url: string}[]) => {
            resolve(tabs[0]?.url)
        }) : resolve(null))
    }

}

Bootstrap.runBootstrap();