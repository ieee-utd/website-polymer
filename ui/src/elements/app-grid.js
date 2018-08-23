import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class AppGrid extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          width: 100%;
          --grid-margin-between-items: 8px;
          --grid-item: {

          };
        }
        div.grid {
          @apply --layout-horizontal;
          @apply --layout-wrap;
          @apply --layout-start-justified;
          width: calc(100% + 8px);
          padding-bottom: var(--grid-padding-bottom, 16px);
          /*max-width: 800px;*/
          position: relative;
          left: -8px;
        }
        ::slotted(app-grid-item) {
          width: 50%;
          padding: 0;
          border: var(--grid-margin-between-items) solid transparent;
          box-sizing: border-box; /* this makes the grid work :) */
          /*margin-bottom: calc(var(--grid-margin-between-items) * 2);*/
          @apply --layout-horizontal;
          @apply --layout-justified;
          @apply --grid-item;
        }
        ::slotted(app-grid-item[width="1"]) {
          width: 8.3333333%;
        }
        ::slotted(app-grid-item[width="2"]) {
          width: 16.6666667%;
        }
        ::slotted(app-grid-item[width="3"]) {
          width: 25%;
        }
        ::slotted(app-grid-item[width="4"]) {
          width: 33.33333333%;
        }
        ::slotted(app-grid-item[width="5"]) {
          width: 41.6666667%;
        }
        ::slotted(app-grid-item[width="6"]) {
          width: 50%;
        }
        ::slotted(app-grid-item[width="7"]) {
          width: 58.3333333%;
        }
        ::slotted(app-grid-item[width="8"]) {
          width: 66.6666667%;
        }
        ::slotted(app-grid-item[width="9"]) {
          width: 75%;
        }
        ::slotted(app-grid-item[width="10"]) {
          width: 83.3333333%;
        }
        ::slotted(app-grid-item[width="11"]) {
          width: 91.6666667%;
        }
        ::slotted(app-grid-item[width="12"]) {
          width: 100%;
        }
        ::slotted(app-grid-item[vertical]) {
          @apply --layout-start-justified;
          @apply --layout-vertical;
          @apply --layout-start;
        }
        ::slotted(app-grid-item[left]) {
          @apply --layout-horizontal;
          @apply --layout-start-justified;
        }
        ::slotted(app-grid-item[right]) {
          @apply --layout-horizontal;
          @apply --layout-end-justified;
        }
        @media (max-width: 779px) {
          ::slotted(app-grid-item) {
            width: 100%;
          }
        }
      </style>

      <div class="grid">
        <slot></slot>
      </div>
    `;
  }

  static get properties() {
    return {

    }
  }
}

window.customElements.define('app-grid', AppGrid);
