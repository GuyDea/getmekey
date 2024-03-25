import {css, html} from "/src/helper-functions.js";
import '/src/components/gmk-title-panel.js';
import '/src/components/icons/gmk-info-icon.js';
import {globalStyles} from "/src/styles/global-styles.js";

export class GmkVisibility extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
    }

    private _styles() {
        return css`
    `
    }

    private _render() {
        return html`
            <style>${globalStyles}${this._styles()}</style>
            <gmk-title-panel>
                <span slot="title">Visibility</span>
                <div slot="content" class="settingsColumn">
                    <div class="line lineCenter">
                        <input type="checkbox" id="topSecretModeCheckbox"><label for="topSecretModeCheckbox">Top-Secret
                        Mode</label>
                    </div>
                    <div class="line lineCenter">
                        <input type="checkbox" id="hideInfoButtonCheckbox"><label for="hideInfoButtonCheckbox">Hide Info Button</label>
                    </div>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-visibility', GmkVisibility);
