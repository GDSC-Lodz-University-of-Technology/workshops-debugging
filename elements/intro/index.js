customElements.define('my-template', class extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById('my-template');
        let templateContent = template.content;

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }
});
