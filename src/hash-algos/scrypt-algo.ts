import type {IHashAlgorithm} from "/src/hash-algos/hash-algo-types.js";
// @ts-ignore
import {scrypt} from "/lib/scrypt/scrypt-async.js";

import {GmkState} from "/src/state/gmk-state-type.js"

export default function create() {
    return new ScryptAlgo();
}

class ScryptAlgo implements IHashAlgorithm<ScryptOptions> {
    async encode(secret: string, salt: string, options: ScryptOptions): Promise<Uint8Array> {
        // Pre-encode with TextEncoder: the vendored lib's own string encoder mishandles
        // BMP code points >= U+D800 (e.g. U+E000-U+FFFF). Byte arrays pass through the
        // lib unmodified, and TextEncoder matches its encoding for all valid strings.
        const encoder = new TextEncoder();
        const secretBytes = encoder.encode(secret);
        const saltBytes = encoder.encode(salt);
        return new Promise((resolve, reject) => {
            try {
                scrypt(secretBytes, saltBytes, {
                    N: Math.pow(2, options.cost),
                    r: options.block,
                    p: options.parallel,
                    dkLen: options.length,
                    encoding: 'binary',
                    interruptStep: 1024
                }, (h: any) => resolve(h));
            } catch (e){
                if((e as Error).message === 'scrypt: N is not a power of 2'){
                    reject('Cost must be a power of 2');
                } else {
                    reject((e as Error).message ?? 'Unknown error');
                }
            }
        })
    }
    getOptions(state: GmkState): ScryptOptions {
        return state.hashingOptions.algoOptions.scrypt;
    }
}

export type ScryptOptions = {
    cost: number;
    block: number;
    parallel: number;
    length: number;
    minCost: number;
    maxCost: number;
    minBlock: number;
    maxBlock: number;
    minParallel: number;
    maxParallel: number;
    minLength: number;
    maxLength: number;
}