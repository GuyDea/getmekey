import {StateHolder} from "/src/state/state-holder.js";
import {StateSelectors} from "/src/state/state-selectors.js";
import {PasswordGenerator} from "/src/services/password-generator.js";
import {GetStateFn, SideEffect} from "/src/state/side-effects.js";
import {GmkState, PasswordGenerationOptions} from "/src/state/state-type.js"

type ObservedProps = {
    secret?: string;
    salt?: string;
    passwordOptions?: PasswordGenerationOptions;
    isUnrestricted?: boolean;
}

export class SecretChangedSideEffect implements SideEffect<GmkState> {
    diffMatcher(state: GmkState): string {
        return JSON.stringify({
            secret: state.secretValue,
            salt: state.saltValue,
            passwordOptions: state.passwordGeneration,
            isUnrestricted: state.userPreferences.sensitive.unrestrictedMode,
        } as ObservedProps)
    }
    lastObservedProps?: string;

    stateChangedInMeantime = (currentState: StateHolder<GmkState>) => this.lastObservedProps !== this.diffMatcher(currentState.value);

    processSecret(stateFn: GetStateFn<GmkState>) {
        let stateSelectors = new StateSelectors(() => stateFn().value);
        let currentState = stateFn();
        if (this.stateChangedInMeantime(currentState) && !currentState.value.passwordGenerating) {
            this.lastObservedProps = this.diffMatcher(currentState.value);
            if (stateSelectors.formOk()) {
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
                        if (this.stateChangedInMeantime(currentState)) {
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
                        if (this.stateChangedInMeantime(currentState)) {
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

    run(stateFn: GetStateFn<GmkState>): void {
        this.processSecret(stateFn);
    }
}
