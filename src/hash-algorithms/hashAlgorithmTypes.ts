export interface IHashAlgorithm<T> {
    encode(secret: string, salt: string, outputFormat: 'hex' | 'base64', options: T): Promise<string>;
}