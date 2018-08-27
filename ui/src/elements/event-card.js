import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import moment from 'moment/src/moment.js';

class EventCard extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        div.action {
          font-family: var(--font-head);
          background-color: transparent;
          @apply --layout-horizontal;
          @apply --layout-start-justified;
          @apply --layout-center;
        }
        div.action > div {
          margin-right: 16px;
          @apply --layout-horizontal;
          @apply --layout-start-justified;
          @apply --layout-center;
        }
        div.action > div > span {
          display: block;
          width: 100%;
          max-height: 48px;
          overflow: hidden;
        }
        iron-icon.card-action-icon {
          margin-right: 10px;
        }
      </style>

      <app-card on-click="_navigate">
        <span slot="title">
          <h3 style="margin: 0; color:var(--color-orange-complement)">[[announcement.title]]</h3>
        </span>
        <span slot="content">
          [[announcement.content]]
        </span>
        <div slot="actions" class="action">
          <div hidden$="[[isEvent]]" style="opacity:0.4;">
            <iron-icon class="card-action-icon" icon="mdi:calendar-clock"></iron-icon>
            <span>Posted <b>[[_parseAnnouncementDate(announcement.visibleFrom)]]</b></span>
          </div>
          <div hidden$="[[!isEvent]]">
            <iron-icon class="card-action-icon" icon="mdi:calendar-clock"></iron-icon><span><b>[[_parseEventDate(announcement.startTime,announcement.endTime)]]</b></span>
          </div>
          <div hidden$="[[!isEvent]]">
            <iron-icon class="card-action-icon" icon="mdi:map-marker"></iron-icon><span><b>Makerspace</b></span>
          </div>
        </div>
        <div slot="actions-alt">
          View more
        </div>
      </app-card>
    `;
  }

  static get properties() {
    return {
      announcement: Object,
      isEvent: { type: Boolean, value: false }
    }
  }

  _parseAnnouncementDate(date) {
    if (moment(date).add(23, 'hours').isAfter(moment())) {
      return moment(date).fromNow();
    } else if (moment().year() === moment(date).year()) {
      return moment(date).format('MMM D [at] h:mm a');
    } else {
      return moment(date).format('MMM D, YYYY');
    }
  }

  _parseEventDate(_startDate, _endDate) {
    if (!_startDate) return "";
    var startDate = moment(_startDate);
    var endDate = moment(_endDate);
    if (startDate > endDate) {
      var _temp = _startDate;
      _startDate = _endDate;
      _endDate = _temp;
      startDate = moment(_startDate);
      endDate = moment(_endDate);
    }

    if (startDate.year() != moment().year()) {
      //not current year
      if (startDate.month() == endDate.month()) {
        //same month
        return startDate.format("MMM D") + " - " + endDate.format("D, YYYY");
      } else if (startDate.year() == endDate.year()){
        //different months
        return startDate.format("MMM D") + " - " + endDate.format("MMM D, YYYY");
      } else {
        //different years
        return startDate.format("MMM D, YYYY") + " - " + endDate.format("MMM D, YYYY");
      }
    } else if (moment(_endDate).startOf('minute').isSame(moment(_startDate).startOf('minute'))) {
      //same time
      return startDate.calendar(null, {
        sameDay: `[Today at] h${startDate.minute() > 0 ? ':mm' : ''} a`,
        nextDay: `[Tomorrow at] h${startDate.minute() > 0 ? ':mm' : ''} a`,
        nextWeek: `MMM D [at] h${startDate.minute() > 0 ? ':mm' : ''} a`,
        lastDay: `[Yesterday at] h${startDate.minute() > 0 ? ':mm' : ''} a`,
        lastWeek: `MMM D [at] h${startDate.minute() > 0 ? ':mm' : ''} a`,
        sameElse: `MMM D [at] h${startDate.minute() > 0 ? ':mm' : ''} a`
      });
    } else if (moment(_endDate).startOf('day').isSame(moment(_startDate).startOf('day'))) {
      //same day
      return startDate.calendar(null, {
        sameDay: `[Today], h${startDate.minute() > 0 ? ':mm' : ''} a`,
        nextDay: `[Tomorrow], h${startDate.minute() > 0 ? ':mm' : ''} a`,
        nextWeek: `MMM D, h${startDate.minute() > 0 ? ':mm' : ''} a`,
        lastDay: `[Yesterday], h${startDate.minute() > 0 ? ':mm' : ''} a`,
        lastWeek: `MMM D, h${startDate.minute() > 0 ? ':mm' : ''} a`,
        sameElse: `MMM D, h${startDate.minute() > 0 ? ':mm' : ''} a`
      }) + endDate.format(`[ -] h${endDate.minute() > 0 ? ':mm' : ''} a`);
    } else if (moment(_endDate).startOf('month').isSame(moment(_startDate).startOf('month'))) {
      //same month, different days
      return startDate.format(`MMM D`) + " - " + endDate.format(`D`);
    } else {
      //same year, different months
      if (startDate.month() == endDate.month()) {
        //same month
        return startDate.format("MMM D") + " - " + endDate.format("D, YYYY");
      } else if (startDate.year() == endDate.year()){
        //different months
        return startDate.format("MMM D") + " - " + endDate.format("MMM D, YYYY");
      } else {
        //different years
        return startDate.format("MMM D, YYYY") + " - " + endDate.format("MMM D, YYYY");
      }
    }
  }

  _navigate() {
    this._fire('change-page', `/${this.isEvent ? 'event' : 'announcement'}/${this.announcement.link}`);
  }
}

window.customElements.define('event-card', EventCard);
