import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../../base-element.js';
import '../../shared-styles.js';

class PageForgotPassword extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        h2 {
          margin: 0;
        }
        form-button {
          margin-top: 24px;
          display: block;
          width: 100%;
        }
      </style>

      <iron-a11y-keys on-keys-pressed="_forgotPassword" keys="enter"></iron-a11y-keys>

      <h2>Reset password</h2>
      <p>Enter your UTD email. If an account matching the email you enter exists, we will send an email to this address with password reset instructions.</p>

      <form-input label="Email" type="email" placeholder="you@utdallas.edu"></form-input>
      <form-button on-click="_forgotPassword" label="Request reset"></form-button>
      <form-button grey on-click="_cancel" label="Cancel" style="margin-top: 12px"></form-button>
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

window.customElements.define('page-forgot-password', PageForgotPassword);
