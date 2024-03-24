import {globalStyles} from "/src/styles/global-styles.js";
import {css, html} from "/src/helper-functions.js";
import '/src/components/gmk-subpage-container.js';
import '/src/components/gmk-title-panel.js';
import '/src/components/icons/gmk-info-icon.js';
import '/src/components/password-options/gmk-algo-output-format.js';

export class GmkPreferencesPage extends HTMLElement {
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
    `

    render() {
        return html`
            <style>${this.styles}${globalStyles}</style>
            <gmk-subpage-container>
                <span slot="headerText">User Preferences</span>
                <div slot="content">                    
                    <div class="checkboxPanel">
                        <input type="checkbox" id="topSecretModeCheckbox"><label for="topSecretModeCheckbox">Top-Secret
                        Mode</label>
                        <gmk-info-icon class="questionMarkIcon"></gmk-info-icon>
                    </div>
                    <div class="checkboxPanel">
                        <input type="checkbox" id="hideInfoButtonCheckbox"><label for="hideInfoButtonCheckbox">Hide Info Button</label>
                        <gmk-info-icon class="questionMarkIcon"></gmk-info-icon>
                    </div>
                    <div class="checkboxPanel unrestrictedModePanel">
                        <input type="checkbox" id="unrestrictedModeCheckbox" class="danger"><label for="unrestrictedModeCheckbox">Unrestricted Mode</label>
                        <gmk-info-icon color="var(--color-danger)" class="questionMarkIcon"></gmk-info-icon>
                    </div>
                </div>
            </gmk-subpage-container>
        `
    }
}

customElements.define('gmk-settings-page', GmkPreferencesPage);