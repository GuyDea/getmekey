import {css, html} from "/src/utils/helper-functions.js";
import '/src/components/gmk-subpage-container.js';

export class GmkDisclaimerPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    private _styles() {
        return css`
            * {
                white-space: normal;
            }
    `
    }

    private _render() {
        return html`
            <style>${this._styles()}</style>
            <gmk-subpage-container>
                <span slot="headerText">Disclaimer</span>
                <div slot="content">
                    <p>Content</p>
                </div>
            </gmk-subpage-container>
        `
    }
}

customElements.define('gmk-disclaimer-page', GmkDisclaimerPage);
