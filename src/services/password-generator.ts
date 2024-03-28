import {state} from "/src/state/state-holder.js";
import type {IHashAlgorithm} from "/src/hash-algos/hash-algo-types.js";
import {ByteUtils} from "/src/hash-algos/byte-utils.js";
import {GmkState} from "/src/state/state-type.js"

export class PasswordGenerator {
    static {
        setTimeout(() => {
            console.log('[Password Generator] Started: Lazy loading algos');
            state.value.internals.enabledAlgos.forEach(async a => await import((`/src/hash-algos/${a.toLowerCase()}-algo.js`)))
            console.log('[Password Generator] Finished: Lazy loading algos');
        }, 10_000);
    }
    public static async generatePassword(state: GmkState): Promise<string> {
        let passwordGeneration = state.passwordGeneration;
        let outputOptions = passwordGeneration.outputOptions;
        let selectedAlgo: IHashAlgorithm<any> = await import((`/src/hash-algos/${passwordGeneration.selectedAlgo.toLowerCase()}-algo.js`)).then(m => m.default());
        let uint8Array = await selectedAlgo.encode(state.secretValue,state.saltValue, selectedAlgo.getOptions(state));
        const hashed = outputOptions.format === "base64" ?
            ByteUtils.uint8ArrayToBase64String(uint8Array) :
            ByteUtils.uint8ArrayToHexString(uint8Array);
        const shortened = hashed.substring(0, outputOptions.takeFirst);
        let securityPosition = outputOptions.securityTextPosition;
        return securityPosition === "prefix" ? `${outputOptions.securityText}${shortened}` : `${shortened}${outputOptions.securityText}`;
    }
}