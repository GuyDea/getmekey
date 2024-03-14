export class GmkQuestionMarkIcon extends HTMLElement {
    constructor() {
        super();
        const color = this.getAttribute('color') ?? 'var(--color-1)';

        this.attachShadow({mode: 'open'}).innerHTML = `
        <svg viewBox="0 0 100 100">
            <path d="M 94.956261,50 A 44.956261,44.956261 0 0 1 50,94.956261 44.956261,44.956261 0 0 1 5.0437393,50 44.956261,44.956261 0 0 1 50,5.0437393 44.956261,44.956261 0 0 1 94.956261,50 Z m -43.679069,26.504281 0.03653,-0.04056 M 36.300332,36.572688 c 0,-17.436038 27.399336,-17.435892 27.399336,3.6e-5 0,12.454078 -12.45426,9.962934 -12.45426,24.907974"
                      style="fill: none; stroke:${color};stroke-width:var(--side-icon-width);stroke-linecap:round;stroke-dasharray:none;stroke-opacity:1"></path>
        </svg>`;
    }
}

customElements.define('gmk-question-mark-icon', GmkQuestionMarkIcon);