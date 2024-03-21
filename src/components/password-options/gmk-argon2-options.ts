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
                    <div class="line">
                        <label>Hash</label>
                        <div class="lineRadios">
                        <span>
                            <input type="radio" name="sha" id="sha256Radio" checked/><label
                                for="sha256Radio">SHA-256</label>
                        </span>
                            <span>
                            <input type="radio" name="sha" id="sha384Radio"/><label
                                    for="sha384Radio">SHA-384</label>
                        </span>
                            <span>
                            <input type="radio" name="sha" id="sha512Radio"/><label
                                    for="sha512Radio">SHA-512</label>
                        </span>
                        </div>
                    </div>
                    <div class="line">
                        <label>Length</label>
                        <div class="lineRadios">
                            <span>
                                <input type="radio" name="length" id="length128Radio" checked/><label
                                    for="length128Radio">128</label>
                            </span>
                            <span>
                                <input type="radio" name="length" id="length192Radio"/><label
                                    for="length192Radio">192</label>
                            </span>
                            <span>
                                <input type="radio" name="length" id="length256Radio"/><label
                                    for="length256Radio">256</label>
                            </span>
                        </div>

                    </div>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-argon2-options', GmkArgon2Options);
