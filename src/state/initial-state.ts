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
        selectedAlgo: 'PBKDF2',
        outputOptions: {
            format: 'base62',
            takeFirst: 20,
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
                cost: 1,
                length: 16,
                parallel: 1,
                version: "Argon2d",
                minIterations: 1,
                minParallel: 1,
                minCost: 1,
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
    userPreferences: Persistence.getFromStorage("USER_PREFERENCES") ?? defaultUserPreferences,
    internals: {
        enabledAlgos: ['PBKDF2', 'SHA', 'Scrypt']
    }
}
export const state = new StateHolder<GmkState>(initState, error => {
    // If there is some error, it's probably caused by outdated format of local storage
    // Makeshift solution for now is to just clear that up completely
    if (Persistence.getFromStorage("USER_PREFERENCES")) {
        Persistence.removeFromStorage("USER_PREFERENCES");
        location.reload();
    }

    throw error
});