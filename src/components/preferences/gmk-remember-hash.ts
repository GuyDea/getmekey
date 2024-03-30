import {comp, css, html, setAttrIfTrue, setClassIfTrue} from "/src/utils/helper-functions.js";
import '/src/components/gmk-title-panel.js';
import '/src/components/gmk-info-icon.js';
import {globalStyles} from "/src/styles/global-styles.js";
import {state, Subscriber} from "/src/state/state-holder.js";
import {GmkState} from "/src/state/state-type.js"

export class GmkRememberHash extends HTMLElement {
    private _subs: Subscriber<GmkState>[] = [];
    private _hashForm = comp<HTMLFormElement>(this,'#hashForm');
    private _onRecallSpan = comp<HTMLSpanElement>(this,'#onRecallSpan');

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
    }

    connectedCallback() {
        const opts = () => state.value.userPreferences.saving;
        this._hashForm().addEventListener('change', ev => state.update(s => opts().rememberHash = (ev.target as HTMLInputElement).getAttribute('id') as any));
        this._subs.push(state.subscribe(s => {
            const allowRecall = state.value.userPreferences.recall.allowRecall;
            if(!allowRecall && opts().rememberHash === "onRecall"){
                opts().rememberHash = 'never';
                state.notifyChange();
                return;
            }
            setClassIfTrue(!allowRecall, this._onRecallSpan(), 'disabled');
            comp<HTMLInputElement>(this, `#${opts().rememberHash}`)().checked = true;
        }, {
            diffMatcher: s => JSON.stringify({saving: s.userPreferences.saving, recall: s.userPreferences.recall}),
            dispatchImmediately: true
        }))
    }

    disconnectedCallback() {
        this._subs.forEach(s => state.unsubscribe(s));
    }

    private _styles() {
        return css`
            .hashSettingsPanel{
                display: flex;
                flex-direction: column;
                gap: .5rem;
            }
    `
    }

    private _render() {
        return html`
            <style>${globalStyles}${this._styles()}</style>
            <gmk-title-panel>
                <span slot="title">Remember <a href="/hash-settings">Hash Settings</a></span>
                <div slot="content" class="settingsColumn">
                    <div class="hashSettingsPanel">                        
                        <form id="hashForm" class="lineRadios">
                            <span>
                                <input type="radio" name="remember" id="never"/><label
                                    for="never">Never</label>
                            </span>
                            <span>
                                <input type="radio" name="remember" id="always"/><label
                                    for="always">Always</label>
                            </span>
                            <span id="onRecallSpan" class="disableable">
                                <input type="radio" name="remember" id="onRecall"/><label
                                    for="onRecall">On Recall</label>
                            </span>
                        </form>
                    </div>                    
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-remember-hash', GmkRememberHash);
