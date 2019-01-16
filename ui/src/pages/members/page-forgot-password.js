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

      <iron-a11y-keys on-keys-pressed="_resetPassword" keys="enter"></iron-a11y-keys>

      <h2>Reset password</h2>
      <p>Enter your UTD email. If an account matching the email you enter exists, we will send an email to this address with password reset instructions.</p>

      <form-input label="Email" type="email" placeholder="you@utdallas.edu" value="{{email}}"></form-input>
      <form-button on-click="_resetPassword" label="Request reset" large loading$="[[_loading]]"></form-button>
      <form-button grey on-click="_cancel" label="Cancel" style="margin-top: 12px" large disabled$="[[_loading]]"></form-button>
    `;
  }

  static get properties() {
    return {
      email: { type: String, value: "" },
      _loading: { type: Boolean, value: false }
    }
  }

  _resetPassword() {
    this.set("_loading", true)
    this._post(`/user/requestPasswordReset`, { email: this.email })
    .then(() => {
      this._showToast("Password reset email sent! Please check your email.")
      this._navigateTo("/member/login");
      this.set("_loading", false)
    })
    .catch((e) => {
      this.set("_loading", false)
    })
  }

  onload() {
    return new Promise((resolve, reject) => {
      this.set("email", "")
      resolve();
    })
  }

  _cancel() {
    this._fire("change-page", "/member/login")
  }
}

window.customElements.define('page-forgot-password', PageForgotPassword);
