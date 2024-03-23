import {comp, css, html} from "/src/helper-functions.js";
import '/src/components/gmk-title-panel.js'
import '/src/components/gmk-subpage-container.js';
import '/src/components/password-options/gmk-sha-options.js';
import '/src/components/password-options/gmk-pbkdf2-options.js';
import '/src/components/password-options/gmk-argon2-options.js';
import '/src/components/password-options/gmk-scrypt-options.js';
import {globalStyles} from "/src/styles/global-styles.js";
import {Algo, State, Subscriber} from "/src/state.js";

export class GmkAlgoSelection extends HTMLElement {
    private _subs: Subscriber[] = [];

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
        const algoOptions = comp(this, '#algoOptions');
        comp(this, '#algoSelectionPanel')().addEventListener('change', ev => {
            const selectedAlgo = (ev.target as HTMLInputElement).getAttribute('id')! as Algo;
            State.value.passwordGeneration.selectedAlgo = selectedAlgo;
            State.notifyChange();
            algoOptions().setAttribute('show', selectedAlgo)
        });
        setTimeout(() => comp<HTMLInputElement>(this, `#${State.value.passwordGeneration.selectedAlgo}`)().click());
        this._subs.push(State.subscribe(s => {
            comp(this, '#error')().innerHTML = s.passwordGenerationError ?? '';
            comp(this, '#error')().style.display = s.passwordGenerationError ? 'block' : 'none'
        }, {
            dispatchImmediately: true,
            diffMatcher: s => s.passwordGenerationError ?? ''
        }))
    }

    disconnectedCallback() {
        this._subs.forEach(s => State.unsubscribe(s));
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
        #error {
            text-align: center;
            display: block;
            font-size: 1.2rem;
            font-weight: bolder;
            color: var(--color-danger);
        }
    `

    render() {
        return html`
            <style>${globalStyles}${this.styles}</style>

            <gmk-title-panel>
                <span slot="title">Algorithm Selection</span>
                <div slot="content" class="mainContent">
                    <form id="algoSelectionPanel">
                        <div><input type="radio" id="SHA" name="algo"><label for="SHA">SHA</label>
                        </div>
                        <div><input type="radio" id="PBKDF2" name="algo"><label for="PBKDF2">PBKDF2</label>
                        </div>
                        <div><input type="radio" id="Argon2" name="algo"><label for="Argon2">Argon2</label>
                        </div>
                        <div><input type="radio" id="Scrypt" name="algo"><label for="Scrypt">Scrypt</label>
                        </div>
                    </form>
                    <div id="algoOptions">
                        <gmk-sha-options type="SHA"></gmk-sha-options>
                        <gmk-pbkdf2-options type="PBKDF2"></gmk-pbkdf2-options>
                        <gmk-argon2-options type="Argon2"></gmk-argon2-options>
                        <gmk-scrypt-options type="Scrypt"></gmk-scrypt-options>
                    </div>
                    <div id="error">
                    </div>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-algo-selection', GmkAlgoSelection);
