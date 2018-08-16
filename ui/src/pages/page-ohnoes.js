import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';

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
