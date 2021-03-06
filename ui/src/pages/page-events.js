import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PageEvents extends PolymerElement {
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
          margin: 0;
        }
      </style>

      <div class="hero-image">
        <div class="bg-overlay">
          <app-container>
            <h1 style="color:white;">Events</h1>
          </app-container>
        </div>
        <iron-image class="bg" sizing="cover" src="/img/event.jpg" preload fade></iron-image>
      </div>

      <app-container class="content">
        <p>
          An achive of events will be updated shortly.
        </p>
      </app-container>
    `;
  }
}

window.customElements.define('page-events', PageEvents);
