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

      <form-input label="Email" type="email" placeholder="you@utdallas.edu"></form-input>
      <form-input label="Password" type="password"></form-input>
      <a href="/member/forgot-password">Forgot password?</a>
      <form-button on-click="_login" label="Login"></form-button>
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
}

window.customElements.define('page-login', PageLogin);
