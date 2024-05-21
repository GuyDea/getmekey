import {StateHolder} from "/src/state/state-holder.js";
import type {IHashAlgorithm} from "/src/hash-algos/hash-algo-types.js";
import {ByteUtils} from "/src/hash-algos/byte-utils.js";
import {GmkState, HashingOptions} from "/src/state/gmk-state-type.js"
import {stateSelectors} from "/src/state/state-selectors.js"
import {state} from "/src/state/initial-state.js"
import {encodeBase62} from "/src/utils/crypto-functions.js";

type ObservedProps = {
    secret?: string;
    salt?: string;
    passwordOptions?: HashingOptions;
    isUnrestricted?: boolean;
}

export class PasswordGeneratorService {
    lastObservedProps?: string;

    diffMatcher(state: GmkState): string {
        return JSON.stringify({
            secret: state.secretValue,
            salt: state.saltValue,
            passwordOptions: state.hashingOptions,
        } as ObservedProps)
    }

    stateChangedInMeantime = (currentState: StateHolder<GmkState>) => this.lastObservedProps !== this.diffMatcher(currentState.value);

    initialize(){
        state.subscribe(s => this._processSecret(), {
            diffMatcher: this.diffMatcher
        })
    }

    private _processSecret() {
        if (this.stateChangedInMeantime(state) && !state.value.passwordGenerating) {
            this.lastObservedProps = this.diffMatcher(state.value);
            if (stateSelectors.formOk()) {
                state.value.passwordGenerating = true;
                state.value.passwordValue = '';
                state.value.generationSpeed = null;
                state.notifyChange();
                const start = new Date().getTime();
                this.generatePassword(state.value)
                    .then(generatedPassword => {
                        if(state.value.userPreferences.visibility.topSecret) {
                            const now = new Date().getTime();
                            return new Promise(resolve => setTimeout(() => resolve(generatedPassword), 500 - (now - start)))
                        } else {
                            return generatedPassword;
                        }
                    })
                    .then(generatedPassword => {
                        state.value.generationSpeed = new Date().getTime() - start;
                        state.value.passwordGenerating = false;
                        state.value.passwordGenerationError = null;
                        // Make sure state has not been changed in the meantime
                        if (this.stateChangedInMeantime(state)) {
                            // If state changed, restart process - can skip notif here, as we want to keep uncut loading indication
                            this._processSecret();
                        } else {
                            state.value.passwordValue = generatedPassword as string;
                            state.notifyChange();
                        }
                    })
                    .catch(e => {
                        console.error('[Generator] Failed to generate password: ', e);
                        state.value.passwordGenerating = false;
                        if (this.stateChangedInMeantime(state)) {
                            this._processSecret();
                        } else {
                            state.value.passwordValue = '';
                            state.value.passwordGenerationError = typeof e === 'string' ? e : JSON.stringify(e);
                            state.notifyChange();
                        }
                    })
            } else {
                state.value.generationSpeed = null;
                state.value.passwordValue = '';
                state.value.passwordGenerationError = null;
                state.notifyChange();
            }
        }
    }

    public async generatePassword(state: GmkState): Promise<string> {
        let passwordGeneration = state.hashingOptions;
        let outputOptions = passwordGeneration.outputOptions;
        let selectedAlgo: IHashAlgorithm<any> = await import((`/src/hash-algos/${passwordGeneration.selectedAlgo.toLowerCase()}-algo.js`)).then(m => m.default());
        let uint8Array = await selectedAlgo.encode(state.secretValue,state.saltValue, selectedAlgo.getOptions(state));
        let hashed;
        switch (outputOptions.format){
            case "hex": hashed = ByteUtils.uint8ArrayToHexString(uint8Array); break;
            case "base62": hashed = encodeBase62(uint8Array); break;
            case "base64": hashed = ByteUtils.uint8ArrayToBase64String(uint8Array); break;
        }
        const shortened = hashed.substring(0, outputOptions.takeFirst);
        let securityPosition = outputOptions.securityTextPosition;
        return securityPosition === "prefix" ? `${outputOptions.securityText}${shortened}` : `${shortened}${outputOptions.securityText}`;
    }
}

export const passwordGenerator = new PasswordGeneratorService();