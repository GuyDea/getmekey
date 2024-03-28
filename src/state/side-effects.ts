import {StateHolder, state} from "./state-holder.js"
import {SecretChangedSideEffect} from "/src/state/side-effects/secret-changed-side-effect.js";
import {PreferencesSaveSideEffect} from "/src/state/side-effects/preferences-save-side-effect.js";
import {GmkState} from "/src/state/state-type.js"

export type GetStateFn = () => StateHolder<GmkState>;

export interface SideEffect {
    run(currentStateFn: GetStateFn): void;
}

export class SideEffects {
    public static initialize() {
        const effects: SideEffect[] = [
            new SecretChangedSideEffect(),
            new PreferencesSaveSideEffect()
        ]

        state.subscribe(() => effects.forEach(e => e.run(() => state)))
    }
}

