import {Pbkdf2Algo} from "/src/hash-algos/pbkdf2-algo.js";
import {State, type StateDef} from "/src/state.js";
import {ScryptAlgo} from "/src/hash-algos/scrypt-algo.js";
import {Argon2Algo} from "/src/hash-algos/argon2-algo.js";
import type {IHashAlgorithm} from "/src/hash-algos/hash-algo-types.js";
import {ShaAlgo} from "/src/hash-algos/sha-algo.js";
import {ByteUtils} from "/src/hash-algos/byte-utils.js";

export class PasswordGenerator {
    // TODO: remove once all algos are tested
    // static {
    //     let htmlButtonElement = document.createElement('button');
    //     htmlButtonElement.innerHTML='tests';
    //     htmlButtonElement.addEventListener('click', async () => {
    //         // @ts-ignore
    //         this.generatePassword({secretValue: 'test', saltValue: 'somesaltvalue'}!);
    //     })
    //     document.body.append(htmlButtonElement)
    // }
    public static async generatePassword(state: StateDef): Promise<string> {
        let passwordGeneration = state.passwordGeneration;
        let outputOptions = passwordGeneration.outputOptions;
        let selectedAlgo: IHashAlgorithm<any>;
        switch (passwordGeneration.selectedAlgo){
            case "SHA": selectedAlgo = new ShaAlgo(); break;
            case "PBKDF2": selectedAlgo = new Pbkdf2Algo(); break;
            case "Argon2": selectedAlgo = new Argon2Algo(); break;
            case "Scrypt": selectedAlgo = new ScryptAlgo(); break;
        }
        let uint8Array = await selectedAlgo.encode(state.secretValue,state.saltValue, selectedAlgo.getOptions(State.value));
        const hashed = outputOptions.format === "base64" ?
            ByteUtils.uint8ArrayToBase64String(uint8Array) :
            ByteUtils.uint8ArrayToHexString(uint8Array);
        const shortened = hashed.substring(0, outputOptions.takeFirst);
        let securityPosition = outputOptions.securityTextPosition;
        return securityPosition === "prefix" ? `${outputOptions.securityText}${shortened}` : `${shortened}${outputOptions.securityText}`;
    }
}