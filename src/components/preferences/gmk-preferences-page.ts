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
        .danger{
            color: var(--color-danger);
        }
    `

    render() {
        return html`
            <style>${this.styles}${globalStyles}</style>
            <gmk-subpage-container>
                <span slot="headerText">User Preferences</span>
                <div slot="content">       
                    <gmk-title-panel>
                        <span slot="title">Visibility</span>
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
                        </div>
                    </gmk-title-panel>
                    <gmk-title-panel>
                        <span slot="title">Saving</span>
                        <div slot="content">
                            <gmk-title-panel showBorder="false">
                                <span slot="title">Recall Secret</span>
                                <div slot="content">
                                </div>
                            </gmk-title-panel>
                            <gmk-title-panel showBorder="false">
                                <span slot="title">Hash Settings</span>
                                <div slot="content">
                                </div>
                            </gmk-title-panel>                            
                            <button>Clear All</button>
                        </div>
                    </gmk-title-panel>
                    <gmk-title-panel>
                        <span slot="title">Convenience</span>
                        <div slot="content">
                            <div class="checkboxPanel">
                                <input type="checkbox" id="copyToClipboard"><label for="copyToClipboard">Copy When Recalled</label>
                                <gmk-info-icon class="questionMarkIcon"></gmk-info-icon>
                            </div>
                        </div>
                    </gmk-title-panel>
                    <gmk-title-panel color="var(--color-danger)">                        
                        <span slot="title">Danger Zone</span>
                        <div slot="content">
                            <div class="checkboxPanel">
                                <input type="checkbox" id="unrestrictedModeCheckbox" class="danger"><label for="unrestrictedModeCheckbox" class="danger">Unrestricted Mode</label>
                                <gmk-info-icon color="var(--color-danger)" class="questionMarkIcon"></gmk-info-icon>
                            </div>
                            <gmk-title-panel color="var(--color-danger)" showBorder="false">
                                <span slot="title">Remember Recalled Secret</span>
                                <div slot="content">
                                    <div class="checkboxPanel">
                                        <input type="checkbox" id="rememberSecretCheckbox" class="danger"><label for="rememberSecretCheckbox" class="danger">Enabled</label>
                                        <gmk-info-icon color="var(--color-danger)" class="questionMarkIcon"></gmk-info-icon>
                                    </div>
                                </div>
                            </gmk-title-panel>                            
                        </div>
                    </gmk-title-panel>
                </div>
            </gmk-subpage-container>
        `
    }
}

customElements.define('gmk-settings-page', GmkPreferencesPage);