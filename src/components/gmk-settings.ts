import {css, html} from "../helper-functions.js";
import {checkboxStyles} from "../styles/checkbox-styles.js";
import {globalStyles} from "../styles/global.js";
import {radioStyles} from "../styles/radio-styles.js";

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

        .algoSelectionPanel {
            border: 1px solid var(--color-1);
            border-radius: 1rem;
            padding: .5rem;
        }

        .algoSelectionTitle {
            color: var(--color-1);
            text-align: center;
            font-size: 14px;
            margin-bottom: .5rem;
        }
        div[slot=content]{
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        label[for=unrestrictedModeCheckbox]{
            color: var(--color-danger);
        }
        .unrestrictedModePanel > .questionMarkIcon{
            --question-mark-color: var(--color-danger);   
        }
    `

    render() {
        return html`
            <style>${this.styles}${checkboxStyles}${globalStyles}${radioStyles}</style>
            <gmk-subpage-container>
                <span slot="headerText">Settings</span>
                <div slot="content">
                    <div class="algoSelectionPanel">
                        <div class="algoSelectionTitle">Algorithm Selection</div>
                        <div style="display: flex; flex-direction: column; gap: 10px">
                            <input type="radio" id="sha" name="algo" checked><label for="sha">SHA-256</label>
                            <input type="radio" id="pbkdf2" name="algo"><label for="pbkdf2">PBKDF2</label>
                            <input type="radio" id="argon2" name="algo"><label for="argon2">Argon2</label>
                            <input type="radio" id="bcrypt" name="algo"><label for="bcrypt">BCrypt</label>
                        </div>
                    </div>
                    <div class="checkboxPanel">
                        <input type="checkbox" id="topSecretModeCheckbox"><label for="topSecretModeCheckbox">Top-Secret
                        Mode</label>
                        <gmk-question-mark-icon class="questionMarkIcon"></gmk-question-mark-icon>
                    </div>
                    <div class="checkboxPanel">
                        <input type="checkbox" id="disableStorageCheckbox"><label for="disableStorageCheckbox">Disable Storage</label>
                        <gmk-question-mark-icon class="questionMarkIcon"></gmk-question-mark-icon>
                    </div>
                    <div class="checkboxPanel unrestrictedModePanel">
                        <input type="checkbox" id="unrestrictedModeCheckbox"><label for="unrestrictedModeCheckbox">Unrestricted Mode</label>
                        <gmk-question-mark-icon color="var(--color-danger)" class="questionMarkIcon"></gmk-question-mark-icon>
                    </div>
                </div>
            </gmk-subpage-container>
        `
    }
}

customElements.define('gmk-settings', GmkSettings);