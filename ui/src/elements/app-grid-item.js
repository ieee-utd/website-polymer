import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '../shared-styles.js';

class AppGridItem extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        ::slotted(*) {
          width: 100%;
        }
        ::slotted(form-button) {
          width: auto;
          display: inline-block;
        }
      </style>

      <slot></slot>
    `;
  }

  static get properties() {
    return {
      
    }
  }
}

window.customElements.define('app-grid-item', AppGridItem);