import {DiffMatcher, state} from "/src/state/state-holder.js"
import {GmkState, PasswordGenerationOptions} from "/src/state/gmk-state-type.js"
import {ByteUtils} from "/src/hash-algos/byte-utils.js"
import {decryptData, encryptData} from "/src/utils/crypto-functions.js"
import {Persistence} from "/src/services/persistence.js"
import {toastService} from "/src/services/toast-service.js"

export class RecallService {
    constructor() {
        this.initialize();
    }

    public initialize(){
        const diffMatcher: DiffMatcher<GmkState> = s => JSON.stringify({
            secret: s.secretValue,
            salt: s.saltValue,
            settings: s.userPreferences
        });
        state.subscribe(async s => {
            if(!s.userPreferences.recall.allowRecall){
                state.update(s1 => s1.secretRecalled = false);
                return;
            }
            const oldData = diffMatcher(s);
            const oldSecret = state.value.secretValue;
            const hashedSecret = await this._hashedSecret(oldSecret);
            const fromStorage = Persistence.getFromStorage<string>("RECALLED_SECRET", hashedSecret);
            if(fromStorage){
                const passwordGenerationOptions = await decryptData<PasswordGenerationOptions>(fromStorage, oldSecret);
                if(passwordGenerationOptions && oldData === diffMatcher(state.value)) {
                    state.update(s1 => {
                        s1.secretRecalled = true;
                        s1.passwordGeneration = passwordGenerationOptions;
                    });
                    return;
                }
            }
            state.update(s1 => s1.secretRecalled = false);
        }, {
            diffMatcher
        })
    }

    private async _hashedSecret(secret: string): Promise<string> {
        return ByteUtils.uint8ArrayToHexString(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(secret)))).substring(0, 20);
    }

    public async storeToRecalled(){
        const secret = state.value.secretValue;
        const options = state.value.passwordGeneration;
        const hashedSecret = await this._hashedSecret(secret);
        const encryptedSettings = await encryptData(options, secret);
        Persistence.addToStorage("RECALLED_SECRET", encryptedSettings, hashedSecret);
        toastService.addToast('Added To Recalled');
        if(state.value.secretValue === secret){
            state.update(s => s.secretRecalled = true);
        }
    }

    public async removeRecalled(){
        const secret = state.value.secretValue;
        const hashedSecret = await this._hashedSecret(secret);
        Persistence.removeFromStorage("RECALLED_SECRET", hashedSecret);
        toastService.addToast('Recalled Secret Removed');
        if(state.value.secretValue === secret){
            state.update(s => s.secretRecalled = false);
        }
    }
}

export const recallService = new RecallService();