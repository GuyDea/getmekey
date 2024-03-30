import {IndexElements} from "/src/index-related/index-elements.js"
import {GmkToast} from "/src/components/gmk-toast.js"
import {css} from "/src/utils/helper-functions.js";

export const TOAST_SEVERITY = {
    INFO: 'INFO',
    ERROR: 'ERROR'
} as const;
export type ToastSeverity = keyof typeof TOAST_SEVERITY;

export class ToastService {
    private _toastPanel: HTMLElement;
    private _lastToast?: GmkToast;

    constructor(toastPanel: HTMLElement) {
        this._toastPanel = toastPanel;
        this._toastPanel.style.cssText = css`position: fixed; top: 0; z-index: 9999; display: flex; flex-direction: column; padding-top: 1rem; align-items: center`;
    }

    public addToast(message: string, severity?: ToastSeverity, ttl?: number){
        severity = severity ?? "INFO";
        ttl = ttl ?? 3_000;
        if(!this._lastToast?.removed && message === this._lastToast?.message && severity === this._lastToast?.severity){
            this._lastToast?.reset()
        } else {
            const gmkToast = new GmkToast(message, severity, ttl);
            this._toastPanel.append(gmkToast);
            this._lastToast = gmkToast;
        }
    }
}

export const toastService = new ToastService(IndexElements.toastPanel());