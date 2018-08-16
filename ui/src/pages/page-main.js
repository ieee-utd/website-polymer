import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
// import '../elements/poly-hero.js';
import '../elements/poly-card.js';
import '../shared-styles.js';

class PageMain extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          background-color: #212121;
        }

        .main {
          min-height: calc(100vh - 128px);
          display: flex;
          flex-flow: row wrap;
          justify-content: space-around;
          max-width: 980px;
          margin: 0 auto;
          padding: 64px 0;
        }

        .col {
          flex-grow: 1;
          min-width: 320px;
          max-width: calc(100% / 2 - 64px);
          margin: 16px;
          display: flex;
          flex-flow: column wrap;
          align-items: center;
          justify-content: center;
          background-color: gray;
        }

        poly-card {
          margin: 32px 0;
        }
      </style>

      <div class="main">
        <div class="col">
          <poly-card></poly-card>
          <!-- <poly-card></poly-card> -->
        </div>
        <div class="col">
          <!-- <poly-card></poly-card> -->
        </div>
      </div>
    `;
  }
}

window.customElements.define('page-main', PageMain);
