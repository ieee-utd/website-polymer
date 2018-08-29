import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PageAnnouncement extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>

      <div class="hero-image">
        <div class="bg-overlay"></div>
        <iron-image class="bg" sizing="cover" src="/img/announcement.jpg" preload fade></iron-image>
        <app-container>
          <h1 style="color:white;">Announcement</h1>
        </app-container>
      </div>

      <app-container class="content">
        <p>
          More information about a particular announcement will be here.
        </p>
      </app-container>
    `;
  }
}

window.customElements.define('page-announcement', PageAnnouncement);
