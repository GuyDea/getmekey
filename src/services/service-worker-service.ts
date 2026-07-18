import {popupService} from "/src/services/popup-service.js"
import {GmkPopupConfirmationContent} from "/src/components/popup/gmk-popup-confirmation-content.js"
import {html} from "/src/utils/helper-functions.js"

export class ServiceWorkerService {
    private _canRequestPwaInstall = false;
    private _pwaInstallPrompt?: {prompt: () => void};

    public initialize(){
        setTimeout(async () => {
            const registration = await this._loadSw();
            this._setupSwListeners();
            if(registration){
                this._setupUpdateFoundListener(registration);
                this._checkForUpdate(registration);
            }
        }, 3000);
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this._canRequestPwaInstall = true;
            this._pwaInstallPrompt = e as unknown as (typeof this._pwaInstallPrompt);
        });
    }

    canRequestPwaInstall() {
        return this._canRequestPwaInstall;
    }

    promptPwaInstall(){
        this._pwaInstallPrompt?.prompt()
    }

    private async _loadSw(){
        return navigator.serviceWorker?.register(window.location.origin + '/sw.js');

    }

    private _checkForUpdate(registration: ServiceWorkerRegistration){
        if(registration.waiting){
            this._showUpdatePrompt(registration.waiting);
        }
    }

    private _setupUpdateFoundListener(registration: ServiceWorkerRegistration){
        const promptWhenInstalled = (newWorker: ServiceWorker | null) => {
            newWorker?.addEventListener('statechange', () => {
                if(newWorker.state === 'installed' && navigator.serviceWorker.controller){
                    this._showUpdatePrompt(newWorker);
                }
            });
        };
        promptWhenInstalled(registration.installing);
        registration.addEventListener('updatefound', () => promptWhenInstalled(registration.installing));
    }

    private _showUpdatePrompt(workerToActivate: ServiceWorker){
        popupService.open('GetMeKey Update', new GmkPopupConfirmationContent({
            htmlText: html`
                <div style="text-align: center"><strong>New GetMeKey Version is available!</strong></div><br/>
                <div style="text-align: center">Would you like to update and reload the app?</div>`,
            yesCallback: async () => {
                this._sendMessageToSW({type: "SKIP_WAIT"}, workerToActivate)
            },
            noCallback: async () => {
                await popupService.close(false);
            }
        }))
    }

    private _setupSwListeners(){
        navigator.serviceWorker?.addEventListener('message', m => {
            if(m.data.type === 'SKIP_WAITING_DONE'){
                location.reload();
            }
        });
    }

    private _sendMessageToSW(message: SwMessage, swWorkerToSendTo?: ServiceWorker) {
        (swWorkerToSendTo ?? navigator?.serviceWorker?.controller)?.postMessage(message);
    }
}

export type SwMessage = {
    type: SwMessageType;
    payload?: any;
}

export const SW_MESSAGE_TYPE = {
    SKIP_WAIT: 'SKIP_WAIT',
    SKIP_WAITING_DONE: 'SKIP_WAITING_DONE'
} as const;
export type SwMessageType = keyof typeof SW_MESSAGE_TYPE;

export const serviceWorkerService = new ServiceWorkerService();