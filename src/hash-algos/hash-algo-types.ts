import {StateDef} from "/src/state";

export interface IHashAlgorithm<T> {
    encode(secret: string, salt: string, options: T): Promise<Uint8Array>;
    getOptions(state: StateDef): T;
}