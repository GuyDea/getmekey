import {Persistence} from "./persistence.js";

export type StateDef = {
    secretValue: string;
    secretShow: boolean;
    saltValue: string;
    saltShow: boolean;
    passwordShow: boolean;
}

export type Subscriber = (state: StateDef) => void;

export class State {

    public static value: StateDef = {
        secretValue: '',
        secretShow: false,
        saltShow: false,
        saltValue: Persistence.getSalt(),
        passwordShow: false
    }
    private static subscribers: Subscriber[] = [];

    public static notify() {
        this.subscribers.forEach(s => s(this.value));
    }

    public static subscribe(subscriber: Subscriber){
        this.subscribers.push(subscriber);
    }

    static {
    }
}