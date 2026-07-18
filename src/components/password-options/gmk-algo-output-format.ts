import {comp, css, fixVal, html} from "/src/utils/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";
import {Subscriber} from "/src/state/state-holder.js";
import {GmkState} from "/src/state/gmk-state-type.js"
import {state} from "/src/state/initial-state.js"

export class GmkAlgoOutputFormat extends HTMLElement {
    private _subs: Subscriber<GmkState>[] = [];
    private _takeFirst = comp<HTMLInputElement>(this, '#takeFirst');
    private _securityText = comp<HTMLInputElement>(this, '#securityText');
    private _abort?: AbortController;

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
    }

    connectedCallback(){
        this._abort = new AbortController();
        const opts = () => state.value.hashingOptions.outputOptions;
        this._subs.push(state.subscribe(s => {
            const outputOptions = s.hashingOptions.outputOptions;
            this._takeFirst().setAttribute('min', outputOptions.minTakeFirst.toString());
            this._takeFirst().setAttribute('max', outputOptions.maxTakeFirst.toString());
            this._takeFirst().value = outputOptions.takeFirst.toString();
            this._securityText().value = outputOptions.securityText;
        }, {
            diffMatcher: s => JSON.stringify(s.hashingOptions.outputOptions),
            dispatchImmediately: true,
        }));
        this._takeFirst().addEventListener('change', () => state.update(() => opts().takeFirst = fixVal(opts().minTakeFirst, opts().maxTakeFirst, this._takeFirst())), {signal: this._abort.signal});
        this._securityText().addEventListener('input', () => state.update(() => opts().securityText = this._securityText().value), {signal: this._abort.signal})
    }

    disconnectedCallback() {
        this._subs.forEach(s => state.unsubscribe(s));
        this._subs = [];
        this._abort?.abort();
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
            <gmk-title-panel infopage="info-password-format">
                <span slot="title">Password Format</span>
                <div slot="content">
                    <form id="formatForm" class="line">
                        <span class="label">Hash encoded to <strong><a href="https://wikipedia.org/wiki/Base62" target="_blank">Base62</a></strong> text</span>
                    </form>
                    <div class="line lineCenter">
                        <label for="takeFirst" >Take First</label>
                        <input type="number" class="short" id="takeFirst" maxlength="2" minlength="2"><span>Characters</span>
                    </div>
                    <div class="line lineCenter">
                        <label for="securityText">Security Prefix</label>
                        <input id="securityText" type="text" class="short">
                    </div>                    
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-algo-output-format', GmkAlgoOutputFormat);
