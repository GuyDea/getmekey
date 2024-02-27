import {Listeners} from "./listeners.js";
import {Elements} from "./elements.js";

export class Bootstrap {
    public static runBootstrap(){
        Elements.passwordInput().focus();
        Listeners.initialize();
    }
}

Bootstrap.runBootstrap();