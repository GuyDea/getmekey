import { Elements } from "./elements.js";
import {PasswordGenerator} from "./passwordGenerator.js";

export class StateSelectors {
    private static numberRegx = /\d/;
    private static specialRegx = /[!@#$%^&*(),.?":{}|<>]/;
    private static uppercaseRegx = /[A-Z]/;

    private static passwordValue = () => Elements.passwordInput().value;
    private static prefixValue = () => Elements.prefixInput().value;

    public static passwordLengthOk = () => this.passwordValue().length >= 15;
    public static passwordContainsNumber = () => this.numberRegx.test(this.passwordValue());
    public static passwordContainsSpecial = () => this.specialRegx.test(this.passwordValue());
    public static passwordContainsUppercase = () => this.uppercaseRegx.test(this.passwordValue());
    public static isPasswordOk = () => StateSelectors.passwordLengthOk() && StateSelectors.passwordContainsNumber() && StateSelectors.passwordContainsSpecial() && StateSelectors.passwordContainsUppercase();

    public static prefixContainsNumber = () => this.numberRegx.test(this.prefixValue());
    public static prefixContainsSpecial = () => this.specialRegx.test(this.prefixValue());
    public static prefixContainsUppercase = () => this.uppercaseRegx.test(this.prefixValue());
    public static isPrefixOk = () => StateSelectors.prefixContainsNumber() && StateSelectors.prefixContainsSpecial() && StateSelectors.prefixContainsUppercase();

    public static passwordString = () => this.isPasswordOk() && this.isPrefixOk() ? PasswordGenerator.generatePassword(this.passwordValue(), 20, this.prefixValue()) : Promise.resolve('');
}