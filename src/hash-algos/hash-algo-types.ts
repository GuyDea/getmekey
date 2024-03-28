import {GmkState} from "/src/state/state-type.js"

export interface IHashAlgorithm<T> {
    encode(secret: string, salt: string, options: T): Promise<Uint8Array>;
    getOptions(state: GmkState): T;
}