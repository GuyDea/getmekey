import {IndexElements} from "./index-elements.js";
import {StateSelectors} from "../state/state-selectors.js";
import {State} from "/src/state/state.js";
import {setAttrIfTrue, setClassIfTrue} from "/src/helper-functions.js";




/**
 * Only place in the application that is meant to update DOM based on the current state
 */
export class IndexRenderer {
    public static initialize(){
        State.subscribe(() => this._render(), {dispatchImmediately: true, diffMatcher: s => {
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
                    selectedAlgo: s.passwordGeneration.selectedAlgo
                })
            }});
    };

    private static _render(){
        setAttrIfTrue(!State.value.secretShow, IndexElements.secretHideToggle(), 'off');
        setAttrIfTrue(State.value.secretShow, IndexElements.secretInput(), 'type', 'text', 'password');
        setAttrIfTrue(StateSelectors.secretLengthOk(), IndexElements.passReqLength(), 'ok');
        setAttrIfTrue(StateSelectors.secretContainsNumber(), IndexElements.passReqNumber(), 'ok');
        setAttrIfTrue(StateSelectors.secretContainsUppercase(), IndexElements.passReqUppercase(), 'ok');
        setAttrIfTrue(StateSelectors.secretContainsSpecial(), IndexElements.passReqSpecial(), 'ok');
        setClassIfTrue(!StateSelectors.isPasswordOk(), IndexElements.arrow1(), 'disabled');

        setAttrIfTrue(!State.value.saltShow, IndexElements.saltHideToggle(), 'off');
        setAttrIfTrue(State.value.saltShow, IndexElements.saltInput(), 'type', 'text', 'password');
        setAttrIfTrue(StateSelectors.saltLengthOk(), IndexElements.saltReqLength(), 'ok');
        setAttrIfTrue(StateSelectors.saltContainsNumber(), IndexElements.saltReqNumber(), 'ok');
        setAttrIfTrue(StateSelectors.saltContainsUppercase(), IndexElements.saltReqUppercase(), 'ok');
        setAttrIfTrue(StateSelectors.saltContainsSpecial(), IndexElements.saltReqSpecial(), 'ok');

        setAttrIfTrue(!State.value.passwordShow, IndexElements.passwordHideToggle(), 'off');
        setClassIfTrue(!StateSelectors.isPasswordOk() || !StateSelectors.isSaltOk(), IndexElements.arrow2(), 'disabled');
        setClassIfTrue(!StateSelectors.isPasswordOk() || !StateSelectors.isSaltOk(), IndexElements.arrow3(), 'disabled');
        setAttrIfTrue(!StateSelectors.isPasswordOk() || !StateSelectors.isSaltOk(), IndexElements.finalPassword(), 'disabled');

        setAttrIfTrue(State.value.passwordShow, IndexElements.finalPassword(), 'type', 'text', 'password');
        setAttrIfTrue(!State.value.passwordGenerating, IndexElements.dotLoader(), 'off');
        setAttrIfTrue(!State.value.passwordValue, IndexElements.copyButton(), 'disabled');
        setAttrIfTrue(!State.value.passwordValue, IndexElements.copySaveButton(), 'disabled');
        setAttrIfTrue(!!State.value.passwordValue, IndexElements.finalPasswordLabel(), 'ok');
        IndexElements.finalPassword().value = State.value.passwordValue;
        IndexElements.algoTypeNote().innerHTML = State.value.passwordGeneration.selectedAlgo;
        IndexElements.firstCharactersNote().innerHTML = State.value.passwordGeneration.outputOptions.takeFirst.toString();
        IndexElements.securityTextNote().innerHTML = State.value.passwordGeneration.outputOptions.securityText;
        IndexElements.securityTextPositionNote().innerHTML = State.value.passwordGeneration.outputOptions.securityTextPosition;
    }
}