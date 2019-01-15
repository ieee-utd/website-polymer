import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '../shared-styles.js';

class FormEditControls extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        form-button {
          display: inline-block;
          margin-right: 8px;
          min-width: 100px;
        }
      </style>

      <div class="padding" style="padding-bottom:0;padding-top:0" hidden$="[[loading]]">
        <form-button hidden$="[[editing]]" disabled$="[[disabled]]" on-tap="_enableEdit" icon="mdi:pencil" label="[[editLabel]]"></form-button>
        <form-button hidden$="[[!editing]]" on-tap="_saveEdit" icon="mdi:check" label="[[saveLabel]]"></form-button>
        <form-button grey hidden$="[[!editing]]" on-tap="_cancelEdit" icon="mdi:close" label="[[cancelLabel]]"></form-button>
      </div>
      <div class="padding" style="padding-bottom:0;padding-top:0;" hidden$="[[!loading]]">
        <form-button loading loading-label="[[loadingLabel]]"></form-button>
      </div>
    `;
  }

  static get properties() {
    return {
      object: { type: Object, reflectToAttribute: true },
      fields: { type: Array, value: [ ] },
      errors: { type: Object, value: { }, reflectToAttribute: true },
      disabled: { type: Boolean, value: false },
      loading: { type: Boolean, value: false, reflectToAttribute: true, notify: true },
      loadingLabel: { type: String, value: "Saving..." },
      editing: { type: Boolean, value: false, reflectToAttribute: true, notify: true },
      _backupObject: { type: Object, value: { }},
      saveLabel: { type: String, value: "Save" },
      cancelLabel: { type: String, value: "Cancel" },
      editLabel: { type: String, value: "Edit" }
    }
  }

  done() {
    this.loading = false;
  }
  fail() {
    this.loading = false;
    this.editing = true;
  }
  save(preventDispatch) {
    this._saveEdit(null, null, preventDispatch);
  }
  cancel() {
    this._cancelEdit();
  }
  edit() {
    this._enableEdit();
  }

  resetValue() {
    var object = JSON.parse(JSON.stringify(this.object)); //deep clone
    this._backupObject = { };
    for (var field of this.fields) {
      this._setPath(this._backupObject, field, this._path(object, field))
    }
  }

  _enableEdit() {
    var object = JSON.parse(JSON.stringify(this.object)); //deep clone
    this.set("_backupObject", { });
    for (var field of this.fields) {
      // this.set("_backupObject." + field, this._path(object, field))
      this._setPath(this._backupObject, field, this._path(object, field))
    }
    if (!this.editing) {
      this.dispatchEvent(new CustomEvent('edit', {bubbles: true, composed: true}));
    }
    this.editing = true;
  }

  _saveEdit(e, c, preventDispatch) {
    if (!this.editing || this.loading) return;
    this.editing = false;
    this.loading = true;

    var data = _.pick(this.object, this.fields);
    
    if (!preventDispatch) this.dispatchEvent(new CustomEvent('save', { bubbles: true, composed: true, detail: data }));
  }

  _cancelEdit() {
    if (!this.editing || this.loading) return;
    for (var field of this.fields) {
      var v = this._path(this._backupObject,field);
      this.set("object." + field, typeof v === 'undefined' ? "" : v);
      this.set("errors." + field, false);
    }
    this.editing = false;
    this.dispatchEvent(new CustomEvent('cancel', {bubbles: true, composed: true}));
  }
}

window.customElements.define('form-edit-controls', FormEditControls);
