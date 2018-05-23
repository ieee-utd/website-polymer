import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/polymer/lib/elements/dom-if.js';
import '../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import '../node_modules/@polymer/iron-icons/communication-icons.js';
import '../node_modules/@polymer/paper-card/paper-card.js';
import '../node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import '../node_modules/@polymer/paper-spinner/paper-spinner.js';
import './tabletop.js';
import './components/footer.js';

class OfficerPage extends PolymerElement {
  static get properties () {
    return {
      loading: {
        type: Boolean,
        value: true
      },
      officers: {
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

    Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1ohEgdV4T6ACI99TkWw60EuHs4Pj8Ex-o7kwSt4fkNOw/pubhtml',
      callback: (data, tabletop) => {
        this.officers = data;
        this.loading = false;
      },
      simpleSheet: true
    })
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
          margin: 10px 24px;
          width: 1200px;
        }
        h1 {
          margin: 10px 18px;
          color: #212121;
          font-size: 32px;
        }
        a {
          color: #3488ff;
          text-decoration: none;
        }
        p {
          margin: 0;
        }
        .cards-container {
          display: flex;
          justify-content: center;
          flex-flow: row wrap;
          margin-top: 20px;
        }
        paper-card {
          width: 350px;
          width: 280px;
          margin: 10px;
          padding: 16px;
        }
        .card-spacer {
          max-width: 350px;
          min-width: 280px;
          margin: 10px;
        }
        .card-top {
          display: flex;
          align-items: center;
        }
        iron-image {
          border-radius: 50%;
          height: 75px;
          width: 75px;
        }
        .card-title {
          margin-left: 20px;
          font-size: 24px;
        }
        .position {
          font-style: italic;
          color: #3488ff;
          margin-top: 10px;
          font-size: 14px;
        }
        .blurb {
          max-width: 350px;
          margin-top: 7px;
          font-size: 14px;
        }
        paper-icon-button {
          padding: 5px;
          width: 32px;
          height: 32px;
        }
        .loading-container {
          width: 100%;
          height: 320px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media only screen and (max-width: 400px) {
          .inner {
            width: calc(100% - 48px);
          }
        } 
      </style>

      <div class="container">
        <div class="body">
          <div class="inner">

            <h1>Officers</h1>
            <p>Meet out amazing officers!</p>
            
            <div class="cards-container">
              <template is="dom-if" if="[[loading]]">
                <div class="loading-container">
                  <paper-spinner active></paper-spinner>
                </div>
              </template>
              <dom-repeat items="[[officers]]">
                <template>
                  <div>
                    <paper-card>
                      <div class="card-top">
                        <iron-image src="[[item.avatar]]" sizing="cover"></iron-image>
                        <h3 class="card-title">[[item.name]]</h3>
                      </div>
                      <p class="position">[[item.position]]</p>
                      <template is="dom-if" if="[[item.email]]">
                        <a href="mailto:[[item.email]]">
                          <paper-icon-button class="item-link-icon" icon="communication:email"></paper-icon-button>
                        </a>
                      </template>
                      <p class="blurb">[[item.blurb]]</p>
                    </paper-card>
                  </div>
                </template>
              </dom-repeat>
              <div class="card-spacer"></div>
              <div class="card-spacer"></div>
              <div class="card-spacer"></div>
            </div>

          </div>
        </div>
        <app-footer></app-footer>
      </div>
    `;
  }
}

customElements.define('page-officers', OfficerPage);
