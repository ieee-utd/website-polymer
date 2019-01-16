import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '../shared-styles.js';

class AppCopyright extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        div {
          color: var(--paper-grey-600);
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
        <span>Copyright &copy; [[currentYear]] IEEEUTD<br><span class="hide">Made with \<3 by your IT overlords.</span></span>
      </div>
    `;
  }

  static get properties() {
    return {
      currentYear: { type: String, value: (new Date).getFullYear() }
    }
  }
}

window.customElements.define('app-copyright', AppCopyright);
