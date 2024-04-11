import {css, html} from "/src/utils/helper-functions.js";

export class GmkPopup extends HTMLElement {

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
    `
    }

    private _render() {
        return html`
            <style>${this._styles()}</style>  
            <div slot="content"></div>
            
        `
    }
}

customElements.define('gmk-popup', GmkPopup);
