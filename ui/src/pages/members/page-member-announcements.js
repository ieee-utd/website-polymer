import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../../base-element.js';
import '../../shared-styles.js';

class PageMemberAnnouncements extends BaseElement {
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
          <h4>Announcements</h4>
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
      resolve({ page: "Announcements" });
    })
  }
}

window.customElements.define('page-member-announcements', PageMemberAnnouncements);
