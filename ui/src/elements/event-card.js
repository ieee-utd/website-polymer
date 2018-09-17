import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';

class EventCard extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          --card-color: var(--paper-grey-800);
          --card-color-hover: var(--paper-grey-700);
          --card-color-hover-dark: var(--color-primary);
        }
        paper-card {
          min-height: 50px;
          width: 100%;
          border-radius: 8px;
          background-color: var(--card-color);
          padding: 16px;
          overflow: hidden;
        }
        h3 {
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin: 0;
          color:var(--color-orange-complement);
        }
        div.tags {
          margin-top: 10px;
          font-size: 14px;
          list-style-type: none;
          height: 21px;
        }
        div.tags > a {
          text-decoration: none;
          font-style: italic;
          padding: 4px;
          background-color: var(--paper-grey-700);
          border-radius: 4px;
          margin: 0 1px;
        }
        div#content {
          max-height: 110px;
          overflow: hidden;
        }
        div#content > p {
          margin-bottom: 0;
        }
        div.content-mask {
          position: absolute;
          left: 0;
          bottom: 0;
          height: 45px;
          width: 100%;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          pointer-events: none;
          background: linear-gradient(to bottom, transparent, var(--card-color));
          transition: 0.14s linear;
        }
        div.action {
          width: 100%;
          margin-top: 16px;
          font-family: var(--font-head);
          background-color: transparent;
          @apply --layout-horizontal;
          @apply --layout-start-justified;
          @apply --layout-center;
        }
        div.action > div {
          width: 100%;
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
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        div.more {
          position: absolute;
          bottom: 0px;
          left: 0;
          right: 0;
          height: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          background-color: var(--card-color-hover-dark);
          font-family: var(--font-head);
          font-weight: 700;
          opacity: 0;
          transition: 0.14s linear;
        }
        iron-icon.card-action-icon {
          margin-right: 10px;
        }
        a {
          color: white;
          pointer-events: none;
        }

        paper-card:hover {
          background-color: var(--card-color-hover);
          @apply --shadow-elevation-12dp;
          transition: 0.14s linear;
          cursor: pointer;
        }
        paper-card:hover div.more {
          opacity: 1;
          height: 50px;
        }

      </style>

      <paper-card on-click="_navigate">
        <h3>[[announcement.title]]</h3>
        <div class="tags">
          <dom-repeat items="[[announcement.tags]]">
            <template>
              <a href="#">#[[item]]</a>
            </template>
          </dom-repeat>
        </div>
        <div hidden$="[[isEvent]]" id="content"></div>
        <div hidden$="[[isEvent]]" class="content-mask"></div>
        <div hidden$="[[!isEvent]]" class="action">
          <div hidden$="[[!announcement.locationName]]">
            <iron-icon class="card-action-icon" icon="mdi:map-marker-outline"></iron-icon><span><b>[[announcement.locationName]]</b></span>
          </div>
          <div>
            <iron-icon class="card-action-icon" icon="mdi:clock-outline"></iron-icon><span><b>[[_parseEventDate(announcement.startTime,announcement.endTime,1)]]</b></span>
          </div>
        </div>
        <div class="more">
          View more
        </div>

      </paper-card>
    `;
  }

  static get properties() {
    return {
      announcement: {type: Object, observer: '_announcementChanged'},
      isEvent: { type: Boolean, value: false }
    }
  }

  _announcementChanged(announcement) {
    this.$.content.innerHTML = this._parseMarkdown(announcement.content);
  }

  _navigate() {
    this._fire('change-page', `/${this.isEvent ? 'event' : 'announcement'}/${this.announcement.link}`);
  }
}

window.customElements.define('event-card', EventCard);
