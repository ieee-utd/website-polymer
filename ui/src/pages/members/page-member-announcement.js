import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../../base-element.js';
import '../../elements/confirmation-dialog.js';
import '../../shared-styles.js';

class PageMemberAnnouncement extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        form-edit-controls {
          margin-bottom: 32px;
        }
        .time-picker {
          margin-top: 33px;
        }
      </style>

      <app-container>
        <div class="padding">
          <h4>Announcement</h4>

          <app-form id="formToFocus" disabled$="[[_andNot(editing,_editingFields)]]">
            <app-grid-item width=6 slot="field">
              <form-input value="{{announcement.title}}" error="{{errors.title}}" label="Title" auto-readonly autofocus required></form-input>
            </app-grid-item>
            <app-grid-item width=6 slot="field"></app-grid-item>
            <app-grid-item width=12 slot="field">
              <form-textarea value="{{announcement.content}}" error="{{errors.content}}" label="Content" auto-readonly required></form-textarea>
            </app-grid-item>
            <app-grid-item width=3 slot="field">
              <vaadin-date-picker placeholder="Pick a date" value="{{announcement.visibleFromDate}}" error-message="{{errors.visibleFrom}}" invalid$="{{errors.visibleFrom}}" label="Visible from" auto-readonly></vaadin-date-picker>
            </app-grid-item>
            <app-grid-item width=3 slot="field">
              <vaadin-time-picker class="time-picker" placeholder="hh:mm" value="{{announcement.visibleFromTime}}" invalid$="{{errors.visibleFrom}}" auto-readonly></vaadin-time-picker>
            </app-grid-item>
            <app-grid-item width=6 slot="field"></app-grid-item>
            <app-grid-item width=3 slot="field">
              <vaadin-date-picker placeholder="Pick a date" value="{{announcement.visibleUntilDate}}" error-message="{{errors.visibleUntil}}" invalid$="{{errors.visibleUntil}}" label="Visible until" auto-readonly></vaadin-date-picker>
            </app-grid-item>
            <app-grid-item width=3 slot="field">
              <vaadin-time-picker class="time-picker" placeholder="hh:mm" value="{{announcement.visibleUntilTime}}" invalid$="{{errors.visibleUntil}}" auto-readonly></vaadin-time-picker>
            </app-grid-item>
            <app-grid-item width=6 slot="field"></app-grid-item>
            <app-grid-item width=6 slot="field">
              <form-input value="{{announcement.tags}}" error="{{errors.tags}}" placeholder="Enter your comma-separated tags" label="Tags" auto-readonly></form-input>
            </app-grid-item>
          </app-form>

          <form-edit-controls hidden$="[[!editing]]" id="editControls" object="{{announcement}}" errors="{{errors}}" fields='["title","content","visibleFromDate","visibleFromTime","visibleUntilDate", "visibleUntilTime", "tags"]'  editing="{{_editingFields}}" on-save="_saveData" hidden$="[[!editing]]"></form-edit-controls>
          <form-button label="Delete Announcement" hidden$="[[!editing]]" on-tap="_deleteAnnouncement" id="delete" style="display: inline-block; min-width: 140px; margin-top: 16px;" red></form-button>

          <form-button label="Create Announcement" hidden$="[[editing]]" on-tap="_create" id="confirm" style="display: inline-block; min-width: 140px; margin-top: 16px;"></form-button>

          <confirmation-dialog id="dialog" tabindex="-1" with-backdrop style="max-width: 320px;">
            <h2 style='font-family: "Rubik";'>Confirm Delete</h2>
            <p>Are you sure you want to delete this announcement? This cannot be undone.</p>
            <div>
              <paper-button class="confirm" on-tap="_confirmDelete" style="color: #FF4139;">Yes</paper-button>
              <paper-button class="cancel" on-tap="_cancelDelete">No</paper-button>
            </div>
          </confirmation-dialog>
          
          <!-- <paper-dialog id="confirmationDialog" always-on-top with-backdrop>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this announcement? This cannot be undone.</p>
            <div style="">
              <paper-button class="confirm" on-tap="_confirmDelete">Yes</paper-button>
              <paper-button class="cancel" on-tap="_cancelDelete">No</paper-button>
            </div>
          </paper-dialog> -->

        </div>
      </app-container>
    `;
  }

  static get properties() {
    return {
      announcement: { type: Object, value: {} },
      errors: { type: Object, value: {} },
      editing: { type: Boolean, value: false },
      _editingFields: { type: Boolean, value: false },
    }
  }

  onload(path) {
    return new Promise((resolve, reject) => {
      if (path.length == 0) {
        return reject("Invalid announcement id")
      }

      var id = path[0];

      if (id === "create") {
        this.set("editing", false);
        this.set("announcement", {
          visibleFromDate: this._prettyDate(moment().startOf('hour')),
          visibleFromTime: this._prettyTime(moment().startOf('hour')),
          visibleUntilDate: this._prettyDate(moment().add(14, 'days').startOf('hour')),
          visibleUntilTime: this._prettyTime(moment().add(14, 'days').startOf('hour')),
        });
        this._finishLoading();
        return resolve({ page: "Create Announcement" });
      }

      this._get(`/announcements/${id}`)
      .then((announcement) => {
        const _announcement = {
          id: id,
          title: announcement.title,
          content: announcement.content,
          visibleFromDate: this._prettyDate(announcement.visibleFrom),
          visibleFromTime: this._prettyTime(announcement.visibleFrom),
          visibleUntilDate: this._prettyDate(announcement.visibleUntil),
          visibleUntilTime: this._prettyTime(announcement.visibleUntil),
          tags: this._prettyTags(announcement.tags)
        };
        this.set("editing", true);
        this.set("announcement", _announcement);
        this._finishLoading();
        resolve({ page: "Update announcement" });
      })
      .catch(reject);
    });
  }

  _finishLoading() {
    this.$.formToFocus.focus();
    this.set("errors", {});
  }

  _create() {
    this.$.confirm.loading = true;
    const _announcement = {
      title: this.announcement.title,
      content: this.announcement.content,
      visibleFrom: this._isoDatetime(this.announcement.visibleFromDate, this.announcement.visibleFromTime),
      visibleUntil: this._isoDatetime(this.announcement.visibleUntilDate, this.announcement.visibleUntilTime),
      tags: this._arrayTags(this.announcement.tags)
    };
    this._post(`/announcements`, _announcement)
    .then((data) => {
      this._navigateTo(`/member/announcement/${data.link}`);
      this._showToast("Announcement created!")
      this.$.confirm.loading = false;
    })
    .catch((e) => {
      this.set("errors", e.errors)
      this.$.confirm.loading = false;
    });
  }

  _saveData(e) {
    var element = e.currentTarget;
    var announcement = e.detail;
    const _announcement = {
      title: announcement.title,
      content: announcement.content,
      visibleFrom: this._isoDatetime(announcement.visibleFromDate, announcement.visibleFromTime),
      visibleUntil: this._isoDatetime(announcement.visibleUntilDate, announcement.visibleUntilTime),
      tags: this._arrayTags(announcement.tags)
    };

    this._put(`/announcements/${this.announcement.id}`, _announcement)
    .then((announcement) => {
      this._showToast("Announcement updated");
      element.done();
    })
    .catch((e) => {
      this.set("errors", e.errors)
      element.fail();
    });
  }

  _deleteAnnouncement() {
    this.$.dialog.openDialog();
  }

  _cancelDelete() {
    this.$.dialog.closeDialog();
  }

  _confirmDelete() {
    this.$.dialog.closeDialog();
    this._delete(`/announcements/${this.announcement.id}`, undefined)
    .then((data) => {
      this._navigateTo(`/member/announcements`);
      this._showToast("Announcement deleted");
    })
    .catch((e) => {
      console.error(e);
    });
  }

  _prettyDate(isoString) {
    return moment(isoString).format('YYYY-MM-DD');
  }

  _prettyTime(isoString) {
    return moment(isoString).format('HH:mm');
  }

  _prettyTags(tags) {
    var tagString = '';
    for (var i = 0; i < tags.length; i++) {
      if (i == 0) tagString = tags[i];
      else tagString += ', ' + tags[i];
    }
    return tagString;
  }

  _isoDatetime(prettyDate, prettyTime) {
    if (!moment(prettyDate + ' ' + prettyTime).isValid()) {
      return undefined; //it's OK if the time is invalid, just don't send it
    }
    return moment(prettyDate + ' ' + prettyTime).format();
  }

  _arrayTags(tagString) {
    if (!tagString || tagString === undefined) return [];
    var tags = tagString.split(',');
    for (var i = 0; i < tags.length; i++) {
      tags[i] = tags[i].trim();
    }
    return tags;
  }
}

window.customElements.define('page-member-announcement', PageMemberAnnouncement);