import {comp, css, formatTime, html} from "/src/utils/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";
import {Subscriber} from "/src/state/state-holder.js"
import {GmkState} from "/src/state/gmk-state-type.js"
import {recallService} from "/src/services/recall-service.js";
import {state} from "/src/state/initial-state.js"

export class GmkCountdown extends HTMLElement {
    private _subs: Subscriber<GmkState>[] = [];
    private _interval?: ReturnType<typeof setInterval>;
    private _clock = comp(this, '#clock');

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
    }

    private _reevaluate(){
        let timeToExpire = recallService.getRememberTtl();
        if(timeToExpire){
            this.style.display = '';
            this._clock().innerHTML = formatTime(timeToExpire);
        } else {
            this.style.display = 'none';
            clearInterval(this._interval);
        }
    }

    private _tryStartingInterval(){
        clearInterval(this._interval);
        this._reevaluate();
        this._interval = setInterval(() => this._reevaluate(), 1000);
    }

    connectedCallback() {
        this._subs.push(state.subscribe(s => this._tryStartingInterval(), {
            dispatchImmediately: true,
            diffMatcher: s => JSON.stringify({
                expiry: s.secretExpiryDate,
                isRemembered: s.secretRemembered,
                isRecalled: s.secretRecalled,
                recallAllowed: s.userPreferences.recall.allowRecall,
                rememberAllowed: s.userPreferences.recall.remember
            })
        }))
    }

    disconnectedCallback() {
        this._subs.forEach(s => state.unsubscribe(s));
        clearInterval(this._interval);
    }

    private _styles() {
        return css`
    `
    }

    private _render() {
        return html`
            <style>${globalStyles}${this._styles()}</style>    
            <div id="clock" class="colorLabel"></div>
        `
    }
}

customElements.define('gmk-countdown', GmkCountdown);
