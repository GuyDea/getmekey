import {StateHolder, state} from "./state-holder.js"
import {SecretChangedSideEffect} from "/src/state/side-effects/secret-changed-side-effect.js";
import {PreferencesSaveSideEffect} from "/src/state/side-effects/preferences-save-side-effect.js";
import {GmkState} from "/src/state/state-type.js"
import {RecalledSideEffect} from "/src/state/side-effects/recalled-side-effect.js";

export type GetStateFn<T> = () => StateHolder<T>;

export interface SideEffect<T> {
    run(currentStateFn: GetStateFn<T>): void;
    diffMatcher(state: T): string;
}

export class SideEffects {

    public static initialize() {
        const effectVsOldValue = new Map<SideEffect<GmkState>, string>();
        ([
            new SecretChangedSideEffect(),
            new PreferencesSaveSideEffect(),
            new RecalledSideEffect()
        ] as SideEffect<GmkState>[])
            .forEach(e => effectVsOldValue.set(e, e.diffMatcher(state.value)))

        state.subscribe(newState => {
            [...effectVsOldValue.entries()].forEach(([effect, oldValue]) => {
                const newDiff = effect.diffMatcher(newState);
                if (oldValue !== newDiff) {
                    effectVsOldValue.set(effect, newDiff);
                    effect.run(() => state);
                }
            })
        });
    }
}

