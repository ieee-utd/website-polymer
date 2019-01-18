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
        h4 {
          margin: 0;
        }
      </style>

      <app-container>
        <div class="padding">
          <p>Welcome to the <b>alpha</b>!<br><br>If you've been invited in, <i>please don't share access with anyone</i>. You can show them your screens, just don't give anyone else an account if you have been granted the ability to do so.</p>
          <p>While this alpha is a work in progress, <i>changes you make here will affect the real site</i>. We assume that you have been lectured on ethics and morality and all that. If not, please contact the Ethics professors. We are certain that they would love to have a word with you. ;)</p>
          <p>IEEEUTD IT Team</p>
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
      resolve({ page: "Dashboard" });
    })
  }
}

window.customElements.define('page-member-dashboard', PageMemberDashboard);
