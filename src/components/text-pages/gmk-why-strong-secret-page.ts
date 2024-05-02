import {css, html} from "/src/utils/helper-functions.js";
import '/src/components/gmk-subpage-container.js';

export class GmkWhyStrongSecretPage extends HTMLElement {
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
            * {
                white-space: normal;
            }
    `
    }

    private _render() {
        return html`
            <style>${this._styles()}</style>
            <gmk-subpage-container>
                <span slot="headerText">Why Do I Need Strong Secret?</span>
                <div slot="content">
                    <p>Are you wondering <i>"Why do I have to have strong secret, when generated password is super-strong anyway?"</i></p>
                    <p>Good question! And the answer is simple - it significantly reduces possible brute-force attack</p>
                    <p>Imagine someone (let's call him Mr. Attacker), who wants to hack your accounts. Mr. Attacker was able to acquire one
                        of your generated passwords via <a href="https://en.wikipedia.org/wiki/Phishing">phishing site</a>. 
                        Then, thanks to <a href="https://en.wikipedia.org/wiki/Social_engineering_(security)">social engineering</a>,
                        he was able to figure out, what algorithm you use to transform secret into password.
                    </p>
                    <p>Now with full knowledge of how you generate your passwords, all that Mr. Attacker is missing is - your secret</p>
                    <p>Let's do some napkin math with ballpark numbers</p>
                    <p>Also let's assume, that Mr. Attacker has access to a supercomputer, which can test 1 000 000 000 000 hash generations per second</p>
                    <p>If your password was weak, it would be cracked in seconds</p>
                    <p>However, if your secret is long, unique, unpredictable with all kinds of symbols incorporated,
                    this would represent ~1 000 000 000 000 000 000 000 000 000 000 000 000 possibilities</p>
                    <p>In short, it would take Mr. Attacker and his supercomputer trillions upon trillions of years to find the match</p>
                    <p><b>Lesson learned:</b> <i>Stop Mr. Attacker cold with secret that’s bold!</i></p>
                </div>
            </gmk-subpage-container>
        `
    }
}

customElements.define('gmk-why-strong-secret-page', GmkWhyStrongSecretPage);
