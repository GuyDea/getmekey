import {comp, css, html} from "/src/utils/helper-functions.js";
import {ToastSeverity} from "/src/services/toast-service.js";

export class GmkToast extends HTMLElement {
    private readonly _message: string;
    private readonly _ttl: number;
    private readonly _severity: ToastSeverity;
    private _fuze = comp(this,'#fuze');
    private _removed = false;

    constructor(message: string, severity: ToastSeverity, ttl: number) {
        super();
        this._message = message;
        this._ttl = ttl ?? 3_000;
        this._severity = severity ?? "INFO";
        this.attachShadow({mode: 'open'}).innerHTML = this._render();

    }

    connectedCallback() {
        this._fuze().addEventListener('animationend', () => {
            this._removed = true;
            const height = this.clientHeight;
            this.animate([
                    {height: height + 'px', transform: 'translateY(0)', opacity: '1'},
                    {height: '0', transform: `translateY(-${height}px)`, opacity: '0', marginBottom: 0}
                ],
                {
                    duration: 300, fill: "forwards", easing: 'linear'
                }).finished.then(() => this._close())
        })
    }

    get removed(): boolean {
        return this._removed;
    }

    get message(): string {
        return this._message;
    }

    get severity(): ToastSeverity {
        return this._severity;
    }

    public reset(){
        this._fuze().style.animation = 'none';
        requestAnimationFrame(() => this._fuze().style.removeProperty('animation'));
    }

    private _styles() {
        return css`
            :host{
                width: fit-content;
                margin-bottom: 1rem;
                animation: appear .3s forwards linear;
            }
            .mainPanel{
                font-size: 1.5rem;
                font-weight: lighter;
                padding: .5rem 1rem;
                border-radius: 1rem;
                background: ${this._severity === "INFO" ? 'var(--color-2)' : 'hsl(var(--color-danger-hue-val), 100%, 80%)'};
                box-shadow: var(--box-shadow-2);
                position: relative;
                box-sizing: border-box;
                overflow: hidden;
            }
            .message {
                
            }
            #fuze {
                height: 3px;
                width: 100%;
                background: ${this._severity === "INFO" ? 'var(--color-1)' : 'var(--color-danger)'};
                position: absolute;
                bottom: 0;
                left: 0;
                border-radius: 2rem;
                animation: burn ${this._ttl}ms forwards linear;
            }
            @keyframes burn {
                from{
                    width: 100%;
                }
                to{
                    width: 0;
                }
            }
            @keyframes appear {
                from{
                    opacity: 0;
                    transform: translateY(20px);
                }
                to{
                    opacity: 1;
                    transform: translateY(0);
                }
            }
    `
    }

    private _render() {
        return html`
            <style>${this._styles()}</style>
            <div class="mainPanel">
                <div class="message">${this._message}</div>
                <div id="fuze"></div>
            </div>
        `
    }

    private _close(){
        this.remove();
    }
}

customElements.define('gmk-toast', GmkToast);
