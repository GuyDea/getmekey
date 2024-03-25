import {State} from "./state.js";
import {StateSelectors} from "./state-selectors.js";
import {PasswordGenerator} from "../password-generator.js";


export class SideEffects {
    public static initialize() {
        let lastProcessedSecret: string, lastProcessedSalt: string, lastOptions: string;

        const stateChangedInMeantime = () => lastProcessedSecret !== State.value.secretValue ||
            lastProcessedSalt !== State.value.saltValue ||
            lastOptions !== JSON.stringify(State.value.passwordGeneration);

        const secretsAreValid = () => StateSelectors.isPasswordOk() && StateSelectors.isSaltOk();

        async function processSecret() {
            if(stateChangedInMeantime() && !State.value.passwordGenerating){
                lastProcessedSecret = State.value.secretValue;
                lastProcessedSalt = State.value.saltValue;
                lastOptions = JSON.stringify(State.value.passwordGeneration);
                if (secretsAreValid()) {
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
                        if (stateChangedInMeantime()) {
                            // If state changed, restart process - can skip notif here, as we want to keep uncut loading indication
                            processSecret().then();
                        } else {
                            State.value.passwordValue = generatedPassword;
                            State.notifyChange();
                        }
                    } catch (e) {
                        console.error('[Generator] Failed to generate password: ', e);
                        State.value.passwordGenerating = false;
                        if (stateChangedInMeantime()) {
                            processSecret().then();
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

        State.subscribe(() => {
            processSecret().then();
        })
    }
}
