// import {Pbkdf2} from "./hash-algorithms/pbkdf2.js";
import  './../lib/argon2/argon2-init.js';
declare const argon2: any;

export class PasswordGenerator {
    // TODO: remove once all algos are tested
    // static {
    //     let htmlButtonElement = document.createElement('button');
    //     htmlButtonElement.innerHTML='tests';
    //     htmlButtonElement.addEventListener('click', async () => {
    //         this.generatePassword('a', 'adsad321');
    //     })
    //     document.body.append(htmlButtonElement)
    // }
    public static async generatePassword(secret: string, salt: string): Promise<string> {
        // return await new Pbkdf2().encode(secret, salt, "base64", {length: 128, hash: "SHA-256", iterations: 1000000})
        return argon2.hash({ pass: secret, salt: salt })
            .then((h: any) => console.log(h.hash, h.hashHex, h.encoded))
            .catch((e: any) => console.error(e.message, e.code))
    }
}