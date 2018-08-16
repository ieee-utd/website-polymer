/*
 * TODO: 
 * - xhr
 * - for* rows
 * - more button for each row
 * - default nothing image 
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button';
import '../shared-styles.js';

class PolyCard extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        .card {
          width: 100%;
          height: 250px;
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
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
      </style>

      <div class="card">
        <div class="card-title">
          Title
          <span class="card-title-spacer"></span>
          <paper-icon-button icon="open-in-new"></paper-icon-button>
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
    `;
  }

  static get properties() {
    return {
      active: {
        type: Boolean,
        value: false
      }
    }
  }
}

window.customElements.define('poly-card', PolyCard);
