import {comp, css, fixVal, html} from "/src/utils/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";
import '/src/components/gmk-title-panel.js';
import {state, Subscriber} from "/src/state/state-holder.js";
import {GmkState} from "/src/state/gmk-state-type.js"

export class GmkArgon2Options extends HTMLElement {
    private _iterationsComp = comp<HTMLInputElement>(this, '#iterations');
    private _iterationsRangeComp = comp<HTMLInputElement>(this, '#iterationsRange');
    private _parallelComp = comp<HTMLInputElement>(this, '#parallel');
    private _parallelRangeComp = comp<HTMLInputElement>(this, '#parallelRange');
    private _costComp = comp<HTMLInputElement>(this, '#cost');
    private _costRangeComp = comp<HTMLInputElement>(this, '#costRange');
    private _lengthComp = comp<HTMLInputElement>(this, '#length');
    private _lengthRangeComp = comp<HTMLInputElement>(this, '#lengthRange');
    private _subs: Subscriber<GmkState>[] = [];
    
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();

    }

    connectedCallback(){
        const opts = () => state.value.passwordGeneration.algoOptions.argon2;
        this._subs.push(state.subscribe(s => {
            this._iterationsRangeComp().setAttribute('min', opts().minIterations.toString());
            this._iterationsRangeComp().setAttribute('max', opts().maxIterations.toString());
            this._iterationsComp().value = opts().iterations.toString();
            this._iterationsRangeComp().value = opts().iterations.toString();
            this._parallelRangeComp().setAttribute('min', opts().minParallel.toString());
            this._parallelRangeComp().setAttribute('max', opts().maxParallel.toString());
            this._parallelComp().value = opts().parallel.toString();
            this._parallelRangeComp().value = opts().parallel.toString();
            this._costRangeComp().setAttribute('min', opts().minCost.toString());
            this._costRangeComp().setAttribute('max', opts().maxCost.toString());
            this._costComp().value = opts().cost.toString();
            this._costRangeComp().value = opts().cost.toString();
            this._lengthRangeComp().setAttribute('min', opts().minLength.toString());
            this._lengthRangeComp().setAttribute('max', opts().maxLength.toString());
            this._lengthComp().value = opts().length.toString();
            this._lengthRangeComp().value = opts().length.toString();

        }, {
            diffMatcher: s => JSON.stringify(s.passwordGeneration.algoOptions.argon2),
            dispatchImmediately: true
        }));
        this._iterationsRangeComp().addEventListener('input', () => state.update(s => opts().iterations = Number(this._iterationsRangeComp().value)));
        this._iterationsComp().addEventListener('input', () => state.update(s => opts().iterations = fixVal(opts().minIterations, opts().maxIterations, this._iterationsComp())));
        this._parallelRangeComp().addEventListener('input', () => state.update(s => opts().parallel = Number(this._parallelRangeComp().value)));
        this._parallelComp().addEventListener('input', () => state.update(s => opts().parallel = fixVal(opts().minParallel, opts().maxParallel, this._parallelComp())));
        this._costRangeComp().addEventListener('input', () => state.update(s => opts().cost = Number(this._costRangeComp().value)));
        this._costComp().addEventListener('input', () => state.update(s => opts().cost = fixVal(opts().minCost, opts().maxCost, this._costComp())));
        this._lengthRangeComp().addEventListener('input', () => state.update(s => opts().length = Number(this._lengthRangeComp().value)));
        this._lengthComp().addEventListener('input', () => state.update(s => opts().length = fixVal(opts().minLength, opts().maxLength, this._lengthComp())));
        comp(this, '#versionForm')().addEventListener('change', (ev) => {
            opts().version = (ev.target as HTMLInputElement).getAttribute('id') as any;
            state.notifyChange();
        })
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
                <div slot="title">Argon2 Options</div>
                <div slot="content" class="verticalItems">
                    <div class="line lineCenter">
                        <label for="cost">Cost</label>
                        <input id="cost" type="number" class="short">
                        <input id="costRange" type="range">
                    </div>
                    <div class="line lineCenter">
                        <label for="parallel">Parallel</label>
                        <input id="parallel" type="number" class="short">
                        <input id="parallelRange" type="range">
                    </div>
                    <div class="line lineCenter">
                        <label for="length">Length</label>
                        <input id="length" type="number" class="short">
                        <input id="lengthRange" type="range">
                    </div>
                    <div class="line lineCenter">
                        <label for="iterations">Iterations</label>
                        <input id="iterations" type="number" class="short">
                        <input id="iterationsRange" type="range">
                    </div>                    
                    <div class="line">
                        <label>Version</label>
                        <form id="versionForm" class="lineRadios">
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
                        </form>
                    </div>                    
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-argon2-options', GmkArgon2Options);
