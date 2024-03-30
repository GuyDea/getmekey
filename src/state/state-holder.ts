import {initState} from "/src/state/initial-state.js";
import {GmkState} from "/src/state/state-type.js"
import {Persistence} from "/src/services/storage/persistence.js"


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

export type ErrorHandler = (error: any) => void;

export class StateHolder<T> {
    public value;
    private subscribers: Set<Subscriber<T>> = new Set();
    private readonly _errorHandler;

    constructor(value: T, errorHandler?: ErrorHandler) {
        this.value = value;
        this._errorHandler = errorHandler;
    }

    public notifyChange() {
        setTimeout(() => {
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
        })
    }

    public update(action: (state: T) => void){
        action(this.value);
        this.notifyChange();
    }

    public subscribe(callback: Callback<T>, options?: SubscriberOptions<T>){
        const cachedCallback = (value: T) => {
            try {
                callback(value)
            }catch (e){
                this._errorHandler?.(e);
            }
        }
        const subscriber: Subscriber<T> = {callback: cachedCallback, options};
        this.subscribers.add(subscriber);
        if(options?.dispatchImmediately){
            if(options.diffMatcher){
                subscriber.previousDiffValue = options.diffMatcher(this.value);
            }
            subscriber.callback(this.value);
        }
        return subscriber;
    }

    public unsubscribe(subscriber: Subscriber<T>){
        this.subscribers.delete(subscriber);
    }
}

export const state = new StateHolder<GmkState>(initState, error => {
    // If there is some error, it's probably caused by outdated format of local storage
    // Makeshift solution for now is to just clear that up completely
    if(Persistence.getFromStorage("USER_PREFERENCES")){
        Persistence.removeFromStorage("USER_PREFERENCES");
        location.reload();
    }

    throw error
});
(window as any).state = state;