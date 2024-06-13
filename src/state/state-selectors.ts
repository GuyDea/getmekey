import {GmkState} from "/src/state/gmk-state-type.js"
import {state} from "/src/state/initial-state.js"

export class StateSelectors {
    private _getState: () => GmkState;

    constructor(getState: () => GmkState) {
        this._getState = getState;
    }

    private readonly numberRegx = /\d/g;
    private readonly specialRegx = /[!@#$%^&*(),.?":{}|<>/\\]/g;
    private readonly uppercaseRegx = /[A-Z]/g;

    public secretLengthCount = () => this._getState().secretValue.length;
    public secretNumberCount = () => this._getState().secretValue.match(this.numberRegx)?.length ?? 0;
    public secretSpecialCount = () => this._getState().secretValue.match(this.specialRegx)?.length ?? 0;
    public secretUppercaseCount = () => this._getState().secretValue.match(this.uppercaseRegx)?.length ?? 0;
    public secretLengthOk = () => this.secretLengthCount() >= 15;
    public secretContainsNumber = () => this.secretNumberCount() >= 1;
    public secretContainsSpecial = () => this.secretSpecialCount() >= 1;
    public secretContainsUppercase = () => this.secretUppercaseCount() >= 1;
    public isSecretOk = () => this.secretLengthOk() && this.secretContainsNumber() && this.secretContainsSpecial() && this.secretContainsUppercase();

    public isSaltOk = () => this._getState().saltValue.length > 0;
    public formOk = () => this.isSecretOk() && this.isSaltOk();
}

export const stateSelectors = new StateSelectors(() => state.value);