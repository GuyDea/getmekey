import {IndexElements} from './index-elements.js';
import {recallService} from "/src/services/recall-service.js";
import {copyService} from "/src/services/copy-service.js"
import {state} from "/src/state/initial-state.js"
import {normalizeText} from "/src/utils/helper-functions.js"

export class IndexListeners {
    public static initialize(){
        IndexElements.secretInput().addEventListener('focus', () => {
            state.update(() => {
                if (state.value.secretRemembered) {
                    recallService.unmarkSecretAsRecalled(true);
                }
            })
        });
        IndexElements.secretInput().addEventListener('input', () => state.update(() => {
            state.value.secretValue = IndexElements.secretInput().value;
            state.value.secretRemembered = false;
        }));
        IndexElements.saltInput().addEventListener('focus', () => IndexElements.saltInput().removeAttribute('readonly'));
        IndexElements.finalPassword().addEventListener('focus', () => IndexElements.finalPassword().removeAttribute('readonly'));
        IndexElements.saltInput().addEventListener('input', () => {
            IndexElements.saltInput().value = normalizeText(IndexElements.saltInput().value);
            state.update(() => {
                state.value.saltValue = IndexElements.saltInput().value
            });
        });
        IndexElements.secretHideToggle().addEventListener('click', () => state.update(() => state.value.secretShow = !state.value.secretShow));
        IndexElements.saltHideToggle().addEventListener('click', () => state.update(() => state.value.saltShow = !state.value.saltShow));
        IndexElements.passwordHideToggle().addEventListener('click', () => state.update(() => state.value.passwordShow = !state.value.passwordShow));
        IndexElements.copyButton().addEventListener('click', () => copyService.copy(IndexElements.finalPassword().value, 'Copied To Clipboard'));
        IndexElements.setRecalledButton().addEventListener('click', () => recallService.storeToRecalled());
        IndexElements.clearButton().addEventListener('click', () => recallService.removeRecalledByUser());
    }
}