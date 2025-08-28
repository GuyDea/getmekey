import {comp, css, html} from "/src/utils/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";
import {Subscriber} from "/src/state/state-holder.js";
import {GmkState} from "/src/state/gmk-state-type.js"
import {state} from "/src/state/initial-state.js"

export class GmkShaOptions extends HTMLElement {
    private _subs: Subscriber<GmkState>[] = [];

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
    }

    connectedCallback(){
        comp(this, '#shaVersionForm')().addEventListener('change', ev => {
            state.value.hashingOptions.algoOptions.sha.version = (ev.target as HTMLInputElement).getAttribute('value') as any;
            state.notifyChange();
        });
        comp(this, '#positionForm')().addEventListener('change', ev => {
            state.value.hashingOptions.algoOptions.sha.saltPosition = (ev.target as HTMLInputElement).getAttribute('id') as any;
            state.notifyChange();
        });
        this._subs.push(state.subscribe(s => {
            const opts = s.hashingOptions.algoOptions.sha;
            comp(this,`#${opts.version}`)().setAttribute('checked', '');
            comp(this,`#${opts.saltPosition}`)().setAttribute('checked', '');
        }, {
            dispatchImmediately: true,
            diffMatcher: s => JSON.stringify(s.hashingOptions.algoOptions.sha)
        }))
    }

    disconnectedCallback() {
        this._subs.forEach(s => state.unsubscribe(s));
    }

    private styles = css`
        .mainContent{
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .saltPositionPanel{
            gap: .5rem;
            width: 100%;
            flex: 1 1;
        }
    `

    render() {
        return html`
            <style>${globalStyles}${this.styles}</style>
            <gmk-title-panel showBorder="false">
                <span slot="title">SHA Options</span>
                <div slot="content" class="mainContent">
                    <div class="line" >
                        <span class="label">Version</span>
                        <form id="shaVersionForm" class="lineRadios">
                            <span>
                                <input type="radio" name="version" id="SHA-256" value="SHA-256"/><label
                                for="SHA-256">SHA-256</label>
                            </span>
                            <span>
                                <input type="radio" name="version" id="SHA-512" value="SHA-512"/><label
                                    for="SHA-512">SHA-512</label>
                            </span>
                        </form>
                    </div>
                    <div class="line" >
                        <span class="label">Salt Position</span>
                        <form id="positionForm" class="lineRadios">
                            <span>
                                <input type="radio" name="format" id="prefix"/><label
                                for="prefix">Prefix</label>
                            </span>
                            <span>
                                <input type="radio" name="format" id="suffix"/><label
                                    for="suffix">Suffix</label>
                            </span>
                        </form>
                    </div>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-sha-options', GmkShaOptions);
