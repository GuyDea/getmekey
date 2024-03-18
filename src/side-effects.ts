import {State} from "./state.js";
import {StateSelectors} from "./state-selectors.js";
import {PasswordGenerator} from "./password-generator.js";


export class SideEffects {
    public static initialize(){
        let oldSecret: string, oldSalt: string;
        State.subscribe(async state => {
            if(state.secretValue !== oldSecret || state.saltValue !== oldSalt){
                oldSalt = state.saltValue;
                oldSecret = state.secretValue;
                if(StateSelectors.isPasswordOk() && StateSelectors.isSaltOk()){
                    state.passwordValue = '';
                    state.passwordGenerating = true;
                    State.notifyChange();
                    try {
                        const generatedPassword = await PasswordGenerator.generatePassword(state.saltValue, state.secretValue);
                        // Make sure state has not been changed in the meantime
                        if(oldSecret === state.secretValue && oldSalt === state.saltValue){
                            state.passwordValue = generatedPassword;
                            state.passwordGenerating = false;
                            State.notifyChange();
                        }
                    } catch (e){
                        console.error('Password generation failed', e);
                    }
                } else {
                    state.passwordValue = '';
                    state.passwordGenerating = false;
                    State.notifyChange();
                }
            }
        })
    }
}
