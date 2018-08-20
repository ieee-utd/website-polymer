/**
 * TODO: fix imports and functions
 */

import { html } from '@polymer/polymer/polymer-element.js';
import { Polymer } from '@polymer/polymer/polymer-legacy';
import { BaseElement } from '../base-element';

class PaperSearch extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          width: 100%;
          --placeholder-color: rgba(255,255,255,0.7);
          @apply --layout-horizontal;
          @apply --layout-center;
          @apply --layout-justified;
        }
        :host([active]),
        :host([pressed]) {
          @apply --shadow-elevation-4dp;
        }
        div.container {
          @apply --layout-horizontal;
          @apply --layout-justified;
          padding: 4px 8px;
        }
        div.container > div {
          @apply --layout-horizontal;
          @apply --layout-flex;
          @apply --layout-center;
        }
        iron-input {
          width: 100%;
          @apply --layout-horizontal;
          @apply --layout-flex;
          margin-left: 6px;
          width: 100%;
        }
        iron-input > input {
          background-color: transparent;
          border: none;
          outline: none;
          font-family: var(--font-body);
          color: white;
          font-size: 18px;
          padding: 10px;
          width: 100%;
        }
        input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
          color:    var(--placeholder-color);
        }
        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color:    var(--placeholder-color);
          opacity:  1;
        }
        input::-moz-placeholder { /* Mozilla Firefox 19+ */
          color:    var(--placeholder-color);
          opacity:  1;
        }
        input:-ms-input-placeholder { /* Internet Explorer 10-11 */
          color:    var(--placeholder-color);
        }
        input::-ms-input-placeholder { /* Microsoft Edge */
          color:    var(--placeholder-color);
        }
        paper-spinner-lite {
          --paper-spinner-color: white;
          --paper-spinner-stroke-width: 2px;
          width: 20px;
          height: 20px;
          padding: 2px;
          margin-left: 8px;
          margin-right: 8px;
        }
        paper-icon-button {
          position: relative;
          top: 2px;
          --paper-icon-button-ink-color: white;
        }
      </style>

      <div class="container">
        <div>
          <paper-icon-button icon="[[_icon(value)]]" hidden$="[[loading]]" on-tap="_reload"></paper-icon-button>
          <paper-spinner-lite active hidden$="[[!loading]]"></paper-spinner-lite>
          <iron-input>
            <input id="input" value="{{value::input}}" placeholder="[[placeholder]]" autocomplete="off" autofocus>
          </iron-input>
        </div>
        <paper-icon-button icon="mdi:close" hidden$="[[!value]]" on-tap="_clear"></paper-icon-button>
      </div>
    `;
  }

  static get properties() {
    return {
      loading: { type: Boolean, reflectToAttribute: true, notify: true, value: false },
      value: { type: String, reflectToAttribute: true, notify: true },
      placeholder: { type: String, value: "" },
    }
  }

  static get behaviors(){
    return [
      Polymer.IronControlState
    ]
  }

  _icon(value) {
    return !value ? "mdi:magnify" : "mdi:refresh";
  }

  _reload() {
    if (this.loading || !this.value) return;
    this._fire("reload", { value: this.value })
  }

  _clear() {
    this.value = "";
    this.$.input.focus();
  }
}

window.customElements.define('paper-search', PaperSearch);