import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '../shared-styles.js';

class PageTutoring extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        h1 {
          font-size: 2.4em;
          margin: 0;
        }

        .filler {
          height: 350px;
          background-color: var(--paper-grey-300);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        paper-tabs {
          font-family: var(--font-head);
          font-size: 12pt;
          -webkit-font-smoothing: antialiased;
          width: 100%;
          text-transform: uppercase;
          --paper-tab-ink: var(--color-secondary-active);
          --paper-tabs-selection-bar-color: var(--color-orange-complement);
        }
        paper-tab {
          min-width: 30px;
          max-width: 120px;
          transition: 0.2s color, 0.2s background-color;
        }
        paper-tab:hover {
          background-color: var(--paper-grey-300);
        }
        paper-tab.iron-selected {
          font-weight: 600;
          background-color: var(--color-primary);
          color: white;
        }
        iron-pages {
          background-color: var(--paper-grey-300);
          min-height: 480px;
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
          color: var(--paper-grey-800);
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

      <div class="hero-image">
        <div class="bg-overlay">
          <app-container>
            <h1 style="color:white;">Tutoring</h1>
          </app-container>
        </div>
        <iron-image class="bg" sizing="cover" src="/img/tutoring.png" preload fade></iron-image>
      </div>

      <app-container class="content" style="padding-top:0">
        <p style="margin-top:0">
          We offer tutoring at Jonsson School Student Enrichment Center (JSSEC), Synergy Park North (SPN) 2.220. We offer tutoring for Electrical Network Analysis, Signals and Systems, and more! Below, you can find up to date tutoring announcements, events, and schedules.
        </p>
        <p><b>Tutor schedules</b> and <b>tutoring events</b> are below.</p>

        <div class="main-card" hidden$="[[!_have(eventDates)]]">
          <h2>Events</h2>
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
                          <event-card announcement="[[event]]" is-event from="t"></event-card>
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


        <h2>Tutor Schedules</h2>
        <paper-tabs selected="{{selected}}">
          <paper-tab>DC</paper-tab>
          <paper-tab>DS</paper-tab>
          <paper-tab>ENA</paper-tab>
          <paper-tab>S&amp;S</paper-tab>
        </paper-tabs>
        <iron-pages selected="{{selected}}">
          <div>
            <iframe
              width="100%"
              height="480"
              frameborder="0" style="border:0"
              src="https://schedulebuilder.org/?despy2k9">
            </iframe>
          </div>
          <div>
            <iframe
              width="100%"
              height="480"
              frameborder="0" style="border:0"
              src="https://schedulebuilder.org/?bleuappk">
            </iframe>
          </div>
          <div>
            <iframe
              width="100%"
              height="480"
              frameborder="0" style="border:0"
              src="https://schedulebuilder.org/?djnj5jo4">
            </iframe>
          </div>
          <div>
            <iframe
              width="100%"
              height="480"
              frameborder="0" style="border:0"
              src="https://schedulebuilder.org/?r4zb960a">
            </iframe>
          </div>
        </iron-pages>

        <!-- TODO -->
        <!-- <h2>Tutors</h2> -->
      </app-container>
    `;
  }

  static get properties() {
    return {
      selected: { type: Number, value: 0 },
      eventDates: { type: Array, value: [ ] }
    }
  }

  onload(subroute) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this._get("/events?t=tutoring", { silent: true }),
        // this._get("/announcements?t=tutoring", { silent: true })
      ])
      .then((data) => {
        this.set("eventDates", data[0].dates);
        // this.set("announcements", data[1]);
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

window.customElements.define('page-tutoring', PageTutoring);
