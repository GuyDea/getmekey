import {css, html} from "/src/helper-functions.js";

export class GmkToast extends HTMLElement {
    private readonly _message: string;
    constructor(message: string) {
        super();
        this._message = message;
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
    }

    private _styles() {
        return css`
            .message {
                
            }
    `
    }

    private _render() {
        return html`
            <style>${this._styles()}</style>
            <div class="message">${this._message}</div>
        `
    }
}

customElements.define('gmk-toast', GmkToast);
