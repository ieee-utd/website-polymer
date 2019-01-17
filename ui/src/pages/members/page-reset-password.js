import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../../base-element.js';
import '../../shared-styles.js';

class PageResetPassword extends BaseElement {
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

      <iron-a11y-keys on-keys-pressed="_confirm" keys="enter"></iron-a11y-keys>

      <h2>Reset Password</h2>
      <p>Please confirm your email and create a password below. Please do not use your University password.</p>

      <form-input label="Email" type="email" placeholder="you@utdallas.edu" value="{{confirm.email}}" error="{{errors.email}}"></form-input>
      <form-input label="Password" type="password" value="{{confirm.password}}" error="{{errors.password}}"></form-input>
      <form-input label="Confirm Password" type="password" error="[[_generateConfirmError(confirm.password,confirm.confirmPassword)]]" value="{{confirm.confirmPassword}}"></form-input>

      <form-button on-click="_confirm" label="Change Password" large id="confirmButton"></form-button>
    `;
  }

  static get properties() {
    return {
      confirm: { type: Object, value: {
        email: "",
        password: "",
        confirmPassword: ""
      }},
      token: { type: String, value: "" }
    }
  }

  _generateConfirmError(a, b) {
    if (a && !b) return "Please confirm the password";
    return a && a !== b ? "Passwords do not match" : "";
  }

  _confirm() {
    var confirm = JSON.parse(JSON.stringify(this.confirm));
    if (confirm.password !== confirm.confirmPassword) {
      this._showToastError("Please confirm your password")
      return
    }
    delete confirm.confirmPassword;
    this.$.confirmButton.loading = true;
    this._post(`/user/confirm/${this.token}`, confirm)
    .then(() => {
      this._navigateTo(`/member/login`);
      this._showToast("Password changed! Please login with the password you created.")
      this.$.confirmButton.loading = false;
    })
    .catch((e) => {
      this.set("errors", e.errors)
      this.$.confirmButton.loading = false;
    })
  }

  onload(path) {
    return new Promise((resolve, reject) => {
      if (path.length == 0) return reject("Invalid confirmation token");

      this.set("token", path[0])
      this.set("confirm", {
        email: "",
        password: "",
        confirmPassword: ""
      })
      resolve();
    })
  }
}

window.customElements.define('page-reset-password', PageResetPassword);
