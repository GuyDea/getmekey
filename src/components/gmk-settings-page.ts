import {checkboxStyles} from "/src/styles/checkbox-styles.js";
import {globalStyles} from "/src/styles/global-styles.js";
import {radioStyles} from "/src/styles/radio-styles.js";
import {css, html} from "/src/helper-functions.js";
import '/src/components/gmk-subpage-container.js';
import '/src/components/gmk-title-panel.js';
import '/src/components/icons/gmk-question-mark-icon.js';
import '/src/components/password-options/gmk-algo-output-format.js';

export class GmkSettingsPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
    }

    private styles = css`
        .checkboxPanel {
            display: flex;
            flex-direction: row;
            gap: 1rem;
            align-items: center;
        }

        label {
            font-size: 12px;
        }


        .panelTitle {
            color: var(--color-1);
            text-align: center;
            font-size: 14px;
            margin-bottom: .5rem;
        }
        div[slot=content]{
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        label[for=unrestrictedModeCheckbox]{
            color: var(--color-danger);
        }
        .unrestrictedModePanel > .questionMarkIcon{
            --question-mark-color: var(--color-danger);   
        }
        .algoOptionsPanel{
            flex: 1 1;
            display: flex;
            flex-direction: column;
            gap: .5rem;
        }
    `

    render() {
        return html`
            <style>${this.styles}${checkboxStyles}${globalStyles}${radioStyles}</style>
            <gmk-subpage-container>
                <span slot="headerText">Usability Settings</span>
                <div slot="content">                    
                    <div class="checkboxPanel">
                        <input type="checkbox" id="topSecretModeCheckbox"><label for="topSecretModeCheckbox">Top-Secret
                        Mode</label>
                        <gmk-question-mark-icon class="questionMarkIcon"></gmk-question-mark-icon>
                    </div>
                    <div class="checkboxPanel">
                        <input type="checkbox" id="disableStorageCheckbox"><label for="disableStorageCheckbox">Disable Storage</label>
                        <gmk-question-mark-icon class="questionMarkIcon"></gmk-question-mark-icon>
                    </div>
                    <div class="checkboxPanel unrestrictedModePanel">
                        <input type="checkbox" id="unrestrictedModeCheckbox" class="danger"><label for="unrestrictedModeCheckbox">Unrestricted Mode</label>
                        <gmk-question-mark-icon color="var(--color-danger)" class="questionMarkIcon"></gmk-question-mark-icon>
                    </div>
                </div>
            </gmk-subpage-container>
        `
    }
}

customElements.define('gmk-settings-page', GmkSettingsPage);