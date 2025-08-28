import {comp, css, fixVal, html} from "/src/utils/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";
import '/src/components/gmk-title-panel.js';
import {Subscriber} from "/src/state/state-holder.js";
import {GmkState} from "/src/state/gmk-state-type.js"
import {state} from "/src/state/initial-state.js"

export class GmkPbkdf2Options extends HTMLElement {
    private _iterationsComp = comp<HTMLInputElement>(this, '#iterations');
    private _iterationsRangeComp = comp<HTMLInputElement>(this, '#iterationsRange');
    private _subs: Subscriber<GmkState>[] = [];

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
    }

    connectedCallback(){
        const opts = () => state.value.hashingOptions.algoOptions.pbkdf2;
        this._subs.push(state.subscribe(s => {
            this._iterationsRangeComp().setAttribute('min', opts().minIterations.toString());
            this._iterationsRangeComp().setAttribute('max', opts().maxIterations.toString());
            this._iterationsComp().value = opts().iterations.toString();
            this._iterationsRangeComp().value = opts().iterations.toString();
            comp(this, `#pbkdf${opts().hash}`)().setAttribute('checked', '');
            comp(this, `#length${opts().length}`)().setAttribute('checked', '');
        }, {
            diffMatcher: s => JSON.stringify(s.hashingOptions.algoOptions.pbkdf2),
            dispatchImmediately: true
        }));
        this._iterationsRangeComp().addEventListener('input', () => state.update(s => opts().iterations = Number(this._iterationsRangeComp().value)));
        this._iterationsComp().addEventListener('change', () => state.update(s => opts().iterations = fixVal(opts().minIterations, opts().maxIterations, this._iterationsComp())));
        comp(this, '#shaForm')().addEventListener('change', (ev) => state.update(() => opts().hash = (ev.target as HTMLInputElement).getAttribute('value') as any));
        comp(this, '#lengthForm')().addEventListener('change', (ev) => state.update(() => opts().length = (ev.target as HTMLInputElement).getAttribute('value') as any));
    }

    disconnectedCallback() {
        this._subs.forEach(s => state.unsubscribe(s));
    }

    private _styles() {
        return css`
    `
    }

    private _render() {
        return html`
            <style>${globalStyles}${this._styles()}</style>    
            <gmk-title-panel showBorder="false">
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
                                <input type="radio" name="sha" id="pbkdfSHA-256" value="SHA-256"/><label
                                    for="pbkdfSHA-256">SHA-256</label>
                            </span>
                                <span>
                                <input type="radio" name="sha" id="pbkdfSHA-384" value="SHA-384"/><label
                                        for="pbkdfSHA-384">SHA-384</label>
                            </span>
                                <span>
                                <input type="radio" name="sha" id="pbkdfSHA-512" value="SHA-512"/><label
                                        for="pbkdfSHA-512">SHA-512</label>
                            </span>
                        </form>
                    </div>
                    <div class="line">
                        <label>Length</label>
                        <form id="lengthForm" class="lineRadios">
                            <span>
                                <input type="radio" name="length" value="128" id="length128"/>
                                <label for="length128">128</label>
                            </span>
                            <span>
                                <input type="radio" name="length" value="256" id="length256"/><label
                                    for="length256">256</label>
                            </span>                            
                        </form>
                    </div>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-pbkdf2-options', GmkPbkdf2Options);
