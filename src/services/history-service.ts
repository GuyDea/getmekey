export class HistoryService {
    private static _historyMap: Map<number, HistoryNavigationFns> = new Map();
    private static _initialized = false;
    private static _lastStateId: number;
    private static _viewSeq = 0;
    private static _goBackResolveFn: () => void;
    private static _usedBrowserNavigation = true;
    private static _navigationPayload: any;

    static initialize() {
        if (!this._initialized) {
            this._initialized = true;
            history.replaceState(this._viewSeq, '');
            window.addEventListener('popstate', () => {
                const wasNativeNavigation = this._usedBrowserNavigation;
                const navigationPayload = this._navigationPayload;
                this._navigationPayload = undefined;
                this._usedBrowserNavigation = true;
                const currentHistoryId = history.state;
                const previousStateId = this._lastStateId;
                const isBack = currentHistoryId < previousStateId;
                const isForward = currentHistoryId > previousStateId;
                this._lastStateId = currentHistoryId;
                // There are cases where previousStateId === currentHistoryId - ignore these
                if (isBack) {
                    this._goBackResolveFn?.();
                    HistoryService._historyMap.get(previousStateId)!.back({wasNativeNavigation, payload: navigationPayload});
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

    static goBack(payload?: any): Promise<void> {
        return new Promise<void>(resolve => {
            this._goBackResolveFn = resolve;
            this._usedBrowserNavigation = false;
            this._navigationPayload = payload;
            history.back();
        });
    }

    static addToHistory(forward: () => (navigationObject: NavigationObject) => void, url?: string) {
        let stepId = ++this._viewSeq;
        this._lastStateId = stepId;
        history.pushState(stepId, '', url != null ? window.location.origin + url : null);
        this._historyMap.set(stepId, {forward, back: forward()});
    }

    static replaceCurrentWith(url: string) {
        history.replaceState(history.state, '', window.location.origin + url);
    }
}

type NavigationObject = {
    wasNativeNavigation: boolean,
    payload: any
}

type HistoryNavigationFns = {
    forward: () => (navigationObject: NavigationObject) => void;
    back: (navigationObject: NavigationObject) => void;
}
