import {comp, css, fixVal, html} from "/src/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";
import '/src/components/gmk-title-panel.js';
import {State} from "/src/state.js";

export class GmkPbkdf2Options extends HTMLElement {
    private _iterationsComp = comp<HTMLInputElement>(this, '#iterations');
    private _iterationsRangeComp = comp<HTMLInputElement>(this, '#iterationsRange');
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
        const opts = () => State.value.passwordGeneration.algoOptions.pbkdf2;
        State.subscribe(s => {
            this._iterationsRangeComp().setAttribute('min', opts().minIterations.toString());
            this._iterationsRangeComp().setAttribute('max', opts().maxIterations.toString());
            this._iterationsComp().value = opts().iterations.toString();
            this._iterationsRangeComp().value = opts().iterations.toString();
        }, {
            diffMatcher: s => JSON.stringify(s.passwordGeneration.algoOptions.pbkdf2),
            dispatchImmediately: true
        });
        this._iterationsRangeComp().addEventListener('input', () => State.update(s => opts().iterations = Number(this._iterationsRangeComp().value)));
        this._iterationsComp().addEventListener('input', () => State.update(s => opts().iterations = fixVal(opts().minIterations, opts().maxIterations, this._iterationsComp())));

    }

    private _styles() {
        return css`
    `
    }

    private _render() {
        return html`
            <style>${globalStyles}${this._styles()}</style>    
            <gmk-title-panel>
                <div slot="title">PBKDF2 Options</div>
                <div slot="content" class="verticalItems">
                    <div class="line lineCenter">
                        <label for="iterations">Iterations</label>
                        <input id="iterations" type="number" class="short">
                        <input id="iterationsRange" type="range">
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

customElements.define('gmk-pbkdf2-options', GmkPbkdf2Options);
