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

    public static saltContainsNumber = () => this.numberRegx.test(State.value.saltValue);
    public static saltContainsSpecial = () => this.specialRegx.test(State.value.saltValue);
    public static saltContainsUppercase = () => this.uppercaseRegx.test(State.value.saltValue);
    public static isSaltOk = () => StateSelectors.saltContainsNumber() && StateSelectors.saltContainsSpecial() && StateSelectors.saltContainsUppercase();

    public static passwordString = () => this.isPasswordOk() && this.isSaltOk() ? PasswordGenerator.generatePassword(State.value.secretValue, State.value.saltValue) : Promise.resolve('');

    public static isSecretVisible = () => State.value.secretShow;
    public static isSaltVisible = () => State.value.saltShow;
    public static isPasswordVisible = () => State.value.passwordShow;
}