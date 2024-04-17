import {GmkPopup} from "/src/components/popup/gmk-popup.js"
import {IndexElements} from "/src/index-related/index-elements.js"
import {HistoryService} from "/src/services/history-service.js";

export type PopupOptions = {
    doOnDismiss?: () => void
}

export class PopupService {
    public open(header: string, content: HTMLElement, popupOptions?: PopupOptions) {
        const gmkPopup = new GmkPopup(header);
        content.setAttribute('slot', 'content');
        gmkPopup.appendChild(content);
        HistoryService.addToHistory(() => {
            IndexElements.allContent().style.filter = 'blur(5px)';
            IndexElements.popupPanel().style.display = '';
            IndexElements.popupPanel().innerHTML = '';
            IndexElements.popupPanel().appendChild(gmkPopup);
            return (nav) => {
                this._hide();
                const wasDismissed = nav.payload;
                if(nav.wasNativeNavigation || wasDismissed) {
                    popupOptions?.doOnDismiss?.();
                }
            }
        })
    }

    /**
     * @param dismiss tells the popup that it's meant to be closed without executing any additional action
     */
    public async close(dismiss?: boolean): Promise<void> {
        await HistoryService.goBack(dismiss);
    }

    private _hide(){
        IndexElements.allContent().style.filter = '';
        IndexElements.popupPanel().innerHTML = '';
        IndexElements.popupPanel().style.display = 'none';
    }

}

export const popupService = new PopupService();