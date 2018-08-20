import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class AppContainer extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          width: 100%;
          --app-container-content: { };
        }
        div.container {
          @apply --layout-horizontal;
          @apply --layout-around-justified;
          background-color: inherit;
          display: block;
        }
        div.container > div.content {
          @apply --app-container-content;
          display: block;
        }
        @media (min-width: 1200px) {
          div.container > div.content {
            max-width: 1200px;
            margin: 0 auto;
          }
        }
      </style>

      <div class="container">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

window.customElements.define('app-container', AppContainer);