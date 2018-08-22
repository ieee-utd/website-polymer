import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element.js'

class PageAnnouncement extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>

    `;
  }

  static get properties() {
    return {
      
    }
  }
}

window.customElements.define('page-announcement', PageAnnouncement);
