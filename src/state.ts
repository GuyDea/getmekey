import {type ShaOptions} from "/src/hash-algos/sha-algo.js";
import {type Pbkdf2Options} from "/src/hash-algos/pbkdf2-algo.js";
import {type ScryptOptions} from "/src/hash-algos/scrypt-algo.js";
import {type Argon2Options} from "/src/hash-algos/argon2-algo.js";

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
    userExperience: UserExperienceOptions;
    passwordGeneration: PasswordGenerationOptions;
    internals: InternalOptions;
}

export type UserExperienceOptions = {

}

export type InternalOptions = {
    usedAlgos: Algo[];
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
    public static value: StateDef = {
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
            selectedAlgo: 'Scrypt',
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
        userExperience: {

        },
        internals: {
            usedAlgos: ['SHA', 'PBKDF2', 'Scrypt']
        }
    }
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