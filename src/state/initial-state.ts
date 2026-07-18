import {Persistence} from "/src/services/persistence.js";
import {GmkState, UserPreferencesOptions} from "/src/state/gmk-state-type.js"
import {StateHolder} from "/src/state/state-holder.js"

const defaultUserPreferences: UserPreferencesOptions = {
    visibility: {
        hideInfo: false,
        topSecret: false
    },
    usability: {
        autoCopy: false,
        appPrefill: false
    },
    recall: {
        rememberDurationM: 60,
        remember: false,
        minRememberDurationM: 1,
        maxRememberDurationM: 1440,
        appPrefill: false,
        allowRecall: false
    }
}

// Preferences stored by older app versions may miss newer fields - merge them over the defaults
// so any missing field falls back to its default value
const storedUserPreferences = Persistence.getFromStorage<Partial<UserPreferencesOptions>>("USER_PREFERENCES");
const userPreferences: UserPreferencesOptions = {
    visibility: {...defaultUserPreferences.visibility, ...storedUserPreferences?.visibility},
    usability: {...defaultUserPreferences.usability, ...storedUserPreferences?.usability},
    recall: {...defaultUserPreferences.recall, ...storedUserPreferences?.recall}
}

export const initState: GmkState = {
    secretValue: '',
    secretShow: false,
    secretRecalled: false,
    secretRemembered: false,
    saltShow: false,
    saltValue: '',
    passwordShow: false,
    passwordValue: '',
    passwordGenerating: false,
    passwordGenerationError: null,
    generationSpeed: null,
    secretExpiryDate: null,
    hashingOptions: {
        selectedAlgo: 'SHA',
        outputOptions: {
            format: 'base62',
            takeFirst: 15,
            minTakeFirst: 10,
            maxTakeFirst: 200,
            securityText: 'Ab1!',
            securityTextPosition: 'prefix'
        },
        algoOptions: {
            sha: {
                saltPosition: "prefix",
                version: 'SHA-256'
            },
            pbkdf2: {
                iterations: 1000000,
                hash: "SHA-256",
                length: 128,
                minIterations: 1,
                maxIterations: 1000000,
            },
            argon2: {
                iterations: 1,
                cost: 16384,
                length: 16,
                parallel: 1,
                version: "Argon2d",
                minIterations: 1,
                minParallel: 1,
                minCost: 8,
                minLength: 16,
                maxIterations: 16,
                maxParallel: 1024,
                maxCost: 16384,
                maxLength: 1024,
            },
            scrypt: {
                cost: 1,
                block: 1,
                parallel: 1,
                length: 128,
                minCost: 1,
                minBlock: 1,
                minParallel: 1,
                minLength: 128,
                maxCost: 8,
                maxBlock: 128,
                maxParallel: 128,
                maxLength: 1024,
            }
        }
    },
    userPreferences: userPreferences,
    internals: {
        enabledAlgos: ['SHA', 'PBKDF2', 'Scrypt']
    }
}
export const state = new StateHolder<GmkState>(initState, error => {
    console.error('[State] Subscriber error', error);
});