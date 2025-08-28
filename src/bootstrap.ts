import './meta.js';
import {IndexListeners} from "./index-related/index-listeners.js";
import {IndexElements} from "./index-related/index-elements.js";
import {IndexRenderer} from "./index-related/index-renderer.js";
import {Router} from "./services/router.js"
import '/src/components/gmk-info-icon.js';
import '/src/utils/crypto-functions.js';
import '/src/components/gmk-countdown.js';
import {preferencesService} from "/src/services/preferences-service.js";
import {passwordGenerator} from "/src/services/password-generator-service.js";
import {recallService} from "/src/services/recall-service.js";
import {HistoryService} from "/src/services/history-service.js";
import {copyService} from "/src/services/copy-service.js";
import {serviceWorkerService} from "/src/services/service-worker-service.js"

export class Bootstrap {
    public static async runBootstrap(){
        setTimeout(() => IndexElements.secretInput().focus(), 500);
        IndexListeners.initialize();
        IndexRenderer.initialize();
        await recallService.initialize();
        copyService.initialize();
        HistoryService.initialize();
        Router.initialize();
        preferencesService.initialize();
        passwordGenerator.initialize();
        serviceWorkerService.initialize();
    }
}

Bootstrap.runBootstrap();