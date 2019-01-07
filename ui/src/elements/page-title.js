import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '../shared-styles.js';

class PageTitle extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        div.title {
          @apply --layout-horizontal;
          @apply --layout-justified;
          @apply --layout-center;
          padding: 4px 16px;
          padding-right: 0;
          margin-bottom: 18px;
        }
        div.title > span,
        div.title > div,
        paper-button {
          @apply --layout-horizontal;
          @apply --layout-start-justified;
          @apply --layout-center;
        }
        div.title > span > paper-icon-button {
          margin-right: 8px;
          min-width: 40px;
        }
        div.title > span > h2 {
          margin: 0;
          margin-left: 8px;
        }

        div.title > div iron-image {
          border-radius: 50%;
          height: 48px;
          width: 48px;
          background-color: var(--paper-grey-200);
          border: 2px solid var(--paper-grey-400);
        }
        div.title > div h4 {
          margin-right: 16px;
        }
        paper-button {
          padding: 8px 16px;
          border-radius: 4px;
          transition: 0.24s background-color;
          cursor: pointer;
          text-transform: none;
        }
        paper-button:hover, paper-button:focus, paper-button:active {
          background-color: var(--paper-grey-200);
        }
        paper-button > h4 {
          margin: 0;
        }

        @media (min-width: 768px) {
          div.title > span > paper-icon-button {
            display: none;
          }
        }
        @media (max-width: 1023px) {
          paper-button > h4 {
            display: none;
          }
        }
      </style>

      <div class="title">
        <span>
          <paper-icon-button icon="mdi:menu" on-tap="_openDrawer" ></paper-icon-button>
          <h2>[[title]]</h2>
        </span>
        <div>
          <app-context>
            <paper-button on-tap="_openAccount" noink>
              <h4>[[user.firstName]] [[user.lastName]]</h4>
              <iron-image src="[[user.avatar]]" sizing="cover" preload fade></iron-image>
            </paper-button>
          </app-context>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      title: String,
      user: Object
    }
  }

  _openAccount() {
    this._fire("open-account-dialog")
  }

  _openDrawer() {
    this._fire("open-drawer")
  }
}

window.customElements.define('page-title', PageTitle);
