import {html, css} from "/src/helper-functions.js";

export class GmkTitlePanel extends HTMLElement{
    private readonly _color= this.getAttribute('color') ?? 'var(--color-1)';
    private readonly _showBoarder = this.getAttribute('showBoarder') !== 'false';

    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
    }

    private _styles(){
        return css`
        .content{
            border: ${this._showBoarder ? `1px solid ${this._color}` : 'none'};
            border-radius: 1rem;
        }
        .title {
            color: ${this._color};
            text-align: center;
            padding-bottom: ${this._showBoarder ? '.5em' : '0'};
            font-size: 12px;
        }
        .content {
            padding: .5rem;
        }
    `
    }


    private _render(){
        return html`
            <style>${this._styles()}</style>
            <div class="mainPanel">
                <div class="title">
                    <slot name="title"></slot>                    
                </div>
                <div class="content">
                    <slot name="content"></slot>
                </div>
            </div>
        `
    }
}

customElements.define('gmk-title-panel', GmkTitlePanel);