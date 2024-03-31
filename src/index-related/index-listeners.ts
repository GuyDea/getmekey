import {IndexElements} from './index-elements.js';
import {state} from "../state/state-holder.js"
import {toastService} from "/src/services/toast-service.js"
import {recallService} from "/src/services/recall-service.js";

export class IndexListeners {
    public static initialize(){
        function execute(toRun: () => void){
            toRun();
            state.notifyChange();
        }
        IndexElements.secretInput().addEventListener('input', () => execute(() => state.value.secretValue = IndexElements.secretInput().value));
        IndexElements.saltInput().addEventListener('input', () => execute(() => state.value.saltValue = IndexElements.saltInput().value));
        IndexElements.secretHideToggle().addEventListener('click', () => execute(() => state.value.secretShow = !state.value.secretShow));
        IndexElements.saltHideToggle().addEventListener('click', () => execute(() => state.value.saltShow = !state.value.saltShow));
        IndexElements.passwordHideToggle().addEventListener('click', () => execute(() => state.value.passwordShow = !state.value.passwordShow));
        IndexElements.copyButton().addEventListener('click', () => {
            navigator.clipboard.writeText(state.value.passwordValue)
                .catch(() => toastService.addToast('Failed To Copy', "ERROR"));
        })
        IndexElements.setRecalledButton().addEventListener('click', () => recallService.storeToRecalled());
        IndexElements.clearButton().addEventListener('click', () => recallService.removeRecalled());
    }
}