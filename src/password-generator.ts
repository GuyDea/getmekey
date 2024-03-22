import {Pbkdf2} from "/src/hash-algos/pbkdf2.js";
import {type StateDef} from "/src/state";
// @ts-ignore
import {scrypt} from "/lib/scrypt/scrypt-async.js";

declare const argon2: any;


export class PasswordGenerator {
    // TODO: remove once all algos are tested
    static {
        // let htmlButtonElement = document.createElement('button');
        // htmlButtonElement.innerHTML='tests';
        // htmlButtonElement.addEventListener('click', async () => {
        //     // @ts-ignore
        //     this.generatePassword({secretValue: 'test', saltValue: 'somesaltvalue'}!);
        // })
        // document.body.append(htmlButtonElement)
    }
    public static async generatePassword(state: StateDef): Promise<string> {
        // return await new Pbkdf2().encode(state.secretValue, state.saltValue, "base64", state.passwordGeneration.algoOptions.pbkdf2Options)
        // @ts-ignore
        // await import('/lib/argon2/argon2-init.js');
        // return argon2.hash({ pass: state.secretValue, salt: state.saltValue })
        //     .then((h: any) => console.log(h))
        //     .catch((e: any) => console.error(e.message, e.code))
        // console.log('xxx2', scrypt)
        // await Promise.all([loadScript('/lib/scrypt/scrypt2.js'),
        // loadScript('/lib/scrypt/buffer.js'),
        //     loadScript('/lib/scrypt/setImmediate.js'),
        // ]) ;
        await scrypt('mypassword', 'salt', 2, 8,10,16, (h: any) => {
            console.log('xxx h1', h);
        }, 'binary');

        return "result";
    }
}