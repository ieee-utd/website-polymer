/*
 * TODO:
 * - xhr
 * - for* rows
 * - more button for each row
 * - default nothing image
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-image/iron-image';
import './poly-row.js';
import '../shared-styles.js';

class PolyCard extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          width: 100%;
        }
        
        .mask[expand] {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          min-width: 320px;
          min-height: 500px;
          height: 100%;
          z-index: 1;
        }

        .mask-inner[expand] {
          position: relative;
          max-width: 980px;
          min-width: 320px;
          height: calc(100% - 128px);
          margin: 0 auto;
          padding: 64px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #212121;
        }
        
        .card[expand] {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .card {
          width: 100%;
          min-height: 300px;
          max-height: 550px;
          border-radius: 12px;
          background-color: #424242;
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        }

        .card-title {
          min-height: 32px;
          padding: 8px 5px 8px 16px;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          background-color: #c75b13;
          font-size: 18pt;
          font-weight: 500;
          display: flex;
          align-items: center;
          color: #fff;
        }
        
        .title-inner {
          display: flex;
          flex-flow: row wrap;
          align-items: center;
        }
        
        .title {
          display: block;
          margin-right: 32px;
        }

        .title-spacer {
          display: block;
          flex-grow: 1;
        }

        .title-button {
          background-color: transparent;
          border: 2px solid #fff;
          border-radius: 7px;
          padding: 3px 5px;
          text-transform: none;
          color: #fff;
          font-size: 11pt;
          margin-right: 12px;
          cursor: pointer;
        }

        paper-icon-button {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .card-content {
          width: 100%;
          min-height: 242px;
          height: 100%;
          max-height: 492px;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          overflow: scroll;
          color: #d8d8d8;
        }

        .no-content {
          width: 100%;
          height: 100%;
          min-height: 245px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .no-content-inner {
          display: block;
          text-align: center;
        }

        .no-content-title {
          font-size: 16pt;
          font-weight: 600;
          color: #c75b13;
          text-transform: capitalize;
          display: block;
        }

        .no-content-message {
          display: block;
        }

        iron-image {
          --iron-image-height: 100px;
        }

        poly-row {
          margin-bottom: 2px;
        }
      </style>

      <div class="mask" expand$="[[expand]]"><div class="mask-inner" expand$="[[expand]]">
        <div class="card" expand$="[[expand]]">
          <div class="card-title">
            <div class="title-inner">
              <span class="title">[[title]]</span>
              <dom-if if="[[button]]">
                <template>
                  <a href="[[button.link]]" target="_blank"><paper-button noink class="title-button">[[button.name]]</paper-button>
                </template>
              </dom-if>
            </div>
            <span class="title-spacer"></span>
            <paper-icon-button icon="[[sizeIcon]]" on-tap="resizeCard"></paper-icon-button>
          </div>
          <div class="card-content" expand$="[[expand]]">
            <dom-if if="[[_noContent()]]">
              <template>
                <div class="no-content">
                  <div class="no-content-inner">
                    <iron-image src="[[image]]"></iron-image>
                    <span class="no-content-title">No [[title]]!</span>
                    <slot></slot>
                  </div>
                </div>
              </template>
            </dom-if>
            <dom-if if="[[!_noContent()]]">
              <template>
                <dom-repeat items="[[items]]">
                  <template>
                    <poly-row title="[[item.title]]" time="[[item.time]]" location="[[item.location]]" content="[[item.content]]"></poly-row>
                  </template>
                </dom-repeat>
              </template>
            </dom-if>
          </div>
        </div>
      </div></div>
    `;
  }

  static get properties() {
    return {
      image: String,
      title: String,
      button: Object,
      items: Array,
      sizeIcon: {
        type: String,
        value: 'fullscreen'
      },
      expand: {
        type: Boolean,
        value: false
      }
    }
  }

  resizeCard() {
    this.sizeIcon = (this.sizeIcon === 'fullscreen') ? 'fullscreen-exit' : 'fullscreen';
    this.expand = (this.expand == false) ? true : false;
  }

  _noContent() {
    return this.items.length == 0;
  }
}

window.customElements.define('poly-card', PolyCard);
