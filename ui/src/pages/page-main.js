import { html } from '@polymer/polymer/polymer-element.js';
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
          width: 100%;
          display: block;
          color: white;
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

        }
      </style>

      <app-container>
        <!--<div class="bg"></div>
        <div class="bg-overlay"></div>-->
        <div>
          <div class="logo">
            <img class="logo" src="https://s3.amazonaws.com/ieee-utd/branding/ieeeutd-logo-color.svg"></img>
          </div>
          <br>

          <h2 class="title">Important Announcements</h2>
          <app-grid>
            <app-grid-item width=6>

            </app-grid-item>
            <app-grid-item width=6>

            </app-grid-item>
          </app-grid>
          <h2 class="title">This Week</h2>
          <app-grid>
            <app-grid-item width=6>

            </app-grid-item>
            <app-grid-item width=6>

            </app-grid-item>
          </app-grid>
          <h2 class="title">Happening Soon</h2>
          <app-grid>
            <app-grid-item width=6>

            </app-grid-item>
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
