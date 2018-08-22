import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PageOhNoes extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        div.top-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 64px;
          width: 100%;
          background-color: var(--color-background);
        }

        div.main {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>

      
      <div class="top-bar"></div>
      <div class="main">
        <p>Oops you hit a 404. <a href="[[rootPath]]">Head back to home.</a></p>
      </div>
    `;
  }
}

window.customElements.define('page-ohnoes', PageOhNoes);
