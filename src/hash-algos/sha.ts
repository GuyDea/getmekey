import type {IHashAlgorithm} from "/src/hash-algos/hash-algo-types";
import {ByteUtils} from "/src/hash-algos/byte-utils";

export class Sha implements IHashAlgorithm<ShaOptions> {
    async encode(secret: string, salt: string, outputFormat: "hex" | "base64", options: ShaOptions): Promise<string> {
        const inputString = options.saltPosition === "prefix" ? `${salt}${secret}` : `${secret}${salt}`;
        const hashBytes = new Uint8Array(await crypto.subtle.digest(`SHA-${options.algo}`, new TextEncoder().encode(inputString)));
        return await (outputFormat === "hex" ? ByteUtils.uint8ArrayToHexString(hashBytes) : ByteUtils.uint8ArrayToBase64String(hashBytes));
    }

}

export type ShaOptions = {
    algo: '256' | '512';
    saltPosition: 'prefix' | 'suffix';
}