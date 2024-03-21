import {Pbkdf2} from "/src/hash-algos/pbkdf2.js";
import {type StateDef} from "/src/state";

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
    public static async generatePassword(state: StateDef): Promise<string> {
        return await new Pbkdf2().encode(state.secretValue, state.saltValue, "base64", state.passwordGeneration.algoOptions.pbkdf2Options)
        // @ts-ignore
        // await import('./../lib/argon2/argon2-init.js');
        // return argon2.hash({ pass: secret, salt: salt })
        //     .then((h: any) => console.log(h.hash, h.hashHex, h.encoded))
        //     .catch((e: any) => console.error(e.message, e.code))
    }
}