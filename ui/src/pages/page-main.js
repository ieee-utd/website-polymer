import { html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-route.js';

import { BaseElement } from '../base-element';
import '../shared-styles.js';
import '../app-icons.js';

class PageMain extends BaseElement {
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
          padding: 16px 32px;
        }
        div.logo {
          text-align: center;
        }
        img.logo {
          height: 160px;
          width: auto;
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
      </style>

      <app-container>
        <div class="bg"></div>
        <div class="bg-overlay"></div>

        <div class="content">
          <div class="logo">
            <img class="logo" draggable=false src="https://s3.amazonaws.com/ieee-utd/branding/ieeeutd_logo.svg"/>
          </div>
          <br>
          <p>We are the student chapter of the Institute of Electrical and Electronics Engineers (IEEE) at the University of Texas at Dallas (UTD)</p>

          <h2 class="title"><iron-icon icon="mdi:bullhorn" style="transform: rotate(-30deg)"></iron-icon>Important Announcements</h2>
          <app-grid>
            <app-grid-item width=6>
              <app-card on-click="_navigate" url="announcement/asdfasdfsomeidhere">
                <span slot="title">
                  <h3 style="margin: 0; color:var(--color-accent)">Announcement</h3>
                </span>
                <span slot="content">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</span>
                <div slot="actions">
                  <iron-icon class="card-action-icon" icon="app-icons:calendar-clock"></iron-icon>Posted <b>3 days ago</b>
                </div>
                <div slot="actions-alt">
                  View more
                </div>
            </app-grid-item>
            <app-grid-item width=6>
              <app-card>
                <span slot="title">
                  <h3 style="margin:0;">Title</h3>
                </span>
                <span slot="content">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</span>
                <div slot="actions">
                  <iron-icon class="card-action-icon" icon="app-icons:calendar-clock"></iron-icon>Posted 3 days ago
                </div>
                <div slot="actions-alt">
                  <paper-button>View more</paper-button>
                </div>
              </app-card>
            </app-grid-item>
          </app-grid>
          <h2 class="title">This Week</h2>
          <app-grid>
            <app-grid-item width=6>
              <app-card  on-click="_navigate" url="event/asdfasdfsomeidhere">
                <span slot="title">
                  <h3 style="margin: 0">Event</h3>
                </span>
                <span slot="content">
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
                </span>
                <div slot="actions" class="action">
                  <div>
                    <iron-icon class="card-action-icon" icon="mdi:calendar-clock"></iron-icon><b>Mar 3 at 6p</b>
                  </div>
                  <div>
                    <iron-icon class="card-action-icon" icon="mdi:map-marker"></iron-icon><b>Makerspace</b></a>
                  </div>
                </div>
                <div slot="actions-alt">
                  View more
                </div>
              </app-card>
            </app-grid-item>
            <app-grid-item width=6>
              <event-card></event-card>
            </app-grid-item>
          </app-grid>
          <h2 class="title">Happening Soon</h2>
          <app-grid>
            <app-grid-item width=6>
              <app-card title="First General Meeting">
                <span slot="content">
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
                </span>
                <div slot="actions" style="opacity:0.4;font-family:var(--font-head)">
                  <iron-icon class="card-action-icon" icon="app-icons:calendar-clock"></iron-icon>Posted <b>3 days ago</b>
                </div>
                <div slot="actions-alt">
                  View more
                </div>
              </app-card>
            </app-grid-item>
            <app-grid-item width=6>
              <loading-block></loading-block>
            </app-grid-item>
          </app-grid>
        </div>
      </app-container>
    `;
  }

  static get properties() {
    return {

    }
  }

  _navigate(e) {
    let url = this._getAttributeFromEvent(e, 'url', "");
    this._fire('card-click', {url: url});
  }
}

window.customElements.define('page-main', PageMain);
