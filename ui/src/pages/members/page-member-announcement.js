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
          <app-form id="formToFocus" disabled$="[[_andNot(editing,_editingFields)]]">
            <app-grid-item width=6 slot="field" hidden$="[[!editing]]" vertical>
              <form-input value="[[_getPermalink(announcement.link)]]" label="Permalink" readonly></form-input>
              <a href="/a/[[announcement.link]]" target="_blank">View published announcement</a>
            </app-grid-item>
            <app-grid-item width=6 slot="field" hidden$="[[!editing]]" vertical></app-grid-item>
            <app-grid-item width=6 slot="field">
              <form-input value="{{announcement.title}}" error="{{errors.title}}" label="Title" auto-readonly autofocus required></form-input>
            </app-grid-item>
            <app-grid-item width=6 slot="field"></app-grid-item>
            <app-grid-item width=12 slot="field" vertical>
              <form-textarea value="{{announcement.content}}" error="{{errors.content}}" label="Content" auto-readonly required></form-textarea>
              <span style="font-size: 12px; color: var(--paper-grey-700)">This field supports most features of <a href="https://s3.amazonaws.com/ieee-utd/resources/markdown-cheatsheet.pdf" target="_blank">Github Flavored Markdown</a>. We do NOT support @mentions or issue references. We DO support emojis. :wink:</span>
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

          <confirmation-dialog id="dialog" tabindex="-1" with-backdrop>
            <h2 style='font-family: "Rubik"; margin-top: 0'>Confirm Delete</h2>
            <p>Are you sure you want to permanently delete this announcement?<br>This cannot be undone.</p>
            <div style="text-align: right">
              <form-button class="confirm" on-tap="_confirmDelete" red label="Delete" style="display: inline-block"></form-button>
              <form-button class="cancel" on-tap="_cancelDelete" grey label="Cancel" style="display: inline-block"></form-button>
            </div>
          </confirmation-dialog>

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

  _getPermalink(link) {
    return window.location.hostname + "/a/" + link;
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
          tags: this._prettyTags(announcement.tags),
          link: announcement.link
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
