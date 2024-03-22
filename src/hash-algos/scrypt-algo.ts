import type {IHashAlgorithm} from "/src/hash-algos/hash-algo-types.js";
// @ts-ignore
import {scrypt} from "/lib/scrypt/scrypt-async.js";
import {StateDef} from "/src/state.js";

export class ScryptAlgo implements IHashAlgorithm<ScryptOptions> {
    async encode(secret: string, salt: string, options: ScryptOptions): Promise<Uint8Array> {
        return new Promise(resolve => {
            scrypt(secret, salt, {
                N: options.cost,
                r: options.block,
                p: options.parallel,
                dkLen: options.length,
                encoding: 'binary',
                interruptStep: 100
            }, (h: any) => resolve(h));
        })
    }
    getOptions(state: StateDef): ScryptOptions {
        return state.passwordGeneration.algoOptions.scrypt;
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