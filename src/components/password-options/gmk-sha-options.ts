import {comp, css, html} from "/src/helper-functions.js";
import {radioStyles} from "/src/styles/radio-styles.js";
import {textInputStyles} from "/src/styles/text-input-styles.js";

export class GmkShaOptions extends HTMLElement {
    private _lengthInput = comp<HTMLInputElement>(this, '#lengthInput');

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
        console.log('this._lengthComp()', this._lengthInput())
        this._lengthInput().addEventListener('input', ev => {
            console.log('xxxdsa', ev)
            ev.preventDefault();
        })
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
            <style>${radioStyles}${textInputStyles}${this.styles}</style>
            <gmk-title-panel>
                <span slot="title">SHA-256 Options</span>
                <div slot="content" class="mainContent">                                        
                    <div style="display: flex; gap: .5rem; align-items: center;" >
                        <span>Salt Position</span>
                        <span>
                                <input type="radio" name="format" id="prefixRadio" checked/><label
                                for="prefixRadio">Prefix</label>
                            </span>
                        <span>
                                <input type="radio" name="format" id="suffixRadio"/><label
                                for="suffixRadio">Suffix</label>
                            </span>
                    </div>
                    <div><label for="lengthInput" >Take First</label><input  type="number" style="width: 50px; margin: 0 .5rem;" id="lengthInput" maxlength="2" minlength="2"><span>Characters</span></div>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-sha-options', GmkShaOptions);
