import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../../base-element.js';
import '../../shared-styles.js';

class PageLogin extends BaseElement {
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

      <iron-a11y-keys on-keys-pressed="_login" keys="enter"></iron-a11y-keys>

      <h2>Member login</h2>
      <p>This page is for IEEEUTD officers, tutors, and other authorized users only.</p>

      <form-input label="Email" value="{{login.email}}" type="email" error="{{_loginError}}" placeholder="you@utdallas.edu" disabled$="[[_loading]]"></form-input>
      <form-input label="Password" value="{{login.password}}" type="password" disabled$="[[_loading]]"></form-input>
      <a href="/member/forgot-password" disabled$="[[_loading]]">Forgot password?</a>
      <form-button on-click="_login" label="Login" loading$="[[_loading]]"></form-button>
    `;
  }

  static get properties() {
    return {
      _loading: { type: Boolean, value: false },
      login: { type: Object, value: { }},
      _loginError: { type: String, value: "" }
    }
  }

  _login() {
    this.set("_loading", true)
    this._post("/user/login", this.login, { redirectOn401: false, silent: true })
    .then((user) => {
      window.location = "/member/dashboard";
    })
    .catch((e) => {
      this.set("_loginError", e.message === "Some fields are incorrect" ? "Username and password are required" : e.message)
      this.set("_loading", false)
    })
  }

  onload() {
    return new Promise((resolve, reject) => {
      resolve();
    })
  }
}

window.customElements.define('page-login', PageLogin);
