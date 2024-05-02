import {comp, css, fixVal, html} from "/src/utils/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";
import {Subscriber} from "/src/state/state-holder.js";
import {GmkState} from "/src/state/gmk-state-type.js"
import {state} from "/src/state/initial-state.js"

export class GmkScryptOptions extends HTMLElement {
    private _blockComp = comp<HTMLInputElement>(this, '#block');
    private _blockRangeComp = comp<HTMLInputElement>(this, '#blockRange');
    private _parallelComp = comp<HTMLInputElement>(this, '#parallel');
    private _parallelRangeComp = comp<HTMLInputElement>(this, '#parallelRange');
    private _costComp = comp<HTMLInputElement>(this, '#cost');
    private _costRangeComp = comp<HTMLInputElement>(this, '#costRange');
    private _costPowComp = comp<HTMLInputElement>(this, '#costPow');
    private _subs: Subscriber<GmkState>[] = [];

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();

    }

    connectedCallback(){
        const opts = () => state.value.passwordGeneration.algoOptions.scrypt;
        this._subs.push(state.subscribe(s => {
            this._blockRangeComp().setAttribute('min', opts().minBlock.toString());
            this._blockRangeComp().setAttribute('max', opts().maxBlock.toString());
            this._blockComp().value = opts().block.toString();
            this._blockRangeComp().value = opts().block.toString();
            this._parallelRangeComp().setAttribute('min', opts().minParallel.toString());
            this._parallelRangeComp().setAttribute('max', opts().maxParallel.toString());
            this._parallelComp().value = opts().parallel.toString();
            this._parallelRangeComp().value = opts().parallel.toString();
            this._costRangeComp().setAttribute('min', opts().minCost.toString());
            this._costRangeComp().setAttribute('max', opts().maxCost.toString());
            this._costComp().value = opts().cost.toString();
            this._costRangeComp().value = opts().cost.toString();
            this._costPowComp().innerHTML = Math.pow(2, opts().cost).toString()

        }, {
            diffMatcher: s => JSON.stringify(s.passwordGeneration.algoOptions.scrypt),
            dispatchImmediately: true
        }));

        this._blockRangeComp().addEventListener('input', () => state.update(s => opts().block = Number(this._blockRangeComp().value)));
        this._blockComp().addEventListener('change', () => state.update(s => opts().block = fixVal(opts().minBlock, opts().maxBlock, this._blockComp())));
        this._parallelRangeComp().addEventListener('input', () => state.update(s => opts().parallel = Number(this._parallelRangeComp().value)));
        this._parallelComp().addEventListener('change', () => state.update(s => opts().parallel = fixVal(opts().minParallel, opts().maxParallel, this._parallelComp())));
        this._costRangeComp().addEventListener('input', () => state.update(s => opts().cost = fixVal(opts().minCost, opts().maxCost, this._costRangeComp())));
        this._costComp().addEventListener('change', () => state.update(s => opts().cost = fixVal(opts().minCost, opts().maxCost, this._costComp())));
    }

    disconnectedCallback() {
        this._subs.forEach(s => state.unsubscribe(s));
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

    _render() {
        return html`
            <style>${globalStyles}${this.styles}</style>
            <gmk-title-panel showBorder="false">
                <span slot="title">Scrypt Options</span>
                <div slot="content" class="mainContent">
                    <div class="line lineCenter">
                        <label for="cost">Cost (2<span style="position: relative; bottom: .5em;">x</span> = <span id="costPow"></span>)</label>
                        <input id="cost" type="number" class="short">
                        <input id="costRange" type="range">
                    </div>
                    <div class="line lineCenter">
                        <label for="parallel">Parallel</label>
                        <input id="parallel" type="number" class="short">
                        <input id="parallelRange" type="range">
                    </div>
                    <div class="line lineCenter">
                        <label for="block">Block</label>
                        <input id="block" type="number" class="short">
                        <input id="blockRange" type="range">
                    </div>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-scrypt-options', GmkScryptOptions);
