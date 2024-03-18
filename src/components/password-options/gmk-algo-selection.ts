import {css, html} from "/src/helper-functions.js";
import '/src/components/gmk-title-panel.js'
import {radioStyles} from "/src/styles/radio-styles.js";
import '/src/components/gmk-subpage-container.js';
import '/src/components/password-options/gmk-sha-options.js';

export class GmkAlgoSelection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
    }

    private styles = css`
        .mainContent{
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .algoSelectionPanel {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            gap: .5rem;
            justify-content: start;
        }
    `

    render() {
        return html`
            <style>${radioStyles}${this.styles}</style>

            <gmk-title-panel>
                <span slot="title">Algorithm Selection</span>
                <div slot="content" class="mainContent">
                    <div class="algoSelectionPanel">
                        <div><input type="radio" id="sha" name="algo" checked><label for="sha">SHA-256</label>
                        </div>
                        <div><input type="radio" id="pbkdf2" name="algo"><label for="pbkdf2">PBKDF2</label>
                        </div>
                        <div><input type="radio" id="argon2" name="algo"><label for="argon2">Argon2</label>
                        </div>
                        <div><input type="radio" id="bcrypt" name="algo"><label for="bcrypt">BCrypt</label>
                        </div>
                    </div>
                    <gmk-sha-options></gmk-sha-options>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-algo-selection', GmkAlgoSelection);
