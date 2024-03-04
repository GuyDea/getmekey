import {Elements} from "./elements.js";
import {StateSelectors} from "./stateSelectors.js";

const setAttr = (el: HTMLElement, name: string, value?: string) => el.setAttribute(name, value ?? '');
const rmAttr = (el: HTMLElement, name: string) => el.removeAttribute(name);
const setAttrIfTrue = (set: boolean, el: HTMLElement, name: string, value?: string) => set ? setAttr(el, name, value) : rmAttr(el, name);
export class Render {
    public static async run(){
        setAttrIfTrue(StateSelectors.passwordLengthOk(), Elements.passReqLength(), 'ok');
        setAttrIfTrue(StateSelectors.passwordContainsNumber(), Elements.passReqNumber(), 'ok');
        setAttrIfTrue(StateSelectors.passwordContainsUppercase(), Elements.passReqUppercase(), 'ok');
        setAttrIfTrue(StateSelectors.passwordContainsSpecial(), Elements.passReqSpecial(), 'ok');
        setAttrIfTrue(StateSelectors.isPasswordOk(), Elements.arrow1(), 'on');
        setAttrIfTrue(StateSelectors.isPasswordOk(), Elements.arrow2(), 'on');
        setAttrIfTrue(StateSelectors.prefixContainsNumber(), Elements.prefixReqNumber(), 'ok');
        setAttrIfTrue(StateSelectors.prefixContainsUppercase(), Elements.prefixReqUppercase(), 'ok');
        setAttrIfTrue(StateSelectors.prefixContainsSpecial(), Elements.prefixReqSpecial(), 'ok');
        setAttrIfTrue(StateSelectors.isPasswordOk() && StateSelectors.isPrefixOk(), Elements.arrow3(), 'on');
    }
}