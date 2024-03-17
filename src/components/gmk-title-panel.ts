import {html, css} from "../helper-functions.js";

export class GmkTitlePanel extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
    }
    private styles = css`
        .content{
            border: 1px solid var(--color-1);
            border-radius: 1rem;
        }
        .title {
            color: var(--color-1);
            text-align: center;
            padding-bottom: .5em;
            font-size: 12px;
        }
    `

    render(){
        return html`
            <style>${this.styles}</style>
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