import {comp, css, html} from "/src/utils/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";
import {popupService} from "/src/services/popup-service.js";

export class GmkPopup extends HTMLElement {
    private readonly _header: string;

    constructor(header: string) {
        super();
        this._header = header;
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
        comp(this, '#closeButton')().addEventListener('click', () => popupService.close());
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    private _styles() {
        return css`
            :host{
                animation: appear .1s forwards linear;
            }
            @keyframes appear {
                from{
                    opacity: 0;
                    transform: scale(.9);
                }
                to{
                    opacity: 1;
                    transform: scale(1);
                }
            }
            #closeButton {
                color: var(--color-text-2);
                background: none;
                height: 2rem;
                width: 2rem;
                padding: 0;
                flex: 0 0 2rem;
            }

            .svgIcon {
                height: 100%;
                width: 100%;
            }

            .popupPanel {
                background: rgba(var(--color-text-1-rgb-val), .7);
                padding: 1rem;
                border-radius: 1rem;
                box-shadow: var(--box-shadow-1), inset .5rem .5rem .5rem var(--color-text-1);
                max-width: 400px;
                margin: 0 1rem;
            }
            .header {
                display: flex;
                flex-wrap: nowrap;
            }
            .headerText {
                font-size: 2rem;
                padding: 0 .5em 0 2.5rem;
                font-weight: lighter;
                flex: 1 1;
                text-align: center;
            }
        `
    }

    private _render() {
        return html`
            <style>${globalStyles}${this._styles()}</style>
            <div class="popupPanel">
                <div class="header">
                    <div class="headerText">${this._header}</div>
                    <button class="gmkButton" id="closeButton">
                        <svg xmlns="http://www.w3.org/2000/svg" class="svgIcon" viewBox="0 0 1000 1000"
                             stroke-linecap="round" >
                            <path d="M 97,902 902,97 m -805,0 805,805" stroke-width="60" stroke="currentColor"/>
                        </svg>
                    </button>
                </div>
                <div class="content">
                    <slot name="content"></slot>
                </div>
            </div>
        `
    }
}

customElements.define('gmk-popup', GmkPopup);
