import {css, html} from "/src/helper-functions.js";
import '/src/components/gmk-title-panel.js';
import '/src/components/icons/gmk-info-icon.js';
import {globalStyles} from "/src/styles/global-styles.js";

export class GmkDangerZone extends HTMLElement {
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
            <gmk-title-panel color="var(--color-danger)">
                <span slot="title">Danger Zone</span>
                <div slot="content" class="settingsColumn">
                    <div class="checkboxPanel line lineCenter">
                        <input type="checkbox" id="unrestrictedModeCheckbox" class="danger"><label for="unrestrictedModeCheckbox" class="danger">Unrestricted Mode</label>
                    </div>
                    <gmk-title-panel color="var(--color-danger)" >
                        <span slot="title">Remember Recalled Secret</span>
                        <div slot="content" class="settingsColumn">
                            <div class="checkboxPanel line lineCenter">
                                <input type="checkbox" id="rememberSecretCheckbox" class="danger"><label for="rememberSecretCheckbox" class="danger">Enabled</label>
                            </div>
                            <div class="line lineCenter">
                                <label for="iterations" class="danger">Minutes</label>
                                <input id="iterations" type="number" class="short danger">
                                <input id="iterationsRange" type="range" class="danger">
                            </div>
                        </div>                        
                    </gmk-title-panel>
                    <div style="display: flex; justify-content: center;">
                        <button class="gmkButton gmkButtonDanger">Purge All</button>
                    </div>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-danger-zone', GmkDangerZone);
