import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '../shared-styles.js';

class PageEvent extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          background-color: var(--paper-grey-900);
        }
        app-container.content {
          min-height: calc(100vh - 48px);
          height: auto;
          display: block;
          color: white;
          background-color: var(--paper-grey-900);
        }
        paper-card {
          width: 100%;
          margin-top: 64px;
          background-color: var(--paper-grey-200);
          border-radius: 8px;
          color: var(--paper-grey-900);
          overflow: hidden;
          @apply --shadow-elevation-4dp;
        }
        div.avatar-container {
          opacity: 0.5;
          margin-top: 32px;
          display: block;
        }
        div.avatar-container > div.title {
          margin-bottom: 8px;
        }
        div.avatar-container > div.user-avatar {
          @apply --layout-horizontal;
          @apply --layout-start-justified;
          @apply --layout-center;
        }
        div.avatar-container > div.user-avatar > span.name {
          @apply --layout-horizontal;
          @apply --layout-center-justified;
          @apply --layout-center;
        }
        div.avatar-container > div.user-avatar div.initials {
          height: 36px;
          width: 36px;
          min-width: 36px;
          font-size: 14px;
          background-color: var(--paper-grey-700);
          border-radius: 50%;
          font-family: var(--font-head);
          font-weight: 700;
          margin-right: 8px;
          color: white;
          @apply --layout-horizontal;
          @apply --layout-center-justified;
          @apply --layout-center;
        }

        @media (max-width: 670px) {
          div.avatar-container > div.user-avatar {
            @apply --layout-vertical;
            @apply --layout-justified;
            @apply --layout-start;
          }
          div.avatar-container > div.user-avatar > span.name {
            margin-top: 8px;
          }
        }

        paper-card div.title {
          background-color: var(--paper-grey-300);
          padding: 0 16px 16px 16px;
        }
        paper-card div.title > div.spanned {
          @apply --layout-horizontal;
          @apply --layout-justified;
          @apply --layout-center;
        }
        paper-card div.title paper-icon-button {
          width: 48px;
          height: 48px;
          padding: 12px;
          min-width: 48px;
          position: relative;
          left: 8px;
        }
        paper-card div.content-padding {
          padding: 16px;
        }

        div.tags {
          margin-bottom: 16px;
        }
        div.tags > a {
          text-decoration: none;
          font-style: italic;
          padding: 4px;
          background-color: var(--paper-blue-600);
          border-radius: 4px;
          color: white !important;
          margin-right: 6px;
        }

        div.info-row {
          @apply --layout-horizontal;
          @apply --layout-start-justified;
          @apply --layout-center;
          margin-bottom: 12px;
          font-weight: 700;
          font-family: var(--font-head);
          color: var(--color-primary-blue);
        }
        div.info-row > iron-icon {
          position: relative;
          left: -3px;
          margin-right: 6px;
          min-width: 24px;
        }

        a, a:active {
          color: var(--color-primary-blue);
        }

        #content {
          opacity: 0.85;
        }
        #content p {
          margin-top: 0;
        }

        clipboard-copy {
          font-weight: 400;
          background-color: var(--color-primary-blue);
          color: var(--paper-grey-200);
          padding: 4px 8px;
          border-radius: 4px;
          font-family: var(--font-mono);
          cursor: pointer;
        }

        paper-tooltip {
          --paper-tooltip-duration-in: 200ms;
          --paper-tooltip-duration-out: 200ms;
          --paper-tooltip-background: var(--paper-grey-800);
          --paper-tooltip-text-color: var(--paper-grey-300);
          border-radius: 8px;
          overflow: hidden;
        }
      </style>

      <app-container class="content">
        <paper-card>
          <div class="title">
            <div class="spanned">
              <h2>[[event.title]]</h2>
              <paper-icon-button icon="mdi:close" on-tap="_backHome"></paper-icon-button>
            </div>
            <div class="info-row">
              <iron-icon icon="mdi:map-marker"></iron-icon>
              <a hidden$="[[!event.locationUrl]]" href="[[event.locationUrl]]" target="_blank">[[event.locationName]]</a>
              <span hidden$="[[event.locationUrl]]">[[event.locationName]]</span>
            </div>
            <div class="info-row">
              <iron-icon icon="mdi:calendar-clock"></iron-icon>
              <span>[[_parseEventDate(event.startTime, event.endTime)]]</span>
            </div>
            <div class="info-row">
              <iron-icon icon="mdi:link-variant"></iron-icon>
              <paper-tooltip id="tooltip_event_copy" for="share_event_copy" position="right" animation-delay=0>Click to copy</paper-tooltip>
              <span><span style="margin-right: 4px; display: inline-block">Share event:</span><clipboard-copy id="share_event_copy" value="[[_getPermalink(event.link)]]" on-copy="_copyEventLink">[[_getPermalink(event.link)]]</clipboard-copy></span>
            </div>
          </div>

          <div class="content-padding">
            <div class="tags">
              <dom-repeat items="[[event.tags]]">
                <template>
                  <a href="#">#[[item]]</a>
                </template>
              </dom-repeat>
            </div>
            <div id="content"></div>
            <div class="avatar-container">
              <div class="user-avatar">
                <span style="margin-right:8px">Posted [[_parseAnnouncementDate(event.createdOn)]] by </span>
                <span class="name">
                  <div class="initials"><span>[[event.createdBy.initials]]</span></div>
                  <span><b>[[event.createdBy.firstName]] [[event.createdBy.lastName]]</b></span>
                </span>
                <!--<iron-image preload fade sizing="cover" src="[[event.createdBy.]]"></iron-image>-->
              </div>
            </div>
          </div>

        </paper-card>
      </app-container>
    `;
  }

  static get properties() {
    return {
      event: {
        type: Object,
        value: { }
      },
      _savedScroll: { type: Number, value: 0 }
    }
  }

  _copyEventLink() {
    this.$.tooltip_event_copy.innerHTML = "Copied!";
    setTimeout(() => {
      this.$.tooltip_event_copy.innerHTML = "Click to copy";
    }, 300)
  }

  _backHome() {
    this._fire("change-page", { route: '/', scroll: this._savedScroll || 0 })
  }

  _getPermalink(link) {
    return window.location.hostname + "/e/" + link;
  }

  onload(subroute, scroll) {
    return new Promise((resolve, reject) => {
      if (subroute.length == 0) return reject({ message: "Event not found", status: 404 })

      this._get("/events/" + subroute[0])
      .then((event) => {
        this.set("_savedScroll", scroll);
        this.$.content.innerHTML = this._parseMarkdown(event.content);
        this.set("event", event)
        resolve();
      })
      .catch(reject)
    })
  }

  ready() {
    super.ready();

    document.addEventListener('copy', (event) => {
      this._copyEventLink();
    })
  }
}

window.customElements.define('page-event', PageEvent);
