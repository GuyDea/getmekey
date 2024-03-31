import {IndexListeners} from "./index-related/index-listeners.js";
import {IndexElements} from "./index-related/index-elements.js";
import {IndexRenderer} from "./index-related/index-renderer.js";
import {Router} from "./services/router.js"
import '/src/components/gmk-info-icon.js';
import '/src/utils/crypto-functions.js';
import {SecretStorageService} from "/src/services/secret-storage-service.js";
import {state} from "/src/state/state-holder.js";
import {preferencesService} from "/src/services/preferences-service.js"
import {passwordGenerator} from "/src/services/password-generator-service.js"

export class Bootstrap {
    public static runBootstrap(){
        IndexElements.secretInput().focus();
        IndexListeners.initialize();
        IndexRenderer.initialize();
        Router.initialize();
        this._tryToRestoreSecret();
        preferencesService.initialize();
        passwordGenerator.initialize();
    }

    private static _tryToRestoreSecret(){
        SecretStorageService.retrieveSecret().then(stored => {
            if(stored?.secret && stored.expiryDate && stored.expiryDate.getTime() > new Date().getTime()){
                state.update(s => {
                    s.secretValue = stored.secret;
                    s.secretExpiryDate = stored.expiryDate;
                    IndexElements.saltInput().focus();
                })
            } else {
                SecretStorageService.purge();
            }
        })
    }
}

Bootstrap.runBootstrap();