import {DiffMatcher, state} from "/src/state/state-holder.js"
import {GmkState, PasswordGenerationOptions} from "/src/state/gmk-state-type.js"
import {ByteUtils} from "/src/hash-algos/byte-utils.js"
import {decryptData, encryptData, generateRandomPassphrase} from "/src/utils/crypto-functions.js"
import {Persistence} from "/src/services/persistence.js"
import {toastService} from "/src/services/toast-service.js"
import {IndexElements} from "/src/index-related/index-elements.js"

export class RecallService {

    public async initialize(){
        const diffMatcher: DiffMatcher<GmkState> = s => JSON.stringify({
            secret: s.secretValue,
            settings: s.userPreferences
        });
        state.subscribe(async s => {
            if(!s.userPreferences.recall.allowRecall){
               this.removeRecalledSecret(false);
                return;
            }
            const oldData = diffMatcher(s);
            const oldSecret = state.value.secretValue;
            const hashedSecret = await this._hashedSecret(oldSecret);
            const fromStorage = Persistence.getFromStorage<string>("RECALLED_SECRET", hashedSecret);
            if(fromStorage){
                const passwordGenerationOptions = await decryptData<PasswordGenerationOptions>(fromStorage, oldSecret);
                if(passwordGenerationOptions && oldData === diffMatcher(state.value)) {
                    this._markSecretRecalled(oldSecret, passwordGenerationOptions);
                }
            } else {
                state.update(s1 => s1.secretRecalled = false);
                this.purge();
            }
        }, {
            diffMatcher
        });
        return this._trySecretRetrieve();
    }

    private _markSecretRecalled(secret: string, passwordGenerationOptions?: PasswordGenerationOptions){
        state.update(s1 => {
            s1.secretRecalled = true;
            if(passwordGenerationOptions){
                s1.passwordGeneration = passwordGenerationOptions;
            }
            if(s1.userPreferences.recall.remember){
                const expiryDate = new Date(new Date().getTime() + state.value.userPreferences.recall.rememberDurationM * 60 * 1000);
                // const expiryDate = new Date(new Date().getTime() + 10 * 1000);
                s1.secretExpiryDate = expiryDate;
                this._storeSecret(secret, expiryDate)
            }
        });

    }

    private async _trySecretRetrieve() {
        const stored = await this.retrieveSecret()
        if (typeof stored === 'string') {
            state.update(s => {
                s.secretRemembered = true
                s.secretValue = stored
                IndexElements.saltInput().focus()
            })
        } else {
            recallService.purge()
        }
    }

    public getRememberTtl(): number | null{
    const canRemember = state.value.userPreferences.recall.allowRecall &&  state.value.userPreferences.recall.remember;
        const expiryDate = state.value.secretExpiryDate;
        if(canRemember && expiryDate){
            const diff = expiryDate.getTime() - new Date().getTime();
            if(diff > 0){
                return diff;
            } else {
                this.removeRecalledSecret(true);
            }
        }
        return null;
    }

    public removeRecalledSecret(removeSecretItself: boolean) {
        if(state.value.secretRecalled) {
            state.update(s => {
                s.secretRemembered = false;
                s.secretExpiryDate = null;
                s.secretRecalled = false;
                if(removeSecretItself){
                    s.secretValue = '';
                }
            })
        }
    }

    private async _hashedSecret(secret: string): Promise<string> {
        return ByteUtils.uint8ArrayToHexString(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(secret)))).substring(0, 20);
    }

    private async _storeSecret(secret: string, expiryDate: Date){
        const passphrase1 = generateRandomPassphrase(256);
        const passphrase2 = generateRandomPassphrase(256);
        const encrypted = await encryptData<string>(secret, passphrase1, passphrase2);
        Persistence.addToCookie("SESSION_KEY", passphrase1);
        Persistence.addToCookie("DURATION_KEY", passphrase2, expiryDate);
        Persistence.addToStorage("ENCRYPTED_SECRET", encrypted);
    }

    public async retrieveSecret(): Promise<string | null> {
        const durationKey = Persistence.getFromCookie<string>("DURATION_KEY");
        const sessionKey = Persistence.getFromCookie<string>("SESSION_KEY");
        const encrypted = Persistence.getFromStorage<string>("ENCRYPTED_SECRET");
        if(encrypted && durationKey && sessionKey) {
            return await decryptData<string>(encrypted, sessionKey, durationKey);
        } else {
            return null;
        }
    }

    public purge() {
        Persistence.removeFromStorage("ENCRYPTED_SECRET");
        Persistence.deleteAllCookies();
    }

    public async storeToRecalled(){
        const secret = state.value.secretValue;
        const options = state.value.passwordGeneration;
        const hashedSecret = await this._hashedSecret(secret);
        const encryptedSettings = await encryptData(options, secret);
        Persistence.addToStorage("RECALLED_SECRET", encryptedSettings, hashedSecret);
        toastService.addToast('Added To Recalled');
        if(state.value.secretValue === secret){
            this._markSecretRecalled(secret)
        }
    }

    public async removeRecalledByUser(){
        const secret = state.value.secretValue;
        const hashedSecret = await this._hashedSecret(secret);
        Persistence.removeFromStorage("RECALLED_SECRET", hashedSecret);
        toastService.addToast('Recalled Secret Removed');
        if(state.value.secretValue === secret){
            this.removeRecalledSecret(true);
        }
    }
}

export const recallService = new RecallService();