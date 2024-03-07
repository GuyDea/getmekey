import {Listeners} from "./listeners.js";
import {Elements} from "./elements.js";
import {Render} from "./render.js";

export class Bootstrap {
    public static async runBootstrap(){
        Elements.secretInput().focus();
        Listeners.initialize();
        await Render.run();
    }
}

Bootstrap.runBootstrap();