import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';

class EventCard extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        paper-card {
          position: relative;
          height: 180px;
          background-color: var(--color-secondary);
          border-radius: 8px;
          transition: 0.2s background-color, 0.2s box-shadow;
          cursor: pointer;
          @apply --shadow-elevation-2dp;
        }
        paper-card:hover {
          background-color: var(--color-secondary-active);
          @apply --shadow-elevation-12dp;
        }
        paper-card:hover > div.card-bottom {
          display: none;
        }
        h3.card-title {
          margin: 0;
          padding: 16px 16px 0 16px;
        }
        div.card-content {
          height: 60px;
          padding: 16px;
          overflow: hidden;
        }
        div.card-content-mask {
          position: absolute;
          top: 50%;
          bottom: 0;
          left: 0;
          right: 0;
          transition: 0.2s background;
          background: linear-gradient(to bottom, rgba(66,66,66,0), rgba(66,66,66,1));
        }
        paper-card:hover > div.card-content-mask {
          background: linear-gradient(to bottom, rgba(102,102,102,0), rgba(102,102,102,1));
        }
        div.card-bottom {
          height: 40px;
          border: none;
          padding: 5px 16px;
          opacity: 0.4;
          transition: 0.2s opacity;
        }
        div.card-bottom-more {
          height: 40px;
          border: none;
          padding: 5px 16px;
          color: #C6C6C6;
          opacity: 0;
        }
        div.card-bottom-more:hover {
          display: block;
        }
        iron-icon.card-icon {
          margin-right: 10px;
        }
      </style>

      <paper-card>
        <h3 class="card-title">Tutoring Starts Wednesday</h3>
        <div class="card-content">
          <div class="card-content-mask"></div>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.

        </div>
        <div class="card-bottom">
          <iron-icon class="card-icon" icon="app-icons:calendar-clock"></iron-icon>
          Posted 3 days ago
        </div>
        <div class="card-bottom-more">
          ghk
        </div>
      </paper-card>
    `;
  }

  static get properties() {
    return {
      title: String,
      content: { type: String, value: "" },
    }
  }
}

window.customElements.define('event-card', EventCard);
