import {IndexListeners} from "./index-related/index-listeners.js";
import {IndexElements} from "./index-related/index-elements.js";
import {IndexRenderer} from "./index-related/index-renderer.js";
import {SideEffects} from "./state/side-effects.js";
import {Router} from "./router.js";
import '/src/components/gmk-info-icon.js';
import '/src/crypto-functions.js';
import {SecretStore} from "/src/secret-store.js";
import {state} from "/src/state/state.js";

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
        SecretStore.retrieveSecret().then(stored => {
            if(stored?.secret && stored.expiryDate && stored.expiryDate.getTime() > new Date().getTime()){
                state.update(s => {
                    s.secretValue = stored.secret;
                    s.secretExpiryDate = stored.expiryDate;
                    IndexElements.saltInput().focus();
                })
            } else {
                SecretStore.purge();
            }
        })
    }
}

Bootstrap.runBootstrap();