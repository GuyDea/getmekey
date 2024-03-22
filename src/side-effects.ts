import {State} from "./state.js";
import {StateSelectors} from "./state-selectors.js";
import {PasswordGenerator} from "./password-generator.js";


export class SideEffects {
    public static initialize() {
        let lastProcessedSecret: string, lastProcessedSalt: string, lastOptions: string;

        const stateDidntChangeInMeantime = () => lastProcessedSecret === State.value.secretValue &&
            lastProcessedSalt === State.value.saltValue &&
            lastOptions === JSON.stringify(State.value.passwordGeneration);

        const canStartGenerating = () => StateSelectors.isPasswordOk() && StateSelectors.isSaltOk() && !State.value.passwordGenerating;

        async function processSecret() {
            lastProcessedSecret = State.value.secretValue;
            lastProcessedSalt = State.value.saltValue;
            lastOptions = JSON.stringify(State.value.passwordGeneration);
            if (canStartGenerating()) {
                State.value.passwordGenerating = true;
                State.value.passwordValue = '';
                State.notifyChange();
                try {
                    const generatedPassword = await PasswordGenerator.generatePassword(State.value);
                    State.value.passwordGenerating = false;
                    // Make sure state has not been changed in the meantime
                    if (stateDidntChangeInMeantime()) {
                        State.value.passwordValue = generatedPassword;
                        State.notifyChange();
                    } else {
                        // If state changed, restart process - can skip notif here, as we want to keep uncut loading indication
                        processSecret().then();
                    }
                } catch (e) {
                    State.value.passwordGenerating = false;
                    if (stateDidntChangeInMeantime()) {
                        State.value.passwordValue = '';
                        State.value.passwordGenerationFailed = true;
                        State.notifyChange();
                    } else {
                        processSecret().then();
                    }
                }
            } else {
                State.value.passwordValue = '';
                State.value.passwordGenerating = false;
                State.value.passwordGenerationFailed = false;
                State.notifyChange();
            }
        }

        State.subscribe(state => {
            if (!stateDidntChangeInMeantime()) {
                processSecret().then();
            }
        })
    }
}
