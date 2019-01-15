import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '@vaadin/vaadin-text-field/vaadin-text-area.js';

class FormTextarea extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        vaadin-text-area {
          font-family: "Roboto";
          width: 100%;
        }
        vaadin-text-area[disabled] {
          user-select: text;
          pointer-events: all;
        }
      </style>

      <span invalid$="[[invalid]]">
        <vaadin-text-area id="input" always-float-label label="[[label]][[_requiredStar(required)]]" required$="[[required]]" placeholder="[[placeholder]]" autofocus$="[[autofocus]]" disabled$="[[disabled]]" required$="[[required]]"
        readonly$="[[readonly]]"
        max-length="[[maxLength]]" invalid="{{invalid}}" error-message="[[_errorMessage]]" auto-validate rows="[[rows]]" max-rows="[[maxRows]]" value="{{value}}"></vaadin-text-area>
      </span>
    `
  }

  static get properties() {
    return {
      label: String,
      placeholder: String,
      maxLength: Number,
      rows: Number,
      maxRows: Number,
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
        notify: true
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
      this.set("error", null)
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

window.customElements.define('form-textarea', FormTextarea);
