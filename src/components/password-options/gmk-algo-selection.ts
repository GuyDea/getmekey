import {comp, css, html} from "/src/utils/helper-functions.js";
import '/src/components/gmk-title-panel.js'
import '/src/components/gmk-subpage-container.js';
import '/src/components/password-options/gmk-sha-options.js';
import '/src/components/password-options/gmk-pbkdf2-options.js';
import '/src/components/password-options/gmk-argon2-options.js';
import '/src/components/password-options/gmk-scrypt-options.js';
import {globalStyles} from "/src/styles/global-styles.js";
import {Subscriber} from "/src/state/state-holder.js";
import '/src/components/password-options/gmk-generation-duration.js';
import {Algo, GmkState} from "/src/state/gmk-state-type.js"
import {state} from "/src/state/initial-state.js"

export class GmkAlgoSelection extends HTMLElement {
    private _subs: Subscriber<GmkState>[] = [];
    private _shadowRoot?: ShadowRoot;

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this._subs.push(state.subscribe(s => {
            this._shadowRoot!.innerHTML = this.render();
            const algoOptions = comp(this, '#algoOptions');
            comp(this, '#algoSelectionPanel')().addEventListener('change', ev => {
                const selectedAlgo = (ev.target as HTMLInputElement).getAttribute('id')! as Algo;
                state.value.hashingOptions.selectedAlgo = selectedAlgo;
                state.notifyChange();
                algoOptions().setAttribute('show', selectedAlgo)
            });
            setTimeout(() => comp<HTMLInputElement>(this, `#${state.value.hashingOptions.selectedAlgo}`)().click());
        }, {
            dispatchImmediately: true,
            diffMatcher: s => JSON.stringify(s.internals),
        }));
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
        #algoSelectionPanel {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            gap: .5rem;
            justify-content: start;
        }
        #algoOptions > * {
            display: none;
        }
        #algoOptions[show=SHA] > [type=SHA],
        #algoOptions[show=PBKDF2] > [type=PBKDF2],
        #algoOptions[show=Argon2] > [type=Argon2],
        #algoOptions[show=Scrypt] > [type=Scrypt]
        {
            display: block;
        } 
    `

    render() {
        return html`
            <style>${globalStyles}${this.styles}</style>

            <gmk-title-panel infopage="info-hash-selection">
                <span slot="title">Hash Function</span>
                <div slot="content" class="mainContent">
                    <form id="algoSelectionPanel">
                        ${
                            state.value.internals.enabledAlgos.map(a => html`
                                    <div><input type="radio" id="${a}" name="algo"><label for="${a}">${a}</label>
                                    </div>
                                `).join('')
                        }
                    </form>
                    <div id="algoOptions">
                        <gmk-sha-options type="SHA"></gmk-sha-options>
                        <gmk-pbkdf2-options type="PBKDF2"></gmk-pbkdf2-options>                        
                        <gmk-argon2-options type="Argon2"></gmk-argon2-options>
                        <gmk-scrypt-options type="Scrypt"></gmk-scrypt-options>
                    </div>
                    <gmk-generation-duration></gmk-generation-duration>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-algo-selection', GmkAlgoSelection);
