import type {IHashAlgorithm} from "/src/hash-algos/hash-algo-types";

export class Sha implements IHashAlgorithm<ShaOptions> {
    async encode(secret: string, salt: string, options: ShaOptions): Promise<Uint8Array> {
        const inputString = options.saltPosition === "prefix" ? `${salt}${secret}` : `${secret}${salt}`;
        return new Uint8Array(await crypto.subtle.digest(`SHA-${options.algo}`, new TextEncoder().encode(inputString)));
    }

}

export type ShaOptions = {
    algo: '256' | '512';
    saltPosition: 'prefix' | 'suffix';
}