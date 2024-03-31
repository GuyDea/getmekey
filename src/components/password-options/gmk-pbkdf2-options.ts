import {comp, css, fixVal, html} from "/src/utils/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";
import '/src/components/gmk-title-panel.js';
import {state, Subscriber} from "/src/state/state-holder.js";
import {GmkState} from "/src/state/gmk-state-type.js"

export class GmkPbkdf2Options extends HTMLElement {
    private _iterationsComp = comp<HTMLInputElement>(this, '#iterations');
    private _iterationsRangeComp = comp<HTMLInputElement>(this, '#iterationsRange');
    private _subs: Subscriber<GmkState>[] = [];

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
    }

    connectedCallback(){
        const opts = () => state.value.passwordGeneration.algoOptions.pbkdf2;
        this._subs.push(state.subscribe(s => {
            this._iterationsRangeComp().setAttribute('min', opts().minIterations.toString());
            this._iterationsRangeComp().setAttribute('max', opts().maxIterations.toString());
            this._iterationsComp().value = opts().iterations.toString();
            this._iterationsRangeComp().value = opts().iterations.toString();
            comp(this, `#${opts().hash}`)().setAttribute('checked', '');
        }, {
            diffMatcher: s => JSON.stringify(s.passwordGeneration.algoOptions.pbkdf2),
            dispatchImmediately: true
        }));
        this._iterationsRangeComp().addEventListener('input', () => state.update(s => opts().iterations = Number(this._iterationsRangeComp().value)));
        this._iterationsComp().addEventListener('change', () => state.update(s => opts().iterations = fixVal(opts().minIterations, opts().maxIterations, this._iterationsComp())));
        comp(this, '#shaForm')().addEventListener('change', (ev) => state.update(() => opts().hash = (ev.target as HTMLInputElement).getAttribute('id') as any));
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
                                <input type="radio" name="sha" id="SHA-256"/><label
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
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-pbkdf2-options', GmkPbkdf2Options);
