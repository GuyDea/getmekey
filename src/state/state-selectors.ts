import {state} from "./state-holder.js"
import {GmkState} from "/src/state/gmk-state-type.js"

export class StateSelectors {
    private _getState: () => GmkState;

    constructor(getState: () => GmkState) {
        this._getState = getState;
    }

    private readonly numberRegx = /\d/;
    private readonly specialRegx = /[!@#$%^&*(),.?":{}|<>/\\]/;
    private readonly uppercaseRegx = /[A-Z]/;

    public secretLengthOk = () => this._getState().secretValue.length >= 15;
    public secretContainsNumber = () => this.numberRegx.test(this._getState().secretValue);
    public secretContainsSpecial = () => this.specialRegx.test(this._getState().secretValue);
    public secretContainsUppercase = () => this.uppercaseRegx.test(this._getState().secretValue);
    public isSecretOk = () => {
        if(this._getState().userPreferences.sensitive.unrestrictedMode){
            return this._getState().secretValue.length > 0;
        } else {
            return this.secretLengthOk() && this.secretContainsNumber() && this.secretContainsSpecial() && this.secretContainsUppercase()
        }
    };

    public saltLengthOk = () => this._getState().saltValue.length >= 8;
    public saltContainsNumber = () => this.numberRegx.test(this._getState().saltValue);
    public saltContainsSpecial = () => this.specialRegx.test(this._getState().saltValue);
    public saltContainsUppercase = () => this.uppercaseRegx.test(this._getState().saltValue);
    public isSaltOk = () => {
        if(this._getState().userPreferences.sensitive.unrestrictedMode){
            return this._getState().saltValue.length > 0;
        } else {
            return this.saltContainsNumber() && this.saltContainsSpecial() && this.saltContainsUppercase() && this.saltLengthOk()
        }
    };
    public formOk = () => this.isSecretOk() && this.isSaltOk()
}

export const stateSelectors = new StateSelectors(() => state.value);