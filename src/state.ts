import {Persistence} from "./persistence.js";
import {type ShaOptions} from "/src/hash-algos/sha.js";
import {type Pbkdf2Options} from "/src/hash-algos/pbkdf2";

export type StateDef = {
    secretValue: string;
    secretShow: boolean;
    saltValue: string;
    saltShow: boolean;
    passwordShow: boolean;
    passwordValue: string;
    passwordGenerating: boolean;
    userExperience: UserExperienceOptions;
    passwordGeneration: PasswordGenerationOptions;
}

export type UserExperienceOptions = {

}

export type PasswordGenerationOptions = {
    selectedAlgo: 'sha' | 'pbkdf2' | 'argon2' | 'bcrypt',
    algoOptions: {
        pbkdf2Options: Pbkdf2Options,
        shaOptions: ShaOptions,
    }
    outputOptions: PasswordOutputOptions;
}

export type PasswordOutputOptions = {
    format: 'base64' | 'hex',
    takeFirst: number,
    securityText: string,
    securityTextPosition: 'prefix' | 'suffix'
}



export type Subscriber = (state: StateDef) => void;

export class State {
    public static value: StateDef = {
        secretValue: '',
        secretShow: false,
        saltShow: false,
        saltValue: Persistence.getSalt(),
        passwordShow: false,
        passwordValue: '',
        passwordGenerating: false,
        passwordGeneration: {
            selectedAlgo: 'sha',
            outputOptions: {
                format: 'base64',
                takeFirst: 25,
                securityText: '#1A',
                securityTextPosition: 'prefix'
            },
            algoOptions: {
                shaOptions: {
                    saltPosition: "prefix",
                    algo: '256'
                },
                pbkdf2Options: {
                    iterations: 1000,
                    hash: "SHA-256",
                    length: 128
                },
            }
        },
        userExperience: {

        }
    }
    private static subscribers: Set<Subscriber> = new Set();

    public static update(updateFn: ((state: StateDef) => void)){
        updateFn(State.value);
        State.notifyChange();
    }

    public static notifyChange() {
        this.subscribers.forEach(s => s(this.value));
    }

    public static subscribe(subscriber: Subscriber){
        this.subscribers.add(subscriber);
        return subscriber;
    }

    public static unsubscribe(subscriber: Subscriber){
        this.subscribers.delete(subscriber);
    }
}