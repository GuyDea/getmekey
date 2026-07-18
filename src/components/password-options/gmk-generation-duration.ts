import {comp, css, html} from "/src/utils/helper-functions.js";
import '/src/components/gmk-title-panel.js';
import {Subscriber} from "/src/state/state-holder.js";
import '/src/components/gmk-dot-loader.js';
import {GmkState} from "/src/state/gmk-state-type.js"
import {state} from "/src/state/initial-state.js"
import {popupService} from "/src/services/popup-service.js"
import {GmkPopupConfirmationContent} from "/src/components/popup/gmk-popup-confirmation-content.js"

export class GmkGenerationDuration extends HTMLElement {
    private _subs: Subscriber<GmkState>[] = [];
    private _error = comp(this, '#error');
    private _truncatedWarning = comp(this, '#truncatedWarning');
    private _duration = comp(this, '#duration');
    private _loader = comp(this, '#loader');
    private _noInfo = comp(this, '#noInfo');
    private _delayInfo = comp(this, '#delayInfo');
    private _abort?: AbortController;

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();

    }

    connectedCallback(){
        this._abort = new AbortController();
        this._subs.push(state.subscribe(s => {
            this._error().style.display = 'none';
            this._duration().style.display = 'none';
            this._loader().style.display = 'none';
            this._noInfo().style.display = 'none';
            this._delayInfo().style.display = 'none';
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
            if(s.userPreferences.visibility.topSecret && typeof s.generationSpeed === 'number'){
                this._delayInfo().style.display = 'block';
            }
            if(s.passwordShorterThanRequested && !s.passwordGenerating && s.passwordValue){
                const outputOptions = s.hashingOptions.outputOptions;
                const producedLength = s.passwordValue.length - outputOptions.securityText.length;
                this._truncatedWarning().innerHTML = `Note: output is only ${producedLength} characters — the selected hash cannot fill Take First = ${outputOptions.takeFirst}`;
                this._truncatedWarning().style.display = 'block';
            } else {
                this._truncatedWarning().style.display = 'none';
            }
        }, {
            dispatchImmediately: true,
            diffMatcher: s => JSON.stringify({
                error: s.passwordGenerationError,
                duration: s.generationSpeed,
                generating: s.passwordGenerating,
                topSecret: s.userPreferences.visibility.topSecret,
                truncated: s.passwordShorterThanRequested,
                passwordLength: s.passwordValue.length,
                takeFirst: s.hashingOptions.outputOptions.takeFirst
            })
        }));
        this._delayInfo().addEventListener('click', () => {
            popupService.open('Generation slowdown', new GmkPopupConfirmationContent({
                htmlText: html`
                    <div style="text-align: center">You are in <strong style="color: var(--color-danger)">Top-Secret
                        Mode</strong></div><br/>
                    <div style="text-align: center">Password generation is artificially padded to 500 ms so as not to
                        reveal the complexity of your hash function
                    </div>`,
                yesCallback: async () => {
                    popupService.close();
                },
                yesButtonName: 'OK'
            }));
        }, {signal: this._abort.signal})
    }

    disconnectedCallback() {
        this._subs.forEach(s => state.unsubscribe(s));
        this._subs = [];
        this._abort?.abort();
    }

    private _styles() {
        return css`
            #error {
                color: var(--color-danger);
                font-weight: bolder;
            }
            #truncatedWarning {
                color: var(--color-danger);
                font-size: .8em;
                text-align: center;
                display: none;
            }
            .content{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: row;
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
                <gmk-info-icon id="delayInfo" color="var(--color-danger)"></gmk-info-icon>
            </div>
            <div id="truncatedWarning"></div>
        `
    }
}

customElements.define('gmk-generation-duration', GmkGenerationDuration);
