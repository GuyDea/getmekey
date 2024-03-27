export const TOAST_SEVERITY = {
    INFO: 'INFO',
    ERROR: 'ERROR'
} as const;
type ToastSeverity = keyof typeof TOAST_SEVERITY;

export class ToastService {
    public addToast(message: string, severity?: ToastSeverity){

    }
}

export const toastService = new ToastService();