import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../../base-element.js';
import '../../shared-styles.js';

class PageMemberDashboard extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        h2 {
          margin: 0;
        }
      </style>
      <app-container>
        <h1>Dashboard</h1>
      </app-container>

    `;
  }

  static get properties() {
    return {

    }
  }

  onload() {
    return new Promise((resolve, reject) => {
      resolve();
    })
  }

  _cancel() {
    this._fire("change-page", "/member/login")
  }
}

window.customElements.define('page-member-dashboard', PageMemberDashboard);
