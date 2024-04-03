export class HistoryService {
    private static _historyMap: Map<number, HistoryNavigationFns> = new Map();
    private static _initialized = false;
    private static _lastStateId: number;
    private static _viewSeq = 0;
    private static _goBackResolveFn: () => void;

    static initialize(){
        if(!this._initialized) {
            this._initialized = true;
            history.replaceState(this._viewSeq, '');
            window.addEventListener('popstate', () => {
                const currentHistoryId = history.state;
                const previousStateId = this._lastStateId;
                const isBack = currentHistoryId < previousStateId;
                this._lastStateId = currentHistoryId;
                if(isBack) {
                    this._goBackResolveFn?.();
                    HistoryService._historyMap.get(previousStateId)!.back();
                } else {
                    const forwardFn = HistoryService._historyMap.get(currentHistoryId)!.forward;
                    HistoryService._historyMap.set(currentHistoryId, {forward: forwardFn, back: forwardFn()});
                }
            });
        }
    }

    static canGoBack(): boolean {
        return this._lastStateId > 0;
    }

    static goBack(): Promise<void> {
        return new Promise<void>(resolve => {
            this._goBackResolveFn = resolve;
            history.back();
        });
    }

    static addToHistory(forward: () => () => void, url?: string) {
        let stepId = ++this._viewSeq;
        this._lastStateId = stepId;
        history.pushState(stepId, '', url != null ? window.location.origin + url : null);
        this._historyMap.set(stepId, { forward, back: forward() });
    }

    static replaceCurrentWith(url: string){
        history.replaceState(history.state, '', window.location.origin + url);
    }
}

type HistoryNavigationFns = {
    forward: () => () => void;
    back: () => void;
}
