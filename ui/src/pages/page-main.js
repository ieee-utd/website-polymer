import { html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/iron-icon/iron-icon.js';
import { BaseElement } from '../base-element';
import '../elements/app-container.js';
import '../elements/app-grid.js';
import '../elements/app-grid-item.js';
import '../shared-styles.js';

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
        paper-card {
          position: relative;
          height: 200px;
          background-color: #424242;
          border-radius: 10px;
        }
        paper-card:hover {
          background-color: #666666;
          box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }
        paper-card:hover > div.card-bottom {
          display: none;
        }
        h3.card-title {
          margin: 0;
          padding: 16px 16px 0 16px;
        }
        div.card-content {
          max-height: 60px;
          padding: 16px;
          overflow: hidden;
        }
        div.card-content-mask {
          position: absolute;
          bottom: 55px;
          width: 100%;
          height: 60px;
          background: linear-gradient(to bottom, rgba(66,66,66,0), rgba(66,66,66,1));
        }
        paper-card:hover > div.card-content-mask {
          background: linear-gradient(to bottom, rgba(102,102,102,0), rgba(102,102,102,1));
        }
        div.card-bottom {
          height: 40px;
          border: none;
          padding: 5px 16px;
          color: #C6C6C6;
        }
        div.card-bottom-more {
          height: 40px;
          border: none;
          padding: 5px 16px;
          color: #C6C6C6;
          display: none;
        }
        div.card-bottom-more:hover {
          display: block;
        }
        iron-icon.card-icon {
          margin-right: 10px;
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
      </style>

      <app-container>
        <div class="bg"></div>
        <div class="bg-overlay"></div>

        <div class="content">
          <div class="logo">
            <img class="logo" draggable=false src="https://s3.amazonaws.com/ieee-utd/branding/ieeeutd-logo-color.svg"></img>
          </div>
          <br>

          <h2 class="title"><iron-icon icon="mdi:bullhorn" style="transform: rotate(-30deg)"></iron-icon>Important Announcements</h2>
          <app-grid>
            <app-grid-item width=6>
              <loading-block>
                <paper-card>
                  <h3 class="card-title">Tutoring Starts Wednesday</h3>
                  <div class="card-content">
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
                  </div>
                  <div class="card-content-mask"></div>
                  <div class="card-bottom">
                    <iron-icon class="card-icon" icon="app-icons:calendar-clock"></iron-icon>
                    Posted 3 days ago
                  </div>
                  <div class="card-bottom-more">
                    ghk
                  </div>
                </paper-card>
              </loading-block>
            </app-grid-item>
            <app-grid-item width=6>

            </app-grid-item>
          </app-grid>
          <h2 class="title">This Week</h2>
          <app-grid>
            <app-grid-item width=6>

            </app-grid-item>
          </app-grid>
          <h2 class="title">Happening Soon</h2>
          <app-grid>
            <app-grid-item width=6>

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
}

window.customElements.define('page-main', PageMain);
