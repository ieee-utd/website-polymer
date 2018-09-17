import { html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-route.js';

import { BaseElement } from '../base-element';
import '../shared-styles.js';
import '../app-icons.js';

class PageHome extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          background-color: var(--color-background);
        }

        .title {
          margin: 0;
        }

        app-container {
          min-height: calc(100vh - 64px);
          height: auto;
          display: block;
          color: white;
          background-color: var(--color-background);
        }
        div.hero {
          height: 600px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: url('/img/hero.svg');
          background-position: center 10%;
          background-size: cover;
        }
        div.content {
          position: relative;
          top: 0;
          left: 0;
          right: 0;
          padding: 16px;
        }
        div.logo {
          text-align: center;
        }
        img.logo {
          height: 160px;
          width: auto;
          max-width: 100%;
        }
        div.bg {
          height: 500px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: url('/img/hero.svg');
          background-position: center 10%;
          background-size: cover;
        }
        div.bg-overlay {
          height: 500px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to bottom, rgba(33,33,33,0) 0%,rgba(33,33,33,1) 100%);
        }
        app-container {
          padding-top: 64px;
        }

        h2.title {
          @apply --layout-horizontal;
          @apply --layout-start-justified;
          @apply --layout-center;
          margin-bottom: 12px;
        }
        h2.title > iron-icon {
          width: 32px;
          height: 32px;
          margin-right: 8px;
        }

        loading-block {
          --background-color: var(--paper-grey-800);
          --background-color-darker: var(--paper-grey-700);
          --loading-height: 160px;
        }

        app-card {
          --card-color: #424242;
          --card-text-primary: white;
          --card-text-secondary: #c6c6c6;
          --card-gradient-from: rgba(66,66,66,0);
          --card-gradient-to: rgba(66,66,66,1);
          --card-hover-color: #666666;
          --card-hover-action-color: #545454;
        }
        iron-icon.card-action-icon {
          margin-right: 10px;
        }
        paper-button {
          text-transform: none;
          color: white;
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
        loading-block[loading].extra {
          margin-top:20px;
          margin-bottom:32px;
        }
        div.blurb {
          @apply --layout-vertical;
          @apply --layout-center-justified;
          @apply --layout-center;
        }
        div.blurb > p {
          max-width: 600px;
          font-size: 16px;
          font-family: var(--font-head);
          text-align: center;
          margin-bottom: 36px;
        }

        div.blurb > div > paper-button.large {
          text-transform: none;
          font-family: var(--font-head);
          font-weight: 700;
          color: white;
          background-color: var(--color-primary);
          padding: 12px 16px;
          margin-bottom: 36px;
        }

        div.main-card {
          /* background-color: var(--paper-grey-900); */
          padding: 16px;
          padding-bottom: 0;
          margin-bottom: 32px;
          border-radius: 16px;
        }

        a.button-link {
          color: inherit;
          background-color: inherit;
        }
        a.button-link > paper-button.large {
          text-transform: none;
          font-family: var(--font-head);
          font-weight: 700;
          color: white;
          background-color: var(--color-primary);
          padding: 12px 16px;
          margin-bottom: 36px;
        }

        div.day-container {
          color: white;
          font-family: var(--font-head);
          font-weight: 500;
          @apply --layout-horizontal;
          @apply --layout-justified;
          @apply --layout-start;
          width: 100%;
          padding: 16px 0;
        }
        div.day-container > div.day {
          color: var(--color-orange-complement);
          @apply --layout-vertical;
          @apply --layout-center-justified;
          @apply --layout-center;
          width: 120px;
          padding: 6px;
        }
        div.day-container > div.day > h2 {
          margin: 0;
          font-size: 42px;
        }
        div.day-container > div.right {
          width: 100%;
        }
        div.day-container > div.right > app-grid {
          --grid-padding-bottom: 0;
        }

        @media (max-width: 680px) {
          div.day-container {
            @apply --layout-vertical;
            @apply --layout-start-justified;
            @apply --layout-start;
          }
          div.day-container > div.day {
            @apply --layout-horizontal;
            @apply --layout-start-justified;
            @apply --layout-center;
            font-family: var(--font-head);
          }
          div.day-container > div.day > span {
            font-family: var(--font-head);
            margin-right: 8px;
            display: inline-block;
          } 
        }
      </style>

      <app-container>
        <div class="bg"></div>
        <div class="bg-overlay"></div>

        <div class="content">
          <div class="logo">
            <iron-image preload fade sizing="contain" style="width:100%; height:120px;" src="https://s3.amazonaws.com/ieee-utd/branding/ieeeutd_logo.svg"></iron-image>
          </div>
          <br>
          <div class="blurb">
            <p>We are the student chapter of the Institute of Electrical and Electronics Engineers (IEEE) at The University of Texas at Dallas (UTD).</p>
            <div>
              <a class="button-link" href="http://groups.google.com/group/ieee-utd-fall-2017--present/boxsubscribe" target="_blank"><paper-button class="large">Join our mailing list</paper-button></a>
              <paper-button class="large" on-tap="_navigate" url="/about">Learn more</paper-button>
            </div>
          </div>
          <div class="main-card" hidden$="[[_haveEvents(announcements,eventDates)]]">
            <h2 class="title"><iron-icon icon="mdi:calendar-clock"></iron-icon>Events</h2>
            <h4 style="font-weight: normal; opacity: 0.7;">There aren't any events in the next few weeks. Check back later!</h4>
          </div>
          <div class="main-card" hidden$="[[!_have(announcements)]]">
            <h2 class="title"><iron-icon icon="mdi:bullhorn" style="transform: rotate(-30deg)"></iron-icon>Important Announcements</h2>
            <app-grid>
              <dom-repeat items="[[announcements]]">
                <template>
                  <app-grid-item width=6>
                    <event-card announcement="[[item]]"></event-card>
                  </app-grid-item>
                </template>
              </dom-repeat>
            </app-grid>
          </div>
          <div class="main-card" hidden$="[[!_have(eventDates)]]">
            <h2 class="title"><iron-icon icon="mdi:calendar-clock"></iron-icon>Events</h2>
            <dom-repeat items="[[eventDates]]" as="day">
              <template>
                <div class="row day-container">
                  <div class="day">
                    <span>[[day.month]]</span>
                    <h2>[[day.day]]</h2>
                  </div>
                  <div class="right">
                    <app-grid>
                      <dom-repeat items="[[day.events]]" as="event">
                        <template>
                          <app-grid-item width=6>
                            <event-card announcement="[[event]]" is-event></event-card>
                          </app-grid-item>
                        </template>
                      </dom-repeat>
                    </app-grid>
                  </div>
                </div>
              </template>
            </dom-repeat>
          </div>
        </div>
      </app-container>
    `;
  }

  static get properties() {
    return {
      announcements: {
        type: Array,
        value: [ ]
      },
      eventDates: {
        type: Array,
        value: [ ]
      }
    }
  }

  _haveEvents(announcements, eventDates) {
    return announcements && eventDates && (announcements.length || eventDates.length) ? true : false
  }

  onload(subroute) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this._get("/events", { silent: true }),
        this._get("/announcements", { silent: true })
      ])
      .then((data) => {
        this.set("eventDates", data[0].dates);
        this.set("announcements", data[1]);
        resolve();
      })
      .catch(reject)
    })
  }

  _navigate(e) {
    let url = this._getAttributeFromEvent(e, 'url', "");
    this._fire('change-page', url);
  }
}

window.customElements.define('page-home', PageHome);
