import {comp, css, html} from "/src/utils/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";

export class GmkPopupConfirmationContent extends HTMLElement {
    private readonly _htmlText: string;
    private readonly _yesCallback: () => void;
    private readonly _noCallback?: () => void;
    constructor(input: {htmlText: string, yesCallback: () => void, noCallback?: () => void, yesButtonName?: string}) {
        super();
        this._htmlText = input.htmlText;
        this._yesCallback = input.yesCallback;
        this._noCallback = input.noCallback;
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
        comp(this, '#yesButton')().innerHTML = input.yesButtonName ?? 'Yes';
        comp(this,'#yesButton')().addEventListener('click', () => this._yesCallback());
        if(this._noCallback) {
            comp(this, '#noButton')()?.addEventListener('click', () => this._noCallback!());
        }
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
                gap: 1rem;
                padding-top: 1rem;
            }
            .buttons{
                display: flex;
                flex-direction: row;
                justify-content: center;
                gap: 1rem;
            }
    `
    }

    private _render() {
        return html`
            <style>${globalStyles}${this._styles()}</style>       
            <div class="mainPanel">
                <div class="text">
                ${this._htmlText}
                </div>
                <div class="buttons">
                    ${this._noCallback ? html`<button aria-label="No" id="noButton" class="gmkButton gmkButtonSecondary">No</button>` : ''}
                    <button aria-label="Yes" id="yesButton" class="gmkButton gmkButtonPrimary"></button>
                </div>
            </div>
        `
    }
}

customElements.define('gmk-popup-confirmation-content', GmkPopupConfirmationContent);
