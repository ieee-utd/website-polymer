import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PageEvent extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        .content {
          padding: 16px 32px;
          display: block;
        }

        h1 {
          font-size: 2.4em;
          margin: 0 16px;
        }
      </style>

      <div class="image">
        <div class="bg-overlay"></div>
        <!-- Poster if possible -->
        <iron-image class="bg" sizing="cover" src="/img/event.jpg" preload fade></iron-image>
        <app-container>
          <h1 style="color:white;">Events</h1>
        </app-container>
      </div>

      <app-container class="content">
        <p>
          More information about a particular event will be displayed here.
        </p>
      </app-container>
    `;
  }
}

window.customElements.define('page-event', PageEvent);
