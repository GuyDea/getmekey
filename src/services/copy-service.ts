import {toastService} from "/src/services/toast-service.js";

import {state} from "/src/state/initial-state.js"

export class CopyService {
    public initialize(){
        state.subscribe(s => {
            if(s.userPreferences.usability.autoCopy && s.passwordValue){
                this.copy(s.passwordValue, 'Auto Copied');
            }
        }, {
            diffMatcher: s => JSON.stringify({enabled: s.userPreferences.usability.autoCopy, password: s.passwordValue})
        })
    }

    public copy(text: string, message: string){
        navigator.clipboard.writeText(text)
            .then(() => message ? toastService.addToast(message) : null)
            .catch(() => toastService.addToast('Failed To Copy', "ERROR"));
    }
}

export const copyService = new CopyService();