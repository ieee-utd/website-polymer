import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '../shared-styles.js';

class AppContext extends BaseElement {

  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          position: relative;
        }
      </style>

      <slot></slot>
    `
  }

  static get properties() {
    return {

    }
  }
}

window.customElements.define('app-context', AppContext);
