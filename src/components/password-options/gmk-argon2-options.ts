import {css, html} from "/src/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";
import '/src/components/gmk-title-panel.js';

export class GmkArgon2Options extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
    }

    private _styles() {
        return css`
    `
    }

    private _render() {
        return html`
            <style>${globalStyles}${this._styles()}</style>    
            <gmk-title-panel>
                <div slot="title">Argon2 Options</div>
                <div slot="content" class="verticalItems">
                    <div class="line lineCenter">
                        <label for="iterations">Iterations</label>
                        <input id="iterations" type="text" class="short">
                        <input type="range">
                    </div>
                    <div class="line lineCenter">
                        <label for="parallelism">Parallelism</label>
                        <input id="parallelism" type="text" class="short">
                        <input type="range">
                    </div>
                    <div class="line lineCenter">
                        <label for="memoryConst">Memory Cost</label>
                        <input id="memoryConst" type="text" class="short">
                        <input type="range">
                    </div>
                    <div class="line lineCenter">
                        <label for="hashLength">Hash Length</label>
                        <input id="hashLength" type="text" class="short">
                        <input type="range">
                    </div>
                    <div class="line">
                        <label>Version</label>
                        <div class="lineRadios">
                            <span>
                                <input type="radio" name="version" id="2iRadio" checked/><label
                                    for="2iRadio">Argon2i</label>
                            </span>
                                <span>
                                <input type="radio" name="version" id="2dRadio"/><label
                                        for="2dRadio">Argon2d</label>
                            </span>
                                <span>
                                <input type="radio" name="version" id="2idRadio"/><label
                                        for="2idRadio">Argon2id</label>
                            </span>
                        </div>
                    </div>                    
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-argon2-options', GmkArgon2Options);
