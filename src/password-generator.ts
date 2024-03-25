import {State, type StateDef} from "/src/state/state.js";
import type {IHashAlgorithm} from "/src/hash-algos/hash-algo-types.js";
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
    static {
        setTimeout(() => {
            console.log('[Password Generator] Started: Lazy loading algos');
            State.value.internals.usedAlgos.forEach(async a => await import((`/src/hash-algos/${a.toLowerCase()}-algo.js`)))
            console.log('[Password Generator] Finished: Lazy loading algos');
        }, 10_000);
    }
    public static async generatePassword(state: StateDef): Promise<string> {
        let passwordGeneration = state.passwordGeneration;
        let outputOptions = passwordGeneration.outputOptions;
        let selectedAlgo: IHashAlgorithm<any> = await import((`/src/hash-algos/${passwordGeneration.selectedAlgo.toLowerCase()}-algo.js`)).then(m => m.default());
        let uint8Array = await selectedAlgo.encode(state.secretValue,state.saltValue, selectedAlgo.getOptions(State.value));
        const hashed = outputOptions.format === "base64" ?
            ByteUtils.uint8ArrayToBase64String(uint8Array) :
            ByteUtils.uint8ArrayToHexString(uint8Array);
        const shortened = hashed.substring(0, outputOptions.takeFirst);
        let securityPosition = outputOptions.securityTextPosition;
        return securityPosition === "prefix" ? `${outputOptions.securityText}${shortened}` : `${shortened}${outputOptions.securityText}`;
    }
}