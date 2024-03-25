import {Elements} from './elements.js';
import {State} from "./state/state.js";

export class IndexListeners {
    public static initialize(){
        function execute(toRun: () => void){
            toRun();
            State.notifyChange();
        }
        Elements.secretInput().addEventListener('input', () => execute(() => State.value.secretValue = Elements.secretInput().value));
        Elements.saltInput().addEventListener('input', () => execute(() => State.value.saltValue = Elements.saltInput().value));
        Elements.secretHideToggle().addEventListener('click', () => execute(() => State.value.secretShow = !State.value.secretShow));
        Elements.saltHideToggle().addEventListener('click', () => execute(() => State.value.saltShow = !State.value.saltShow));
        Elements.passwordHideToggle().addEventListener('click', () => execute(() => State.value.passwordShow = !State.value.passwordShow));
    }
}