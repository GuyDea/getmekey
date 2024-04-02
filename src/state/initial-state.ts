import {Persistence} from "/src/services/persistence.js";
import {GmkState, UserPreferencesOptions} from "/src/state/gmk-state-type.js"

const defaultUserPreferences: UserPreferencesOptions = {
    visibility: {
        hideInfo: false,
        topSecret: false
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
    secretRemembered: true,
    saltShow: false,
    saltValue: '',
    passwordShow: false,
    passwordValue: '',
    passwordGenerating: false,
    passwordGenerationError: null,
    generationSpeed: null,
    secretExpiryDate: null,
    passwordGeneration: {
        selectedAlgo: 'PBKDF2',
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
                iterations: 1000000,
                hash: "SHA-256",
                length: 256,
                minIterations: 1,
                maxIterations: 1000000
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
                length: 256,
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
