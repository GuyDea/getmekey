import {css, html} from "/src/helper-functions.js";
import '/src/components/gmk-title-panel.js';
import '/src/components/icons/gmk-info-icon.js';
import {globalStyles} from "/src/styles/global-styles.js";

export class GmkSaving extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
    }

    private _styles() {
        return css`
            .hashSettingsPanel{
                display: flex;
                flex-direction: column;
                gap: .5rem;
            }
    `
    }

    private _render() {
        return html`
            <style>${globalStyles}${this._styles()}</style>
            <gmk-title-panel>
                <span slot="title">Saving</span>
                <div slot="content" class="settingsColumn">
                    <div class="line lineCenter">
                        <input type="checkbox" id="allowSecretRecall"><label for="allowSecretRecall">Allow
                        Secret Recall</label>
                    </div>
                    <div class="hashSettingsPanel">
                        <label class="collapsedLabel">Remember Hash Settings</label>
                        <form id="shaForm" class="lineRadios">
                            <span>
                                <input type="radio" name="remember" id="hashNever"/><label
                                    for="hashNever">Never</label>
                            </span>
                            <span>
                                <input type="radio" name="remember" id="hashAlways"/><label
                                    for="hashAlways">Always</label>
                            </span>
                            <span>
                                <input type="radio" name="remember" id="hashRecall"/><label
                                    for="hashRecall">On Recall</label>
                            </span>
                        </form>
                    </div>                    
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-saving', GmkSaving);
