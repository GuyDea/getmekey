import {globalStyles} from "/src/styles/global-styles.js";
import {html} from "/src/utils/helper-functions.js";
import '/src/components/gmk-subpage-container.js';
import '/src/components/gmk-title-panel.js';
import '/src/components/gmk-info-icon.js';
import '/src/components/password-options/gmk-algo-output-format.js';
import '/src/components/preferences/gmk-visibility.js';
import '/src/components/preferences/gmk-remember-hash.js';
import '/src/components/preferences/gmk-sensitive.js';
import '/src/components/preferences/gmk-recall.js';

export class GmkPreferencesPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
    }

    render() {
        return html`
            <style>${globalStyles}</style>
            <gmk-subpage-container>
                <span slot="headerText">User Preferences</span>
                <div slot="content" class="settingsColumn">       
                    <gmk-visibility></gmk-visibility>
                    <gmk-recall></gmk-recall>
                    <gmk-remember-hash></gmk-remember-hash>
                    <gmk-sensitive></gmk-sensitive>
                </div>
            </gmk-subpage-container>
        `
    }
}

customElements.define('gmk-settings-page', GmkPreferencesPage);