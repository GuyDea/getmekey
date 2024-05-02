import {Persistence} from "/src/services/persistence.js"
import {state} from "/src/state/initial-state.js"

export class PreferencesService {
    public initialize(){
        state.subscribe(s => {
            Persistence.addToStorage("USER_PREFERENCES", s.userPreferences)
        }, {
            diffMatcher: s => JSON.stringify(s.userPreferences)
        })
    }
}

export const preferencesService = new PreferencesService();