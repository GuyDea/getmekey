import {comp, css, html, setAttrIfTrue, setClassIfTrue} from "/src/helper-functions.js";
import '/src/components/gmk-title-panel.js';
import '/src/components/icons/gmk-info-icon.js';
import {globalStyles} from "/src/styles/global-styles.js";
import {State, Subscriber} from "/src/state/state.js";

export class GmkSaving extends HTMLElement {
    private _subs: Subscriber[] = [];
    private _allowRecall = comp<HTMLInputElement>(this,'#allowRecall');
    private _onRecallSpan = comp<HTMLSpanElement>(this,'#onRecallSpan');
    private _onRecallInput = comp<HTMLInputElement>(this,'#onRecall');
    private _hashForm = comp<HTMLFormElement>(this,'#hashForm');

    constructor() {
        super();
        const opts = () => State.value.userPreferences.saving;
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
        this._allowRecall().addEventListener('input', () => State.update(s => opts().allowRecall = this._allowRecall().checked));
        this._hashForm().addEventListener('change', ev => State.update(s => opts().rememberHash = (ev.target as HTMLInputElement).getAttribute('id') as any));
        this._subs.push(State.subscribe(s => {
            this._allowRecall().checked = opts().allowRecall;
            if(!opts().allowRecall && opts().rememberHash === "onRecall"){
                opts().rememberHash = 'never';
                State.notifyChange();
                return;
            }
            setClassIfTrue(!opts().allowRecall, this._onRecallSpan(), 'disabled');
            setAttrIfTrue(!opts().allowRecall, this._onRecallInput(), 'disabled');
            comp<HTMLInputElement>(this, `#${opts().rememberHash}`)().checked = true;
        }, {
            diffMatcher: s => JSON.stringify(s.userPreferences.saving),
            dispatchImmediately: true
        }))
    }

    disconnectedCallback() {
        this._subs.forEach(s => State.unsubscribe(s));
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
                <span slot="title">Saving</span>
                <div slot="content" class="settingsColumn">
                    <div class="line lineCenter">
                        <input type="checkbox" id="allowRecall"><label for="allowRecall">Allow
                        Secret Recall</label>
                    </div>
                    <div class="hashSettingsPanel">
                        <label class="collapsedLabel">Remember Hash Settings</label>
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

customElements.define('gmk-saving', GmkSaving);