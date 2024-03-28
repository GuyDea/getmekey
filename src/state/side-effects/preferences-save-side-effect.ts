import {GetStateFn, SideEffect} from "/src/state/side-effects.js";
import {Persistence} from "/src/storage/persistence.js";

export class PreferencesSaveSideEffect implements SideEffect {
    run(stateFn: GetStateFn): void {
        let state = stateFn();
        Persistence.addToStorage("USER_PREFERENCES", state.value.userPreferences)
    }
}