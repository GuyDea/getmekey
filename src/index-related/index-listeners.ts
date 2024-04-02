import {IndexElements} from './index-elements.js';
import {state} from "../state/state-holder.js"
import {toastService} from "/src/services/toast-service.js"
import {recallService} from "/src/services/recall-service.js";

export class IndexListeners {
    public static initialize(){
        IndexElements.secretInput().addEventListener('focus', () => state.update(() => {
                if(state.value.secretRemembered){
                    state.value.secretValue = '';
                    state.value.secretRemembered = false;
                }
            })
        );
        IndexElements.secretInput().addEventListener('input', () => state.update(() => {
            state.value.secretValue = IndexElements.secretInput().value;
            state.value.secretRemembered = false;
        }));
        IndexElements.saltInput().addEventListener('input', () => state.update(() => state.value.saltValue = IndexElements.saltInput().value));
        IndexElements.secretHideToggle().addEventListener('click', () => state.update(() => state.value.secretShow = !state.value.secretShow));
        IndexElements.saltHideToggle().addEventListener('click', () => state.update(() => state.value.saltShow = !state.value.saltShow));
        IndexElements.passwordHideToggle().addEventListener('click', () => state.update(() => state.value.passwordShow = !state.value.passwordShow));
        IndexElements.copyButton().addEventListener('click', () => {
            navigator.clipboard.writeText(state.value.passwordValue)
                .then(() => toastService.addToast('Copied To Clipboard'))
                .catch(() => toastService.addToast('Failed To Copy', "ERROR"));
        })
        IndexElements.setRecalledButton().addEventListener('click', () => recallService.storeToRecalled());
        IndexElements.clearButton().addEventListener('click', () => recallService.removeRecalled());
    }
}