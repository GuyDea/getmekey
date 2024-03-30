import {initState} from "/src/state/initial-state.js";
import {GmkState} from "/src/state/state-type.js"


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
    debugId?: string;
}

export class StateHolder<T> {
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
                    s.callback(this.value);
                }
            } else {
                s.callback(this.value);
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
            if(options.diffMatcher){
                subscriber.previousDiffValue = options.diffMatcher(this.value);
            }
            callback(this.value);
        }
        return subscriber;
    }

    public unsubscribe(subscriber: Subscriber<T>){
        this.subscribers.delete(subscriber);
    }
}

export const state = new StateHolder<GmkState>(initState);
(window as any).state = state;