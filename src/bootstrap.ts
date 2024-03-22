import {Listeners} from "./listeners.js";
import {Elements} from "./elements.js";
import {Renderer} from "./renderer.js";
import {SideEffects} from "./side-effects.js";
import {Router} from "./router.js";

export class Bootstrap {
    public static runBootstrap(){
        Elements.secretInput().focus();
        Listeners.initialize();
        SideEffects.initialize();
        Renderer.initialize();
        Router.initialize();
    }
}

Bootstrap.runBootstrap();