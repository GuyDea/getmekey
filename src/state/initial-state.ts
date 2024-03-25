import type {StateDef} from "/src/state/state.js";

export const state: StateDef = {
    secretValue: '',
    secretShow: false,
    saltShow: false,
    saltValue: '',
    passwordShow: false,
    passwordValue: '',
    passwordGenerating: false,
    passwordGenerationError: null,
    generationSpeed: null,
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
    userPreferences: {
        danger: {
            unrestrictedMode: false
        },
        visibility: {
            hideInfo: false,
            topSecret: false
        }
    },
    internals: {
        enabledAlgos: ['SHA', 'PBKDF2', 'Scrypt']
    }
}
