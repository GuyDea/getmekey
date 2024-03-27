import {type ShaOptions} from "/src/hash-algos/sha-algo.js";
import {type Pbkdf2Options} from "/src/hash-algos/pbkdf2-algo.js";
import {type ScryptOptions} from "/src/hash-algos/scrypt-algo.js";
import {type Argon2Options} from "/src/hash-algos/argon2-algo.js";
import {initState} from "/src/state/initial-state.js";

export type StateDef = {
    secretValue: string;
    secretShow: boolean;
    saltValue: string;
    saltShow: boolean;
    passwordShow: boolean;
    passwordValue: string;
    passwordGenerating: boolean;
    generationSpeed: number | null;
    passwordGenerationError: string | null;
    userPreferences: UserPreferencesOptions;
    passwordGeneration: PasswordGenerationOptions;
    internals: InternalOptions;
}

export type UserPreferencesOptions = {
    visibility: VisibilityOptions;
    sensitive: SensitiveOptions;
    convenience: ConvenienceOptions;
    saving: SavingOptions;
}

export type SavingOptions = {
    allowRecall: boolean;
    rememberHash: 'never' | 'always' | 'onRecall';
}

export type ConvenienceOptions = {
    copyOnRecall: boolean;
}

export type SensitiveOptions = {
    unrestrictedMode: boolean;
    rememberDurationM: number;
    minRememberDurationM: number;
    maxRememberDurationM: number;
    remember: boolean;
}

type VisibilityOptions = {
    topSecret: boolean;
    hideInfo: boolean;
}

type InternalOptions = {
    enabledAlgos: Algo[];
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

export type Subscriber<T> = {
    callback: Callback<T>,
    options?: SubscriberOptions<T>,
    previousDiffValue?: string;
}

type Callback<T> = (state: T) => void;

type SubscriberOptions<T> = {
    /**
     * Only listen to changes, if serialized string value differs between emissions
     * @param state
     */
    diffMatcher?: (state: T) => string,
    dispatchImmediately?: boolean,
    consumeAsync?: boolean;
    debugId?: string;
}

export class State<T> {
    public value;
    private subscribers: Set<Subscriber<T>> = new Set();

    constructor(value: T) {
        this.value = value;
    }

    public notifyChange() {
        this.subscribers.forEach(s => {
            if(s.options?.diffMatcher){
                let currentMatcherResult = s.options?.diffMatcher(this.value);
                if(currentMatcherResult !== s.previousDiffValue){
                    s.previousDiffValue = currentMatcherResult;
                    s.options.consumeAsync ? setTimeout(() => s.callback(this.value)): s.callback(this.value);
                }
            } else {
                s.options?.consumeAsync ? setTimeout(() => s.callback(this.value)): s.callback(this.value);
            }
        });
    }

    public update(action: (state: T) => void){
        action(this.value);
        this.notifyChange();
    }

    public subscribe(callback: Callback<T>, options?: SubscriberOptions<T>){
        const subscriber: Subscriber<T> = {callback, options};
        this.subscribers.add(subscriber);
        if(options?.dispatchImmediately){
            options.consumeAsync ? setTimeout(() => callback(this.value)) : callback(this.value);
        }
        return subscriber;
    }

    public unsubscribe(subscriber: Subscriber<T>){
        this.subscribers.delete(subscriber);
    }
}

export const state = new State<StateDef>(initState);
(window as any).state = state;