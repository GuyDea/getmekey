import {Elements} from './elements.js';
import {Render} from "./render.js";

export class Listeners{
    public static initialize(){
        Elements.passwordInput().addEventListener('input', () => Render.run());
        Elements.prefixInput().addEventListener('input', () => Render.run());
    }

}