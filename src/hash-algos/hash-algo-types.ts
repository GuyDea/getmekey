export interface IHashAlgorithm<T> {
    encode(secret: string, salt: string, options: T): Promise<Uint8Array>;
}