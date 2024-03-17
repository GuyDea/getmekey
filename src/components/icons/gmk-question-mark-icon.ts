import {html} from "../../helper-functions.js";

export class GmkQuestionMarkIcon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = html`
            <style>
                :host {
                    color: var(--color, var(--color-1));         
                    --icon-width: var(--side-icon-width, 6)           
                }
            </style>
            <svg viewBox="0 0 100 100">
                <path d="m 51.277192,76.504281 0.03653,-0.04056 M 36.300332,36.572688 c 0,-17.436038 27.399336,-17.435892 27.399336,3.6e-5 0,12.454078 -12.45426,9.962934 -12.45426,24.907974"
                      style="fill: none; stroke:currentColor;stroke-width:var(--icon-width);stroke-linecap:round;stroke-dasharray:none;stroke-opacity:1"></path>
            </svg>`;
    }
}

customElements.define('gmk-question-mark-icon', GmkQuestionMarkIcon);