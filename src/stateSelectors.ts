import {PasswordGenerator} from "./passwordGenerator.js";
import {State } from "./state.js";

export class StateSelectors {
    private static numberRegx = /\d/;
    private static specialRegx = /[!@#$%^&*(),.?":{}|<>]/;
    private static uppercaseRegx = /[A-Z]/;

    public static secretLengthOk = () => State.value.secretValue.length >= 15;
    public static secretContainsNumber = () => this.numberRegx.test(State.value.secretValue);
    public static secretContainsSpecial = () => this.specialRegx.test(State.value.secretValue);
    public static secretContainsUppercase = () => this.uppercaseRegx.test(State.value.secretValue);
    public static isPasswordOk = () => StateSelectors.secretLengthOk() && StateSelectors.secretContainsNumber() && StateSelectors.secretContainsSpecial() && StateSelectors.secretContainsUppercase();

    public static prefixContainsNumber = () => this.numberRegx.test(State.value.prefixValue);
    public static prefixContainsSpecial = () => this.specialRegx.test(State.value.prefixValue);
    public static prefixContainsUppercase = () => this.uppercaseRegx.test(State.value.prefixValue);
    public static isPrefixOk = () => StateSelectors.prefixContainsNumber() && StateSelectors.prefixContainsSpecial() && StateSelectors.prefixContainsUppercase();

    public static passwordString = () => this.isPasswordOk() && this.isPrefixOk() ? PasswordGenerator.generatePassword(State.value.secretValue, 20, State.value.prefixValue) : Promise.resolve('');

    public static isSecretVisible = () => State.value.secretShow;
    public static isPrefixVisible = () => State.value.prefixShow;
    public static isPasswordVisible = () => State.value.passwordShow;
}