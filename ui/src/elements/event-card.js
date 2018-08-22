import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';

class EventCard extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        div.action {
          font-family: var(--font-head);
          @apply --layout-horizontal;
          @apply --layout-start-justified;
          @apply --layout-center;
        }
        div.action > div {
          margin-right: 16px;
        }
        iron-icon.card-action-icon {
          margin-right: 10px;
        }
      </style>

      <app-card on-click="_navigate">
        <span slot="title">
          <h3 style="margin: 0">[[announcement.title]]</h3>
        </span>
        <span slot="content">
          [[announcement.content]]
        </span>
        <div slot="actions" class="action">
          <div hidden$="[[isEvent]]" style="opacity:0.4;">
            <iron-icon class="card-action-icon" icon="mdi:calendar-clock"></iron-icon>Posted <b>[[_parseAnnouncementDate(announcement.visibleFrom)]]</b>
          </div>
          <div hidden$="[[!isEvent]]">
            <iron-icon class="card-action-icon" icon="mdi:calendar-clock"></iron-icon><b>Mar 3 at 6p</b>
          </div>
          <div hidden$="[[!isEvent]]">
            <iron-icon class="card-action-icon" icon="mdi:map-marker"></iron-icon><b>Makerspace</b></a>
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
    if (moment(date).add(23, 'hours').isBefore(moment())) {
      return moment(date).fromNow();
    } else if (moment().year() === moment(date).year()) {
      return moment(date).format('MMM D [at] h:mm a');
    } else {
      return moment(date).format('MMM D, YYYY');
    }
  }

  _navigate() {
    this._fire('change-page', `/${this.isEvent ? 'event' : 'announcement'}/${this.announcement.link}`);
  }
}

window.customElements.define('event-card', EventCard);
