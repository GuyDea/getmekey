import {GetStateFn, SideEffect} from "/src/state/side-effects.js";
import {Persistence} from "/src/services/storage/persistence.js";
import {GmkState} from "/src/state/state-type.js";

export class PreferencesSaveSideEffect implements SideEffect<GmkState> {
    run(stateFn: GetStateFn<GmkState>): void {
        let state = stateFn();
        Persistence.addToStorage("USER_PREFERENCES", state.value.userPreferences)
    }

    diffMatcher(state: GmkState): string {
        return JSON.stringify(state.userPreferences);
    }
}