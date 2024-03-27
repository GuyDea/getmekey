import {GetStateFn, SideEffect} from "/src/state/side-effects.js";
import {Persistence} from "/src/persistence.js";

export class PreferencesSaveSideEffect implements SideEffect {
    run(stateFn: GetStateFn): void {
        let state = stateFn();
        Persistence.addToStorage("USER_PREFERENCES", state.value.userPreferences)
    }
}