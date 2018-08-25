import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PageTutoring extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        .bg {
          height: 400px;
          width: 100%;
          background-color: var(--color-background);
        }

        .bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 400px;
          background: linear-gradient(to bottom, var(--color-background), transparent);
          z-index: 1;
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
        <iron-image class="bg" sizing="cover" src="/img/tutoring.jpg" preload fade></iron-image>
        <app-container style="position:relative;top:-72px;margin-bottom:-36px;padding: 0 16px;">
          <h1 style="color:white;">Tutoring</h1>
        </app-container>
      </div>

      <app-container class="content">
        <p>
          asdf
        </p>

        <h2>Announcements</h2>
        <p>asdf</p>

        <h2>Events</h2>
        <p>asdf</p>
        
        <h2>Schedules</h2>
        <p>asdf</p>

        <h2>Tutors</h2>
        <p>asdf</p>
      </app-container>
    `;
  }
}

window.customElements.define('page-tutoring', PageTutoring);
