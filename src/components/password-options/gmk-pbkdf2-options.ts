import {comp, css, fixVal, html} from "/src/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";
import '/src/components/gmk-title-panel.js';
import {State, Subscriber} from "/src/state/state.js";

export class GmkPbkdf2Options extends HTMLElement {
    private _iterationsComp = comp<HTMLInputElement>(this, '#iterations');
    private _iterationsRangeComp = comp<HTMLInputElement>(this, '#iterationsRange');
    private _subs: Subscriber[] = [];

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
        const opts = () => State.value.passwordGeneration.algoOptions.pbkdf2;
        this._subs.push(State.subscribe(s => {
            this._iterationsRangeComp().setAttribute('min', opts().minIterations.toString());
            this._iterationsRangeComp().setAttribute('max', opts().maxIterations.toString());
            this._iterationsComp().value = opts().iterations.toString();
            this._iterationsRangeComp().value = opts().iterations.toString();
        }, {
            diffMatcher: s => JSON.stringify(s.passwordGeneration.algoOptions.pbkdf2),
            dispatchImmediately: true
        }));
        this._iterationsRangeComp().addEventListener('input', () => State.update(s => opts().iterations = Number(this._iterationsRangeComp().value)));
        this._iterationsComp().addEventListener('input', () => State.update(s => opts().iterations = fixVal(opts().minIterations, opts().maxIterations, this._iterationsComp())));
        comp(this, '#lengthForm')().addEventListener('change', (ev) => {
            State.value.passwordGeneration.algoOptions.pbkdf2.length = (ev.target as HTMLInputElement).getAttribute('id') as any;
            State.notifyChange();
        })
        comp(this, '#shaForm')().addEventListener('change', (ev) => {
            State.value.passwordGeneration.algoOptions.pbkdf2.hash = (ev.target as HTMLInputElement).getAttribute('id') as any;
            State.notifyChange();
        })
    }

    disconnectedCallback() {
        this._subs.forEach(s => State.unsubscribe(s));
    }

    private _styles() {
        return css`
    `
    }

    private _render() {
        return html`
            <style>${globalStyles}${this._styles()}</style>    
            <gmk-title-panel showBoarder="false">
                <div slot="title">PBKDF2 Options</div>
                <div slot="content" class="verticalItems">
                    <div class="line lineCenter">
                        <label for="iterations">Iterations</label>
                        <input id="iterations" type="number" class="short">
                        <input id="iterationsRange" type="range">
                    </div>
                    <div class="line">
                        <label>Hash</label>
                        <form id="shaForm" class="lineRadios">
                            <span>
                                <input type="radio" name="sha" id="SHA-256" checked/><label
                                    for="SHA-256">SHA-256</label>
                            </span>
                                <span>
                                <input type="radio" name="sha" id="SHA-384"/><label
                                        for="SHA-384">SHA-384</label>
                            </span>
                                <span>
                                <input type="radio" name="sha" id="SHA-512"/><label
                                        for="SHA-512">SHA-512</label>
                            </span>
                        </form>
                    </div>
                    <div class="line">
                        <label>Length</label>
                        <form id="lengthForm" class="lineRadios">
                            <span>
                                <input type="radio" name="length" id="128" checked/><label
                                    for="128">128</label>
                            </span>
                            <span>
                                <input type="radio" name="length" id="256"/><label
                                    for="256">256</label>
                            </span>
                        </form>

                    </div>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-pbkdf2-options', GmkPbkdf2Options);
