import {comp, css, fixVal, html, toggleDisabledPanel} from "/src/utils/helper-functions.js";
import '/src/components/gmk-title-panel.js';
import {globalStyles} from "/src/styles/global-styles.js";
import {state, Subscriber} from "/src/state/state-holder.js"
import {GmkState} from "/src/state/gmk-state-type.js"

export class GmkUsability extends HTMLElement {
    private _subs: Subscriber<GmkState>[] = [];
    private _appPrefill = comp<HTMLInputElement>(this,'#appPrefill');
    private _autoCopy = comp<HTMLInputElement>(this,'#autoCopy');


    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
    }

    connectedCallback() {
        const opts = () => state.value.userPreferences.usability;
        this._subs.push(state.subscribe(s => {
            this._appPrefill().checked = opts().appPrefill;
            this._autoCopy().checked = opts().autoCopy;
        }, {
            diffMatcher: s => JSON.stringify(s.userPreferences.recall),
            dispatchImmediately: true
        }));
        this._appPrefill().addEventListener('input', () => state.update(s => opts().appPrefill = this._appPrefill().checked));
        this._autoCopy().addEventListener('input', () => state.update(s => opts().autoCopy = this._autoCopy().checked));

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
                <span slot="title">Usability</span>
                <div slot="content" class="settingsColumn">
                    <div class="line lineCenter">
                        <input type="checkbox" id="autoCopy"><label for="autoCopy">Auto Copy</label>
                    </div>
                    <div class="line lineCenter disableable">
                        <input type="checkbox" id="appPrefill"><label for="appPrefill">App Name Prefill</label>
                    </div>                    
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-usability', GmkUsability);
