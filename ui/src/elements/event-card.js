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
          <div hidden$="[[!_and(isEvent, announcement.locationName)]]">
            <iron-icon class="card-action-icon" icon="mdi:map-marker"></iron-icon><span><b>[[announcement.locationName]]</b></span>
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

  _navigate() {
    this._fire('change-page', `/${this.isEvent ? 'event' : 'announcement'}/${this.announcement.link}`);
  }
}

window.customElements.define('event-card', EventCard);
