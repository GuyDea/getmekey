import {type IHashAlgorithm} from "./hash-algo-types.js";

import {GmkState} from "/src/state/gmk-state-type.js"

export default function create() {
    return new Pbkdf2Algo();
}

class Pbkdf2Algo implements IHashAlgorithm<Pbkdf2Options> {
    async encode(secret: string, salt: string, options: Pbkdf2Options): Promise<Uint8Array> {
        const cryptoKey = await this._deriveKeyFromPassword(secret, salt, options);
        return new Uint8Array(await window.crypto.subtle.exportKey("raw", cryptoKey));
    }

    getOptions(state: GmkState): Pbkdf2Options {
        return state.passwordGeneration.algoOptions.pbkdf2;
    }

    private async _deriveKeyFromPassword(password: string, salt: string, options: Pbkdf2Options) {
        const passwordBuffer = new TextEncoder().encode(password);
        const saltBuffer = new TextEncoder().encode(salt);

        const keyMaterial = await window.crypto.subtle.importKey(
            'raw',
            passwordBuffer,
            {name: 'PBKDF2'},
            false,
            ['deriveBits', 'deriveKey']
        );

        return await window.crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: saltBuffer,
                iterations: options.iterations,
                hash: options.hash,
            },
            keyMaterial,
            {name: 'AES-GCM', length: options.length},
            true,
            ['encrypt', 'decrypt']
        );
    }
}

export type Pbkdf2Options = {
    minIterations: number;
    maxIterations: number;
    iterations: number;
    hash: 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';
    length: 128 | 256;
}