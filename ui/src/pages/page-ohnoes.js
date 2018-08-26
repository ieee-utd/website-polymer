import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element.js';
import '../shared-styles.js';

class PageOhNoes extends BaseElement {
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

        .content {
          padding: 16px 32px;
          height: 500px;
          display: block;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>

      
      <div class="top-bar"></div>
      <app-container class="content">
        <p>Oh noes! What you're looking for is lost in the quantum realm.<br/><a href="[[rootPath]]">Head back to home.</a></p>
      </app-container>
    `;
  }
}

window.customElements.define('page-ohnoes', PageOhNoes);
