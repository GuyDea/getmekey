export class HistoryService {
    private static _historyMap: Map<number, HistoryNavigationFns> = new Map();
    private static _initialized = false;
    private static _lastStateId: number;
    private static _viewSeq = 0;
    private static _goBackResolveFn: () => void;
    private static _usedBrowserNavigation = true;

    static initialize() {
        if (!this._initialized) {
            this._initialized = true;
            history.replaceState(this._viewSeq, '');
            window.addEventListener('popstate', () => {
                const wasNativeNavigation = this._usedBrowserNavigation;
                this._usedBrowserNavigation = true;
                const currentHistoryId = history.state;
                const previousStateId = this._lastStateId;
                const isBack = currentHistoryId < previousStateId;
                const isForward = currentHistoryId > previousStateId;
                this._lastStateId = currentHistoryId;
                // There are cases where previousStateId === currentHistoryId - ignore these
                if (isBack) {
                    this._goBackResolveFn?.();
                    HistoryService._historyMap.get(previousStateId)!.back(wasNativeNavigation);
                } else if (isForward) {
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
            this._usedBrowserNavigation = false;
            history.back();
        });
    }

    static addToHistory(forward: () => (wasNativeNavigation: boolean) => void, url?: string) {
        let stepId = ++this._viewSeq;
        this._lastStateId = stepId;
        history.pushState(stepId, '', url != null ? window.location.origin + url : null);
        this._historyMap.set(stepId, {forward, back: forward()});
    }

    static replaceCurrentWith(url: string) {
        history.replaceState(history.state, '', window.location.origin + url);
    }
}

type HistoryNavigationFns = {
    forward: () => (wasNativeNavigation: boolean) => void;
    back: (wasNativeNavigation: boolean) => void;
}
