import {IndexListeners} from "./index-listeners.js";
import {Elements} from "./elements.js";
import {IndexRenderer} from "./index-renderer.js";
import {SideEffects} from "./side-effects.js";
import {Router} from "./router.js";

export class Bootstrap {
    public static runBootstrap(){
        Elements.secretInput().focus();
        IndexListeners.initialize();
        IndexRenderer.initialize();
        SideEffects.initialize();
        Router.initialize();
    }
}

Bootstrap.runBootstrap();