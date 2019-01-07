import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';

class FormButton extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        paper-button {
          display: block;
          text-align: center;
          margin: 0;
          background-color: var(--color-primary-blue);
          color: white;
          font-family: var(--font-head);
          font-weight: 700;
          text-transform: none;
          transition: 0.24s background-color, 0.24s box-shadow;
          @apply --shadow-elevation-2dp;
        }
        paper-button:hover,
        paper-button:active,
        paper-button:focus {
          @apply --shadow-elevation-4dp;
          background-color: var(--color-primary-blue-lighter);
        }
        paper-button[disabled] {
          color: var(--paper-grey-700)!important;
          background-color: var(--paper-grey-400)!important;
          pointer-events: none;
        }
        paper-button[grey] {
          color: var(--color-primary-blue);
          background-color: var(--paper-grey-200);
        }
      </style>

      <paper-button disabled$="[[_or(disabled,loading)]]" grey$="[[grey]]">
        <span hidden$="[[loading]]">[[label]]</span>
      </paper-button>
    `;
  }

  static get properties() {
    return {
      label: String,
      disabled: { type: Boolean, value: false },
      loading: { type: Boolean, value: false },
      grey: { type: Boolean, value: false }
    }
  }
}

window.customElements.define('form-button', FormButton);
