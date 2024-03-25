import {IndexElements} from './index-elements.js';
import {State} from "../state/state.js";

export class IndexListeners {
    public static initialize(){
        function execute(toRun: () => void){
            toRun();
            State.notifyChange();
        }
        IndexElements.secretInput().addEventListener('input', () => execute(() => State.value.secretValue = IndexElements.secretInput().value));
        IndexElements.saltInput().addEventListener('input', () => execute(() => State.value.saltValue = IndexElements.saltInput().value));
        IndexElements.secretHideToggle().addEventListener('click', () => execute(() => State.value.secretShow = !State.value.secretShow));
        IndexElements.saltHideToggle().addEventListener('click', () => execute(() => State.value.saltShow = !State.value.saltShow));
        IndexElements.passwordHideToggle().addEventListener('click', () => execute(() => State.value.passwordShow = !State.value.passwordShow));
    }
}