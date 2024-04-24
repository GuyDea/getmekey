import {css, html} from "/src/utils/helper-functions.js";
import '/src/components/gmk-subpage-container.js';

export class GmkWhyStrongSecretPage extends HTMLElement {
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
                <span slot="headerText">Why Strong Secret?</span>
                <div slot="content">
                    <p>Are you wondering <i>"Why do I have to have strong secret, when generated password is super-strong anyway?"</i></p>
                    <p>Good question! Let's look at some reasons <b>why?</b></p>
                </div>
            </gmk-subpage-container>
        `
    }
}

customElements.define('gmk-why-strong-secret-page', GmkWhyStrongSecretPage);
