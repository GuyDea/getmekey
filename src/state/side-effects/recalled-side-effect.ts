import {GetStateFn, SideEffect} from "/src/state/side-effects.js";
import {Persistence} from "/src/services/storage/persistence.js";
import {StateHolder} from "/src/state/state-holder.js"
import {GmkState} from "/src/state/state-type.js"

export class RecalledSideEffect implements SideEffect<GmkState> {
    run(stateFn: GetStateFn<GmkState>): void {
    }

    diffMatcher(state: GmkState): string {
        return state.secretValue;
    }
}