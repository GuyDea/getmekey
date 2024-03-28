import {comp, css, html, setAttrIfTrue, setClassIfTrue, toggleDisabledPanel} from "/src/utils/helper-functions.js";
import '/src/components/gmk-title-panel.js';
import {globalStyles} from "/src/styles/global-styles.js";
import {state, Subscriber} from "/src/state/state-holder.js";
import {GmkState} from "/src/state/state-type.js"

export class GmkConvenience extends HTMLElement {
    private _subs: Subscriber<GmkState>[] = [];
    private _copy = comp<HTMLInputElement>(this,'#copy');
    private _copyLine = comp(this, '#copyLine');

    constructor() {
        super();
        const opts = () => state.value.userPreferences.convenience;
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
        this._copy().addEventListener('input', () => state.update(s => opts().copyOnRecall = this._copy().checked));
        this._subs.push(state.subscribe(s => {
            this._copy().checked = opts().copyOnRecall;
            toggleDisabledPanel(this._copyLine(), !s.userPreferences.saving.allowRecall);
        }, {
            diffMatcher: s => JSON.stringify({
                convenience: s.userPreferences.convenience,
                saving: s.userPreferences.saving
            }),
            dispatchImmediately: true
        }))
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
            <gmk-title-panel>
                <span slot="title">Convenience</span>
                <div slot="content">
                    <div id="copyLine" class="line lineCenter disableable">
                        <input type="checkbox" id="copy"><label for="copy">Copy On Recalled</label>
                    </div>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-convenience', GmkConvenience);
