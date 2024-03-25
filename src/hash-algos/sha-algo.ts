import type {IHashAlgorithm} from "/src/hash-algos/hash-algo-types.js";
import {StateDef} from "/src/state/state.js";

export default function create() {
    return new ShaAlgo();
}

class ShaAlgo implements IHashAlgorithm<ShaOptions> {
    async encode(secret: string, salt: string, options: ShaOptions): Promise<Uint8Array> {
        const inputString = options.saltPosition === "prefix" ? `${salt}${secret}` : `${secret}${salt}`;
        return new Uint8Array(await crypto.subtle.digest(options.version, new TextEncoder().encode(inputString)));
    }
    getOptions(state: StateDef): ShaOptions {
        return state.passwordGeneration.algoOptions.sha;
    }

}

export type ShaOptions = {
    version: 'SHA-256' | 'SHA-512';
    saltPosition: 'prefix' | 'suffix';
}