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
        vaadin-checkbox[disabled] {
          color: #576372;
          user-select: all;
        }
      </style>

      <app-container>
        <div class="padding">
          <h4>Event</h4>

          <app-form id="formToFocus" disabled$="[[_andNot(editing,_editingFields)]]">
            <app-grid-item width=6 slot="field" hidden$="[[!editing]]" vertical>
              <form-input value="[[_getPermalink(event.link)]]" label="Permalink" readonly></form-input>
              <a href="/e/[[event.link]]" target="_blank">View published event</a>
            </app-grid-item>
            <app-grid-item width=6 slot="field" hidden$="[[!editing]]" vertical></app-grid-item>
            <app-grid-item width=6 slot="field">
              <form-input value="{{event.title}}" error="{{errors.title}}" label="Title" auto-readonly autofocus required></form-input>
            </app-grid-item>
            <app-grid-item width=6 slot="field"></app-grid-item>
            <app-grid-item width=12 slot="field" vertical>
              <form-textarea value="{{event.content}}" error="{{errors.content}}" label="Content" auto-readonly required></form-textarea>
              <span style="font-size: 12px; color: var(--paper-grey-700)">This field supports most features of <a href="https://s3.amazonaws.com/ieee-utd/resources/markdown-cheatsheet.pdf" target="_blank">Github Flavored Markdown</a>. We do NOT support @mentions or issue references. We DO support emojis. :wink:</span>
            </app-grid-item>
            <app-grid-item width=6 slot="field">
              <form-input value="{{event.locationName}}" error="{{errors.title}}" label="Location" auto-readonly required></form-input>
            </app-grid-item>
            <app-grid-item width=6 slot="field">
              <form-input value="{{event.locationUrl}}" error="{{errors.locationUrl}}" label="Location Url" auto-readonly></form-input>
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
              <vaadin-checkbox checked="{{event.repeat}}" auto-disable>Repeat</vaadin-checkbox>
            </app-grid-item>
            <app-grid-item width=6 slot="field"></app-grid-item>
            <template is="dom-if" if="{{event.repeat}}">
              <app-grid-item width=3 slot="field">
                <vaadin-select label="Frequency" value="{{event.frequency}}" auto-readonly readonly$="{{!editing}}">
                  <template>
                    <vaadin-list-box>
                      <vaadin-item>Weekly</vaadin-item>
                      <vaadin-item>Monthly</vaadin-item>
                    </vaadin-list-box>
                  </template>
                </vaadin-select>
              </app-grid-item>
              <app-grid-item width=3 slot="field">
                <vaadin-date-picker placeholder="Pick a date" value="{{event.untilDate}}" error-message="{{errors.untilDate}}" invalid$="{{errors.untilDate}}" label="Repeat until date" auto-readonly readonly$="{{!editing}}"></vaadin-date-picker>
              </app-grid-item>
              <app-grid-item width=3 slot="field">
                <vaadin-time-picker placeholder="hh:mm" value="{{event.untilTime}}" invalid$="{{errors.untilTime}}" label="Repeat until time" auto-readonly readonly$="{{!editing}}"></vaadin-time-picker>
              </app-grid-item>
              <app-grid-item width=3 slot="field"></app-grid-item>
              <app-grid-item style="border-bottom: 0;" width=12 slot="field">
                <span style="font-size: 14px; color: #576372;">Repeat on</span>
              </app-grid-item>
              <app-grid-item style="border-top: 0;" width=1 slot="field">
                <vaadin-checkbox checked="{{event.byMO}}" error-message="{{errors.byDay}}" invalid$="{{errors.byDay}}" auto-disable disabled$="{{!editing}}">MO</vaadin-checkbox>
              </app-grid-item>
              <app-grid-item style="border-top: 0;" width=1 slot="field">
                <vaadin-checkbox checked="{{event.byTU}}" auto-disable disabled$="{{!editing}}">TU</vaadin-checkbox>
              </app-grid-item>
              <app-grid-item style="border-top: 0;" width=1 slot="field">
                <vaadin-checkbox checked="{{event.byWE}}" auto-disable disabled$="{{!editing}}">WE</vaadin-checkbox>
              </app-grid-item>
              <app-grid-item style="border-top: 0;" width=1 slot="field">
                <vaadin-checkbox checked="{{event.byTH}}" auto-disable disabled$="{{!editing}}">TH</vaadin-checkbox>
              </app-grid-item>
              <app-grid-item style="border-top: 0;" width=1 slot="field">
                <vaadin-checkbox checked="{{event.byFR}}" auto-disable disabled$="{{!editing}}">FR</vaadin-checkbox>
              </app-grid-item>
              <app-grid-item style="border-top: 0;" width=1 slot="field">
                <vaadin-checkbox checked="{{event.bySA}}" auto-disable disabled$="{{!editing}}">SA</vaadin-checkbox>
              </app-grid-item>
              <app-grid-item style="border-top: 0;" width=1 slot="field">
                <vaadin-checkbox checked="{{event.bySU}}" auto-disable disabled$="{{!editing}}">SU</vaadin-checkbox>
              </app-grid-item>
              <app-grid-item width=5 slot="field"></app-grid-item>
            </template>
            <app-grid-item style="border-top: 16px solid rgba(255, 255, 255, 0);" width=6 slot="field">
              <vaadin-checkbox checked="{{event.reservationRequired}}" auto-disable>Reservation required</vaadin-checkbox>
            </app-grid-item>
            <app-grid-item width=6 slot="field"></app-grid-item>
            <app-grid-item width=6 slot="field">
              <template is="dom-if" if="{{event.reservationRequired}}">
                <form-input value="{{event.reservationUrl}}" error="{{errors.reservationUrl}}" label="Reservation link" auto-readonly readonly$="{{editing}}" required></form-input>
              </template>
            </app-grid-item>
            <app-grid-item width=6 slot="field"></app-grid-item>
            <app-grid-item width=6 slot="field">
              <form-input value="{{event.tags}}" error="{{errors.tags}}" placeholder="Enter your comma-separated tags" label="Tags" auto-readonly></form-input>
            </app-grid-item>
          </app-form>

          <form-edit-controls hidden$="[[!editing]]" id="editControls" object="{{event}}" errors="{{errors}}" fields='["title","content","location","locationUrl","startDate","startTime","endDate","endTime","reservationRequired","reservationUrl","repeat","frequency","untilDate","untilTime","byMO","byTU","byWE","byTH","byFR","bySA","bySU","tags"]'  editing="{{_editingFields}}" on-save="_saveData" hidden$="[[!editing]]"></form-edit-controls>

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
        this.set("event", {
          startDate: this._prettyDate(moment().startOf('hour')),
          startTime: this._prettyTime(moment().startOf('hour')),
          endDate: this._prettyDate(moment().add(14, 'days').startOf('hour')),
          endTime: this._prettyTime(moment().add(14, 'days').startOf('hour')),
          untilDate: this._prettyDate(moment().add(21, 'days').startOf('hour')),
          untilTime: this._prettyTime(moment().add(21, 'days').startOf('hour')),
          
        });
        this._finishLoading();
        return resolve({ page: "Create Event" });
      }

      this._get(`/events/${id}`)
      .then((event) => {

        var _freq = "";
        var _untilDate = "";
        var _untileTime = "";
        var repeatWeekdays = {  mo: false, tu: false, we: false, th: false, fr: false, sa: false, su: false };
        if (event.recurrenceRule !== null) {
          const rules = rrulestr(event.recurrenceRule);
          repeatWeekdays = this._getRepeatWeekdays(rules);
          _freq = this._getFrequency(rules);
          _untilDate = this._getUntilDate(rules);
          _untileTime = this._getUntilTime(rules);
        } 

        const _event = {
          id: id,
          title: event.title,
          content: event.content,
          locationName: event.locationName,
          locationUrl: event.locationUrl,
          reservationRequired: event.reservationRequired,
          reservationUrl: event.reservationUrl,
          startDate: this._prettyDate(event.startTime),
          startTime: this._prettyTime(event.startTime),
          endDate: this._prettyDate(event.endTime),
          endTime: this._prettyTime(event.endTime),
          repeat: event.recurrenceRule !== null,
          frequency: _freq,
          untilDate: _untilDate,
          untilTime: _untileTime,
          byMO: repeatWeekdays.mo,
          byTU: repeatWeekdays.tu,
          byWE: repeatWeekdays.we,
          byTH: repeatWeekdays.th,
          byFR: repeatWeekdays.fr,
          bySA: repeatWeekdays.sa,
          bySU: repeatWeekdays.su,
          tags: this._prettyTags(event.tags),
          link: event.link
        };
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
    var element = e.currentTarget;
    var event = e.detail;

    console.log(event);

    const _event = {
      title: event.title,
      content: event.content,
      locationName: event.locationName,
      locationUrl: event.locationUrl,
      startTime: this._isoDatetime(event.startDate, event.startTime),
      endTime: this._isoDatetime(event.endDate, event.endTime),
      reservationRequired: event.reservationRequired,
      reservationUrl: event.reservationUrl,
      tags: this._arrayTags(event.tags)
    };

    if (event.repeat) {
      _event.recurrenceRule = this._createRRule(event.frequency, event.untilDate, event.untilTime, { mo:event.byMO, tu:event.byTU, we:event.byWE, th:event.byTH, fr:event.byFR, sa:event.bySA, su:event.bySU });
    } 

    this._put(`/events/${this.event.id}`, _event)
    .then((event) => {
      this._showToast("Event updated");
      element.done();
    })
    .catch((e) => {
      this.set("errors", e.errors)
      element.fail();
    });
  }

  _getUntilDate(rules) {
    return moment(rules.options.until).format('YYYY-MM-DD');
  }

  _getUntilTime(rules) {
    return moment(rules.options.until).format('HH:mm');
  }

  _getFrequency(rules) {
    if (rules.options.freq == RRule.WEEKLY) return "Weekly";
    if (rules.options.freq == RRule.MONTHLY) return "Monthly";
    return "";
  }

  _getRepeatWeekdays(rules) {
    var repeatWeekdays = {  mo: false, tu: false, we: false, th: false, fr: false, sa: false, su: false };
    if (rules.options.byweekday === null) return repeatWeekdays;
    rules.options.byweekday.forEach(weekday => {
      if (weekday == RRule.MO.weekday) repeatWeekdays.mo = true;
      if (weekday == RRule.TU.weekday) repeatWeekdays.tu = true;
      if (weekday == RRule.WE.weekday) repeatWeekdays.we = true;
      if (weekday == RRule.TH.weekday) repeatWeekdays.th = true;
      if (weekday == RRule.FR.weekday) repeatWeekdays.fr = true;
      if (weekday == RRule.SA.weekday) repeatWeekdays.sa = true;
      if (weekday == RRule.SU.weekday) repeatWeekdays.su = true;
    });
    return repeatWeekdays;
  }

  _createRRule(freq, untilDate, untilTime, repeatDays) {
    var _freq = "";
    if (freq === 'Weekly') _freq = RRule.WEEKLY;
    else if (freq === 'Monthly') _freq = RRule.MONTHLY;

    var _byweekday = [];
    if (repeatDays.mo) _byweekday.push(RRule.MO);
    if (repeatDays.tu) _byweekday.push(RRule.TU);
    if (repeatDays.we) _byweekday.push(RRule.WE);
    if (repeatDays.th) _byweekday.push(RRule.TH);
    if (repeatDays.fr) _byweekday.push(RRule.FR);
    if (repeatDays.sa) _byweekday.push(RRule.SA);
    if (repeatDays.su) _byweekday.push(RRule.SU);

    const rule = new RRule({
      freq: _freq,
      byweekday: _byweekday,
      until: moment(untilDate + ' ' + untilTime).format(),
      wkst: RRule.MO
    })

    return rule.toString();
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
