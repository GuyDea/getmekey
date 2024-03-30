import type {Pbkdf2Options} from "/src/hash-algos/pbkdf2-algo.js"
import type {ShaOptions} from "/src/hash-algos/sha-algo.js"
import type {ScryptOptions} from "/src/hash-algos/scrypt-algo.js"
import type {Argon2Options} from "/src/hash-algos/argon2-algo.js"

export type UserPreferencesOptions = {
    visibility: VisibilityOptions;
    sensitive: SensitiveOptions;
    saving: SavingOptions;
    recall: RecallOptions;
}
export type RecallOptions = {
    allowRecall: boolean;
    rememberDurationM: number;
    minRememberDurationM: number;
    maxRememberDurationM: number;
    remember: boolean;
    copyOnRecall: boolean;
}
export type SavingOptions = {
    rememberHash: 'never' | 'always' | 'onRecall';
}
export type SensitiveOptions = {
    unrestrictedMode: boolean;
}
type VisibilityOptions = {
    topSecret: boolean;
    hideInfo: boolean;
}
export type Algo = 'SHA' | 'PBKDF2' | 'Argon2' | 'Scrypt';
export type PasswordGenerationOptions = {
    selectedAlgo: Algo,
    algoOptions: {
        pbkdf2: Pbkdf2Options,
        sha: ShaOptions,
        scrypt: ScryptOptions,
        argon2: Argon2Options,
    }
    outputOptions: PasswordOutputOptions;
}
export type PasswordOutputOptions = {
    format: 'base64' | 'hex',
    takeFirst: number,
    minTakeFirst: number,
    maxTakeFirst: number,
    securityText: string,
    securityTextPosition: 'prefix' | 'suffix'
}
export type GmkState = {
    secretValue: string;
    secretShow: boolean;
    secretRecalled: boolean;
    saltValue: string;
    saltShow: boolean;
    passwordShow: boolean;
    passwordValue: string;
    passwordGenerating: boolean;
    generationSpeed: number | null;
    passwordGenerationError: string | null;
    secretExpiryDate: Date | null;
    userPreferences: UserPreferencesOptions;
    passwordGeneration: PasswordGenerationOptions;
    internals: InternalOptions;
}

type InternalOptions = {
    enabledAlgos: Algo[];
}