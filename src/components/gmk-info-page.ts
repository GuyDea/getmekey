import {css, html} from "/src/utils/helper-functions.js";
import '/src/components/gmk-subpage-container.js';
import {infoValues} from "/src/services/infos.js"

export default class GmkInfoPage extends HTMLElement {
    private readonly _header: string;
    private readonly _content: string;

    constructor(path: string) {
        super();
        const infoData = infoValues.get(path);
        this._header = infoData?.header ?? 'Sorry';
        this._content = infoData?.content ?? 'Page not found';
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    private _styles() {
        return css`
            * {
                white-space: normal;
            }
    `
    }

    private _render() {
        return html`
            <style>${this._styles()}</style>
            <gmk-subpage-container>
                <span slot="headerText">${this._header}</span>
                <div slot="content">
                    ${this._content}
                </div>
            </gmk-subpage-container>
        `
    }
}

customElements.define('gmk-info-secret', GmkInfoPage);
