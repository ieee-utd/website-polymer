import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-icons/iron-icons';
import '../app-icons.js';
import '../shared-styles.js';

class PolyRow extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        .row {
          width: calc(100% - 32px);
          min-height: 50px;
          padding: 0 16px;
          background-color: #303135;
          color: #d8d8d8;
        }

        .row-title {
          font-size: 16pt;
          font-weight: 600;
          padding: 10px 0 3px 10px;
        }

        .row-content {
          margin-top: 10px;
          font-size: 12pt;
        }

        .row-more {
          width: 100%;
          text-transform: none;
          padding: 3px 0;
          margin: 5px 0;
          font-size: 10pt;
          font-weight: 600;
        }

        .expand-icon {
          margin-left: 7px;
          --iron-icon-height: 20px;
          --iron-icon-height: 20px;
        }

        a {
          color: #d8d8d8;
        }

        .time, .location {
          margin: 5px 0;
        }
        
        .time-icon, .location-icon {
          margin-right: 5px;
        }
      </style>

      <div class="row">
        <div class="row-title">[[title]]</div>
        <dom-if if="[[_hasLocationTime()]]">
          <template>
            <div class="time"><iron-icon class="time-icon" icon="app-icons:calendar-clock"></iron-icon>[[time]]</div>
            <div class="location"><iron-icon class="location-icon" icon="app-icons:map-marker"></iron-icon><a href="[[location.link]]" target="_blank">[[location.name]]</div>
          </template>
        </dom-if>
        <div class="row-content">
          [[shownContent]]
        </div>
        <paper-button class="row-more" on-tap="expandRow">
          [[buttonContent]]
          <iron-icon class="expand-icon" icon="[[expand]]"></iron-icon>
        </paper-button>
      </div>
    `;
  }

  ready() {
    super.ready();
    this.shownContent = this.short = this.content.slice(0, 120) + '...';
  }

  static get properties() {
    return {
      title: String,
      shownContent: String,
      content: String,
      short: String,
      location: Object,
      time: String,
      buttonContent: {
        type: String,
        value: 'View more'
      },
      expand: {
        tyle: String,
        value: 'unfold-more'
      }
    }
  }

  expandRow() {
    if (this.expand === 'unfold-more') {
      this.buttonContent = 'View less';
      this.expand = 'unfold-less';
      this.shownContent = this.content;
    } else {
      this.buttonContent = 'View more';
      this.expand = 'unfold-more';
      this.shownContent = this.short;
    }
  }

  _hasLocationTime() {
    console.log(this.location, this.time);
    return Object.keys(this.location).length === 2 && this.time;
  }
}

window.customElements.define('poly-row', PolyRow);
