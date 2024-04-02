import {comp, css, fixVal, html, toggleDisabledPanel} from "/src/utils/helper-functions.js";
import '/src/components/gmk-title-panel.js';
import {globalStyles} from "/src/styles/global-styles.js";
import {state, Subscriber} from "/src/state/state-holder.js"
import {GmkState} from "/src/state/gmk-state-type.js"

export class GmkRecall extends HTMLElement {
    private _subs: Subscriber<GmkState>[] = [];
    private _allowRecall = comp<HTMLInputElement>(this,'#allowRecall');
    private _remember = comp<HTMLInputElement>(this,'#remember');
    private _minutes = comp<HTMLInputElement>(this, '#minutes');
    private _minutesRange = comp<HTMLInputElement>(this, '#minutesRange');
    private _minutesPanel = comp(this, '#minutesPanel');
    private _rememberAndCopyPanel = comp(this, '#rememberAndCopyPanel');
    private _appPrefill = comp<HTMLInputElement>(this,'#appPrefill');

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
    }

    connectedCallback() {
        const opts = () => state.value.userPreferences.recall;
        this._remember().addEventListener('input', () => state.update(s => opts().remember = this._remember().checked));
        this._allowRecall().addEventListener('input', () => state.update(s => opts().allowRecall = this._allowRecall().checked));
        this._subs.push(state.subscribe(s => {
            this._remember().checked = opts().remember;
            this._minutesRange().setAttribute('min', opts().minRememberDurationM.toString());
            this._minutesRange().setAttribute('max', opts().maxRememberDurationM.toString());
            this._minutes().value = opts().rememberDurationM.toString();
            this._minutesRange().value = opts().rememberDurationM.toString();
            this._appPrefill().checked = opts().appPrefill;
            this._allowRecall().checked = opts().allowRecall;
            toggleDisabledPanel(this._rememberAndCopyPanel(), !s.userPreferences.recall.allowRecall);
            toggleDisabledPanel(this._minutesPanel(), !s.userPreferences.recall.remember || !s.userPreferences.recall.allowRecall);
        }, {
            diffMatcher: s => JSON.stringify(s.userPreferences.recall),
            dispatchImmediately: true
        }));
        this._minutesRange().addEventListener('input', () => state.update(s => opts().rememberDurationM = Number(this._minutesRange().value)));
        this._minutes().addEventListener('change', () => state.update(s => opts().rememberDurationM = fixVal(opts().minRememberDurationM, opts().maxRememberDurationM, this._minutes())));
        this._appPrefill().addEventListener('input', () => state.update(s => opts().appPrefill = this._appPrefill().checked));

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
                <span slot="title">Secret Recall</span>
                <div slot="content" class="settingsColumn">
                    <div class="line lineCenter">
                        <input type="checkbox" id="allowRecall"><label for="allowRecall">Allow
                        Secret Recall</label>
                    </div>
                    <div id="rememberAndCopyPanel" class="settingsColumn">
                        <div class="checkboxPanel line lineCenter">
                            <input type="checkbox" id="remember"><label for="remember">Remember Recalled Secret</label>
                        </div>
                        <div class="line lineCenter" id="minutesPanel">
                            <label for="minutes" style="margin-right: 0;">Remember For</label>
                            <input id="minutes" type="number" class="short">
                            mins
                            <input id="minutesRange" type="range">
                        </div>
                        <div class="line lineCenter disableable">
                            <input type="checkbox" id="appPrefill"><label for="appPrefill">Try App Name Prefill</label>
                        </div>                        
                    </div>
                    <div style="display: flex; justify-content: center;">
                        <button class="gmkButton gmkButtonPrimary">Purge All Recalled</button>
                    </div>
                </div>
                
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-recall', GmkRecall);
