import {css, html} from "/src/helper-functions.js";
import '/src/components/gmk-title-panel.js';
import {globalStyles} from "/src/styles/global-styles.js";

export class GmkConvenience extends HTMLElement {
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
                <span slot="title">Convenience</span>
                <div slot="content">
                    <div class="line lineCenter">
                        <input type="checkbox" id="copyToClipboard"><label for="copyToClipboard">Copy On Recalled</label>
                    </div>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-convenience', GmkConvenience);
