import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PageOhNoes extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;

          padding: 10px 20px;
        }
      </style>

      Oops you hit a 404. <a href="[[rootPath]]">Head back to home.</a>
    `;
  }
}

window.customElements.define('page-ohnoes', PageOhNoes);
