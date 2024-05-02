export type Subscriber<T> = {
    callback: Callback<T>,
    options?: SubscriberOptions<T>,
    previousDiffValue?: string;
}

type Callback<T> = (state: T) => void;

export type DiffMatcher<T> = (state: T) => string;

type SubscriberOptions<T> = {
    /**
     * Only listen to changes, if serialized string value differs between emissions
     * @param state
     */
    diffMatcher?: DiffMatcher<T>,
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
        const caughtCallback = (value: T) => {
            try {
                callback(value)
            }catch (e){
                if(this._errorHandler) {
                    this._errorHandler(e);
                } else {
                    throw e;
                }
            }
        }
        const subscriber: Subscriber<T> = {callback: caughtCallback, options};
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

