import {type ShaOptions} from "/src/hash-algos/sha-algo.js";
import {type Pbkdf2Options} from "/src/hash-algos/pbkdf2-algo.js";
import {type ScryptOptions} from "/src/hash-algos/scrypt-algo.js";
import {type Argon2Options} from "/src/hash-algos/argon2-algo.js";
import {state} from "/src/state/initial-state.js";

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
    danger: DangerOptions;
}

export type DangerOptions = {
    unrestrictedMode: boolean;
}

export type VisibilityOptions = {
    topSecret: boolean;
    hideInfo: boolean;
}

export type InternalOptions = {
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

export type Subscriber = {
    callback: Callback,
    options?: SubscriberOptions,
    previousDiffValue?: string;
}

export type Callback = (state: StateDef) => void;

export type SubscriberOptions = {
    /**
     * Only listen to changes, if serialized string value differs between emissions
     * @param state
     */
    diffMatcher?: (state: StateDef) => string,
    dispatchImmediately?: boolean,
    consumeAsync?: boolean;
    debugId?: string;
}

export class State {
    public static value = state;
    static {
        (window as any).State = this;
    }
    private static subscribers: Set<Subscriber> = new Set();

    public static notifyChange() {
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

    public static update(action: (state: StateDef) => void){
        action(this.value);
        this.notifyChange();
    }

    public static subscribe(callback: Callback, options?: SubscriberOptions){
        const subscriber: Subscriber = {callback, options};
        this.subscribers.add(subscriber);
        if(options?.dispatchImmediately){
            options.consumeAsync ? setTimeout(() => callback(this.value)) : callback(this.value);
        }
        return subscriber;
    }

    public static unsubscribe(subscriber: Subscriber){
        this.subscribers.delete(subscriber);
    }
}