import {GmkPopup} from "/src/components/popup/gmk-popup.js"
import {IndexElements} from "/src/index-related/index-elements.js"
import {HistoryService} from "/src/services/history-service.js";
import {GmkPopupConfirmationContent} from "/src/components/popup/gmk-popup-confirmation-content";

export class PopupService {
    private _currentPopup?: GmkPopup;
    public open(header: string, content: HTMLElement) {

    }

    // public confirm(text: string): Promise<void> {
    //     const gmkPopup = new GmkPopup();
    //     this._currentPopup = gmkPopup;
    //     let confirmationContent = new GmkPopupConfirmationContent(text);
    //     confirmationContent.setAttribute('slot', 'content');
    //     gmkPopup.appendChild(confirmationContent);
    //     HistoryService.addToHistory(() => {
    //         IndexElements.allContent().style.filter = 'blur(5px)';
    //         IndexElements.popupPanel().innerHTML = '';
    //         IndexElements.popupPanel().appendChild(gmkPopup);
    //         return () => this.close()
    //     })
    // }

    public close(){
        IndexElements.allContent().style.filter = '';
        IndexElements.popupPanel().innerHTML = '';
    }

}

export const popupService = new PopupService();