import {IndexElements} from './index-elements.js';
import {state} from "../state/state-holder.js"
import {recallService} from "/src/services/recall-service.js";
import {copyService} from "/src/services/copy-service.js"

export class IndexListeners {
    public static initialize(){
        IndexElements.secretInput().addEventListener('focus', () => state.update(() => {
                if(state.value.secretRemembered){
                    recallService.removeRecalledSecret(true);
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
        IndexElements.copyButton().addEventListener('click', () => copyService.copy(state.value.passwordValue, 'Copied To Clipboard'));
        IndexElements.setRecalledButton().addEventListener('click', () => recallService.storeToRecalled());
        IndexElements.clearButton().addEventListener('click', () => recallService.removeRecalledByUser());

    }
}