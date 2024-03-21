import {css, html} from "/src/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";

export class GmkAlgoOutputFormat extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
    }

    private styles = css`
        div[slot=content]{
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    `

    render() {
        return html`
            <style>${globalStyles}${this.styles}</style>
            <gmk-title-panel>
                <span slot="title">Password Output</span>
                <div slot="content">
                    <div class="line">
                        <span>Format</span>
                        <div class="lineRadios">
                            <input type="radio" name="format" id="base64Radio" checked/><label
                                for="base64Radio">Base-64</label>
                            <input type="radio" name="format" id="hexRadio"/><label for="hexRadio">Hex</label>
                        </div>
                    </div>
                    <div class="line">
                        <label for="lengthInput" >Take First</label><input  type="number" class="short" id="lengthInput" maxlength="2" minlength="2"><span>Characters</span>
                    </div>
                    <div class="line">
                        <label for="securityTextInput">Security Text</label>
                        <input id="securityTextInput" type="text">
                    </div>                    
                    <div class="line">
                        <span>Text Position</span>
                        <div class="lineRadios">
                            <input type="radio" name="securityPart" id="prefixRadio" checked/><label
                                for="prefixRadio">Prefix</label>
                            <input type="radio" name="securityPart" id="suffixRadio"/><label for="suffixRadio">Suffix</label>
                        </div>
                    </div>
                    
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-algo-output-format', GmkAlgoOutputFormat);
