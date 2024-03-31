import {comp, css, fixVal, html, toggleDisabledPanel} from "/src/utils/helper-functions.js";
import '/src/components/gmk-title-panel.js';
import '/src/components/gmk-info-icon.js';
import {globalStyles} from "/src/styles/global-styles.js";
import {state, Subscriber} from "/src/state/state-holder.js";
import {GmkState} from "/src/state/gmk-state-type.js"

export class GmkSensitive extends HTMLElement {
    private _subs: Subscriber<GmkState>[] = [];
    private _unrestricted = comp<HTMLInputElement>(this,'#unrestricted');

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
    }

    connectedCallback() {
        const opts = () => state.value.userPreferences.sensitive;
        this._unrestricted().addEventListener('input', () => state.update(s => opts().unrestrictedMode = this._unrestricted().checked));
        this._subs.push(state.subscribe(s => {
            this._unrestricted().checked = opts().unrestrictedMode;
        }, {
            diffMatcher: s => JSON.stringify({
                sensitive: s.userPreferences.sensitive,
                saving: s.userPreferences.saving
            }),
            dispatchImmediately: true
        }));

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
                    <div class="checkboxPanel line lineCenter">
                        <input type="checkbox" id="unrestricted" class="danger"><label for="unrestricted" class="danger">Unrestricted Mode</label>
                    </div>
                    
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-sensitive', GmkSensitive);
