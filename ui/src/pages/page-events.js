import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element.js'

class PageEvents extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        .top-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 64px;
          width: 100%;
          background-color: var(--color-background);
        }
      </style>

      <div class="top-bar"></div>
    `;
  }

  static get properties() {
    return {

    }
  }
}

window.customElements.define('page-events', PageEvents);
