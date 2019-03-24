import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { RRule, rrulestr } from 'rrule';
import { BaseElement } from '../../base-element.js';
import '../../elements/confirmation-dialog.js';
import '../../shared-styles.js';

class PageMemberScheduleSlot extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        form-edit-controls {
          margin-bottom: 32px;
        }
        vaadin-checkbox[disabled] {
          color: #576372;
          user-select: all;
        }
      </style>

      <app-container>
        <div class="padding">
          <h4>Schedule Slot</h4>

          <app-form id="formToFocus" disabled$="[[_andNot(editing,_editingFields)]]">
            <app-grid-item width=6 slot="field">
              <form-input value="{{schedule.name}}" error="[[errors.name]]" label="Name" auto-readonly autofocus required></form-input>
            </app-grid-item>
          </app-form>

          <form-button label="Create Schedule Slot" hidden$="[[editing]]" on-tap="_create" id="confirm" style="display: inline-block; min-width: 140px; margin-top: 16px;"></form-button>

        </div>
      </app-container>
    `;
  }

  static get properties() {
    return {
      _slot: { type: Object, value: {} },
      errors: { type: Object, value: {} },
      editing: { type: Boolean, value: false },
      _editingFields: { type: Boolean, value: false },
    }
  }

  _recurrencesActiveItemChanged(e) {
    // var value = e.detail.value;
    // if (!value && this._previouslySelectedItem) {
    //   this._openNewTab(`/e/${this.event.link}${value.linkpart ? "/" + value.linkpart : ""}`)
    // } else if (value) {
    //   this._previouslySelectedItem = value;
    //   this._openNewTab(`/e/${this.event.link}${value.linkpart ? "/" + value.linkpart : ""}`)
    // }
  }

  onload(path) {
    return new Promise((resolve, reject) => {
      resolve({ page: "Update Schedule Slot" });
    });
  }

  _loadSlot(id) {
    resolve({ page: "Update Schedule Slot" });
  }

  _finishLoading() {
    this.$.formToFocus.focus();
    this.set("errors", {});
  }

  _create() {
    // this.$.confirm.loading = true;
    // const _schedule = {
    //   name: this.schedule.name,
    //   shortName: this.schedule.shortName,
    // };
    // this._post('/schedules', _schedule)
    // .then((data) => {
    //   this._navigateTo('/member/schedules');
    //   this._showToast("Schedule created!")
    //   this.$.confirm.loading = false;
    // })
    // .catch((e) => {
    //   this.set("errors", e.errors)
    //   this.$.confirm.loading = false;
    // });
  }

  _saveData(e) {

  }

  _deleteSlot() {

  }

  _cancelDelete() {

  }

  _confirmDelete() {

  }

}

window.customElements.define('page-member-schedule-slot', PageMemberScheduleSlot);
