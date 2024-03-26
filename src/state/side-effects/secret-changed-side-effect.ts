import {State} from "/src/state/state.js";
import {StateSelectors} from "/src/state/state-selectors.js";
import {PasswordGenerator} from "/src/password-generator.js";
import {GetStateFn, SideEffect} from "/src/state/side-effects.js";

export class SecretChangedSideEffect implements SideEffect {
    lastProcessedSecret?: string;
    lastProcessedSalt?: string;
    lastOptions?: string;

    stateChangedInMeantime = () => this.lastProcessedSecret !== State.value.secretValue ||
        this.lastProcessedSalt !== State.value.saltValue ||
        this.lastOptions !== JSON.stringify(State.value.passwordGeneration);

    secretsAreValid = () => StateSelectors.isPasswordOk() && StateSelectors.isSaltOk();

    async processSecret() {
        if(this.stateChangedInMeantime() && !State.value.passwordGenerating){
            this.lastProcessedSecret = State.value.secretValue;
            this.lastProcessedSalt = State.value.saltValue;
            this.lastOptions = JSON.stringify(State.value.passwordGeneration);
            if (this.secretsAreValid()) {
                State.value.passwordGenerating = true;
                State.value.passwordValue = '';
                State.value.generationSpeed = null;
                State.notifyChange();
                try {
                    const start = new Date();
                    const generatedPassword = await PasswordGenerator.generatePassword(State.value);
                    State.value.generationSpeed = new Date().getTime() - start.getTime();
                    State.value.passwordGenerating = false;
                    State.value.passwordGenerationError = null;
                    // Make sure state has not been changed in the meantime
                    if (this.stateChangedInMeantime()) {
                        // If state changed, restart process - can skip notif here, as we want to keep uncut loading indication
                        this.processSecret().then();
                    } else {
                        State.value.passwordValue = generatedPassword;
                        State.notifyChange();
                    }
                } catch (e) {
                    console.error('[Generator] Failed to generate password: ', e);
                    State.value.passwordGenerating = false;
                    if (this.stateChangedInMeantime()) {
                        this.processSecret().then();
                    } else {
                        State.value.passwordValue = '';
                        State.value.passwordGenerationError = typeof e === 'string' ? e : JSON.stringify(e);
                        State.notifyChange();
                    }
                }
            } else {
                State.value.generationSpeed = null;
                State.value.passwordValue = '';
                State.value.passwordGenerationError = null;
                State.notifyChange();
            }
        }
    }
    run(stateFn: GetStateFn): void {
        this.processSecret().then();
    }
}
