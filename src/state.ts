import { Elements } from "./elements.js";

export class State {
    public static passwordLengthOk = () => Elements.passwordInput().value.length >= 15;
    public static passwordContainsNumber = () => /\d/.test(Elements.passwordInput().value);
    public static passwordContainsSpecial = () => /[!@#$%^&*(),.?":{}|<>]/.test(Elements.passwordInput().value);
    public static passwordContainsUppercase = () => /[A-Z]/.test(Elements.passwordInput().value);
    public static isPasswordOk = () => State.passwordLengthOk() && State.passwordContainsNumber() && State.passwordContainsSpecial() && State.passwordContainsNumber();
}