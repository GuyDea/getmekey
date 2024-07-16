import {comp, css, html} from "/src/utils/helper-functions.js";
import '/src/components/password-options/gmk-algo-output-format.js';
import '/src/components/password-options/gmk-algo-selection.js';
import '/src/components/password-options/gmk-sha-options.js';
import {globalStyles} from "/src/styles/global-styles.js";
import {state} from "/src/state/initial-state.js";
import {Subscriber} from "/src/state/state-holder.js";
import {GmkState, HashingOptions} from "/src/state/gmk-state-type.js";

export class GmkPasswordOptionsPage extends HTMLElement {
    private _reviewButton = comp<HTMLInputElement>(this, '#reviewButton');
    private _subs: Subscriber<GmkState>[] = [];

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
    }

    private _getReviewUrl(hashingOptions: HashingOptions): string {
        const baseUrl = 'https://gchq.github.io/CyberChef/#recipe=';
        const formatting = `From_Hex('None')To_Base62('0-9A-Za-z')Head('Nothing (separate chars)',{{takeFirst}})Find_/_Replace({'option':'Regex','string':'(^.*$)'},'{{securityText}}$1',true,false,true,false)`
            .replace('{{takeFirst}}', hashingOptions.outputOptions.takeFirst.toString())
            .replace('{{securityText}}', hashingOptions.outputOptions.securityText);
        const appNameHere = '[App Name Here]';
        const secretHere = '[Secret Here]';
        let inputText = `${secretHere}`;
        let hashText;
        switch (hashingOptions.selectedAlgo) {
            case "SHA": {
                hashText = `SHA2('{{version}}',0,1)`
                    .replace('{{version}}', hashingOptions.algoOptions.sha.version === 'SHA-256' ? '256' : '512');
                inputText = `${hashingOptions.algoOptions.sha.saltPosition === 'prefix' ? `${appNameHere}${secretHere}` : `${secretHere}${appNameHere}`}`;
                break;
            }
            case "PBKDF2": {
                hashText = `Derive_PBKDF2_key({'option':'UTF8','string':'${secretHere}'},{{length}},{{iterations}},'{{hash}}',{'option':'UTF8','string':'${appNameHere}'})`
                    .replace('{{hash}}', hashingOptions.algoOptions.pbkdf2.hash.replace('-',''))
                    .replace('{{iterations}}', hashingOptions.algoOptions.pbkdf2.iterations.toString())
                    .replace('{{length}}', hashingOptions.algoOptions.pbkdf2.length.toString());
                inputText = '';
                break;
            }
            case "Scrypt": {
                hashText=`Scrypt({'option':'UTF8','string':'${appNameHere}'},{{cost}},{{block}},{{parallel}},{{length}})`
                    .replace('{{parallel}}', hashingOptions.algoOptions.scrypt.parallel.toString())
                    .replace('{{length}}', hashingOptions.algoOptions.scrypt.length.toString())
                    .replace('{{block}}', hashingOptions.algoOptions.scrypt.block.toString())
                    .replace('{{cost}}', Math.pow(2, hashingOptions.algoOptions.scrypt.cost).toString())
                break;
            }
            default: return ''
        }
        return `${baseUrl}${hashText}${formatting}&input=${btoa(inputText).replace(/=/g, '')}`;
    }

    connectedCallback() {

        this._subs.push(state.subscribe(s => {
            this._reviewButton().setAttribute('href', this._getReviewUrl(s.hashingOptions))
        }, {
            dispatchImmediately: true,
            diffMatcher: s => JSON.stringify(s.hashingOptions)
        }))
    }

    disconnectedCallback() {
        this._subs.forEach(s => state.unsubscribe(s));
    }

    private styles = css`
        div[slot=content] {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .reviewPanel{
            display: flex;
            justify-content: center;            
        }
    `

    render() {
        return html`
            <style>${globalStyles}${this.styles}</style>
            <gmk-subpage-container>
                <span class="label" slot="headerText">Hash Settings</span>
                <div slot="content">
                    <gmk-algo-selection></gmk-algo-selection>
                    <gmk-algo-output-format></gmk-algo-output-format>
                    <div class="reviewPanel">
                        <a id="reviewButton" target="_blank" class="gmkButton gmkButtonSecondary">Review Steps</a>
                        <gmk-info-icon page="info-review-steps"></gmk-info-icon>
                    </div>
                </div>
            </gmk-subpage-container>
        `
    }
}

customElements.define('gmk-password-options-page', GmkPasswordOptionsPage);
