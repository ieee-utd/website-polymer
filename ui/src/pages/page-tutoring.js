import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PageTutoring extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        .main {
          max-width: 980px;
          height: calc(100vh - 160px);
          min-height: 700px;
          padding: 72px 32px 64px 32px;
          margin: 0 auto;
        }

        .section-spacer {
          display: block;
          height: 30px;
        }
      </style>

      <div class="main">
        <h1>Tutoring</h1>
        <p>We offer tutoring at []. You can find updated tutoring announcements, events, and schedules below.</p>
        <span class="section-spacer"></span>

        <h2>Announcements</h2>
        <span class="section-spacer"></span>

        <h2>Events</h2>
        <span class="section-spacer"></span>

        <h2>Schedules</h2>
      </div>
    `;
  }
}

window.customElements.define('page-tutoring', PageTutoring);
