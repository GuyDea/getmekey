import {css, html} from "/src/helper-functions.js";
import '/src/components/password-options/gmk-algo-output-format.js';
import '/src/components/password-options/gmk-algo-selection.js';
import '/src/components/password-options/gmk-sha-options.js';

export class GmkPasswordOptionsPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
    }

    private styles = css`
        div[slot=content] {
            display: flex;
            flex-direction: column;
            gap: var(--spacing);
            
        }
    `

    render() {
        return html`
            <style>${this.styles}</style>
            <gmk-subpage-container>
                <span class="label" slot="headerText">Password Generation</span>
                <div slot="content">
                    <gmk-algo-selection></gmk-algo-selection>
                    <gmk-algo-output-format></gmk-algo-output-format>
                </div>
            </gmk-subpage-container>
        `
    }
}

customElements.define('gmk-password-options-page', GmkPasswordOptionsPage);
