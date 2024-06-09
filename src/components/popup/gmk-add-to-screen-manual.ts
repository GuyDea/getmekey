import {css, html} from "/src/utils/helper-functions.js";

export class GmkAddToScreenManual extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    private _styles() {
        return css`
    `
    }

    private _render() {
        return html`
            <style>${this._styles()}</style>   
            <p>Sorry, it seems that <b>On demand screen placement</b> is not supported on platform that you are using.</p>
            <p>Please, follow the steps specific for your platform to do so.</p>
            <p>Examples for most used platforms:</p>
            <ul>
                <li><a href="https://support.apple.com/en-il/guide/iphone/iph42ab2f3a7/ios" target="_blank">Safari</a> Chapter: Add a website icon to your Home Screen)</li>
                <li><a href="https://support.mozilla.org/en-US/kb/add-web-page-shortcuts-your-home-screen" target="_blank">Firefox</a></li>
            </ul>
        `
    }
}

customElements.define('gmk-add-to-screen-manual', GmkAddToScreenManual);
