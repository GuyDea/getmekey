export class GmkSettings extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
    }

    render(){
        return `
<gmk-subpage-container>
My settings
</gmk-subpage-container>
        `
    }
}

customElements.define('gmk-settings', GmkSettings);