import {css, html} from "/src/helper-functions.js";
import '/src/components/gmk-title-panel.js'
import '/src/components/gmk-subpage-container.js';
import '/src/components/password-options/gmk-sha-options.js';
import '/src/components/password-options/gmk-pbkdf2-options.js';
import '/src/components/password-options/gmk-argon2-options.js';
import {globalStyles} from "/src/styles/global-styles.js";

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
            <style>${globalStyles}${this.styles}</style>

            <gmk-title-panel>
                <span slot="title">Algorithm Selection</span>
                <div slot="content" class="mainContent">
                    <div class="algoSelectionPanel">
                        <div><input type="radio" id="sha" name="algo" checked><label for="sha">SHA</label>
                        </div>
                        <div><input type="radio" id="pbkdf2" name="algo"><label for="pbkdf2">PBKDF2</label>
                        </div>
                        <div><input type="radio" id="argon2" name="algo"><label for="argon2">Argon2</label>
                        </div>
                        <div><input type="radio" id="bcrypt" name="algo"><label for="bcrypt">BCrypt</label>
                        </div>
                    </div>
                    <gmk-argon2-options></gmk-argon2-options>
                    <gmk-sha-options></gmk-sha-options>
                    <gmk-pbkdf2-options></gmk-pbkdf2-options>
                </div>
            </gmk-title-panel>
        `
    }
}

customElements.define('gmk-algo-selection', GmkAlgoSelection);
