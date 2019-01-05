import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/device-icons.js';
import '@polymer/iron-icons/notification-icons.js';
import moment from 'moment';

class BasicSchedule extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          margin: 16px 0;
        }
        /* Schedule layout */
        .schedule-container {
          height: 100%;
          display: flex;
          flex-direction: row;
        }
        .time-ticks {
          width: 50px;
        }
        .week {
          height: 100%;
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
        .weekday-container {
          margin-top: 12px;
          text-align: left;
          position: relative;
          height: 100%;
        }
        .event {
          position: absolute;
        }
        .event-inner {
          max-width: 50px;
          min-height: 32px;
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
      </style>

      <div class="schedule-main" style$="height:[[scheduleHeight]]px;">
        <template is="dom-if" if="[[loading]]">
          Loading...
        </template>
        <template is="dom-if" if="[[!loading]]">
          <div class="schedule-container" on-click="_closeDialog">
            <div class="time-ticks"></div>
            <div class="week">
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
                    [[item.day]]
                    <div class="weekday-container">
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
            </div>
          </div>
        </template>
      </div>
    `
  }

  static get properties() {
    return {
      data: { type: Object, observer: '_dataChanged' },
      loading: { type: Boolean, value: true }
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
        event.top = (event.top-firstStart)/2;
        event.width = 100/colEnds.length;
        event.left = (event.left)*(100/colEnds.length);
      });

      this.processedData.push(updatedWeekday);
    });
    if (lastEnd > 0) this.scheduleHeight = ((lastEnd, Math.ceil(lastEnd/100)*100) - (firstStart, Math.floor(firstStart/100)*100)) / 2;

    this.loading = false;
  }

  constructor() {
    super();
    this.processedData = [];
    this.scheduleHeight = 1200;
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
      title: item.title,
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
}

window.customElements.define('basic-schedule', BasicSchedule);