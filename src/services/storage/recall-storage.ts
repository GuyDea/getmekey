import {state, StateHolder} from "/src/state/state-holder.js"
import {GmkState} from "/src/state/state-type.js"
import {ByteUtils} from "/src/hash-algos/byte-utils.js"
import {encryptSecret} from "/src/utils/crypto-functions.js"

export type StoredRecall = {
    hashedSecret: string;
    encryptedSettings: string;
}

export class RecallStorage {
    private _state: StateHolder<GmkState>;

    constructor(state: StateHolder<GmkState>) {
        this._state = state;
    }

    private async _hashedSecret(secret: string): Promise<string> {
        return ByteUtils.uint8ArrayToHexString(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(secret)))).substring(0, 30);
    }

    public async storeToRecalled(){
        const secret = this._state.value.secretValue;
        const options = this._state.value.passwordGeneration;
        const hashedSecret = await this._hashedSecret(secret);
        let encryptedSettings = await encryptSecret(JSON.stringify(options), secret);
        const localStorageObject = {hashedSecret, encryptedSettings} as StoredRecall;
    }
}

export const recallStorage = new RecallStorage(state)
