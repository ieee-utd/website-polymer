import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { RRule, rrulestr } from 'rrule';
import { BaseElement } from '../../base-element.js';
import '../../elements/confirmation-dialog.js';
import '../../shared-styles.js';

class PageMemberEvent extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        form-edit-controls {
          margin-bottom: 32px;
        }
      </style>

      <app-container>
        <div class="padding">
          <h4>Event</h4>

          <app-form id="formToFocus" disabled$="[[_andNot(editing,_editingFields)]]">
            <app-grid-item width=6 slot="field" hidden$="[[!editing]]" vertical>
              <form-input value="[[_getPermalink(event.link)]]" label="Permalink" readonly></form-input>
              <a href="/e/[[event.link]]" target="_blank">View published announcement</a>
            </app-grid-item>
            <app-grid-item width=6 slot="field" hidden$="[[!editing]]" vertical></app-grid-item>
            <app-grid-item width=6 slot="field">
              <form-input value="{{event.title}}" error="{{errors.title}}" label="Title" auto-readonly autofocus required></form-input>
            </app-grid-item>
            <app-grid-item width=6 slot="field"></app-grid-item>
            <app-grid-item width=6 slot="field">
              <form-input value="{{event.locationName}}" error="{{errors.title}}" label="Location" auto-readonly required></form-input>
            </app-grid-item>
            <app-grid-item width=6 slot="field">
              <form-input value="{{event.locationUrl}}" error="{{errors.title}}" label="Location Link" auto-readonly required></form-input>
            </app-grid-item>
            <app-grid-item width=3 slot="field">
              <vaadin-date-picker placeholder="Pick a date" value="{{event.startDate}}" error-message="{{errors.startDate}}" invalid$="{{errors.startDate}}" label="Start date" auto-readonly></vaadin-date-picker>
            </app-grid-item>
            <app-grid-item width=3 slot="field">
              <vaadin-time-picker placeholder="hh:mm" value="{{event.startTime}}" invalid$="{{errors.startTime}}" label="Start time" auto-readonly></vaadin-time-picker>
            </app-grid-item>
            <app-grid-item width=6 slot="field"></app-grid-item>
            <app-grid-item width=3 slot="field">
              <vaadin-date-picker placeholder="Pick a date" value="{{event.endDate}}" error-message="{{errors.endDate}}" invalid$="{{errors.endDate}}" label="End date" auto-readonly></vaadin-date-picker>
            </app-grid-item>
            <app-grid-item width=3 slot="field">
              <vaadin-time-picker placeholder="hh:mm" value="{{event.endTime}}" invalid$="{{errors.endTime}}" label="End time" auto-readonly></vaadin-time-picker>
            </app-grid-item>
            <app-grid-item width=6 slot="field"></app-grid-item>
            <app-grid-item width=6 slot="field">
              <vaadin-checkbox id="checkbox" checked="{{event.reservationRequired}}">Reservation required</vaadin-checkbox>
            </app-grid-item>
            <app-grid-item width=6 slot="field"></app-grid-item>
            <app-grid-item width=6 slot="field">
              <form-input value="{{event.tags}}" error="{{errors.tags}}" placeholder="Enter your comma-separated tags" label="Tags" auto-readonly></form-input>
            </app-grid-item>
          </app-form>

          <form-edit-controls hidden$="[[!editing]]" id="editControls" object="{{event}}" errors="{{errors}}" fields='["title","content","visibleFromDate","visibleFromTime","visibleUntilDate", "visibleUntilTime", "tags"]'  editing="{{_editingFields}}" on-save="_saveData" hidden$="[[!editing]]"></form-edit-controls>

          <form-button label="Delete Event" hidden$="[[!editing]]" on-tap="_deleteEvent" id="delete" style="display: inline-block; min-width: 140px; margin-top: 16px;" red></form-button>

          <form-button label="Create Event" hidden$="[[editing]]" on-tap="_create" id="confirm" style="display: inline-block; min-width: 140px; margin-top: 16px;"></form-button>

          <confirmation-dialog id="dialog" tabindex="-1" with-backdrop style="max-width: 320px;">
            <h2 style='font-family: "Rubik";'>Confirm Delete</h2>
            <p>Are you sure you want to delete this event? This cannot be undone.</p>
            <div>
              <paper-button class="confirm" on-tap="_confirmDelete" style="color: #FF4139;">Yes</paper-button>
              <paper-button class="cancel" on-tap="_cancelDelete">No</paper-button>
            </div>
          </confirmation-dialog>

        </div>
      </app-container>
    `;
  }

  static get properties() {
    return {
      event: { type: Object, value: {} },
      errors: { type: Object, value: {} },
      editing: { type: Boolean, value: false },
      _editingFields: { type: Boolean, value: false },
    }
  }

  _getPermalink(link) {
    return window.location.hostname + "/e/" + link;
  }

  onload(path) {
    return new Promise((resolve, reject) => {
      if (path.length == 0) {
        return reject("Invalid event id")
      }

      var id = path[0];

      if (id === "create") {
        this.set("editing", false);
        // this.set("announcement", {
        //   visibleFromDate: this._prettyDate(moment().startOf('hour')),
        //   visibleFromTime: this._prettyTime(moment().startOf('hour')),
        //   visibleUntilDate: this._prettyDate(moment().add(14, 'days').startOf('hour')),
        //   visibleUntilTime: this._prettyTime(moment().add(14, 'days').startOf('hour')),
        // });
        this._finishLoading();
        return resolve({ page: "Create Event" });
      }

      this._get(`/events/${id}`)
      .then((event) => {
        console.log(event);
        const _event = {
          id: id,
          title: event.title,
          locationName: event.locationName,
          locationUrl: event.locationUrl,
          reservationRequired: false,
          reservationUrl: event.reservationUrl,
          startDate: this._prettyDate(event.startTime),
          startTime: this._prettyTime(event.startTime),
          endDate: this._prettyDate(event.endTime),
          endTime: this._prettyTime(event.endTime),

          tags: this._prettyTags(event.tags),
          link: event.link
        };
        this.$.checkbox.disabled = false;
        this.set("editing", true);
        this.set("event", _event);
        this._finishLoading();
        resolve({ page: "Update Event" });
      })
      .catch(reject);
    });
  }

  _finishLoading() {
    this.$.formToFocus.focus();
    this.set("errors", {});
  }

  _create() {
    
  }

  _saveData(e) {
    
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

window.customElements.define('page-member-event', PageMemberEvent);
