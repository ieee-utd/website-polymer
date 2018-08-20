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
        }

        .main {
          width: 100%;
          display: block;
          min-height: calc(100vh - 128px);
          background-color: #212121;
          color: white;
          padding: 64px;
        }

        .title {
          margin: 0;
        }
      </style>

      <div class="main">
        <app-container>
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
        </app-container>
      </div>
    `;
  }

  static get properties() {
    return {
      
    }
  }
}

window.customElements.define('page-main', PageMain);
