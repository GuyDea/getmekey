import {comp, html} from "/src/utils/helper-functions.js";
import {IndexElements} from "/src/index-related/index-elements.js";

export class GmkDotLoader extends HTMLElement {
    constructor() {
        super();
        const color = this.getAttribute('color') ?? 'var(--color-1)';
        this.attachShadow({mode: 'open'}).innerHTML = html`
            <style>
                :host {
                    color: ${color};      
                    display: block;
                }                
                svg{
                    height: 100%;
                    width: 100%;
                    max-height: 100%;
                    max-width: 100%;
                }
            </style>
            <svg viewBox="0 0 24 8">               
            </svg>`;
        comp<SVGPathElement>(this, 'svg')().innerHTML = IndexElements.dotsLoading().innerHTML;
    }
}

customElements.define('gmk-dot-loader', GmkDotLoader);