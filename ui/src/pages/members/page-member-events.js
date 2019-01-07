import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../../base-element.js';
import '../../shared-styles.js';

class PageMemberEvents extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        h4 {
          margin: 0;
        }
      </style>

      <app-container>
        <div class="padding">
          <h4>Events</h4>
        </div>
      </app-container>
    `;
  }

  static get properties() {
    return {

    }
  }

  onload() {
    return new Promise((resolve, reject) => {
      resolve({ page: "Events" });
    })
  }
}

window.customElements.define('page-member-events', PageMemberEvents);
