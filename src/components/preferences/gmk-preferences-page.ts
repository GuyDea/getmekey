import {globalStyles} from "/src/styles/global-styles.js";
import {comp, html} from "/src/utils/helper-functions.js";
import '/src/components/gmk-subpage-container.js';
import '/src/components/gmk-title-panel.js';
import '/src/components/gmk-info-icon.js';
import '/src/components/password-options/gmk-algo-output-format.js';
import '/src/components/preferences/gmk-visibility.js';
import '/src/components/preferences/gmk-recall.js';
import '/src/components/preferences/gmk-usability.js';
import {popupService} from "/src/services/popup-service.js"
import {GmkPopupConfirmationContent} from "/src/components/popup/gmk-popup-confirmation-content.js"
import {Persistence} from "/src/services/persistence.js"
import {toastService} from "/src/services/toast-service.js"

export class GmkPreferencesPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
        comp(this, '#purgeAllButton')().addEventListener('click', () => {
            popupService.open('Confirm', new GmkPopupConfirmationContent(html`
                        <div style="text-align: center">This will remove all locally stored data</div><br/>
                        <div style="text-align: center">GetMeKey will be reloaded afterwards</div><br/>
                        <div style="text-align: center">Are you sure?</div>`,
                async () => {
                    await popupService.close(false);
                    Persistence.deleteAllCookies();
                    Persistence.removeAllStorage();
                    toastService.addToast(html`<div style="text-align: center">Cleanup Successful</div><br/><div style="text-align: center">Reloading GetMeKey</div>`, undefined, 2000);
                    setTimeout(() => location.reload(), 2000);
                }, async () => {
                    await popupService.close(false);
                }))
        })
    }

    render() {
        return html`
            <style>${globalStyles}</style>
            <gmk-subpage-container>
                <span slot="headerText">Preferences</span>
                <div slot="content" class="settingsColumn">       
                    <gmk-visibility></gmk-visibility>
                    <gmk-usability></gmk-usability>
                    <gmk-recall></gmk-recall>
                    <div style="display: flex; justify-content: center;">
                        <button id="purgeAllButton" class="gmkButton gmkButtonPrimary">Purge All</button>
                    </div>
                </div>
            </gmk-subpage-container>
        `
    }
}

customElements.define('gmk-settings-page', GmkPreferencesPage);