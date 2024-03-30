import {comp, css, html} from "/src/utils/helper-functions.js";
import '/src/components/gmk-title-panel.js';
import {state, Subscriber} from "/src/state/state-holder.js";
import '/src/components/gmk-dot-loader.js';
import {GmkState} from "/src/state/state-type.js"

export class GmkGenerationDuration extends HTMLElement {
    private _subs: Subscriber<GmkState>[] = [];
    private _error = comp(this, '#error');
    private _duration = comp(this, '#duration');
    private _loader = comp(this, '#loader');
    private _noInfo = comp(this, '#noInfo');
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();

    }

    connectedCallback(){
        this._subs.push(state.subscribe(s => {
            this._error().style.display = 'none';
            this._duration().style.display = 'none';
            this._loader().style.display = 'none';
            this._noInfo().style.display = 'none';
            if(typeof s.generationSpeed === 'number'){
                this._duration().innerHTML = s.generationSpeed.toString() + ' ms to generate';
                this._duration().style.display = 'block';
            } else if(s.passwordGenerationError){
                this._error().style.display = 'block';
                this._error().innerHTML = s.passwordGenerationError;
            } else if(s.passwordGenerating){
                this._loader().style.display = 'block'
            } else {
                this._noInfo().style.display = 'block';
            }
        }, {
            dispatchImmediately: true,
            diffMatcher: s => JSON.stringify({
                error: s.passwordGenerationError,
                duration: s.generationSpeed,
                generating: s.passwordGenerating
            })
        }))
    }

    disconnectedCallback() {
        this._subs.forEach(s => state.unsubscribe(s));
    }

    private _styles() {
        return css`
            #error {
                color: var(--color-danger);
                font-weight: bolder;
            }         
            .content{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                height: 20px;
            }
        `
    }

    private _render() {
        return html`
            <style>${this._styles()}</style>
            <div slot="content" class="content">
                <div id="error"></div>
                <div id="duration"></div>
                <div id="loader">
                    <gmk-dot-loader style="height: 20px; display: block;"></gmk-dot-loader>
                </div>
                <div id="noInfo">No Password Generated Yet</div>
            </div>
        `
    }
}

customElements.define('gmk-generation-duration', GmkGenerationDuration);
