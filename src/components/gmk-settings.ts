import {css, html} from "../helper-functions.js";
import {checkboxStyles} from "../styles/checkbox-styles.js";
import {globalStyles} from "../styles/global.js";

export class GmkSettings extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
    }

    private styles = css`
        .checkboxPanel {
            display: flex;
            flex-direction: row;
            gap: 1rem;
            align-items: center;
        }

        label {
            font-size: 14px;
        }
    `

    render() {
        return html`
            <style>${this.styles}${checkboxStyles}${globalStyles}</style>
            <gmk-subpage-container>
                <span slot="headerText">Settings</span>
                <div slot="content">
                    <div class="checkboxPanel">
                        <input type="checkbox" id="topSecretModeCheckbox"><label for="topSecretModeCheckbox">Top-Secret Mode</label>
                        <gmk-question-mark-icon class="questionMarkIcon"></gmk-question-mark-icon>
                    </div>
                    <div class="algoSelectionPanel">
                        <div>Algorithm Selection</div>
                    </div>
                </div>
            </gmk-subpage-container>
        `
    }
}

customElements.define('gmk-settings', GmkSettings);