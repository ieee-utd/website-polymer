import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/device-icons.js';
import '@polymer/iron-icons/notification-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/paper-dialog/paper-dialog.js';
import moment from 'moment';


class AppSchedule extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          margin: 16px 0;
        }
        /* Schedule layout */
        .schedule-container {
          min-width: 260px;
          display: flex;
          flex-direction: row;
        }
        .time-ticks {
          width: 50px;
        }
        .time-ticks-inner {
          position: relative;
          margin-top: 60px;
        }
        .time-slot {
          height: 20px;
          position: absolute;
          font-size: 10pt;
          margin-left: 7px;
        }
        .week {
          flex-grow: 1;
          display: flex;
          position: relative;
        }
        .weekday {
          flex: 1 1 0;
          text-align: center;
        }
        .weekday:nth-child(2n+1) {
          background: #e8e8e8;
        }
        .day-text {
          height: 48px;
          width: 100px;
          line-height: 48px;
          font-size: 12pt;
          font-weight: 600;
          text-align: center;
        }
        .weekday-container {
          margin-top: 12px;
          text-align: left;
          position: relative;
        }
        .event {
          position: absolute;
        }
        .event-inner {
          max-width: 50px;
          min-height: 50px;
          height: 100%;
          margin: 0 2px;
          border-radius: 25px;
          display: flex;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }
        .event-inner-cover {
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          cursor: pointer;
          z-index: 1;
          -webkit-tap-highlight-color: transparent;
        }
        .icon {
          margin-top: 5px;
          width: 80%;
          height: 0;
          padding-top: 80%;
          border-radius: 50%;
          background: #fff;
          position: relative;
          display: flex;
          justify-content: center;
        }
        .icon-text {
          position: absolute;
          font-size: 8pt;
          font-weight: 600;
          top: 30%;
        }

        /* Dialog */
        paper-card {
          width: 250px;
          margin: 0;
          padding: 5px 9px;
          position: absolute;
          z-index: 1;
        }
        paper-card:focus {
          outline: none;
        }
        paper-card > h2 {
          font-size: 14pt;
          margin: 0 0 6px 0;
        }
        paper-card > p {
          font-size: 11pt;
          margin: 3px 0 3px 0;
        }
        paper-card > p > iron-icon {
          --iron-icon-height: 18px;
          --iron-icon-width: 18px;
          margin-right: 6px;
        }

        /* Smaller schedule */
        .day {
          flex-grow: 1;
          position: relative;
        }
        .day-selector {
          width: 100%;
          height: 48px;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .spacer {
          flex-grow: 1;
        }
        .day-container {
          margin-top: 12px;
          margin-left: auto;
          margin-right: auto;
          text-align: left;
          position: relative;
          max-width: 240px;
        }
        paper-dialog {
          width: 280px;
          padding: 16px 0;
        }
        paper-dialog > h2 {
          font-size: 14pt;
          margin: 0 0 6px 0;
        }
        paper-dialog > p {
          font-size: 11pt;
          margin: 3px 0 3px 0;
        }
        paper-dialog > p > iron-icon {
          --iron-icon-height: 18px;
          --iron-icon-width: 18px;
          margin-right: 6px;
        }
      </style>

      <div class="schedule-main">
        <iron-media-query query="(min-width: 1100px)" query-matches="{{wideScreen}}"></iron-media-query>
        <template is="dom-if" if="[[loading]]">
          Loading...
        </template>
        <template is="dom-if" if="[[!loading]]">
          <div class="schedule-container" on-click="_closeDialog">
            <div class="time-ticks">
              <div class="time-ticks-inner">
                <dom-repeat items="{{timeSlots}}">
                  <template>
                    <div class="time-slot" style$="top:[[item.top]]px;">[[item.time]]</div>
                  </template>
                </dom-repeat>
              </div>
            </div>
            <div class="week">
              <template is="dom-if" if="[[wideScreen]]">
              <paper-card elevation="3" hidden$="[[dialogData.hidden]]" style$="top:[[dialogData.top]]px;left:[[dialogData.left]]px;">
                <h2>[[dialogData.title]]</h2>
                <p><iron-icon icon="device:access-time"></iron-icon> [[dialogData.time]]</p>
                <template is="dom-if" if="[[dialogData.hasNotes]]">
                  <p><iron-icon icon="notification:event-note"></iron-icon> [[dialogData.notes]]</p>
                </template>
              </paper-card>
                <dom-repeat items="{{processedData}}">
                  <template>
                    <div class="weekday">
                      <div class="day-text">[[item.day]]</div>
                      <div class="weekday-container" style$="height:[[scheduleHeight]]px;">
                        <dom-repeat items="{{item.processedEvents}}">
                          <template>
                            <div 
                              class="event" 
                              style$="height:[[item.height]]px;width:[[item.width]]%;top:[[item.top]]px;left:[[item.left]]%;">
                              <div 
                                class="event-inner" 
                                style$="background:#[[item.color]];">
                                <div 
                                  class="event-inner-cover"
                                  on-click="_openDialog"
                                  data-item$="[[item]]"></div>
                                <div class="icon"><div class="icon-text">[[item.iconName]]</div></div>
                              </div>
                            </div>
                          </template>
                        </dom-repeat>
                      </div>
                    </div>
                  </template>
                </dom-repeat>
              </template>
              <template is="dom-if" if="[[!wideScreen]]">
                <!-- TODO: dialog backdrop -->
                <paper-dialog id="altDialog">
                  <h2>[[dialogData.title]]</h2>
                  <p><iron-icon icon="device:access-time"></iron-icon> [[dialogData.time]]</p>
                  <template is="dom-if" if="[[dialogData.hasNotes]]">
                    <p><iron-icon icon="notification:event-note"></iron-icon> [[dialogData.notes]]</p>
                  </template>
                </paper-dialog>
                <div class="day">
                  <div class="day-selector">
                    <div class="spacer"></div>
                    <paper-icon-button icon="chevron-left" on-click="_decrementDayIndex"></paper-icon-button>
                    <div class="day-text">[[selectedDay.day]]</div>
                    <paper-icon-button icon="chevron-right" on-click="_incrementDayIndex"></paper-icon-button>
                    <div class="spacer"></div>
                  </div>
                  <div class="day-container" style$="height:[[scheduleHeight]]px;">
                    <!-- TODO: iron-pages -->
                    <dom-repeat items="{{selectedDay.processedEvents}}">
                      <template>
                        <div 
                          class="event" 
                          style$="height:[[item.height]]px;width:[[item.width]]%;top:[[item.top]]px;left:[[item.left]]%;">
                          <div 
                            class="event-inner" 
                            style$="background:#[[item.color]];">
                            <div 
                              class="event-inner-cover"
                              on-click="_openAltDialog"
                              data-item$="[[item]]"></div>
                            <div class="icon"><div class="icon-text">[[item.iconName]]</div></div>
                          </div>
                        </div>
                      </template>
                    </dom-repeat>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    `
  }

  static get properties() {
    return {
      data: { type: Object, observer: '_dataChanged' },
      loading: { type: Boolean, value: true },
      dayIndex: { type: Number, value: 0, observer: '_dayIndexChanged' },
    }
  }

  // process and validate data
  _dataChanged(data) {
    
    var firstStart = 2401; // earliest start time
    var lastEnd = -1; // latest end time

    // TODO: validation and sort
    data.week.forEach(weekDay => {
      var updatedWeekday = { day: weekDay.day, processedEvents: [] };
      var prevEndTime = 0;
      var colEnds = [];

      weekDay.events.forEach(event => {
        var intStart = this._ISO2Int(event.startTime);
        var intEnd = this._ISO2Int(event.endTime);
        var processedEvent = {
          height: (intEnd-intStart)/2,
          width: 100, // percentage
          top: intStart,
          left: 0, // percentage
          title: event.title,
          location: event.location,
          locationUrl: event.locationUrl,
          iconName: this._getInitials(event.people[0]),
          startTime: event.startTime,
          endTime: event.endTime,
          people: event.people,
          notes: event.notes,
          color: event.color
        };

        if (intStart < firstStart) firstStart = intStart;
        if (intEnd > lastEnd) lastEnd = intEnd;

        if (colEnds.length == 0) colEnds.push(intEnd);
        if (intStart < prevEndTime) { // overlap
          var matchedCol = this._matchColEnd(intStart, colEnds);
          if (matchedCol < 0) { // check if new column must be created
            colEnds.push(intEnd);
            processedEvent.left = colEnds.length-1;
          } else { // otherwise, place event in existing column
            colEnds[matchedCol] = intEnd;
            processedEvent.left = matchedCol;
          }
        }

        prevEndTime = intEnd;
        updatedWeekday.processedEvents.push(processedEvent);
      });

      updatedWeekday.processedEvents.forEach(event => {
        event.width = 100/colEnds.length;
        event.left = (event.left)*(100/colEnds.length);
      });

      this.processedData.push(updatedWeekday);
    });
    var adjustedStart = Math.floor(firstStart/100)*100;
    var adjustedEnd = Math.ceil(lastEnd/100)*100;
    this.scheduleHeight = (adjustedEnd-adjustedStart) / 2;

    this.processedData.forEach(weekDay => {
      weekDay.processedEvents.forEach(event => {
        event.top = (event.top-adjustedStart+10)/2; // +10 because weird offset
      });
    });

    for (var i = adjustedStart; i < adjustedEnd; i += 100) {
      this.timeSlots.push({
        time: this._int2Nice(i),
        top: (i-adjustedStart)/2
      });
    }

    this.selectedDay = this.processedData[this.dayIndex];
    this.loading = false;
  }

  _dayIndexChanged(day) {
    this.dayIndex = ((day%7)+7) % 7;
    this.selectedDay = this.processedData[this.dayIndex];
  }

  _incrementDayIndex() {
    this.dayIndex = this.dayIndex + 1;
  }

  _decrementDayIndex() {
    this.dayIndex = this.dayIndex - 1;
  }

  constructor() {
    super();
    this.scheduleHeight = 1200;
    this.processedData = [];
    this.selectedDay = {};
    this.timeSlots = [];
    this.dialogData = {
      hidden: true,
      top: 0,
      left: 0,
      title: 'Untitled',
      time: '',
      hasNotes: false,
      notes: ''
    };
  }

  _ISO2Int(isoString) {
    return Number.parseInt(moment(isoString).format('HHmm'), 10);
  }

  _int2Nice(intTime) {
    var hour = intTime / 100;
    var intString = hour + ':00';
    return moment(intString, 'HH:mm').format('ha');
  }

  _getInitials(name) {
    // TODO: max 3 initials
    // TODO: alternative title initials if no people
    var words = name.split(' ');
    var initials = '';
    words.forEach(word => {
      initials += word.charAt(0).toUpperCase();
    });
    return initials;
  }

  _matchColEnd(intStart, colEnds) {
    for (var i = 0; i < colEnds.length; i++) {
      if (colEnds[i] <= intStart) return i;
    }
    return -1;
  }

  _openDialog(e) {
    const item = e.model.item;
    const eventBounds = e.path[0].getBoundingClientRect();
    const containerBounds = e.path[5].getBoundingClientRect();

    this.dialogData = {
      hidden: false,
      top: eventBounds.top-containerBounds.top,
      left: (eventBounds.right-containerBounds.left+254 < containerBounds.right-containerBounds.left) ? eventBounds.right-containerBounds.left+4 : eventBounds.left-containerBounds.left-254,
      title: item.people, // TODO: title or people
      time: moment(item.startTime).format('h:mma') + ' to ' + moment(item.endTime).format('h:mma'),
      hasNotes: item.notes && item.notes.length > 0,
      notes: item.notes
    };
  }

  _closeDialog(e) {
    if (e.path[0].className !== 'event-inner-cover' && e.path[0].className !== '') {
      this.dialogData = { hidden: true };
    }
  }

  _openAltDialog(e) {
    const item = e.model.item;
    const altDialog = this.shadowRoot.getElementById('altDialog');
    this.dialogData = {
      title: item.people, // TODO: title or people
      time: moment(item.startTime).format('h:mma') + ' to ' + moment(item.endTime).format('h:mma'),
      hasNotes: item.notes && item.notes.length > 0,
      notes: item.notes
    };

    altDialog.open();
  }
}

window.customElements.define('app-schedule', AppSchedule);