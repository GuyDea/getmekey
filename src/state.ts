import {Persistence} from "./persistence.js";

export type StateDef = {
    secretValue: string;
    secretShow: boolean;
    prefixValue: string;
    prefixShow: boolean;
    prefixPin: boolean;
    passwordShow: boolean;
}

export type Subscriber = (state: StateDef) => void;

export class State {

    public static value: StateDef = {
        secretValue: '',
        secretShow: false,
        prefixPin: Persistence.getPrefixPin(),
        prefixShow: false,
        prefixValue: Persistence.getPrefix(),
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
        State.subscribe(state => {
            if(state.prefixPin){
                Persistence.setPrefixPin(true);
                Persistence.setPrefixValue(state.prefixValue);
            } else {
                Persistence.setPrefixPin(false);
                Persistence.setPrefixValue('');
            }
        })
    }
}