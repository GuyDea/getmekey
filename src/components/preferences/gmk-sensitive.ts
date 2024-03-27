import {comp, css, fixVal, html, toggleDisabledPanel} from "/src/helper-functions.js";
import '/src/components/gmk-title-panel.js';
import '/src/components/icons/gmk-info-icon.js';
import {globalStyles} from "/src/styles/global-styles.js";
import {state, StateDef, Subscriber} from "/src/state/state.js";

export class GmkSensitive extends HTMLElement {
    private _subs: Subscriber<StateDef>[] = [];
    private _remember = comp<HTMLInputElement>(this,'#remember');
    private _unrestricted = comp<HTMLInputElement>(this,'#unrestricted');
    private _minutes = comp<HTMLInputElement>(this, '#minutes');
    private _minutesRange = comp<HTMLInputElement>(this, '#minutesRange');
    private _minutesPanel = comp(this, '#minutesPanel');
    private _rememberPanel = comp(this, '#rememberPanel');


    constructor() {
        super();
        const opts = () => state.value.userPreferences.sensitive;
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
        this._remember().addEventListener('input', () => state.update(s => opts().remember = this._remember().checked));
        this._unrestricted().addEventListener('input', () => state.update(s => opts().unrestrictedMode = this._unrestricted().checked));
        this._subs.push(state.subscribe(s => {
            this._remember().checked = opts().remember;
            this._unrestricted().checked = opts().unrestrictedMode;
            this._minutesRange().setAttribute('min', opts().minRememberDurationM.toString());
            this._minutesRange().setAttribute('max', opts().maxRememberDurationM.toString());
            this._minutes().value = opts().rememberDurationM.toString();
            this._minutesRange().value = opts().rememberDurationM.toString();
            toggleDisabledPanel(this._rememberPanel(), !s.userPreferences.saving.allowRecall);
            toggleDisabledPanel(this._minutesPanel(), !s.userPreferences.sensitive.remember);
        }, {
            diffMatcher: s => JSON.stringify({
                sensitive: s.userPreferences.sensitive,
                saving: s.userPreferences.saving
            }),
            dispatchImmediately: true
        }));
        this._minutesRange().addEventListener('input', () => state.update(s => opts().rememberDurationM = Number(this._minutesRange().value)));
        this._minutes().addEventListener('change', () => state.update(s => opts().rememberDurationM = fixVal(opts().minRememberDurationM, opts().maxRememberDurationM, this._minutes())));
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
            <gmk-title-panel color="var(--color-danger)">
                <span slot="title">Sensitive</span>
                <div slot="content" class="settingsColumn">                   
                    <gmk-title-panel id="rememberPanel" class="disableable">
                        <span slot="title">Remember Recalled Secret</span>
                        <div slot="content" class="settingsColumn" >
                            <div class="checkboxPanel line lineCenter">
                                <input type="checkbox" id="remember"><label for="remember">Enabled</label>
                            </div>
                            <div class="line lineCenter" id="minutesPanel">
                                <label for="minutes">Minutes</label>
                                <input id="minutes" type="number" class="short">
                                <input id="minutesRange" type="range">
                            </div>
                        </div>                        
                    </gmk-title-panel>
                    <div class="checkboxPanel line lineCenter">
                        <input type="checkbox" id="unrestricted"><label for="unrestricted">Unrestricted Mode</label>
                    </div>
                    <div style="display: flex; justify-content: center;">
                        <button class="gmkButton">Purge All</button>
                    </div>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-sensitive', GmkSensitive);
