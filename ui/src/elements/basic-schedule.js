import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import moment from 'moment';

class BasicSchedule extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          margin: 16px 0;
        }
        .schedule-main {
          display: flex;
          flex-direction: row;
        }
        .time-ticks {
          width: 50px;
        }
        .week {
          flex-grow: 1;
          display: flex;
          flex-direction: row;
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
        }
      </style>

      <div class="schedule-main" style$="height:[[scheduleHeight]]px;">
        <template is="dom-if" if="[[loading]]">
          Loading...
        </template>
        <template is="dom-if" if="[[!loading]]">
          <div class="time-ticks"></div>
          <div class="week">
            <dom-repeat items="{{processedData}}">
              <template>
                <div class="weekday">
                  [[item.day]]
                  <div class="weekday-container">
                    <dom-repeat items="{{item.processedEvents}}">
                      <template>
                        <div class="event">
                          [[item.iconName]]
                        </div>
                      </template>
                    </dom-repeat>
                  </div>
                </div>
              </template>
            </dom-repeat>
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
      var updatedWeekday = { day: weekDay.day, cols: 1, processedEvents: [] };
      var prevEndTime = 0;
      var colEnds = [];

      weekDay.events.forEach(event => {
        var intStart = this._ISO2Int(event.startTime);
        var intEnd = this._ISO2Int(event.endTime);
        if (intStart < firstStart) firstStart = intStart;
        if (intEnd > lastEnd) lastEnd = intEnd;

        if (colEnds.length == 0) colEnds.push(intEnd);
        if (intStart < prevEndTime) { // overlap
          var matchedCol = this._matchColEnd(intStart, colEnds);
          if (matchedCol < 0) { // check if new column must be created
            colEnds.push(intEnd);
          } else { // otherwise, place event in existing column
            colEnds[matchedCol] = intEnd;
          }
        }

        prevEndTime = intEnd;
      });
      updatedWeekday.cols = colEnds.length;
      this.processedData.push(updatedWeekday);
    });
    if (lastEnd > 0) this.scheduleHeight = ((lastEnd, Math.ceil(lastEnd/100)*100) - (firstStart, Math.floor(firstStart/100)*100)) / 2;

    // var processedEvent = {
    //   height: 0,
    //   width: 100, // percentage
    //   top: 0,
    //   left: 0, // percentage
    //   title: event.title,
    //   location: event.location,
    //   locationUrl: event.locationUrl,
    //   iconName: this._getInitials(event.people[0]),
    //   notes: event.notes,
    //   color: event.color
    // };

    this.loading = false;
  }

  constructor() {
    super();
    this.processedData = [];
    this.scheduleHeight = 1200;
  }

  _ISO2Int(isoString) {
    return Number.parseInt(moment(isoString).format('HHmm'), 10);
  }

  _getInitials(name) {
    // TODO: check valid name
    var words = name.split(" ");
    var initials = '';
    words.forEach(word => {
      initials += word.charAt(0).toUpperCase();
    });
    return initials;
  }

  _matchColEnd(intStart, colEnds) {
    console.log(intStart, colEnds);
    for (var i = 0; i < colEnds.length; i++) {
      if (colEnds[i] <= intStart) return i;
    }
    return -1;
  }
}

window.customElements.define('basic-schedule', BasicSchedule);