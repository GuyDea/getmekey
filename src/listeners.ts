import {Elements} from './elements.js';
import {State} from "./state.js";

export class Listeners{
    public static initialize(){
        function execute(toRun: () => void){
            toRun();
            State.notify();
        }
        Elements.secretInput().addEventListener('input', () => execute(() => State.value.secretValue = Elements.secretInput().value));
        Elements.prefixInput().addEventListener('input', () => execute(() => State.value.prefixValue = Elements.prefixInput().value));
        Elements.secretHideToggle().addEventListener('click', () => execute(() => State.value.secretShow = !State.value.secretShow));
        Elements.prefixHideToggle().addEventListener('click', () => execute(() => State.value.prefixShow = !State.value.prefixShow));
        Elements.passwordHideToggle().addEventListener('click', () => execute(() => State.value.passwordShow = !State.value.passwordShow));
        Elements.prefixPinToggle().addEventListener('click', () => execute(() => State.value.prefixPin = !State.value.prefixPin));
    }
}