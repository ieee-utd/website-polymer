import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '../shared-styles.js';

class PageAnnouncement extends BaseElement {
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
          padding: 0 16px;
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

        #content {
          opacity: 0.85;
        }
        #content p {
          margin-top: 0;
        }
      </style>

      <app-container class="content">
        <paper-card loading$="[[_loading]]">
          <div class="title">
            <div class="spanned">
              <h2>[[announcement.title]]</h2>
              <paper-icon-button icon="mdi:close" on-tap="_backHome"></paper-icon-button>
            </div>
          </div>
          <div class="content-padding">
            <div id="content"></div>
            <div class="avatar-container">
              <div class="user-avatar">
                <span style="margin-right:8px">Posted [[_parseDate(announcement.visibleFrom)]] by </span>
                <span class="name">
                  <div class="initials"><span>[[announcement.createdBy.initials]]</span></div>
                  <span><b>[[announcement.createdBy.firstName]] [[announcement.createdBy.lastName]]</b></span>
                </span>
                <!--<iron-image preload fade sizing="cover" src="[[announcement.createdBy.]]"></iron-image>-->
              </div>
            </div>
          </div>
        </paper-card>
      </app-container>
    `;
  }

  static get properties() {
    return {
      announcement: {
        type: Object,
        value: { }
      },
      _loading: { type: Boolean, value: true },
      _savedScroll: { type: Number, value: 0 }
    }
  }

  _backHome() {
    this._fire("change-page", { route: '/', scroll: this._savedScroll || 0 })
  }

  _parseDate(date) {
    if (moment(date).add(23, 'hours').isAfter(moment())) {
      return moment(date).fromNow();
    } else if (moment().year() === moment(date).year()) {
      return moment(date).format('MMM D [at] h:mm a');
    } else {
      return moment(date).format('MMM D, YYYY');
    }
  }

  onload(subroute, scroll) {
    return new Promise((resolve, reject) => {
      let tail = subroute.path.substring(1);
      if (!tail) return reject({ message: "Announcement not found", status: 404 })

      this.set("_loading", true)

      this._get("/announcements/" + tail)
      .then((announcement) => {
        this.set("_savedScroll", scroll);
        this.set("_loading", false)
        this.$.content.innerHTML = this._parseMarkdown(announcement.content);
        this.set("announcement", announcement)
        resolve();
      })
      .catch(() => {
        this.set("_loading", false)
        reject();
      })
    })
  }
}

window.customElements.define('page-announcement', PageAnnouncement);
