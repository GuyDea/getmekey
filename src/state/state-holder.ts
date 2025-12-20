import {deepCopy} from "/src/utils/helper-functions.js";

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
    private _loggingEnabled = localStorage.getItem('debug') === 'true';

    constructor(value: T, errorHandler?: ErrorHandler) {
        this.value = value;
        this._errorHandler = errorHandler;
    }

    public setLogging(enabled: boolean) {
        this._loggingEnabled = enabled;
    }

    private _getDiff(oldObj: any, newObj: any, path = ''): string[] {
        if (typeof oldObj !== 'object' || oldObj === null || typeof newObj !== 'object' || newObj === null) {
            if (oldObj === newObj) return [];
            return [`=${path || '=root'}\n ${JSON.stringify(oldObj)} -> ${JSON.stringify(newObj)}`];
        }

        const diffs: string[] = [];
        const keys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);
        for (const key of keys) {
            const fullPath = path ? `${path}.${key}` : key;
            const oldValue = oldObj[key];
            const newValue = newObj[key];

            if (oldValue === newValue) continue;

            const subDiffs = this._getDiff(oldValue, newValue, fullPath);
            if (subDiffs.length === 0 && JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
                diffs.push(`${fullPath}: ${JSON.stringify(oldValue)} -> ${JSON.stringify(newValue)}`);
            } else {
                diffs.push(...subDiffs);
            }
        }
        return diffs;
    }

    private _logChange(oldState: T, newState: T) {
        const diffs = this._getDiff(oldState, newState);
        if (diffs.length > 0) {
            const diffSummary = diffs.length > 3
                ? diffs.slice(0, 3).join(', ') + `... (+${diffs.length - 3} more)`
                : diffs.join('\n');
            console.groupCollapsed(`[State Change]\n${diffSummary}`);
            console.trace('Stacktrace');
            console.groupEnd();
        }
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
        const oldState = this._loggingEnabled ? deepCopy(this.value) : undefined;
        action(this.value);
        if (this._loggingEnabled && oldState) {
            this._logChange(oldState, this.value);
        }
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

