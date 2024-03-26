import {comp, css, html} from "/src/helper-functions.js";
import '/src/components/gmk-title-panel.js';
import '/src/components/icons/gmk-info-icon.js';
import {globalStyles} from "/src/styles/global-styles.js";
import {State, Subscriber} from "/src/state/state.js";

export class GmkVisibility extends HTMLElement {
    private _subs: Subscriber[] = [];
    private _topSecret = comp<HTMLInputElement>(this,'#topSecret');
    private _hideInfo = comp<HTMLInputElement>(this,'#hideInfo');
    
    constructor() {
        super();
        const opts = () => State.value.userPreferences.visibility;
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
        this._topSecret().addEventListener('input', () => State.update(s => opts().topSecret = this._topSecret().checked));
        this._hideInfo().addEventListener('input', () => State.update(s => opts().hideInfo = this._hideInfo().checked));
        this._subs.push(State.subscribe(s => {
            this._topSecret().checked = opts().topSecret;
            this._hideInfo().checked = opts().hideInfo;
        }, {
            diffMatcher: s => JSON.stringify(s.userPreferences.visibility),
            dispatchImmediately: true
        }))
    }

    disconnectedCallback() {
        this._subs.forEach(s => State.unsubscribe(s));
    }

    private _styles() {
        return css`
    `
    }

    private _render() {
        return html`
            <style>${globalStyles}${this._styles()}</style>
            <gmk-title-panel>
                <span slot="title">Visibility</span>
                <div slot="content" class="settingsColumn">
                    <div class="line lineCenter">
                        <input type="checkbox" id="topSecret"><label for="topSecret">Top-Secret
                        Mode</label>
                    </div>
                    <div class="line lineCenter">
                        <input type="checkbox" id="hideInfo"><label for="hideInfo">Hide Info Button</label>
                    </div>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-visibility', GmkVisibility);