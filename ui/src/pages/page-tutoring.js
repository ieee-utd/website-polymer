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

        @media (max-width: 768px) {
          .bg, .bg-overlay {
            height: 200px;
          }
        }
      </style>

      <div class="image">
        <div class="bg-overlay"></div>
        <iron-image class="bg" sizing="cover" src="/img/tutoring.png" preload fade></iron-image>
        <app-container style="position:relative;top:-72px;margin-bottom:-36px;padding: 0 16px;">
          <h1 style="color:white;">Tutoring</h1>
        </app-container>
      </div>

      <app-container class="content" style="padding-top:0">
        <p style="margin-top:0">
          We offer tutoring at Jonsson School Student Enrichment Center (JSSEC), Synergy Park North (SPN) 2.220. We offer tutoring for Electrical Network Analysis, Signals and Systems, and more! Below, you can find up to date tutoring announcements, events, and schedules.
        </p>

        <h2>Announcements</h2>


        <h2>Events</h2>


        <h2>Schedules</h2>


        <!-- TODO -->
        <!-- <h2>Tutors</h2> -->
      </app-container>
    `;
  }
}

window.customElements.define('page-tutoring', PageTutoring);
