import {DiffMatcher} from "/src/state/state-holder.js"
import {GmkState, HashingOptions} from "/src/state/gmk-state-type.js"
import {ByteUtils} from "/src/hash-algos/byte-utils.js"
import {decryptData, encryptData, generateRandomPassphrase} from "/src/utils/crypto-functions.js"
import {Persistence} from "/src/services/persistence.js"
import {toastService} from "/src/services/toast-service.js"
import {deepCopy} from "/src/utils/helper-functions.js";
import {state} from "/src/state/initial-state.js"

export type RememberedSecret = {
    secret: string;
    storedAt: Date;
    expiry: Date;
}

export class RecallService {

    public async initialize(){
        const secretAndSettingsDiffer: DiffMatcher<GmkState> = s => JSON.stringify({
            secret: s.secretValue,
            settings: s.userPreferences
        });
        state.subscribe(async s => {
            if(!s.userPreferences.recall.allowRecall || !s.userPreferences.recall.remember){
                this.purgeRemembered();
                this.unmarkSecretAsRecalled(true);
            }
            if(!s.userPreferences.recall.allowRecall) {
                this.unmarkSecretAsRecalled(s.secretRemembered);
                return;
            }
            const oldData = secretAndSettingsDiffer(s);
            const currentSecret = state.value.secretValue;
            const hashedSecret = await this._hashedSecret(currentSecret);
            const encryptedSettingsFromStorage = Persistence.getFromStorage<string>("ENCRYPTED_SETTINGS_FOR_SECRET", hashedSecret);
            if(encryptedSettingsFromStorage){
                const hashingOptions = await decryptData<HashingOptions>(encryptedSettingsFromStorage, currentSecret);
                const stateDidntChangeInMeantime = oldData === secretAndSettingsDiffer(state.value);
                if(hashingOptions && stateDidntChangeInMeantime) {
                    s.hashingOptions = hashingOptions;
                    this._markSecretRecalled(currentSecret);
                }
            } else {
                state.update(s1 => s1.secretRecalled = false);
                this.purgeRemembered();
            }
        }, {
            diffMatcher: secretAndSettingsDiffer
        });
        this._tryInitialSecretRetrieve().then();
    }

    private _markSecretRecalled(secret: string){
        state.update(s => {
            const newExpiryDate = new Date(new Date().getTime() + state.value.userPreferences.recall.rememberDurationM * 60 * 1000);
            s.secretRecalled = true;
            s.recalledHashingOptions = deepCopy(s.hashingOptions);
            s.secretExpiryDate = s.secretExpiryDate ?? newExpiryDate;
            if(s.userPreferences.recall.remember){
                this._storeSecret(secret, s.secretExpiryDate)
            }
        });
    }

    private async _tryInitialSecretRetrieve() {
        const stored = await this.retrieveSecret();
        if (stored) {
            state.update(s => {
                s.secretRemembered = true;
                s.secretValue = stored.secret;
                s.secretExpiryDate = stored.expiry;
            })
        } else {
            recallService.purgeRemembered()
        }
    }

    public getRememberTtl(): number | null {
        const canRemember = state.value.userPreferences.recall.allowRecall && state.value.userPreferences.recall.remember && state.value.secretRecalled;
        const expiryDate = state.value.secretExpiryDate;
        if (canRemember && expiryDate) {
            const diff = expiryDate.getTime() - new Date().getTime();
            if (diff > 0) {
                return diff;
            } else {
                this.unmarkSecretAsRecalled(true);
            }
        }
        return null;
    }

    public unmarkSecretAsRecalled(removeSecretItself: boolean) {
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
        const encrypted = await encryptData<RememberedSecret>({secret, expiry: expiryDate, storedAt: new Date()}, passphrase1, passphrase2);
        Persistence.addToCookie("SESSION_KEY", passphrase1);
        Persistence.addToCookie("DURATION_KEY", passphrase2, expiryDate);
        Persistence.addToStorage("ENCRYPTED_SECRET", encrypted);
    }

    public async retrieveSecret(): Promise<RememberedSecret | null> {
        const durationKey = Persistence.getFromCookie<string>("DURATION_KEY");
        const sessionKey = Persistence.getFromCookie<string>("SESSION_KEY");
        const encrypted = Persistence.getFromStorage<string>("ENCRYPTED_SECRET");
        if(encrypted && durationKey && sessionKey) {
            const rememberedSecret = await decryptData<RememberedSecret>(encrypted, sessionKey, durationKey);
            rememberedSecret.storedAt = new Date(rememberedSecret.storedAt);
            rememberedSecret.expiry = new Date(rememberedSecret.expiry);
            return rememberedSecret;
        } else {
            return null;
        }
    }

    public purgeRemembered() {
        Persistence.removeFromStorage("ENCRYPTED_SECRET");
        Persistence.deleteAllCookies();
        state.update(s => {
            s.secretRemembered = false;
            if(state.value.secretRemembered){
                s.secretValue = '';
            }
        })
    }

    public async storeToRecalled(){
        const secret = state.value.secretValue;
        const options = state.value.hashingOptions;
        const hashedSecret = await this._hashedSecret(secret);
        const encryptedSettings = await encryptData(options, secret);
        Persistence.addToStorage("ENCRYPTED_SETTINGS_FOR_SECRET", encryptedSettings, hashedSecret);
        toastService.addToast('Added To Recalled');
        if(state.value.secretValue === secret){
            this._markSecretRecalled(secret);
        }
    }

    public async removeRecalledByUser(){
        const secret = state.value.secretValue;
        const hashedSecret = await this._hashedSecret(secret);
        Persistence.removeFromStorage("ENCRYPTED_SETTINGS_FOR_SECRET", hashedSecret);
        toastService.addToast('Recalled Secret Removed');
        if(state.value.secretValue === secret){
            this.unmarkSecretAsRecalled(true);
        }
    }
}

export const recallService = new RecallService();