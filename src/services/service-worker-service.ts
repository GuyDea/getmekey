import {popupService} from "/src/services/popup-service.js"
import {GmkPopupConfirmationContent} from "/src/components/popup/gmk-popup-confirmation-content.js"
import {html} from "/src/utils/helper-functions.js"

export class ServiceWorkerService {
    public initialize(){
        setTimeout(async () => {
            const registration = await this._loadSw();
            this._setupSwListeners();
            await this._checkForUpdate(registration);
        }, 3000);
    }

    private async _loadSw(){
        return navigator.serviceWorker?.register(window.location.origin + '/sw.js');

    }

    private async _checkForUpdate(registration: ServiceWorkerRegistration){
        if(registration.waiting){
            popupService.open('GetMeKey Update', new GmkPopupConfirmationContent({
                htmlText: html`
                    <div style="text-align: center"><strong>New GetMeKey Version is available!</strong></div><br/>
                    <div style="text-align: center">Would you like to update and reload the app?</div>`,
                yesCallback: async () => {
                    this._sendMessageToSW({type: "SKIP_WAIT"}, registration.waiting!)
                },
                noCallback: async () => {
                    await popupService.close(false);
                }
            }))
        }
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