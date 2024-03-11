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

        Elements.saltInput().value = State.value.saltValue;
        setAttrIfTrue(!State.value.saltShow, Elements.saltHideToggle(), 'off');
        setAttrIfTrue(State.value.saltShow, Elements.saltInput(), 'type', 'text', 'password');
        setAttrIfTrue(StateSelectors.saltContainsNumber(), Elements.saltReqNumber(), 'ok');
        setAttrIfTrue(StateSelectors.saltContainsUppercase(), Elements.saltReqUppercase(), 'ok');
        setAttrIfTrue(StateSelectors.saltContainsSpecial(), Elements.saltReqSpecial(), 'ok');

        setAttrIfTrue(!State.value.passwordShow, Elements.passwordHideToggle(), 'off');
        setAttrIfTrue(StateSelectors.isPasswordOk() && StateSelectors.isSaltOk(), Elements.arrow2(), 'on');
        setAttrIfTrue(StateSelectors.isPasswordOk() && StateSelectors.isSaltOk(), Elements.arrow3(), 'on');
        setAttrIfTrue(!StateSelectors.isPasswordOk() || !StateSelectors.isSaltOk(), Elements.finalPassword(), 'disabled');

        setAttrIfTrue(State.value.passwordShow, Elements.finalPassword(), 'type', 'text', 'password');
        if(StateSelectors.isPasswordOk() && StateSelectors.isSaltOk()){
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