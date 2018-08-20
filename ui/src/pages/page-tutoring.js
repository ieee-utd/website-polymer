import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PageTutoring extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>

      <div>
        Tutoring
      </div>
    `;
  }
}

window.customElements.define('page-tutoring', PageTutoring);
