import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PageOhNoes extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
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

        .content {
          padding: 16px 32px;
          height: 700px;
          display: block;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .image {
          height: 400px;
          width: 400px;
        }
      </style>

      
      <div class="top-bar"></div>
      <app-container class="content">
        <iron-image class="image" src="/img/broken.svg" sizing="contain"></iron-image>
        <p>Oh noes! What you're looking for is lost in the quantum realm.<br/><a href="[[rootPath]]">Head back to home.</a></p>
      </app-container>
    `;
  }
}

window.customElements.define('page-ohnoes', PageOhNoes);