import {IndexListeners} from "./index-related/index-listeners.js";
import {IndexElements} from "./index-related/index-elements.js";
import {IndexRenderer} from "./index-related/index-renderer.js";
import {SideEffects} from "./state/side-effects.js";
import {Router} from "./router.js";
import '/src/components/gmk-info-icon.js';

export class Bootstrap {
    public static runBootstrap(){
        IndexElements.secretInput().focus();
        IndexListeners.initialize();
        IndexRenderer.initialize();
        SideEffects.initialize();
        Router.initialize();
    }
}

Bootstrap.runBootstrap();