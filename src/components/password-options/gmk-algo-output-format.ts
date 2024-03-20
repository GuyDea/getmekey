import {css, html} from "/src/helper-functions.js";
import {radioStyles} from "/src/styles/radio-styles.js";
import {textInputStyles} from "/src/styles/text-input-styles.js";

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
        .line{
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: .5rem;
        }
    `

    render() {
        return html`
            <style>${radioStyles}${textInputStyles}${this.styles}</style>
            <gmk-title-panel>
                <span slot="title">Password Output</span>
                <div slot="content">
                    <div class="line">
                        <span>Format</span>
                        <input type="radio" name="format" id="base64Radio" checked/><label
                            for="base64Radio">Base-64</label>
                        <input type="radio" name="format" id="hexRadio"/><label for="hexRadio">Hex</label>
                    </div>
                    <div class="line">
                        <label for="lengthInput" >Take First</label><input  type="number" style="width: 50px;" id="lengthInput" maxlength="2" minlength="2"><span>Characters</span>
                    </div>
                    <div class="line">
                        <span>Security Text</span>
                        <input type="text">
                    </div>                    
                    <div class="line">
                        <span>Text Position</span>
                        <input type="radio" name="securityPart" id="prefixRadio" checked/><label
                            for="prefixRadio">Prefix</label>
                        <input type="radio" name="securityPart" id="suffixRadio"/><label for="suffixRadio">Suffix</label>
                    </div>
                    
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-algo-output-format', GmkAlgoOutputFormat);
