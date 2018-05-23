import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/polymer/lib/elements/dom-if.js';
import '../node_modules/@polymer/iron-icons/iron-icons.js';
import '../node_modules/@polymer/iron-icons/maps-icons.js';
import '../node_modules/@polymer/iron-list/iron-list.js';
import '../node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import '../node_modules/@polymer/paper-spinner/paper-spinner.js';
import './tabletop.js';
import './components/banner.js';
import './components/footer.js';

class HomePage extends PolymerElement {
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
    };
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    
    Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1MJl02X4gZnw4K64KmVoy9xkMQXOGdNPju0yUPGJa1YY/pubhtml',
      callback: (data, tabletop) => {
        this.announcements = data.Announcements.elements;
        this.events = data.Events.elements;
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
          margin: 10px;
          width: 1200px;
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
        .location {
          display: flex;
          justify-content: center;
        }
        .location-inner {
          display: flex;
          justify-content: center;
          flex-flow: row wrap;
        }
        .location-title, .location-spacer {
          width: 370px;
          margin: 0 10px;
        }
        .map-container {
          max-width: 740px;
          width: calc(100% - 20px);
          height: 400px;
          background: #e1e1e1;
          display: flex;
          justify-content: center;
        }
        .google-map {
          margin: 10px;
          width: calc(100% - 20px);
        }
        .loading-container {
          width: 100%;
          height: 180px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media only screen and (max-width: 400px) {
          iron-list {
            min-height: 200px;
            max-height: 400px;
            width: 280px;
            padding: 5px;
          }
          .location-title, .location-spacer {
            width: 290px;
          }
        } 
      </style>

      <div class="container">
        <app-banner></app-banner>
        <div class="body">
          <div class="inner">

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

            <div class="location">
              <div class="location-inner">
                <div class="location-title">
                  <h2><iron-icon icon="maps:map"></iron-icon> Location</h2>
                  <p>
                    We are located at <br/>
                    <a href="https://www.google.com/maps/place/Synergy+Park+North+Building+-+UT+Dallas/@32.9889742,-96.7559906,15z/data=!4m5!3m4!1s0x864c2206e04feeb9:0x54e35d04c429ba8a!8m2!3d32.9939073!4d-96.752337" target="_blank">3000 Synergy Park Blvd,<br/> 
                    Richardson, TX 75080<br/>
                    SPN 2.220</a>
                  </p>
                </div>
                <div class="location-spacer"></div>
                <div class="map-container">
                  <!-- TODO: re-consider google-map when there's better support -->
                  <iframe
                    class="google-map"
                    frameborder="0" 
                    style="border:0"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDzB-vuxBLhNImIQyTmuytvwqx46Q7ZAek
                      &q=Synergy+Park+North+Building+-+UT+Dallas" allowfullscreen>
                  </iframe>
                </div>
              </div>
            </div>

          </div>
        </div>
        <app-footer></app-footer>
      </div>
    `;
  }
}

customElements.define('page-home', HomePage);
