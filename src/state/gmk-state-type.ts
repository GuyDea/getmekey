import type {Pbkdf2Options} from "/src/hash-algos/pbkdf2-algo.js"
import type {ShaOptions} from "/src/hash-algos/sha-algo.js"
import type {ScryptOptions} from "/src/hash-algos/scrypt-algo.js"
import type {Argon2Options} from "/src/hash-algos/argon2-algo.js"

export type GmkState = {
    secretValue: string;
    secretShow: boolean;
    secretRecalled: boolean;
    secretRemembered: boolean;
    saltValue: string;
    saltShow: boolean;
    passwordShow: boolean;
    passwordValue: string;
    passwordGenerating: boolean;
    generationSpeed: number | null;
    passwordGenerationError: string | null;
    secretExpiryDate: Date | null;
    userPreferences: UserPreferencesOptions;
    hashingOptions: HashingOptions;
    recalledHashingOptions?: HashingOptions;
    internals: InternalOptions;
}

export type UserPreferencesOptions = {
    visibility: VisibilityOptions;
    recall: RecallOptions;
    usability: UsabilityOptions;
}

export type RecallOptions = {
    allowRecall: boolean;
    rememberDurationM: number;
    minRememberDurationM: number;
    maxRememberDurationM: number;
    remember: boolean;
    appPrefill: boolean;
}
type VisibilityOptions = {
    topSecret: boolean;
    hideInfo: boolean;
}

type UsabilityOptions = {
    autoCopy: boolean;
    appPrefill: boolean;
}

export type Algo = 'SHA' | 'PBKDF2' | 'Argon2' | 'Scrypt';

export type HashingOptions = {
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
    format: 'base64' | 'base62' | 'hex',
    takeFirst: number,
    minTakeFirst: number,
    maxTakeFirst: number,
    securityText: string,
    securityTextPosition: 'prefix' | 'suffix'
}
type InternalOptions = {
    enabledAlgos: Algo[];
}