import {Persistence} from "/src/services/storage/persistence.js";
import {GmkState, UserPreferencesOptions} from "/src/state/state-type.js"

const defaultUserPreferences: UserPreferencesOptions = {
    convenience: {
        copyOnRecall: false
    },
    saving: {
        rememberHash: 'never',
        allowRecall: false
    },
    sensitive: {
        unrestrictedMode: false,
        rememberDurationM: 60,
        remember: false,
        minRememberDurationM: 1,
        maxRememberDurationM: 1440
    },
    visibility: {
        hideInfo: false,
        topSecret: false
    }
}

export const initState: GmkState = {
    secretValue: '',
    secretShow: false,
    saltShow: false,
    saltValue: '',
    passwordShow: false,
    passwordValue: '',
    passwordGenerating: false,
    passwordGenerationError: null,
    generationSpeed: null,
    secretExpiryDate: null,
    passwordGeneration: {
        selectedAlgo: 'SHA',
        outputOptions: {
            format: 'base64',
            takeFirst: 20,
            minTakeFirst: 15,
            maxTakeFirst: 200,
            securityText: '#1A',
            securityTextPosition: 'prefix'
        },
        algoOptions: {
            sha: {
                saltPosition: "prefix",
                version: 'SHA-256'
            },
            pbkdf2: {
                iterations: 1,
                hash: "SHA-256",
                length: 128,
                minIterations: 1,
                maxIterations: 131072
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
                length: 16,
                minCost: 1,
                minBlock: 1,
                minParallel: 1,
                minLength: 16,
                maxCost: 8,
                maxBlock: 128,
                maxParallel: 128,
                maxLength: 1024,
            }
        }
    },
    userPreferences: Persistence.getFromStorage("USER_PREFERENCES") ?? defaultUserPreferences,
    internals: {
        enabledAlgos: ['SHA', 'PBKDF2', 'Scrypt']
    }
}
