import {comp, css, html} from "/src/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";

export class GmkShaOptions extends HTMLElement {
    private _lengthInput = comp<HTMLInputElement>(this, '#lengthInput');

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
    }

    private styles = css`
        .mainContent{
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .saltPositionPanel{
            gap: .5rem;
            width: 100%;
            flex: 1 1;
        }
    `

    render() {
        return html`
            <style>${globalStyles}${this.styles}</style>
            <gmk-title-panel>
                <span slot="title">SHA Options</span>
                <div slot="content" class="mainContent">
                    <div class="line" >
                        <span>SHA version</span>
                        <div class="lineRadios">
                            <span>
                                <input type="radio" name="shaVersion" id="sha256Radio" checked/><label
                                for="sha256Radio">SHA-256</label>
                            </span>
                            <span>
                                <input type="radio" name="shaVersion" id="sha512Radio"/><label
                                    for="sha512Radio">SHA-512</label>
                            </span>
                        </div>
                    </div>
                    <div class="line" >
                        <span>Salt Position</span>
                        <div class="lineRadios">
                            <span>
                                <input type="radio" name="format" id="prefixRadio" checked/><label
                                for="prefixRadio">Prefix</label>
                            </span>
                            <span>
                                <input type="radio" name="format" id="suffixRadio"/><label
                                    for="suffixRadio">Suffix</label>
                            </span>
                        </div>
                    </div>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-sha-options', GmkShaOptions);
