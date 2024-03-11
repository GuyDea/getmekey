import {Pbkdf2} from "./hash-algorithms/pbkdf2.js";

export class PasswordGenerator {
    // TODO: remove once all algos are tested
    // static {
    //     let htmlButtonElement = document.createElement('button');
    //     htmlButtonElement.innerHTML='tests';
    //     htmlButtonElement.addEventListener('click', async () => {
    //         let s = await new Pbkdf2().encode('a', 'a', "base64", {length: 128, hash: "SHA-256", iterations: 1000000});
    //         console.log('xxx', s)
    //     })
    //     document.body.append(htmlButtonElement)
    // }
    public static async generatePassword(secret: string, salt: string): Promise<string> {
        return await new Pbkdf2().encode(secret, salt, "base64", {length: 128, hash: "SHA-256", iterations: 1000000})
    }
}