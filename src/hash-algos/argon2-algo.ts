import type {IHashAlgorithm} from "/src/hash-algos/hash-algo-types.js";
// @ts-ignore
import '/lib/argon2/argon2-init.js';

import {GmkState} from "/src/state/gmk-state-type.js"

declare const argon2: any;

export default function create() {
    return new Argon2Algo();
}

class Argon2Algo implements IHashAlgorithm<Argon2Options> {
    async encode(secret: string, salt: string, options: Argon2Options): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
            argon2.hash({
                pass: secret,
                salt: salt,
                time: options.iterations,
                mem: options.cost,
                hashLen: options.length,
                parallelism: options.parallel,
                type: options.version
            })
                .then((h: any) => resolve(h.hash))
                .catch((e: any) => reject(e.code === -14 ? 'Cost is too small' : 'Unknown error'))
        })
    }
    getOptions(state: GmkState): Argon2Options {
        return state.hashingOptions.algoOptions.argon2;
    }
}

export type Argon2Options = {
    iterations: number;
    parallel: number;
    cost: number;
    length: number;
    version: 'Argon2i' | 'Argon2d' | 'Argon2id';
    minIterations: number;
    minParallel: number;
    minCost: number;
    minLength: number;
    maxIterations: number;
    maxParallel: number;
    maxCost: number;
    maxLength: number;

}