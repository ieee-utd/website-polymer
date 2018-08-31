import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PageTutoring extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        h1 {
          font-size: 2.4em;
          margin: 0;
        }

        .filler {
          height: 350px;
          background-color: var(--paper-grey-300);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>

      <div class="hero-image">
        <div class="bg-overlay">
          <app-container>
            <h1 style="color:white;">Tutoring</h1>
          </app-container>
        </div>
        <iron-image class="bg" sizing="cover" src="/img/tutoring.png" preload fade></iron-image>
      </div>

      <app-container class="content" style="padding-top:0">
        <p style="margin-top:0">
          We offer tutoring at Jonsson School Student Enrichment Center (JSSEC), Synergy Park North (SPN) 2.220. We offer tutoring for Electrical Network Analysis, Signals and Systems, and more! Below, you can find up to date tutoring announcements, events, and schedules.
        </p>

        <h2>Schedules</h2>
        <div class="filler">Schedules will be posted next week.</div>


        <!-- TODO -->
        <!-- <h2>Tutors</h2> -->
      </app-container>
    `;
  }
}

window.customElements.define('page-tutoring', PageTutoring);
