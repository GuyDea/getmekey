import {html} from "/src/utils/helper-functions.js";
import {state, Subscriber} from "/src/state/state-holder.js";
import {GmkState} from "/src/state/gmk-state-type.js"
import {infos} from "/src/services/infos.js";

export class GmkInfoIcon extends HTMLElement {
    private _subs: Subscriber<GmkState>[] = [];

    constructor() {
        super();
        const color = this.getAttribute('color') ?? 'var(--color-1)';
        const innerSize = this.getAttribute('size') ?? 16;
        this.attachShadow({mode: 'open'}).innerHTML = html`
            <style>
                :host {
                    color: ${color};  
                    height: 2rem;
                    width: 2rem;
                    display: grid;
                    place-items: center;
                    cursor: pointer;
                    transition: transform .5s;
                }
                :host(:hover){
                    transform: scale(1.2);
                }
            </style>
            <svg viewBox="0 0 100 100" style="width: ${innerSize}; height: ${innerSize}">
                <path id="path" d="M46.4 99.5c-3.5-1.1-6.5-4-7.8-7.7-.6-1.6-.6-3.4-.6-21 0-10.7-.2-19.5-.3-19.5-.3 0-4.1 3.2-4.8 4-1.3 1.6-3.3 1.4-4.4-.3-.6-.8-.6-1.1-.2-2.9a32 32 0 0 1 15-18.7c2.6-1.3 3.3-1.5 6-1.6 2.5-.1 3.4 0 5 .6 4 1.5 7 5.2 7.6 9.5.3 1.4.4 9.2.4 20.3l.1 18.1c.1.1 2.6-1.9 5-4.2 1.6-1.5 3.6-1.2 4.4.8 1 2.5-2 9.2-6.6 14.7a36 36 0 0 1-7.6 6.3c-3.6 2-7.7 2.6-11.2 1.6zm-2.8-74.6a13.3 13.3 0 0 1-8.2-6.9c-.8-1.7-1-2.3-1-5.4 0-3 .2-3.7 1-5.4 1.1-2.5 3.6-5 6.2-6.2 1.7-.9 2.4-1 5.3-1 3 0 3.5.1 5.4 1A12.8 12.8 0 0 1 57 20.6c-2.6 3.6-9 5.7-13.3 4.3z"
                      style="fill: currentColor; stroke:none;"></path>
            </svg>`;
        this.addEventListener('click', () => infos.openInfo(this.getAttribute('page')!));

    }

    connectedCallback() {
        this._subs.push(state.subscribe(s => this.style.display = s.userPreferences.visibility.hideInfo ? 'none' : 'grid', {
            dispatchImmediately: true,
            diffMatcher: s => s.userPreferences.visibility.hideInfo ? '1' : '0',
        }))
    }

    disconnectedCallback() {
        this._subs.forEach(s => state.unsubscribe(s));
    }
}

customElements.define('gmk-info-icon', GmkInfoIcon);