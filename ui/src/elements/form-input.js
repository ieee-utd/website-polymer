import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-text-field/vaadin-password-field.js';

class FormInput extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        span[invalid] paper-input {
          padding-bottom: 16px;
        }
        vaadin-text-field, vaadin-password-field {
          font-family: "Roboto";
          width: 100%;
        }
        vaadin-text-field[disabled] {
          user-select: text;
          pointer-events: all;
        }
      </style>

      <span invalid$="[[invalid]]">
        <template is="dom-if" if="[[!_passwordType(type)]]" restamp>
          <vaadin-text-field id="input" always-float-label readonly$="[[readonly]]" label="[[label]][[_requiredStar(required)]]" placeholder="[[placeholder]]" type="[[type]]" autofocus$="[[autofocus]]" disabled$="[[disabled]]" value="{{value}}" pattern="[[pattern]]" invalid="{{invalid}}" error-message="[[_errorMessage]]" auto-validate$="[[_autoValidate(pattern, error)]]" allowed-pattern="[[allowedPattern]]">
            <span slot="suffix">[[suffix]]</span>
          </vaadin-text-field>
        </template>
        <template is="dom-if" if="[[_passwordType(type)]]" restamp>
          <vaadin-password-field id="input" always-float-label readonly$="[[readonly]]" label="[[label]][[_requiredStar(required)]]" placeholder="[[placeholder]]"autofocus$="[[autofocus]]" disabled$="[[disabled]]" value="{{value}}" pattern="[[pattern]]" invalid="{{invalid}}" error-message="[[_errorMessage]]" auto-validate$="[[_autoValidate(pattern, _errorMessage)]]" allowed-pattern="[[allowedPattern]]">
            <span slot="suffix">[[suffix]]</span>
          </vaadin-password-field>
        </template>
      </span>
    `
  }

  static get properties() {
    return {
      label: String,
      placeholder: String,
      type: { type: String, value: "" },
      suffix: String,
      allowedPattern: String,
      error: {
        type: String,
        value: "",
        notify: true,
        observer: "_errorChanged"
      },
      autofocus: {
        type: Boolean,
        value: false
      },
      disabled: {
        type: Boolean,
        value: false
      },
      readonly: {
        type: Boolean,
        value: false
      },
      value: {
        type: String,
        reflectToAttribute: true,
        notify: true,
        observer: "_valueChanged"
      },
      invalid: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: "_invalidChanged"
      },
      required: {
        type: Boolean,
        value: false
      },
      autoValidate: { type: Boolean, value: false },
      pattern: String,
      patternError: String,
      _errorMessage: { type: String, value: "" }
    }
  }

  _passwordType(type) {
    return type === "password";
  }

  _requiredStar(required) {
    return required ? " *" : "";
  }

  _valueChanged(value) {
    if (!this.autoValidate) {
      this._errorChanged(null);
    } else {
      var input = this.$$("#input");
      if (input) input.validate();
    }
  }

  _invalidChanged(invalid) {
    this.set("_errorMessage", this.error ? this.error : this.patternError);
  }

  _errorChanged(error) {
    this.set("_errorMessage", error ? error : this.patternError);
    this.set("invalid", !!error);
  }

  _autoValidate(pattern, error) {
    return pattern && !error;
  }

  clear() {
    this.set("value", "");
  }
}

window.customElements.define('form-input', FormInput);
