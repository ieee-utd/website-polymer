import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '../shared-styles.js';

class AppForm extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>

      <iron-a11y-keys target="[[target]]" keys="enter"
                      on-keys-pressed="pressEnter"></iron-a11y-keys>

      <h3 hidden$="[[!title]]">[[title]]</h3>
      <app-grid>
        <slot name="field" id="fields"></slot>
      </app-grid>
    `;
  }

  static get properties() {
    return {
      title: {
        type: String,
        value: ""
      },
      target: {
        type: Object,
        value: function() {
          return this;
        }
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: "_disabledChanged"
      },
      hidden: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    }
  }

  _autofocus() {
    var nodes = this.$.fields.assignedNodes({flatten: true});
    var n;
    for (var i=0; i<nodes.length; i++) {
      if (!nodes[i].querySelector) continue;
      n = nodes[i].querySelector("[autofocus]");
      if (!n) continue;
      n.focus();
      return;
    }
  }

  focus() {
    this._autofocus();
  }
  enable() {
    this._setDisabled(false);
    this._autofocus();
  }
  disable() {
    this._setDisabled(true);
  }
  _setDisabled(disabled) {
    this.disabled = disabled;
  }
  _autofocus() {
    var nodes = this.$.fields.assignedNodes({flatten: true});
    var n;
    for (var i=0; i<nodes.length; i++) {
      if (!nodes[i].querySelector) continue;
      n = nodes[i].querySelector("[autofocus]");
      if (!n) continue;
      n.focus();
      return;
    }
  }
  _disabledChanged(disabled) {
    //disable main nodes
    var nodes = this.$.fields.assignedNodes({flatten: true});
    var n;
    for (var i=0; i<nodes.length; i++) {
      if (!nodes[i].querySelector) continue;
      n = nodes[i].querySelectorAll("[auto-disable]");
      for (var j=0; j<n.length; j++) {
        if (disabled) {
          n[j].setAttribute("disabled", "");
        } else {
          n[j].removeAttribute("disabled");
        }
      }

      n = nodes[i].querySelectorAll("[auto-readonly]");
      for (var j=0; j<n.length; j++) {
        if (disabled) {
          n[j].setAttribute("readonly", "");
        } else {
          n[j].removeAttribute("readonly");
        }
      }
    }
  }

  pressEnter(e) {
    if (this.disabled || this.hidden) return;
    this._fire("enter-pressed", e);
  }
}

window.customElements.define('app-form', AppForm);
