export class GmkSubpageContainer extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = `
      <style>
        /* Styles for your component */
      </style>      
      <button id="myButton">Click Me</button>
      <slot></slot>
    `;

        const button = this.shadowRoot?.querySelector('#myButton')!;
        button.addEventListener('click', () => {
            console.log('xxx')
        });
    }
}

customElements.define('gmk-subpage-container', GmkSubpageContainer);