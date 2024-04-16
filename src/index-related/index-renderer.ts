import {IndexElements} from "./index-elements.js";
import {stateSelectors} from "../state/state-selectors.js";
import {state} from "/src/state/state-holder.js";
import {setAttrIfTrue, setClassIfTrue, toggleDisabledPanel, toggleHiddenPanel} from "/src/utils/helper-functions.js";


/**
 * Only place in the application that is meant to update DOM based on the current state
 */
export class IndexRenderer {
    public static initialize(){
        state.subscribe(() => this._render(), {dispatchImmediately: true, diffMatcher: s => {
                return JSON.stringify({
                    secretValue: s.secretValue,
                    secretShow: s.secretShow,
                    saltShow: s.saltShow,
                    passwordShow: s.passwordShow,
                    passwordGenerating: s.passwordGenerating,
                    passwordValue: s.passwordValue,
                    saltValue: s.saltValue,
                    passwordGenerationError: s.passwordGenerationError,
                    outputFormat: s.passwordGeneration.outputOptions,
                    selectedAlgo: s.passwordGeneration.selectedAlgo,
                    userPreferences: s.userPreferences,
                    recalled: s.secretRecalled
                })
            }});
    };

    private static _render(){
        const formOk = stateSelectors.formOk();
        const isTopSecret = state.value.userPreferences.visibility.topSecret;
        const remembered = state.value.secretRemembered;
        IndexElements.passwordLengthIndicator().style.setProperty('--_width', isTopSecret ? '0%' : `${Math.min(100, (state.value.secretValue.length/20) * 100)}%`)
        IndexElements.secretInput().value = remembered ? '' : state.value.secretValue;
        IndexElements.secretInput().setAttribute('placeholder', remembered ? 'Remembered' : 'Make It Unique!');
        setAttrIfTrue(state.value.secretRecalled, IndexElements.mainPage(), 'recalled');
        setAttrIfTrue(isTopSecret, IndexElements.mainPage(), 'topSecret');
        setAttrIfTrue(!state.value.secretShow, IndexElements.secretHideToggle(), 'off');
        setAttrIfTrue(state.value.secretShow && !isTopSecret, IndexElements.secretInput(), 'type', 'text', 'password');
        IndexElements.passReqLengthCount().innerHTML = stateSelectors.secretLengthOk() ? 'ok' : `${stateSelectors.secretLengthCount().toString()}/20`;
        IndexElements.passReqNumberCount().innerHTML = stateSelectors.secretContainsNumber() ? 'ok' :`${stateSelectors.secretNumberCount().toString()}/2`;
        IndexElements.passReqSpecialCount().innerHTML = stateSelectors.secretContainsSpecial() ? 'ok' :`${stateSelectors.secretSpecialCount().toString()}/2`;
        IndexElements.passReqUppercaseCount().innerHTML = stateSelectors.secretContainsUppercase() ? 'ok' :`${stateSelectors.secretUppercaseCount().toString()}/2`;
        setAttrIfTrue(stateSelectors.secretLengthOk(), IndexElements.passReqLength(), 'ok');
        setAttrIfTrue(stateSelectors.secretContainsNumber(), IndexElements.passReqNumber(), 'ok');
        setAttrIfTrue(stateSelectors.secretContainsUppercase(), IndexElements.passReqUppercase(), 'ok');
        setAttrIfTrue(stateSelectors.secretContainsSpecial(), IndexElements.passReqSpecial(), 'ok');
        setClassIfTrue(!stateSelectors.isSecretOk(), IndexElements.arrow1(), 'disabled');

        setAttrIfTrue(!state.value.saltShow, IndexElements.saltHideToggle(), 'off');
        setAttrIfTrue(state.value.saltShow && !isTopSecret, IndexElements.saltInput(), 'type', 'text', 'password');

        setAttrIfTrue(!state.value.passwordShow, IndexElements.passwordHideToggle(), 'off');
        setAttrIfTrue(!formOk, IndexElements.finalPassword(), 'disabled');

        setAttrIfTrue(state.value.passwordShow && !isTopSecret, IndexElements.finalPassword(), 'type', 'text', 'password');
        setAttrIfTrue(!state.value.passwordGenerating, IndexElements.dotLoader(), 'off');
        IndexElements.finalPassword().value = state.value.passwordValue;
        IndexElements.algoTypeNote().innerHTML = state.value.passwordGeneration.selectedAlgo;
        IndexElements.firstCharactersNote().innerHTML = state.value.passwordGeneration.outputOptions.takeFirst.toString();
        IndexElements.securityTextNote().innerHTML = state.value.passwordGeneration.outputOptions.securityText;
        IndexElements.securityTextPositionNote().innerHTML = state.value.passwordGeneration.outputOptions.securityTextPosition;
        document.body.querySelectorAll('[needRecalled][disabling]').forEach(e => toggleDisabledPanel(e, !state.value.secretRecalled));
        document.body.querySelectorAll('[needRecalled][hiding]').forEach(e => toggleHiddenPanel(e, !state.value.secretRecalled));
        document.body.querySelectorAll('[needValidForm]').forEach(e => toggleDisabledPanel(e, !formOk));
        document.body.querySelectorAll('[needValidSecret]').forEach(e => toggleDisabledPanel(e, !stateSelectors.isSecretOk()));
        document.body.querySelectorAll('[needValidPassword]').forEach(e => toggleDisabledPanel(e, !state.value.passwordValue));
        document.body.querySelectorAll('[needRecalledEnabled]').forEach(e => toggleHiddenPanel(e, !state.value.userPreferences.recall.allowRecall));
    }
}