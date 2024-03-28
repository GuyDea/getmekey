import {StateHolder} from "/src/state/state-holder.js";
import {StateSelectors, stateSelectors} from "/src/state/state-selectors.js";
import {PasswordGenerator} from "/src/services/password-generator.js";
import {GetStateFn, SideEffect} from "/src/state/side-effects.js";
import {PasswordGenerationOptions, GmkState} from "/src/state/state-type.js"

type ObservedProps = {
    secret?: string;
    salt?: string;
    passwordOptions?: PasswordGenerationOptions;
    isUnrestricted?: boolean;
}

const getObservedProps = (state: StateHolder<GmkState>): ObservedProps => {
    return {
        secret: state.value.secretValue,
        salt: state.value.saltValue,
        passwordOptions: state.value.passwordGeneration,
        isUnrestricted: state.value.userPreferences.sensitive.unrestrictedMode,
    }
}

export class SecretChangedSideEffect implements SideEffect {
    lastObservedProps?: string;

    stateChangedInMeantime = (currentState: StateHolder<GmkState>) => this.lastObservedProps !== JSON.stringify(getObservedProps(currentState));

    processSecret(stateFn: GetStateFn) {
        let stateSelectors = new StateSelectors(stateFn);
        let currentState = stateFn();
        if (this.stateChangedInMeantime(currentState) && !currentState.value.passwordGenerating) {
            this.lastObservedProps = JSON.stringify(getObservedProps(currentState));
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

    run(stateFn: GetStateFn): void {
        this.processSecret(stateFn);
    }
}
