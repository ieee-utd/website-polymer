import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PageContact extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        .main {
          max-width: 980px;
          height: calc(100vh - 160px);
          min-height: 700px;
          padding: 72px 32px 64px 32px;
          margin: 0 auto;
        }
      </style>

      <div class="main">
        <h1>Contact</h1>
        <p>Have questions to ask us? We're active on Facebook and Email. Email is our preferred of contact.</p>
      </div>
    `;
  }
}

window.customElements.define('page-contact', PageContact);
