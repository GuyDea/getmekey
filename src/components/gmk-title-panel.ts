import {css, html} from "/src/utils/helper-functions.js";
import '/src/components/gmk-info-icon.js';

export class GmkTitlePanel extends HTMLElement{
    private readonly _color= this.getAttribute('color') ?? 'var(--color-1)';
    private readonly _showBorder = this.getAttribute('showBorder') !== 'false';
    private readonly _infoPage = this.getAttribute('infopage');

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
    }

    private _styles(){
        return css`
        .content{
            border: ${this._showBorder ? `1px solid ${this._color}` : 'none'};
            border-radius: 1rem;
        }
        .title {
            color: ${this._color};
            text-align: center;
            padding-bottom: ${this._showBorder ? '.5em' : '0'};
            font-size: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: .5rem;
            height: 2rem;
        }
        .content {
            padding: ${this._showBorder ? '.5rem' : '.5rem 0'};
        }
    `
    }


    private _render(){
        return html`
            <style>${this._styles()}</style>
            <div class="mainPanel">
                <div class="title">
                    <slot name="title"></slot>   
                    ${this._infoPage ? html`<gmk-info-icon color="${this._color}" page="${this._infoPage}"></gmk-info-icon>` : ''}
                </div>
                <div class="content">
                    <slot name="content"></slot>
                </div>
            </div>
        `
    }
}

customElements.define('gmk-title-panel', GmkTitlePanel);