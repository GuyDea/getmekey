import {GetStateFn, SideEffect} from "/src/state/side-effects.js";
import {Persistence} from "/src/services/storage/persistence.js";

export class RecalledSideEffect implements SideEffect {
    run(stateFn: GetStateFn): void {
    }
}