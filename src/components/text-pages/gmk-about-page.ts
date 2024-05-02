import {css, html} from "/src/utils/helper-functions.js";
import {gmkWindow} from "/src/index-related/index-renderer.js";
import '/src/components/gmk-subpage-container.js';

export class GmkAboutPage extends HTMLElement {
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
            .appVersion {
                font-size: 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
    `
    }

    private _render() {
        return html`
            <style>${this._styles()}</style>
            <gmk-subpage-container>
                <span slot="headerText">About GetMeKey</span>
                <div slot="content">
                    <p>GetMeKey is just cool</p>                    
                    <p class="appVersion">
                        <div><strong>Version</strong> ${gmkWindow.buildInfo.version}.${gmkWindow.buildInfo.vcHash}</div>
                        <div><strong>Build at</strong> ${gmkWindow.buildInfo.buildAt}</div>
                    </p>
                </div>
            </gmk-subpage-container>
        `
    }
}

customElements.define('gmk-about-page', GmkAboutPage);
