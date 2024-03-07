import {Elements} from "./elements.js";
import {StateSelectors} from "./stateSelectors.js";
import {State} from "./state.js";

const setAttr = (el: HTMLElement, name: string, value?: string) => el.setAttribute(name, value ?? '');
const rmAttr = (el: HTMLElement, name: string) => el.removeAttribute(name);
const setAttrIfTrue = (set: boolean, el: HTMLElement, name: string, valueIfTrue?: string, valueIfFalse?: string) => set ? setAttr(el, name, valueIfTrue) : valueIfFalse ? setAttr(el, name, valueIfFalse) : rmAttr(el, name);

/**
 * Only place in the application that is dedicated to updating DOM based on the current state
 */
export class Render {
    static {
        State.subscribe(() => this.run());
    }

    public static async run(){
        setAttrIfTrue(!State.value.secretShow, Elements.secretHideToggle(), 'off');
        setAttrIfTrue(State.value.secretShow, Elements.secretInput(), 'type', 'text', 'password');
        setAttrIfTrue(StateSelectors.secretLengthOk(), Elements.passReqLength(), 'ok');
        setAttrIfTrue(StateSelectors.secretContainsNumber(), Elements.passReqNumber(), 'ok');
        setAttrIfTrue(StateSelectors.secretContainsUppercase(), Elements.passReqUppercase(), 'ok');
        setAttrIfTrue(StateSelectors.secretContainsSpecial(), Elements.passReqSpecial(), 'ok');
        setAttrIfTrue(StateSelectors.isPasswordOk(), Elements.arrow1(), 'on');
        setAttrIfTrue(StateSelectors.isPasswordOk(), Elements.arrow2(), 'on');

        Elements.prefixInput().value = State.value.prefixValue;
        setAttrIfTrue(!State.value.prefixShow, Elements.prefixHideToggle(), 'off');
        setAttrIfTrue(State.value.prefixShow, Elements.prefixInput(), 'type', 'text', 'password');
        setAttrIfTrue(!State.value.prefixPin, Elements.prefixPinToggle(), 'off');
        setAttrIfTrue(StateSelectors.prefixContainsNumber(), Elements.prefixReqNumber(), 'ok');
        setAttrIfTrue(StateSelectors.prefixContainsUppercase(), Elements.prefixReqUppercase(), 'ok');
        setAttrIfTrue(StateSelectors.prefixContainsSpecial(), Elements.prefixReqSpecial(), 'ok');

        setAttrIfTrue(!State.value.passwordShow, Elements.passwordHideToggle(), 'off');
        setAttrIfTrue(StateSelectors.isPasswordOk() && StateSelectors.isPrefixOk(), Elements.arrow3(), 'on');
        setAttrIfTrue(!StateSelectors.isPasswordOk() || !StateSelectors.isPrefixOk(), Elements.finalPassword(), 'disabled');

        setAttrIfTrue(State.value.passwordShow, Elements.finalPassword(), 'type', 'text', 'password');
        if(StateSelectors.isPasswordOk() && StateSelectors.isPrefixOk()){
            Elements.copyButton().removeAttribute('disabled');
            Elements.copySaveButton().removeAttribute('disabled');
            Elements.finalPassword().value = await StateSelectors.passwordString();
            setAttr(Elements.finalPasswordLabel(), 'ok');
        } else {
            Elements.copyButton().setAttribute('disabled', '');
            Elements.copySaveButton().setAttribute('disabled', '');
            Elements.finalPassword().value = '';
            rmAttr(Elements.finalPasswordLabel(), 'ok');
        }
    }
}