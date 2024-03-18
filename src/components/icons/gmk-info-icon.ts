import {comp, html} from "/src/helper-functions.js";
import {Elements} from "/src/elements.js";

export class GmkInfoIcon extends HTMLElement {
    constructor() {
        super();
        const color = this.getAttribute('color') ?? 'var(--color-1)';
        const size = this.getAttribute('size') ?? 'var(--info-icon-size)';
        this.attachShadow({mode: 'open'}).innerHTML = html`
            <style>
                :host {
                    color: ${color};         
                }
            </style>
            <svg viewBox="0 0 100 100" style="width: ${size}; height: ${size}">
                <path id="path" d=""
                      style="fill: currentColor; stroke:none;"></path>
            </svg>`;
        comp<SVGPathElement>(this, '#path')().setAttribute('d', Elements.iconInfoPath().getAttribute('d')!)
    }
}

customElements.define('gmk-info-icon', GmkInfoIcon);