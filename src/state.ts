import {Persistence} from "./persistence.js";

export type StateDef = {
    secretValue: string;
    secretShow: boolean;
    saltValue: string;
    saltShow: boolean;
    passwordShow: boolean;
    passwordValue: string;
    passwordGenerating: boolean;
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
        passwordGenerating: false
    }
    private static subscribers: Set<Subscriber> = new Set();

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