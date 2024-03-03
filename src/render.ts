import {Elements} from "./elements.js";
import {State} from "./state.js";

const setAttr = (el: HTMLElement, name: string, value?: string) => el.setAttribute(name, value ?? '');
const rmAttr = (el: HTMLElement, name: string) => el.removeAttribute(name);
const setAttrIfTrue = (set: boolean, el: HTMLElement, name: string, value?: string) => set ? setAttr(el, name, value) : rmAttr(el, name);
export class Render {
    public static run(){
        setAttrIfTrue(State.passwordLengthOk(), Elements.passReqLength(), 'ok');
        setAttrIfTrue(State.passwordContainsNumber(), Elements.passReqNumber(), 'ok');
        setAttrIfTrue(State.passwordContainsUppercase(), Elements.passReqUppercase(), 'ok');
        setAttrIfTrue(State.passwordContainsSpecial(), Elements.passReqSpecial(), 'ok');
        setAttrIfTrue(State.isPasswordOk(), Elements.arrow1(), 'on');
        setAttrIfTrue(State.isPasswordOk(), Elements.arrow2(), 'on');
    }
}