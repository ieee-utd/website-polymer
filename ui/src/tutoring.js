import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/polymer/lib/elements/dom-if.js';
import '../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import '../node_modules/@polymer/iron-icon/iron-icon.js';
import '../node_modules/@polymer/iron-icons/iron-icons.js';
import '../node_modules/@polymer/iron-list/iron-list.js';
import '../node_modules/@polymer/iron-pages/iron-pages.js';
import '../node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import '../node_modules/@polymer/paper-spinner/paper-spinner.js';
import '../node_modules/@polymer/paper-tabs/paper-tabs.js';
import './tabletop.js';
import './components/footer.js';

class TutoringPage extends PolymerElement {
  static get properties () {
    return {
      loading: {
        type: Boolean,
        value: true
      },
      announcements: {
        type: Array,
        value: []
      },
      events: {
        type: Array,
        value: []
      },
      schedules: {
        type: Array,
        value: []
      },
    };
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1NQGJRlueLY9rirKH7yiEOj51ZMhSMZY1tRbY6KzUINo/pubhtml',
      callback: (data, tabletop) => {
        this.announcements = data.Announcements.elements;
        this.events = data.Events.elements;
        this.schedules = data.Schedules.elements;
        this.selected = 0;
        this.loading = false;
      },
      simpleSheet: false
    })
  }

  getClasses(veryImportant) {
    var classes = 'item';
    if (veryImportant === 'TRUE') classes += ' important';
    return classes;
  }

  static get template () {
    return html`
      <style>
        :host {
          display: block;
          --paper-tab-ink: #232323;
        }
        .container {
          min-height: calc(100vh - 48px);
          display: flex;
          flex-direction: column;
        }
        .body {
          flex-grow: 1;
          min-height: 350px;
          justify-content: center;
          background: #f7f7f7;
          display: flex;
        }
        .inner {
          margin: 10px 24px;
          width: 1200px;
        }
        h1 {
          margin: 10px 18px;
          color: #212121;
          font-size: 32px;
        }
        iron-icon {
          padding: 0 15px 0 8px;
        }
        h2 {
          background: #232323;
          display: flex;
          align-items: center;
          color: #ffffff;
          padding: 2px 0;
        }
        a {
          color: #3488ff;
          text-decoration: none;
          border-bottom: 1px #3488ff dotted;
        }
        .top {
          display: flex;
          justify-content: center;
          flex-flow: row wrap;
        }
        .announcements, .events {
          margin: 10px;
        }
        iron-list {
          min-height: 200px;
          max-height: 400px;
          width: 350px;
          background: #e1e1e1;
          padding: 10px;
        }
        .item {
          min-height: 100px;
          background: white;
          margin: 3px 0;
          padding: 3px 5px 5px 16px;
          border-left: 4px solid #232323;
          font-size: 14px;
        }
        .important {
          border-left: 4px solid #3488ff;
        }
        .item-date {
          font-style: italic;
          color: #8c8c8c;
        }
        .item-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 5px;
        }
        .item-top {
          display: flex;
          align-items: center;
          height: 38px;
        }
        .item-top-spacer {
          @apply --layout-flex;
        }
        .item-link > a {
          border: none;
        }
        .item-link-icon {
          width: 38px;
          height: 38px;
        }
        paper-tabs {
          margin-top: 5px;
          font-family: 'Roboto', 'Noto', sans-serif;
          --paper-tabs-selection-bar-color: #ffffff;
          width: 100%;
          color: #ffffff;
          background: #5a5a5a;
          text-transform: uppercase;
          margin-bottom: 1px;
        }
        paper-tab.iron-selected {
          font-weight: 800;
        }
        iron-pages {
          width: calc(100% - 20px);
          min-height: 300px;
          background: #e1e1e1;
          padding: 10px;
        }
        .schedule-container {
          margin: 0 48px;
        }
        img {
          width: 100%;
        }
        .schedules-top {
          display: flex;
          justify-content: center;
          flex-flow: row wrap;
        }
        .schedules {
          width: calc(100% - 20px);
          margin: 0 10px;
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
        }
        .schedules-title, .schedules-spacer {
          width: 370px;
          margin: 0 10px;
        }
        .loading-container {
          width: 100%;
          height: 180px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        

        @media only screen and (max-width: 400px) {
          .inner {
            width: calc(100% - 48px);
          }
          .schedule-container {
            margin: 0;
          }
          iron-list {
            min-height: 200px;
            max-height: 400px;
            width: 280px;
            padding: 5px;
          }
          .schedules-title, .schedules-spacer {
            width: 290px;
          }
        } 
      </style>

      <div class="container">
        <div class="body">
          <div class="inner">
            <h1>Tutoring</h1>
            <p>If you want to be a tutor, fill out this <a href="#" target="_blank">form</a>.</p>
            
            <div class="top">
              <div class="announcements">
                <h2><iron-icon icon="icons:announcement"></iron-icon> Announcements</h2>
                <iron-list items="[[announcements]]">
                  <template is="dom-if" if="[[loading]]">
                    <div class="loading-container">
                      <paper-spinner active></paper-spinner>
                    </div>
                  </template>
                  <template>
                    <div>
                      <div class$="{{getClasses(item.veryImportant)}}">
                        <div class="item-top">
                          <div class="item-date">[[item.date]]</div>
                          <div class="item-top-spacer"></div>
                          <div class="item-link">
                            <template is="dom-if" if="[[item.link]]">
                              <a href="[[item.link]]" target="_blank">
                                <paper-icon-button class="item-link-icon" icon="icons:link"></paper-icon-button>
                              </a>
                            </template>
                          </div>
                        </div>
                        <div class="item-title">[[item.title]]</div>
                        <div>[[item.announcement]]</div>
                      </div>
                    </div>
                  </template>
                </iron-list>
              </div>
              <div class="events">
                <h2><iron-icon icon="icons:event"></iron-icon> Events</h2>
                <iron-list items="[[events]]">
                  <template is="dom-if" if="[[loading]]">
                    <div class="loading-container">
                      <paper-spinner active></paper-spinner>
                    </div>
                  </template>
                  <template>
                    <div>
                      <div class$="{{getClasses(item.veryImportant)}}">
                        <div class="item-top">
                          <div class="item-date">[[item.date]] [[item.time]] @ [[item.location]]</div>
                          <div class="item-top-spacer"></div>
                          <div class="item-link">
                            <template is="dom-if" if="{{item.link}}">
                              <a href="[[item.link]]" target="_blank">
                                <paper-icon-button class="item-link-icon" icon="shared-icons:link"></paper-icon-button>
                              </a>
                            </template>
                          </div>
                        </div>
                        <div class="item-title">[[item.title]]</div>
                        <div>[[item.event]]</div>
                      </div>
                    </div>
                  </template>
                </iron-list>
              </div>
            </div>
            
            <div class="schedules-top">
              <div class="schedules-title">
                <h2><iron-icon icon="icons:schedule"></iron-icon> Schedules</h2>
              </div>
              <div class="schedules-spacer"></div>
            </div>
            <div class="schedules">
              <paper-tabs scrollable selected="{{selected}}">
                <dom-repeat items="[[schedules]]">
                  <template>
                    <paper-tab>[[item.name]]</paper-tab>
                  </template>
                </dom-repeat>
              </paper-tabs>
              <iron-pages selected="{{selected}}">
                <template is="dom-if" if="[[loading]]">
                  Loading...
                </template>
                <dom-repeat items="[[schedules]]">
                  <template>
                    <div class="schedule-container">
                      <img src="[[item.link]]"></img>
                    </div>
                  </template>
                </dom-repeat>
              </iron-pages>
            </div>

          </div>
        </div>
        <app-footer></app-footer>
      </div>
    `;
  }
}

customElements.define('page-tutoring', TutoringPage);
