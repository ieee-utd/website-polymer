import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '../shared-styles.js';

class AppSponsors extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        div {
          color: var(--paper-grey-600);
          background-color: white;
          text-align: center;
          padding: 32px 0;
          padding-bottom: 16px;
          font-size: 12px;
        }
        span.hide {
          color: var(--paper-grey-100);
        }
      </style>

      <div>
        <h2>Thank you to the IEEE UTD sponsors</h2>
        <img src="../../img/sponsors/ti_stk_2c_pos_rgb_jpg.jpg" draggable=false gone$="[[_active(_page,'home')]]"/>
      </div>
    `;
  }

  static get properties() {
    return {
      // currentYear: { type: String, value: (new Date).getFullYear() }
    }
  }
}

window.customElements.define('app-sponsors', AppSponsors);
