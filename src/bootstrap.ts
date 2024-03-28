import {IndexListeners} from "./index-related/index-listeners.js";
import {IndexElements} from "./index-related/index-elements.js";
import {IndexRenderer} from "./index-related/index-renderer.js";
import {SideEffects} from "./state/side-effects.js";
import {Router} from "./services/router.js"
import '/src/components/gmk-info-icon.js';
import '/src/utils/crypto-functions.js';
import {SecretStorage} from "/src/services/storage/secret-storage.js";
import {state} from "/src/state/state-holder.js";

export class Bootstrap {
    public static runBootstrap(){
        IndexElements.secretInput().focus();
        IndexListeners.initialize();
        IndexRenderer.initialize();
        SideEffects.initialize();
        Router.initialize();
        this._tryToRestoreSecret();
    }

    private static _tryToRestoreSecret(){
        SecretStorage.retrieveSecret().then(stored => {
            if(stored?.secret && stored.expiryDate && stored.expiryDate.getTime() > new Date().getTime()){
                state.update(s => {
                    s.secretValue = stored.secret;
                    s.secretExpiryDate = stored.expiryDate;
                    IndexElements.saltInput().focus();
                })
            } else {
                SecretStorage.purge();
            }
        })
    }
}

Bootstrap.runBootstrap();