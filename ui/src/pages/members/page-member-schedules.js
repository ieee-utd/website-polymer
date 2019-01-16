import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../../base-element.js';
import '../../shared-styles.js';

class PageMemberSchedules extends BaseElement {
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
          <h4>Schedules</h4>
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
      resolve({ page: "Tutoring Schedules" });
    })
  }
}

window.customElements.define('page-member-schedules', PageMemberSchedules);
