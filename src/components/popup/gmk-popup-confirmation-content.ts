import {comp, css, html} from "/src/utils/helper-functions.js";

export class GmkPopupConfirmationContent extends HTMLElement {
    private readonly _htmlText: string;
    private readonly _yesCallback: () => void;
    private readonly _noCallback: () => void;
    constructor(htmlText: string, yesCallback: () => void, noCallback: () => void) {
        super();
        this._htmlText = htmlText;
        this._yesCallback = yesCallback;
        this._noCallback = noCallback;
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
        comp(this,'yesButton')().addEventListener('click', () => this._yesCallback());
        comp(this,'noButton')().addEventListener('click', () => this._noCallback());
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    private _styles() {
        return css`
            .mainPanel{
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .buttons{
                display: flex;
                flex-direction: row;
                justify-content: center;
            }
    `
    }

    private _render() {
        return html`
            <style>${this._styles()}</style>       
            <div class="mainPanel">
                <div class="text">
                ${this._htmlText}
                </div>
                <div class="buttons">
                    <button id="yesButton">Yes</button>
                    <button id="noButton">No</button>
                </div>
            </div>
        `
    }
}

customElements.define('gmk-popup-confirmation-content', GmkPopupConfirmationContent);
