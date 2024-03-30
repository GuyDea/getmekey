import {state, StateHolder} from "/src/state/state-holder.js"
import {GmkState} from "/src/state/state-type.js"
import {ByteUtils} from "/src/hash-algos/byte-utils.js"
import {encryptData} from "/src/utils/crypto-functions.js"
import {Persistence} from "/src/services/storage/persistence.js"
import {toastService} from "/src/services/toast-service.js"

export class RecallService {
    private _state: StateHolder<GmkState>;

    constructor(state: StateHolder<GmkState>) {
        this._state = state;
    }

    private async _hashedSecret(secret: string): Promise<string> {
        return ByteUtils.uint8ArrayToHexString(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(secret)))).substring(0, 20);
    }

    public async storeToRecalled(){
        const secret = this._state.value.secretValue;
        const options = this._state.value.passwordGeneration;
        const hashedSecret = await this._hashedSecret(secret);
        const encryptedSettings = await encryptData(JSON.stringify(options), secret);
        Persistence.addToStorage("RECALLED_SECRET", encryptedSettings, hashedSecret);
        toastService.addToast('Added To Recalled');
        if(this._state.value.secretValue === secret){
            state.update(s => s.secretRecalled = true);
        }
    }
}

export const recallService = new RecallService(state);
