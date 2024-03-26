import {state} from "/src/state/state.js";
import {StateSelectors} from "/src/state/state-selectors.js";
import {PasswordGenerator} from "/src/password-generator.js";
import {GetStateFn, SideEffect} from "/src/state/side-effects.js";

export class SecretChangedSideEffect implements SideEffect {
    lastProcessedSecret?: string;
    lastProcessedSalt?: string;
    lastOptions?: string;

    stateChangedInMeantime = () => this.lastProcessedSecret !== state.value.secretValue ||
        this.lastProcessedSalt !== state.value.saltValue ||
        this.lastOptions !== JSON.stringify(state.value.passwordGeneration);

    secretsAreValid = () => StateSelectors.isPasswordOk() && StateSelectors.isSaltOk();

    async processSecret() {
        if(this.stateChangedInMeantime() && !state.value.passwordGenerating){
            this.lastProcessedSecret = state.value.secretValue;
            this.lastProcessedSalt = state.value.saltValue;
            this.lastOptions = JSON.stringify(state.value.passwordGeneration);
            if (this.secretsAreValid()) {
                state.value.passwordGenerating = true;
                state.value.passwordValue = '';
                state.value.generationSpeed = null;
                state.notifyChange();
                try {
                    const start = new Date();
                    const generatedPassword = await PasswordGenerator.generatePassword(state.value);
                    state.value.generationSpeed = new Date().getTime() - start.getTime();
                    state.value.passwordGenerating = false;
                    state.value.passwordGenerationError = null;
                    // Make sure state has not been changed in the meantime
                    if (this.stateChangedInMeantime()) {
                        // If state changed, restart process - can skip notif here, as we want to keep uncut loading indication
                        this.processSecret().then();
                    } else {
                        state.value.passwordValue = generatedPassword;
                        state.notifyChange();
                    }
                } catch (e) {
                    console.error('[Generator] Failed to generate password: ', e);
                    state.value.passwordGenerating = false;
                    if (this.stateChangedInMeantime()) {
                        this.processSecret().then();
                    } else {
                        state.value.passwordValue = '';
                        state.value.passwordGenerationError = typeof e === 'string' ? e : JSON.stringify(e);
                        state.notifyChange();
                    }
                }
            } else {
                state.value.generationSpeed = null;
                state.value.passwordValue = '';
                state.value.passwordGenerationError = null;
                state.notifyChange();
            }
        }
    }
    run(stateFn: GetStateFn): void {
        this.processSecret().then();
    }
}
