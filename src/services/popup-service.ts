import {GmkPopup} from "/src/components/popup/gmk-popup.js"
import {IndexElements} from "/src/index-related/index-elements.js"
import {HistoryService} from "/src/services/history-service.js";

export type PopupOptions = {
    doAfterNativeClose?: () => void
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
            return (wasNativeNavigation) => {
                this._hide();
                if(wasNativeNavigation) {
                    popupOptions?.doAfterNativeClose?.();
                }
            }
        })
    }

    public async close(): Promise<void> {
        await HistoryService.goBack();
    }

    private _hide(){
        IndexElements.allContent().style.filter = '';
        IndexElements.popupPanel().innerHTML = '';
        IndexElements.popupPanel().style.display = 'none';
    }

}

export const popupService = new PopupService();