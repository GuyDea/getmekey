import {comp, css, html} from "/src/utils/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";
import {popupService} from "/src/services/popup-service.js";

export class GmkInfoPopupContent extends HTMLElement {
    constructor(content: string) {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
        comp(this, '#content')().innerHTML = content;
        comp(this, '#closeButton')().addEventListener('click', () => popupService.close());
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    private _styles() {
        return css`
            #content {
                text-align: center;
                margin: 1rem 0;
                
            }
            #closeButton {
                margin: 0 auto;
            }
    `
    }

    private _render() {
        return html`
            <style>${globalStyles}${this._styles()}</style>   
            <div id="content"></div>
            <div style="display: grid; place-items: center;">
                <button aria-label="Close" id="closeButton" class="gmkButton gmkButtonPrimary">Got it!</button>
            </div>
            
        `
    }
}

customElements.define('gmk-info-popup', GmkInfoPopupContent);
