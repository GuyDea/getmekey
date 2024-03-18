import {type IHashAlgorithm} from "./hash-algo-types.js";
import {type OutputFormat} from "../types.js";
import {ByteUtils} from "./byte-utils.js";

export class Pbkdf2 implements IHashAlgorithm<Pbkdf2Options> {
    async encode(secret: string, salt: string, outputFormat: OutputFormat, options: Pbkdf2Options): Promise<string> {
        const k = await this._deriveKeyFromPassword(secret, salt, options);
        return await (outputFormat === "hex" ? this._keyToHexString(k) : this._keyToBase64String(k));
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

    private async _keyToBase64String(derivedKey: CryptoKey) {
        return ByteUtils.uint8ArrayToBase64String(new Uint8Array(await window.crypto.subtle.exportKey("raw", derivedKey)));
    }

    private async _keyToHexString(derivedKey: CryptoKey) {
        return ByteUtils.uint8ArrayToHexString(new Uint8Array(await window.crypto.subtle.exportKey("raw", derivedKey)));
    }
}

export type Pbkdf2Options = {
    iterations: number;
    hash: 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';
    length: 128 | 192 | 256;
}