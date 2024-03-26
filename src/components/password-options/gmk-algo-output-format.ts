import {comp, css, fixVal, html} from "/src/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";
import {state, StateDef, Subscriber} from "/src/state/state.js";

export class GmkAlgoOutputFormat extends HTMLElement {
    private _subs: Subscriber<StateDef>[] = [];
    private _formatForm = comp<HTMLInputElement>(this, '#formatForm');
    private _positionForm = comp<HTMLInputElement>(this, '#positionForm');
    private _takeFirst = comp<HTMLInputElement>(this, '#takeFirst');
    private _securityText = comp<HTMLInputElement>(this, '#securityText');

    constructor() {
        super();

        this.attachShadow({mode: 'open'}).innerHTML = this.render();
        const opts = () => state.value.passwordGeneration.outputOptions;
        this._subs.push(state.subscribe(s => {
        }, {
            diffMatcher: s => JSON.stringify(s.passwordGeneration.outputOptions),
            dispatchImmediately: true,
        }));
        comp<HTMLInputElement>(this, `#${opts().format}`)().setAttribute('checked', '');
        comp<HTMLInputElement>(this, `#${opts().securityTextPosition}`)().setAttribute('checked', '');
        this._takeFirst().value = opts().takeFirst.toString();
        this._takeFirst().setAttribute('min', opts().minTakeFirst.toString());
        this._takeFirst().setAttribute('max', opts().maxTakeFirst.toString());
        this._takeFirst().addEventListener('input', () => state.update(() => opts().takeFirst = fixVal(opts().minTakeFirst, opts().maxTakeFirst, this._takeFirst())));
        this._securityText().value = opts().securityText;
        this._securityText().addEventListener('input', () => state.update(() => opts().securityText = this._securityText().value))
        this._formatForm().addEventListener('change', ev => {
            opts().format = (ev.target as HTMLInputElement).getAttribute('id') as any;
            state.notifyChange();
        })
        this._positionForm().addEventListener('change', ev => {
            opts().securityTextPosition = (ev.target as HTMLInputElement).getAttribute('id') as any;
            state.notifyChange();
        })
    }

    disconnectedCallback() {
        this._subs.forEach(s => state.unsubscribe(s));
    }

    private styles = css`
        div[slot=content]{
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    `

    render() {
        return html`
            <style>${globalStyles}${this.styles}</style>
            <gmk-title-panel>
                <span slot="title">Password Output</span>
                <div slot="content">
                    <form id="formatForm" class="line">
                        <span class="label">Format</span>
                        <div class="lineRadios">
                            <input type="radio" name="format" id="base64"/><label
                                for="base64">Base-64</label>
                            <input type="radio" name="format" id="hex"/><label for="hex">Hex</label>
                        </div>
                    </form>
                    <div class="line lineCenter">
                        <label for="takeFirst" >Take First</label>
                        <input type="number" class="short" id="takeFirst" maxlength="2" minlength="2"><span>Characters</span>
                    </div>
                    <div class="line lineCenter">
                        <label for="securityText">Security Text</label>
                        <input id="securityText" type="text" class="short">
                    </div>                    
                    <div class="line">
                        <span class="label">Text Position</span>
                        <form id="positionForm" class="lineRadios">
                            <input type="radio" name="securityPart" id="prefix"/><label
                                for="prefix">Prefix</label>
                            <input type="radio" name="securityPart" id="suffix"/><label for="suffix">Suffix</label>
                        </form>
                    </div>
                    
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-algo-output-format', GmkAlgoOutputFormat);
