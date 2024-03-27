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

    processSecret(stateFn: GetStateFn) {
        let currentState = stateFn();
        if (this.stateChangedInMeantime() && !currentState.value.passwordGenerating) {
            this.lastProcessedSecret = currentState.value.secretValue;
            this.lastProcessedSalt = currentState.value.saltValue;
            this.lastOptions = JSON.stringify(currentState.value.passwordGeneration);
            if (this.secretsAreValid()) {
                currentState.value.passwordGenerating = true;
                currentState.value.passwordValue = '';
                currentState.value.generationSpeed = null;
                currentState.notifyChange();
                const start = new Date();
                PasswordGenerator.generatePassword(currentState.value)
                    .then(generatedPassword => {
                        currentState = stateFn();
                        currentState.value.generationSpeed = new Date().getTime() - start.getTime();
                        currentState.value.passwordGenerating = false;
                        currentState.value.passwordGenerationError = null;
                        // Make sure state has not been changed in the meantime
                        if (this.stateChangedInMeantime()) {
                            // If state changed, restart process - can skip notif here, as we want to keep uncut loading indication
                            this.processSecret(stateFn);
                        } else {
                            currentState.value.passwordValue = generatedPassword;
                            currentState.notifyChange();
                        }
                    })
                    .catch(e => {
                        currentState = stateFn();
                        console.error('[Generator] Failed to generate password: ', e);
                        currentState.value.passwordGenerating = false;
                        if (this.stateChangedInMeantime()) {
                            this.processSecret(stateFn);
                        } else {
                            currentState.value.passwordValue = '';
                            currentState.value.passwordGenerationError = typeof e === 'string' ? e : JSON.stringify(e);
                            currentState.notifyChange();
                        }
                    })
            } else {
                currentState.value.generationSpeed = null;
                currentState.value.passwordValue = '';
                currentState.value.passwordGenerationError = null;
                currentState.notifyChange();
            }
        }
    }

    run(stateFn: GetStateFn): void {
        this.processSecret(stateFn);
    }
}
