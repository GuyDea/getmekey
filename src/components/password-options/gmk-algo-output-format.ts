import {css, html} from "/src/helper-functions.js";
import {radioStyles} from "/src/styles/radio-styles.js";

export class GmkAlgoOutputFormat extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
    }

    private styles = css`
        div[slot=content]{
            display: flex;
            gap: .5rem;
        }
    `

    render() {
        return html`
            <style>${radioStyles}${this.styles}</style>
            <gmk-title-panel>
                <span slot="title">Password Output Format</span>
                <div slot="content">
                    <span>
                        <input type="radio" name="format" id="base64Radio" checked/><label
                            for="base64Radio">Base-64</label>
                    </span>
                    <span>
                        <input type="radio" name="format" id="hexRadio"/><label for="hexRadio">Hex</label>
                    </span>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-algo-output-format', GmkAlgoOutputFormat);
