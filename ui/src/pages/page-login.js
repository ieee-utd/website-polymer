import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PageLogin extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>

      <h1>Login</h1>
    `;
  }

  static get properties() {
    return {

    }
  }
}

window.customElements.define('page-login', PageLogin);
