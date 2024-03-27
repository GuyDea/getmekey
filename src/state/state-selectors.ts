import {State, state, StateDef} from "./state.js";

export class StateSelectors {
    private _getState: () => State<StateDef>;

    constructor(getState: () => State<StateDef>) {
        this._getState = getState;
    }

    private readonly numberRegx = /\d/;
    private readonly specialRegx = /[!@#$%^&*(),.?":{}|<>/\\]/;
    private readonly uppercaseRegx = /[A-Z]/;

    public secretLengthOk = () => this._getState().value.secretValue.length >= 15;
    public secretContainsNumber = () => this.numberRegx.test(this._getState().value.secretValue);
    public secretContainsSpecial = () => this.specialRegx.test(this._getState().value.secretValue);
    public secretContainsUppercase = () => this.uppercaseRegx.test(this._getState().value.secretValue);
    public isPasswordOk = () => {
        if(this._getState().value.userPreferences.sensitive.unrestrictedMode){
            return this._getState().value.secretValue.length > 0;
        } else {
            return this.secretLengthOk() && this.secretContainsNumber() && this.secretContainsSpecial() && this.secretContainsUppercase()
        }
    };

    public saltLengthOk = () => this._getState().value.saltValue.length >= 8;
    public saltContainsNumber = () => this.numberRegx.test(this._getState().value.saltValue);
    public saltContainsSpecial = () => this.specialRegx.test(this._getState().value.saltValue);
    public saltContainsUppercase = () => this.uppercaseRegx.test(this._getState().value.saltValue);
    public isSaltOk = () => {
        if(this._getState().value.userPreferences.sensitive.unrestrictedMode){
            return this._getState().value.saltValue.length > 0;
        } else {
            return this.saltContainsNumber() && this.saltContainsSpecial() && this.saltContainsUppercase() && this.saltLengthOk()
        }
    };
}

export const stateSelectors = new StateSelectors(() => state);