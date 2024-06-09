import {comp, css, html} from "/src/utils/helper-functions.js";
import '/src/components/gmk-subpage-container.js';
import {globalStyles} from "/src/styles/global-styles.js";
import {serviceWorkerService} from "/src/services/service-worker-service.js";
import {popupService} from "/src/services/popup-service.js";
import {GmkAddToScreenManual} from "/src/components/popup/gmk-add-to-screen-manual.js";

export class GmkInstallOptions extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this._render();
        comp(this, '#addToScreen')().addEventListener('click', ev => {
            if(serviceWorkerService.canRequestPwaInstall()){
                serviceWorkerService.promptPwaInstall();
            } else {
                popupService.open('Add To Screen', new GmkAddToScreenManual());
            }
        })
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    private _styles() {
        return css`
            .listColumn {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                align-items: center;
            }
            .installItem{
                width: calc(var(--app-width) - 100px);
                display: grid;
                grid-template: minmax(0, 1fr) / minmax(0, 2rem) minmax(0, 1fr) minmax(0, 2rem) ;
                padding: .5rem;
            }
            .installIcon{
                height: 2rem;
                width: 2rem;
            }
            .installText{
                align-self: center;
                justify-self: center;
                display: flex;
                flex-direction: column;
            }
            .comingSoon{
                color: var(--color-1);
                font-size: .8rem;
                text-align: center;
            }
            .itemName{
                text-align: center;
            }
    `
    }

    private _render() {
        return html`
            <style>${globalStyles}${this._styles()}</style>
            <gmk-subpage-container>
                <span slot="headerText">Install Options</span>
                <div slot="content" class="listColumn">
                    <button class="installItem gmkButton gmkButtonSecondary" id="addToScreen">
                        <svg class="installIcon" viewBox="0 0 100 100">
                            <path style="fill: var(--color-1)" d="M 73.939441,0.045455 28.484896,0 c -5,0 -9.090909,4.090909 -9.090909,9.090909 v 13.636364 c 0,2.5 2.045454,4.545454 4.545454,4.545454 2.5,0 4.545455,-2.045454 4.545455,-4.545454 V 18.181818 H 73.939441 V 81.818182 H 28.484896 v -4.545455 c 0,-2.5 -2.045455,-4.545454 -4.545455,-4.545454 -2.5,0 -4.545454,2.045454 -4.545454,4.545454 v 13.636359 c 0,5.000004 4.090909,9.090914 9.090909,9.090914 h 45.454545 c 5,0 9.09091,-4.09091 9.09091,-9.090914 V 9.090909 c 0,-5 -4.09091,-9.045454 -9.09091,-9.045454 z  M 42.12126,63.636364 c 2.5,0 4.545454,-2.045455 4.545454,-4.545455 V 36.363636 c 0,-2.5 -2.045454,-4.545454 -4.545454,-4.545454 H 19.393987 c -2.5,0 -4.545455,2.045454 -4.545455,4.545454 0,2.5 2.045455,4.545455 4.545455,4.545455 H 31.166714 L 8.9394412,63.136364 c -1.7727272,1.772727 -1.7727272,4.636363 0,6.409091 1.7727278,1.772727 4.6363638,1.772727 6.4090908,0 L 37.575805,47.318182 v 11.772727 c 0,2.5 2.045455,4.545455 4.545455,4.545455 z"></path>
                        </svg>
                        <div class="installText">
                            Add To Screen
                        </div>
                    </button>
                    <a class="installItem gmkButton gmkButtonSecondary" href="https://chromewebstore.google.com/detail/getmekey/ekgpdkjhglljcjfcedpjfahihdcpgicp" target="_blank">
                        <svg class="installIcon" viewBox="0 0 100 100">
                            <defs>
                                <linearGradient id="a" x1="3.2" x2="44.8" y1="15" y2="15"
                                                gradientTransform="matrix(2 0 0 2 0 0)" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stop-color="#d93025"/>
                                    <stop offset="1" stop-color="#ea4335"/>
                                </linearGradient>
                                <linearGradient id="b" x1="20.7" x2="41.5" y1="47.7" y2="11.7"
                                                gradientTransform="matrix(2 0 0 2 0 0)" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stop-color="#fcc934"/>
                                    <stop offset="1" stop-color="#fbbc04"/>
                                </linearGradient>
                                <linearGradient id="c" x1="26.6" x2="5.8" y1="46.5" y2="10.5"
                                                gradientTransform="matrix(2 0 0 2 0 0)" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stop-color="#1e8e3e"/>
                                    <stop offset="1" stop-color="#34a853"/>
                                </linearGradient>
                            </defs>
                            <circle cx="50" cy="50" r="25" style="fill:#fff;stroke-width:2.08333"/>
                            <path d="M6.7 75A50 50 0 1 0 25 6.7 50 50 0 0 0 6.7 75Zm65-37.5a25 25 0 1 1-34.2-9.2 25 25 0 0 1 34.2 9.2z"
                                  style="fill:none;stroke-width:2.08333"/>
                            <path d="M50 25h43.3a50 50 0 0 0-86.6 0l21.6 37.5A25 25 0 0 1 50 25z"
                                  style="fill:url(#a);stroke-width:2.08333"/>
                            <circle cx="50" cy="50" r="19.8" style="fill:#1a73e8;stroke-width:2.08333"/>
                            <path d="M71.6 62.5 50 100a50 50 0 0 0 43.3-75H50a25 25 0 0 1 21.6 37.5Z"
                                  style="fill:url(#b);stroke-width:2.08333"/>
                            <path d="M28.4 62.5 6.7 25A50 50 0 0 0 50 100l21.7-37.5a25 25 0 0 1-43.3 0Z"
                                  style="fill:url(#c);stroke-width:2.08333"/>
                        </svg>
                        <div class="installText">
                            Chrome Extension
                        </div>
                    </a>
                    <a class="installItem gmkButton gmkButtonSecondary">
                        <svg class="installIcon" viewBox="0 0 100 100">
                            <defs>
                                <radialGradient id="firefoxb" cx="-7907.2" cy="-8515.1" r="80.8"
                                                gradientTransform="matrix(1 0 0 1 9972.5 10659.4)"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset=".1" stop-color="#ffbd4f"/>
                                    <stop offset=".2" stop-color="#ffac31"/>
                                    <stop offset=".2" stop-color="#ff9d17"/>
                                    <stop offset=".3" stop-color="#ff980e"/>
                                    <stop offset=".4" stop-color="#ff563b"/>
                                    <stop offset=".5" stop-color="#ff3750"/>
                                    <stop offset=".7" stop-color="#f5156c"/>
                                    <stop offset=".8" stop-color="#eb0878"/>
                                    <stop offset=".9" stop-color="#e50080"/>
                                </radialGradient>
                                <radialGradient id="firefoxc" cx="-7936.7" cy="-8482.1" r="80.8"
                                                gradientTransform="matrix(1 0 0 1 9972.5 10659.4)"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset=".3" stop-color="#960e18"/>
                                    <stop offset=".4" stop-color="#b11927" stop-opacity=".7"/>
                                    <stop offset=".4" stop-color="#db293d" stop-opacity=".3"/>
                                    <stop offset=".5" stop-color="#f5334b" stop-opacity=".1"/>
                                    <stop offset=".5" stop-color="#ff3750" stop-opacity="0"/>
                                </radialGradient>
                                <radialGradient id="firefoxd" cx="-7927" cy="-8533.5" r="58.5"
                                                gradientTransform="matrix(1 0 0 1 9972.5 10659.4)"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset=".1" stop-color="#fff44f"/>
                                    <stop offset=".3" stop-color="#ffdc3e"/>
                                    <stop offset=".5" stop-color="#ff9d12"/>
                                    <stop offset=".5" stop-color="#ff980e"/>
                                </radialGradient>
                                <radialGradient id="firefoxe" cx="-7945.6" cy="-8461" r="38.5"
                                                gradientTransform="matrix(1 0 0 1 9972.5 10659.4)"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset=".4" stop-color="#3a8ee6"/>
                                    <stop offset=".5" stop-color="#5c79f0"/>
                                    <stop offset=".7" stop-color="#9059ff"/>
                                    <stop offset="1" stop-color="#c139e6"/>
                                </radialGradient>
                                <radialGradient id="firefoxf" cx="-7935.6" cy="-8491.5" r="20.4"
                                                gradientTransform="matrix(1 0 0 1 12619 9796.3)"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset=".2" stop-color="#9059ff" stop-opacity="0"/>
                                    <stop offset=".3" stop-color="#8c4ff3" stop-opacity=".1"/>
                                    <stop offset=".7" stop-color="#7716a8" stop-opacity=".5"/>
                                    <stop offset="1" stop-color="#6e008b" stop-opacity=".6"/>
                                </radialGradient>
                                <radialGradient id="firefoxg" cx="-7937.7" cy="-8518.4" r="27.7"
                                                gradientTransform="matrix(1 0 0 1 9972.5 10659.4)"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stop-color="#ffe226"/>
                                    <stop offset=".1" stop-color="#ffdb27"/>
                                    <stop offset=".3" stop-color="#ffc82a"/>
                                    <stop offset=".5" stop-color="#ffa930"/>
                                    <stop offset=".7" stop-color="#ff7e37"/>
                                    <stop offset=".8" stop-color="#ff7139"/>
                                </radialGradient>
                                <radialGradient id="firefoxh" cx="-7916" cy="-8536" r="118.1"
                                                gradientTransform="matrix(1 0 0 1 9972.5 10659.4)"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset=".1" stop-color="#fff44f"/>
                                    <stop offset=".5" stop-color="#ff980e"/>
                                    <stop offset=".6" stop-color="#ff5634"/>
                                    <stop offset=".7" stop-color="#ff3647"/>
                                    <stop offset=".9" stop-color="#e31587"/>
                                </radialGradient>
                                <radialGradient id="firefoxi" cx="-7927.2" cy="-8522.9" r="86.5"
                                                gradientTransform="matrix(0 1 -1 0 -5857.7 10592.1)"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stop-color="#fff44f"/>
                                    <stop offset=".1" stop-color="#ffe847"/>
                                    <stop offset=".2" stop-color="#ffc830"/>
                                    <stop offset=".3" stop-color="#ff980e"/>
                                    <stop offset=".4" stop-color="#ff8b16"/>
                                    <stop offset=".5" stop-color="#ff672a"/>
                                    <stop offset=".6" stop-color="#ff3647"/>
                                    <stop offset=".7" stop-color="#e31587"/>
                                </radialGradient>
                                <radialGradient id="firefoxj" cx="-7938.4" cy="-8508.2" r="73.7"
                                                gradientTransform="matrix(1 0 0 1 9972.5 10659.4)"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset=".1" stop-color="#fff44f"/>
                                    <stop offset=".5" stop-color="#ff980e"/>
                                    <stop offset=".6" stop-color="#ff5634"/>
                                    <stop offset=".7" stop-color="#ff3647"/>
                                    <stop offset=".9" stop-color="#e31587"/>
                                </radialGradient>
                                <radialGradient id="firefoxk" cx="-7918.9" cy="-8503.9" r="80.7"
                                                gradientTransform="matrix(1 0 0 1 9972.5 10659.4)"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset=".1" stop-color="#fff44f"/>
                                    <stop offset=".2" stop-color="#ffe141"/>
                                    <stop offset=".5" stop-color="#ffaf1e"/>
                                    <stop offset=".6" stop-color="#ff980e"/>
                                </radialGradient>
                                <linearGradient id="firefoxa" x1="70.8" x2="6.4" y1="12.4" y2="74.5"
                                                gradientTransform="matrix(1 0 0 1 -.3 0)"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stop-color="#fff44f"/>
                                    <stop offset=".1" stop-color="#ffe847"/>
                                    <stop offset=".2" stop-color="#ffc830"/>
                                    <stop offset=".4" stop-color="#ff980e"/>
                                    <stop offset=".4" stop-color="#ff8b16"/>
                                    <stop offset=".5" stop-color="#ff672a"/>
                                    <stop offset=".5" stop-color="#ff3647"/>
                                    <stop offset=".7" stop-color="#e31587"/>
                                </linearGradient>
                                <linearGradient id="firefoxl" x1="70" x2="15.3" y1="12.1" y2="66.8"
                                                gradientTransform="matrix(1 0 0 1 -.3 0)"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset=".2" stop-color="#fff44f" stop-opacity=".8"/>
                                    <stop offset=".3" stop-color="#fff44f" stop-opacity=".6"/>
                                    <stop offset=".5" stop-color="#fff44f" stop-opacity=".2"/>
                                    <stop offset=".6" stop-color="#fff44f" stop-opacity="0"/>
                                </linearGradient>
                            </defs>
                            <path fill="url(#firefoxa)"
                                  d="M94.6 33.6C92.5 28.5 88.2 23 85 21.3A50.4 50.4 0 0 1 89.8 36C84.3 22.5 75 17 67.4 5a58.9 58.9 0 0 1-1.6-3A8.8 8.8 0 0 1 65 .2a.2.2 0 0 0-.2 0 35.4 35.4 0 0 0-16.7 26.8 24.2 24.2 0 0 0-13.3 5.2 14.5 14.5 0 0 0-1.3-1 22.5 22.5 0 0 1-.1-11.8 35.9 35.9 0 0 0-11.7 9c-2-2.4-1.8-10.5-1.7-12.1a8.7 8.7 0 0 0-1.6.8 35.3 35.3 0 0 0-4.7 4A42.3 42.3 0 0 0 9 26.6a41 41 0 0 0-6.5 14.7v.3l-.5 3v.1a46.2 46.2 0 0 0-.8 6.7v.3a48.5 48.5 0 0 0 96.2 8.2l.3-1.9a49.8 49.8 0 0 0-3.2-24.3ZM38.7 71.5l.7.3-.7-.3ZM50 42.3Zm40-6.2z"
                                  style="fill:url(#firefoxa);stroke-width:1.25052"/>
                            <path fill="url(#firefoxb)"
                                  d="M94.6 33.6C92.5 28.5 88.2 23 85 21.3A50.4 50.4 0 0 1 89.8 36a43.9 43.9 0 0 1-1.5 32.8c-5.6 12-19 24.1-40 23.5A48.8 48.8 0 0 1 1.6 52.7c-.6-3.5 0-5.2.4-8a36.1 36.1 0 0 0-.8 6.6v.3a48.5 48.5 0 0 0 96.2 8.2l.3-1.9a49.8 49.8 0 0 0-3.2-24.3z"
                                  style="fill:url(#firefoxb);stroke-width:1.25052"/>
                            <path fill="url(#firefoxc)"
                                  d="M94.6 33.6C92.5 28.5 88.2 23 85 21.3A50.4 50.4 0 0 1 89.8 36a43.9 43.9 0 0 1-1.5 32.8c-5.6 12-19 24.1-40 23.5A48.8 48.8 0 0 1 1.6 52.7c-.6-3.5 0-5.2.4-8a36.1 36.1 0 0 0-.8 6.6v.3a48.5 48.5 0 0 0 96.2 8.2l.3-1.9a49.8 49.8 0 0 0-3.2-24.3z"
                                  style="fill:url(#firefoxc);stroke-width:1.25052"/>
                            <path fill="url(#firefoxd)"
                                  d="m71 39.2.4.3a26.4 26.4 0 0 0-4.5-5.9C51.8 18.6 62.9.9 64.8 0a35.4 35.4 0 0 0-16.7 27l1.7-.2a24.5 24.5 0 0 1 21.3 12.4z"
                                  style="fill:url(#firefoxd);stroke-width:1.25052"/>
                            <path fill="url(#firefoxe)"
                                  d="M49.9 42.3c-.1 1.2-4.4 5.3-5.9 5.3-13.8 0-16 8.4-16 8.4a20.5 20.5 0 0 0 12.2 16.2l1.5.6A21.6 21.6 0 0 0 48 74C72 75.1 76.8 45.1 59.4 36.4A16.7 16.7 0 0 1 71 39.2a24.5 24.5 0 0 0-21.3-12.4l-1.7.1a24.2 24.2 0 0 0-13.3 5.2c.7.6 1.6 1.4 3.3 3.2 3.3 3.2 11.7 6.6 11.8 7z"
                                  style="fill:url(#firefoxe);stroke-width:1.25052"/>
                            <path fill="url(#firefoxf)"
                                  d="M49.9 42.3c-.1 1.2-4.4 5.3-5.9 5.3-13.8 0-16 8.4-16 8.4a20.5 20.5 0 0 0 12.2 16.2l1.5.6A21.6 21.6 0 0 0 48 74C72 75.1 76.8 45.1 59.4 36.4A16.7 16.7 0 0 1 71 39.2a24.5 24.5 0 0 0-21.3-12.4l-1.7.1a24.2 24.2 0 0 0-13.3 5.2c.7.6 1.6 1.4 3.3 3.2 3.3 3.2 11.7 6.6 11.8 7z"
                                  style="fill:url(#firefoxf);stroke-width:1.25052"/>
                            <path fill="url(#firefoxg)"
                                  d="m32.5 30.5 1 .6a22.5 22.5 0 0 1-.1-11.8 35.9 35.9 0 0 0-11.7 9c.3 0 7.3-.1 10.8 2.2z"
                                  style="fill:url(#firefoxg);stroke-width:1.25052"/>
                            <path fill="url(#firefoxh)"
                                  d="M1.7 52.7a48.8 48.8 0 0 0 46.6 39.6c21 .6 34.4-11.6 40-23.5a43.9 43.9 0 0 0 1.5-32.7V36c1.7 11.3-4 22.2-12.9 29.5v.1c-17.4 14.2-34 8.5-37.4 6.3l-.7-.4c-10.2-4.8-14.4-14-13.5-22A12.4 12.4 0 0 1 14 42.3a18.3 18.3 0 0 1 17.8-.7 24.1 24.1 0 0 0 18.2.7c0-.4-8.5-3.8-11.8-7-1.7-1.8-2.6-2.6-3.3-3.2a14.5 14.5 0 0 0-1.3-1l-1-.6a23.9 23.9 0 0 0-10.8-2.2C19.8 26 20 17.8 20 16.2a8.7 8.7 0 0 0-1.6.8 35.3 35.3 0 0 0-4.7 4A42.3 42.3 0 0 0 9 26.6a41 41 0 0 0-6.5 14.7S1 48.8 1.7 52.7z"
                                  style="fill:url(#firefoxh);stroke-width:1.25052"/>
                            <path fill="url(#firefoxi)"
                                  d="M66.9 33.6a26.4 26.4 0 0 1 4.5 5.9l.7.6c11 10.1 5.2 24.4 4.8 25.4 9-7.3 14.6-18.2 13-29.4C84.2 22.4 75 16.9 67.3 4.9a58.9 58.9 0 0 1-1.6-2.8 8.8 8.8 0 0 1-.8-2 .2.2 0 0 0-.2 0c-1.9.8-13 18.4 2 33.5Z"
                                  style="fill:url(#firefoxi);stroke-width:1.25052"/>
                            <path fill="url(#firefoxj)"
                                  d="m72 40-.6-.5-.3-.3a16.7 16.7 0 0 0-11.7-2.8C76.8 45.1 72 75.1 48 74a21.6 21.6 0 0 1-6.3-1.2l-1.5-.6-.8-.4c3.4 2.3 20 8 37.5-6.2.4-1 6.2-15.4-4.8-25.5z"
                                  style="fill:url(#firefoxj);stroke-width:1.25052"/>
                            <path fill="url(#firefoxk)"
                                  d="M28 56s2.2-8.4 16-8.4c1.5 0 5.8-4.1 5.9-5.3a24.1 24.1 0 0 1-18.2-.8 18.3 18.3 0 0 0-17.9.8 12.4 12.4 0 0 0 11.5 7.2c-.9 7.9 3.3 17.1 13.4 22l.7.3C33.5 68.8 28.6 63 28 56z"
                                  style="fill:url(#firefoxk);stroke-width:1.25052"/>
                            <path fill="url(#firefoxl)"
                                  d="M94.6 33.6C92.5 28.5 88.2 23 85 21.3A50.4 50.4 0 0 1 89.8 36C84.3 22.5 75 17 67.4 5a58.9 58.9 0 0 1-1.6-3A8.8 8.8 0 0 1 65 .2a.2.2 0 0 0-.2 0 35.4 35.4 0 0 0-16.7 26.8h1.7a24.5 24.5 0 0 1 21.3 12.3 16.7 16.7 0 0 0-11.7-2.8C76.8 45.1 72 75.1 48 74a21.6 21.6 0 0 1-6.3-1.2l-1.5-.6a18 18 0 0 1-.8-.4l-.7-.3.7.3C33.5 68.8 28.6 63 28 56c0 0 2.2-8.4 16-8.4 1.5 0 5.8-4.1 5.9-5.3 0-.4-8.5-3.8-11.8-7-1.7-1.8-2.6-2.6-3.3-3.2a14.5 14.5 0 0 0-1.3-1 22.5 22.5 0 0 1-.1-11.8 35.9 35.9 0 0 0-11.7 9c-2-2.4-1.8-10.5-1.7-12.1a8.7 8.7 0 0 0-1.6.8 35.3 35.3 0 0 0-4.7 4A42.3 42.3 0 0 0 9 26.6a41 41 0 0 0-6.5 14.7v.3l-.6 3c0 .1 0 0 0 0a56.4 56.4 0 0 0-.7 6.8v.3a48.5 48.5 0 0 0 96.2 8.2l.3-1.9a49.8 49.8 0 0 0-3.2-24.3zM89.8 36z"
                                  style="fill:url(#firefoxl);stroke-width:1.25052"/>
                        </svg>
                        <div class="installText">
                            <span class="itemName">Firefox Extension</span>
                            <span class="comingSoon">Coming Soon</span>
                        </div>
                    </a>
                    <a class="installItem gmkButton gmkButtonSecondary">
                        <svg class="installIcon" viewBox="0 0 100 100">
                            <defs>
                                <linearGradient id="safarib">
                                    <stop offset="0" stop-color="#06c2e7"/>
                                    <stop offset=".3" stop-color="#0db8ec"/>
                                    <stop offset=".5" stop-color="#12aef1"/>
                                    <stop offset=".8" stop-color="#1f86f9"/>
                                    <stop offset="1" stop-color="#107ddd"/>
                                </linearGradient>
                                <linearGradient id="safaria">
                                    <stop offset="0" stop-color="#bdbdbd"/>
                                    <stop offset="1" stop-color="#fff"/>
                                </linearGradient>
                                <linearGradient xlink:href="#safaria" id="safarid" x1="413" x2="413" y1="237.6" y2="59.4"
                                                gradientTransform="matrix(1 0 0 1 -169.5 -28.5)"
                                                gradientUnits="userSpaceOnUse"/>
                                <filter id="safarif" width="1" height="1" x="0" y="0" color-interpolation-filters="sRGB">
                                    <feGaussianBlur stdDeviation="1"/>
                                </filter>
                                <filter id="safaric" width="1.1" height="1.1" x="0" y="0" color-interpolation-filters="sRGB">
                                    <feGaussianBlur stdDeviation="3.6"/>
                                </filter>
                                <radialGradient xlink:href="#safarib" id="safarie" cx="413.1" cy="136.8" r="82.1" fx="413.1"
                                                fy="136.8" gradientTransform="matrix(1 0 0 1 -188 -34.8)"
                                                gradientUnits="userSpaceOnUse"/>
                            </defs>
                            <path d="M502 148.5a89.1 89.1 0 0 1-89 89.1 89.1 89.1 0 0 1-89.1-89.1 89.1 89.1 0 0 1 89-89.1 89.1 89.1 0 0 1 89.2 89.1Z"
                                  filter="url(#safaric)" opacity=".5" paint-order="markers stroke fill"
                                  transform="matrix(1 0 0 0 -161.4 -19)"/>
                            <path fill="url(#safarid)" stroke="#cdcdcd" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-width=".1"
                                  d="M97.4 50.4A47.4 47.4 0 0 1 50 97.8 47.4 47.4 0 0 1 2.7 50.4 47.4 47.4 0 0 1 50 3.1a47.4 47.4 0 0 1 47.4 47.3Z"
                                  paint-order="markers stroke fill" style="fill:url(#safarid)"/>
                            <path fill="url(#safarie)"
                                  d="M93.7 50.4A43.6 43.6 0 0 1 50 94.1 43.6 43.6 0 0 1 6.4 50.4 43.6 43.6 0 0 1 50 6.8a43.6 43.6 0 0 1 43.7 43.6Z"
                                  paint-order="markers stroke fill" style="fill:url(#safarie);stroke-width:1.51179"/>
                            <path fill="#f4f2f3"
                                  d="M50 9c-.3 0-.6.3-.6.7V17a.6.6 0 1 0 1.2 0V9.7c0-.4-.2-.7-.6-.7zm-4.2.3c-.4 0-.7.4-.7.7l.4 3a.6.6 0 1 0 1.2 0l-.3-3.1c0-.3-.3-.6-.6-.6Zm8.4 0c-.3 0-.5.3-.6.6l-.3 3a.6.6 0 1 0 1.3.2l.3-3a.6.6 0 0 0-.7-.8zm-12.6.6h-.2c-.3.1-.5.4-.4.8l1.5 7.2a.6.6 0 1 0 1.2-.3l-1.5-7.2c0-.3-.3-.5-.6-.5Zm16.9 0c-.3 0-.6.2-.6.5l-1.6 7.2a.6.6 0 1 0 1.3.3l1.5-7.2a.6.6 0 0 0-.6-.8zm-21 1.2h-.3c-.3.1-.5.5-.4.8l1 3a.6.6 0 1 0 1.2-.5l-1-2.9c0-.2-.3-.4-.5-.4zm25 0c-.2 0-.4.2-.5.4l-1 3a.6.6 0 1 0 1.2.3l1-2.9a.6.6 0 0 0-.7-.8zm-29 1.5h-.3c-.3.2-.5.5-.3.8l3 6.8a.6.6 0 1 0 1.1-.6L34 13a.6.6 0 0 0-.5-.3zm33.1 0c-.2 0-.5.1-.6.4l-3 6.7a.6.6 0 1 0 1.2.5l3-6.7a.6.6 0 0 0-.6-1zm-36.9 2h-.4c-.3.2-.4.6-.2.9l1.6 2.7a.6.6 0 1 0 1-.7L30.3 15a.6.6 0 0 0-.5-.4zm40.6 0c-.2 0-.4 0-.5.3l-1.5 2.6a.6.6 0 1 0 1 .7l1.6-2.7a.6.6 0 0 0-.6-1zm-44.2 2.2a.6.6 0 0 0-.5 1l4.3 6a.6.6 0 1 0 1-.8l-4.3-6a.6.6 0 0 0-.5-.2zm47.9 0c-.2 0-.4.1-.5.3l-4.4 6a.6.6 0 1 0 1 .7l4.4-6a.6.6 0 0 0-.5-1zm-51.2 2.7c-.1 0-.3 0-.4.2-.3.2-.3.6 0 .9l2 2.3c.2.2.6.3.9 0 .2-.2.3-.6 0-.9l-2-2.3a.6.6 0 0 0-.5-.2zm54.4 0-.4.2-2.1 2.3a.6.6 0 1 0 1 .9l2-2.3a.6.6 0 0 0-.5-1zm-57.5 3a.6.6 0 0 0-.4 1.1l5.5 5a.6.6 0 1 0 .8-1l-5.4-5a.6.6 0 0 0-.5 0zm60.6 0c-.1 0-.3 0-.4.2l-5.5 5a.6.6 0 1 0 .9.9l5.4-5a.6.6 0 0 0-.4-1zM17.1 26c-.2 0-.4 0-.5.2-.2.3-.2.7.1 1l2.5 1.7c.3.2.7.2.9-.1.2-.3.1-.7-.1-1L17.5 26a.6.6 0 0 0-.4-.1zm65.8 0-.3.1-2.5 1.8a.6.6 0 1 0 .7 1l2.5-1.8A.6.6 0 0 0 83 26zm-68.2 3.5c-.2 0-.4.1-.5.3-.2.3 0 .7.2.9l6.4 3.7a.6.6 0 1 0 .6-1.1l-6.3-3.7c-.2 0-.3-.1-.4 0zm70.6 0H85l-6.4 3.8a.6.6 0 1 0 .6 1l6.4-3.6a.6.6 0 0 0-.3-1.2zM13 33.2c-.3 0-.5.1-.6.4-.2.3 0 .7.3.8l2.8 1.3a.6.6 0 1 0 .5-1.2l-2.8-1.2-.2-.1zm74.3 0h-.3l-2.8 1.3a.6.6 0 1 0 .5 1.2l2.8-1.3a.6.6 0 0 0-.2-1.2zm-76 4c-.2 0-.4.1-.5.4-.1.3 0 .7.4.8l7 2.3a.6.6 0 1 0 .4-1.2l-7-2.3h-.3zm77.6 0h-.2l-7 2.3a.6.6 0 1 0 .4 1.2l7-2.3a.6.6 0 0 0-.2-1.2zm-78.6 4.1c-.3 0-.6.2-.6.5 0 .4.1.7.5.8l3 .6a.6.6 0 1 0 .3-1.2l-3-.7h-.2zm79.6 0h-.1l-3 .7c-.4 0-.6.4-.5.7 0 .4.4.6.7.5l3-.6a.6.6 0 0 0 0-1.3zM9.4 45.5c-.3 0-.5.3-.5.6s.2.6.5.7l7.3.7a.6.6 0 1 0 .2-1.2l-7.3-.8h-.2zm81.2 0h-.1l-7.3.8a.6.6 0 1 0 0 1.3l7.4-.8a.6.6 0 0 0 0-1.2zM9.3 49.9a.6.6 0 1 0 0 1.2h3.1a.6.6 0 1 0 0-1.2zm78.3 0a.6.6 0 1 0 0 1.2h3.1a.6.6 0 1 0 0-1.2zM17 53.2h-.2l-7.3.8a.6.6 0 1 0 .2 1.3l7.3-.8a.6.6 0 0 0 0-1.3zm66.3 0c-.3.1-.6.3-.6.7 0 .3.2.6.6.7l7.3.7a.6.6 0 1 0 0-1.2l-7.2-.8h-.1zm-70 4.4h-.1l-3 .6a.6.6 0 1 0 .2 1.3l3-.7a.6.6 0 0 0 0-1.2zm73.6 0c-.3 0-.6.2-.6.5-.1.3.1.7.5.8l3 .6a.6.6 0 1 0 .2-1.2l-3-.7h-.1zm-68.5 2.5h-.2l-7 2.3a.6.6 0 1 0 .4 1.2l7-2.3a.6.6 0 0 0-.2-1.2zm63.4 0c-.2 0-.5.2-.5.5-.2.3 0 .7.4.8l7 2.2a.6.6 0 1 0 .3-1.2l-7-2.2h-.2zm-66 5h-.3l-2.8 1.3a.6.6 0 1 0 .5 1.1l2.8-1.2a.6.6 0 0 0-.3-1.2Zm68.7 0c-.3 0-.5.1-.6.4-.2.3 0 .7.3.8l2.8 1.3a.6.6 0 1 0 .5-1.2l-2.8-1.2-.2-.1zM21 66.5h-.3l-6.4 3.7a.6.6 0 1 0 .7 1.1l6.3-3.6a.6.6 0 0 0-.3-1.2zm57.8 0c-.2 0-.4.1-.5.3-.2.3 0 .7.2.9l6.4 3.6a.6.6 0 1 0 .6-1l-6.4-3.7-.3-.1zm-59.4 5.4h-.3l-2.5 1.9a.6.6 0 1 0 .7 1L20 73a.6.6 0 0 0-.4-1.1zm61 0c-.2 0-.5 0-.6.2-.2.3-.1.7.2 1l2.5 1.7c.2.3.6.2.8 0 .3-.4.2-.8-.1-1L80.8 72a.6.6 0 0 0-.3-.1zm-55.3.2c-.2 0-.3 0-.5.2l-5.4 4.9a.6.6 0 1 0 .8 1l5.5-5a.6.6 0 0 0-.4-1.1zm49.6 0a.6.6 0 0 0-.4 1.1l5.5 5a.6.6 0 1 0 .8-1l-5.4-5a.6.6 0 0 0-.5 0zm-44.4 4.7c-.2 0-.4 0-.6.2l-4.3 6a.6.6 0 1 0 1 .7l4.4-6a.6.6 0 0 0-.5-1zm39.2 0a.6.6 0 0 0-.5 1l4.3 6a.6.6 0 1 0 1-.8l-4.3-6a.6.6 0 0 0-.5-.2Zm-44.8 1-.4.1-2 2.3a.6.6 0 1 0 .9.9l2-2.3a.6.6 0 0 0-.5-1zm50.4 0h-.5c-.2.3-.2.7 0 1l2 2.3c.3.2.7.3 1 0 .2-.2.2-.6 0-.9l-2-2.3a.6.6 0 0 0-.5-.2zm-38.8 2.5c-.2 0-.5.1-.6.3l-3 6.8a.6.6 0 1 0 1.2.5l3-6.7a.6.6 0 0 0-.6-1zm27.2 0a.6.6 0 0 0-.6.9l3 6.7a.6.6 0 1 0 1.1-.5l-3-6.7a.6.6 0 0 0-.5-.4Zm-32.4 2c-.2 0-.4.2-.5.4L29 85.3a.6.6 0 1 0 1.1.7l1.6-2.7a.6.6 0 0 0-.6-1zm37.7 0-.4.1c-.3.2-.4.6-.2.9l1.5 2.7a.6.6 0 1 0 1.1-.7l-1.5-2.6a.6.6 0 0 0-.5-.4zm-25.8.1c-.3 0-.6.2-.7.5L41 90.1a.6.6 0 1 0 1.3.3l1.5-7.2a.6.6 0 0 0-.6-.8zm13.8 0h-.1c-.4.1-.6.5-.5.8l1.5 7.2a.6.6 0 1 0 1.3-.3L57.5 83c0-.3-.3-.5-.6-.5zm-6.9.8c-.3 0-.6.3-.6.6v7.3a.6.6 0 1 0 1.2 0v-7.3c0-.3-.2-.6-.6-.6zm-11.7 2.3c-.2 0-.4.2-.5.5l-1 3a.6.6 0 1 0 1.2.3l1-3a.6.6 0 0 0-.7-.8zm23.4 0h-.3c-.3.2-.5.5-.4.9l1 3a.6.6 0 1 0 1.2-.5l-1-3c0-.2-.3-.3-.5-.4zM46 87.2c-.3 0-.5.2-.6.5l-.3 3.1c0 .4.2.7.6.7.3 0 .7-.2.7-.6l.3-3a.6.6 0 0 0-.7-.7zm8 0h-.2c-.3 0-.6.3-.5.7l.3 3c0 .4.4.7.7.6.4 0 .6-.3.6-.7l-.4-3c0-.4-.2-.6-.5-.6z"
                                  paint-order="markers stroke fill" style="stroke-width:1.51179"/>
                            <path d="m469.1 100.6-65.5 38-41.4 65.3 60.6-45z" filter="url(#safarif)" opacity=".4"
                                  paint-order="markers stroke fill" transform="matrix(1 0 0 1 -169.5 -28.5)"/>
                            <path fill="#ff5150" d="M55 55.6 45 45.2l35.4-23.8Z" paint-order="markers stroke fill"
                                  style="stroke-width:1.51179"/>
                            <path fill="#f1f1f1" d="M55 55.6 45 45.2 19.6 79.5Z" paint-order="markers stroke fill"
                                  style="stroke-width:1.51179"/>
                            <path d="M19.6 79.5 55 55.6l25.4-34.2Z" opacity=".2" style="stroke-width:1.51179"/>
                        </svg>
                        <div class="installText">
                            <span class="itemName">Safari Extension</span>
                            <span class="comingSoon">Coming Soon</span>
                        </div>
                    </a>
                    <a class="installItem gmkButton gmkButtonSecondary">
                        <svg class="installIcon" viewBox="0 0 100 100">
                            <linearGradient id="iosa" x1="400" x2="400" y1="798.8" y2="-1.2"
                                            gradientTransform="matrix(.1 0 0 -.1 0 99.8)"
                                            gradientUnits="userSpaceOnUse">
                                <stop offset="0" style="stop-color:#18bffb"/>
                                <stop offset="1" style="stop-color:#2072f3"/>
                            </linearGradient>
                            <path fill="url(#a)"
                                  d="M79.8 0H20.2C9 0 0 9 0 20.2v59.6C0 91 9 100 20.2 100h59.6C91 100 100 91 100 79.8V20.2C100 9 91 0 79.8 0Z"
                                  style="fill:url(#iosa);stroke-width:.124984"/>
                            <path fill="#fff"
                                  d="m49.6 23 2-3.5a4.6 4.6 0 1 1 7.9 4.5L40 57.8h14c4.7 0 7.2 5.4 5.2 9H18a4.5 4.5 0 1 1 0-9.1h11.6l14.8-25.6-4.6-8a4.6 4.6 0 0 1 7.9-4.6zM32 71.6l-4.4 7.6a4.6 4.6 0 1 1-7.9-4.6L23 69c3.7-1.1 6.7-.3 9 2.6zm37.7-13.8h11.8c2.6 0 4.6 2 4.6 4.6 0 2.5-2 4.5-4.6 4.5H75l4.4 7.7a4.6 4.6 0 0 1-8 4.6L54.8 50c-3.8-6.5-1.1-13.1 1.6-15.4l13.4 23.2z"
                                  style="stroke-width:.124984"/>
                        </svg>
                        <div class="installText">
                            <span class="itemName">iOS App</span>
                            <span class="comingSoon">Coming Soon</span>
                        </div>
                    </a>
                    <a class="installItem gmkButton gmkButtonSecondary">
                        <svg class="installIcon" viewBox="0 0 100 100">
                            <path d="M66.8 0c-.2 0-.4.4-.4.4l-4.8 8a29.2 29.2 0 0 0-12-2.5 29.2 29.2 0 0 0-11.8 2.5L33 .4s-.3-.3-.7-.3a1.1 1.1 0 0 0 .4.6l4.5 8A24.3 24.3 0 0 0 23 30.4h54c0-9.3-5.8-17.4-14.2-21.5l4.5-8s.4-.4-.3-.7l-.2-.1zM37.2 16.5c1.2 0 2.6 1.2 2.6 2.5 0 1.4-1.3 2.6-2.6 2.6a2.5 2.5 0 0 1-2.6-2.6 2.5 2.5 0 0 1 2.6-2.5zm25.7 0c1.2 0 2.6 1.2 2.6 2.5 0 1.4-1.3 2.6-2.6 2.6a2.5 2.5 0 0 1-2.6-2.6 2.5 2.5 0 0 1 2.6-2.5zm-49.2 16c-3.2 0-5.8 3-5.8 6.5v24.4c0 3.5 2.6 6.4 5.8 6.4 3.2 0 5.8-2.9 5.8-6.4V39c0-3.6-2.6-6.5-5.8-6.5zm72.6 0c-3.2 0-5.8 3-5.8 6.5v24.4c0 3.5 2.6 6.4 5.8 6.4 3.2 0 5.8-2.9 5.8-6.4V39c0-3.6-2.6-6.5-5.8-6.5zm-63.6 1v41.1c0 2 2.6 4.8 4.5 4.8h6.4v14.2c0 3.5 2.6 6.4 5.8 6.4 3.2 0 5.8-2.9 5.8-6.4V79.4h9.3v14.2c0 3.5 2.6 6.4 5.8 6.4 3.2 0 5.8-2.9 5.8-6.4V79.4h6.4c2 0 4.5-2.5 4.5-4.8V33.5Z"
                                  style="fill:#a4c639;stroke-width:3.12482"/>
                        </svg>
                        <div class="installText">
                            <span class="itemName">Android App</span>
                            <span class="comingSoon">Coming Soon</span>
                        </div>
                    </a>                                        
                </div>
            </gmk-subpage-container>
        `
    }
}

customElements.define('gmk-install-options', GmkInstallOptions);
