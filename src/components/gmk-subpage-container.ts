import {Router} from "/src/router.js";
import {html, css} from "/src/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";

export class GmkSubpageContainer extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
        this.shadowRoot!.querySelector('#backButton')!.addEventListener('click', () => {
            Router.canGoBack() ? history.back() : Router.handleRoute('')
        })
    }
    private styles = css`
        :host {
            --header-height: 1.5rem;
        }
        #backButton{
            height: var(--header-height);
            width: var(--header-height);
            flex: 0 0 var(--header-height);
        }
        .spacer {
            flex: 0 1000 var(--header-height);
        }
        .header{
            display: flex;
            flex-direction: row;
            width: 100%;
            padding: 1rem;
        }
        #backButton {
            display: block;
        }
        #headerText{
            display: flex;
            flex-direction: row;
            font-weight: lighter;
            justify-content: center;
            align-items: center;
            flex: 1 1;
            font-size: 1.5rem;
            max-width: 100%;
            flex-wrap: wrap;
            white-space: pre-wrap;
            padding: 0 10px;
            text-align: center;
        }
        .mainContainer{
            display: grid;
            grid-template: minmax(0, min-content) minmax(0, 1fr) / minmax(0, 1fr);
            height: 100dvh;
            overflow: hidden;
            box-sizing: border-box;
        }
        #content {
            overflow: auto;
            padding: 0 1rem 1rem;
        }
    `

    render(){
        return html`
            <style>${this.styles}${globalStyles}</style>
            <div class="mainContainer">
                <div class="header">
                    <button class="iconButton" id="backButton">
                        <svg viewBox="0 0 100 100">
                            <path style="fill: var(--color-1)"
                                  d="M99.8 73.6c-3.8-16.3-15.7-39-51.6-43.8V15.5a7.4 7.4 0 0 0-12.7-5.3L3 43.1a9.8 9.8 0 0 0 0 13.8l32.6 32.9a7.4 7.4 0 0 0 12.7-5.3V70.6c12.2 0 30 1.7 42.5 9.5a6 6 0 0 0 9.1-6.5z"/>
                        </svg>
                    </button>
                    <div id="headerText">
                        <slot name="headerText"></slot>
                    </div>
                    <div class="spacer"></div>
                </div>
                <div id="content">
                    <slot name="content"></slot>
                </div>
            </div>
        `
    }
}

customElements.define('gmk-subpage-container', GmkSubpageContainer);