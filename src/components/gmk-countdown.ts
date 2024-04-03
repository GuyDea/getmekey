import {comp, css, html} from "/src/utils/helper-functions.js";
import {globalStyles} from "/src/styles/global-styles.js";
import {state, Subscriber} from "/src/state/state-holder.js"
import {GmkState} from "/src/state/gmk-state-type.js"
import {recallService} from "/src/services/recall-service.js";

export class GmkCountdown extends HTMLElement {
    private _subs: Subscriber<GmkState>[] = [];
    private _interval?: ReturnType<typeof setInterval>;
    private _clock = comp(this, '#clock');

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
    }

    private _formatDuration(milliseconds: number): string {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;

        const pad = (n: number) => n < 10 ? '0' + n : n;

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    private _reevaluate(){
        let timeToExpire = recallService.getRememberTtl();
        if(timeToExpire){
            this.style.display = '';
            this._clock().innerHTML = this._formatDuration(timeToExpire);
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
                recall: s.userPreferences.recall.allowRecall,
                remember: s.userPreferences.recall.remember
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
