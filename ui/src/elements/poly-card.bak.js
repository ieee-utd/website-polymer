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
import '../shared-styles.js';

class PolyCard extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
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
        }
        
        .card[expand] {
          position: absolute !important;
          height: calc(100% - 128px) !important;
          transition: all 0.5s;
        }

        .card {
          width: 100%;
          height: 250px;
          /* height: 100%; */
          border-radius: 7px;
          background-color: #424242;
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
          position: relative;
        }

        .card-content {
          width: calc(100% - 32px);
          padding: 0 16px;
          height: calc(100% - 50px - 32px - 16px);
          overflow: hidden;
          color: white;
        }

        .card-title {
          width: calc(100% - 32px);
          height: 50px;
          background-color: #C75B13;
          border-top-left-radius: 7px;
          border-top-right-radius: 7px;
          font-size: 20pt;
          font-weight: 700;
          display: flex;
          align-items: center;
          padding: 0 16px;
          color: white;
        }

        .card-title-spacer {
          display: block;
          flex-grow: 1;
        }

        .card-content-blur {
          width: 100%;
          height: 80px;
          background: linear-gradient(to bottom, rgba(66,66,66,0), rgba(66,66,66,1));
          position: absolute;
          bottom: 50px;
          pointer-events: none;
        }

        .card-action {
          width: calc(100% - 32px);
          height: 50px;
          position: relative;
          flex-flow: row wrap;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 16px;
          font-weight: 600;
          color: white;
        }

        .card-row {
          width: 100%;
          height: 150px;
          margin-top: 10px;
          margin-bottom: 32px;
        }

        .card-row-title {
          font-size: 16pt;
          font-weight: 600;
          margin: 0 0 10px 0;
        }

        .card-row-content {
          margin: 0;
          height: 100px;
          overflow: hidden;
        }

        paper-icon-button {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>

      <div class="mask" expand$="[[expand]]"><div class="mask-inner" expand$="[[expand]]">
        <div class="card" expand$="[[expand]]">
          <div class="card-title">
            Title
            <span class="card-title-spacer"></span>
            <paper-icon-button icon="[[sizeIcon]]" on-tap="resizeCard"></paper-icon-button>
          </div>
          <div class="card-content">
            <div class="card-row">
              <h3 class="card-row-title">Row 2</h3>
              <div class="card-row-content">
                Artisan gastropub coloring book pok pok yr. Ramps poutine truffaut tacos snackwave mixtape schlitz normcore aesthetic. Chartreuse gluten-free forage, pabst humblebrag etsy food truck chillwave listicle. Hella pork belly leggings artisan art party shaman actually mustache pug. Actually tilde marfa scenester fashion axe shaman live-edge iPhone chillwave palo santo williamsburg coloring book crucifix chambray.
              </div>
            </div>
          </div>
          <div class="card-content-blur"></div>
          <div class="card-action"><paper-button>View more</paper-button></div>
        </div>
      </div></div>
    `;
  }

  ready() {
    super.ready();
    // this.card = this.shadowRoot.querySelector('.card');
  }

  static get properties() {
    return {
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
}

window.customElements.define('poly-card', PolyCard);