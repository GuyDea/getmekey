import {DiffMatcher, state, StateHolder} from "/src/state/state-holder.js"
import {GmkState, PasswordGenerationOptions} from "/src/state/state-type.js"
import {ByteUtils} from "/src/hash-algos/byte-utils.js"
import {decryptData, encryptData} from "/src/utils/crypto-functions.js"
import {Persistence} from "/src/services/storage/persistence.js"
import {toastService} from "/src/services/toast-service.js"

export class RecallService {
    private _state: StateHolder<GmkState>;

    constructor(state: StateHolder<GmkState>) {
        this._state = state;
    }

    public initialize(){
        const diffMatcher: DiffMatcher<GmkState> = s => JSON.stringify({
            secret: s.secretValue,
            salt: s.saltValue,
            settings: s.userPreferences
        });
        this._state.subscribe(async s => {
            if(!s.userPreferences.recall.allowRecall){
                this._state.update(s1 => s1.secretRecalled = false);
                return;
            }
            const oldData = diffMatcher(s);
            const oldSecret = this._state.value.secretValue;
            const hashedSecret = await this._hashedSecret(oldSecret);
            const fromStorage = Persistence.getFromStorage<string>("RECALLED_SECRET", hashedSecret);
            if(fromStorage){
                const passwordGenerationOptions = await decryptData<PasswordGenerationOptions>(fromStorage, oldSecret);
                if(passwordGenerationOptions && oldData === diffMatcher(this._state.value)) {
                    this._state.update(s1 => {
                        s1.secretRecalled = true;
                        s1.passwordGeneration = passwordGenerationOptions;
                    });
                    return;
                }
            }
            this._state.update(s1 => s1.secretRecalled = false);
        }, {
            diffMatcher
        })
    }

    private async _hashedSecret(secret: string): Promise<string> {
        return ByteUtils.uint8ArrayToHexString(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(secret)))).substring(0, 20);
    }

    public async storeToRecalled(){
        const secret = this._state.value.secretValue;
        const options = this._state.value.passwordGeneration;
        const hashedSecret = await this._hashedSecret(secret);
        const encryptedSettings = await encryptData(options, secret);
        Persistence.addToStorage("RECALLED_SECRET", encryptedSettings, hashedSecret);
        toastService.addToast('Added To Recalled');
        if(this._state.value.secretValue === secret){
            state.update(s => s.secretRecalled = true);
        }
    }

    public async removeRecalled(){
        const secret = this._state.value.secretValue;
        const hashedSecret = await this._hashedSecret(secret);
        Persistence.removeFromStorage("RECALLED_SECRET", hashedSecret);
        toastService.addToast('Recalled Secret Removed');
        if(this._state.value.secretValue === secret){
            state.update(s => s.secretRecalled = false);
        }
    }
}

export const recallService = new RecallService(state);
recallService.initialize();