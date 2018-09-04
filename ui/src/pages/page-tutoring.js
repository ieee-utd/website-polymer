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

        paper-tabs {
          font-family: var(--font-head);
          font-size: 12pt;
          -webkit-font-smoothing: antialiased;
          width: 100%;
          text-transform: uppercase;
          --paper-tab-ink: var(--color-secondary-active);
          --paper-tabs-selection-bar-color: var(--color-orange-complement);
        }
        paper-tab {
          min-width: 30px;
        }
        paper-tab.iron-selected {
          font-weight: 600;
        }
        iron-pages {
          margin-top: 10px;
          background-color: lightgray;
          min-height: 480px;
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
        <paper-tabs selected="{{selected}}" scrollable>
          <paper-tab>DC</paper-tab>
          <paper-tab>DS</paper-tab>
          <paper-tab>ENA</paper-tab>
          <paper-tab>S&amp;S</paper-tab>
        </paper-tabs>
        <iron-pages selected="{{selected}}">
          <div>
            <iframe
              width="100%"
              height="480"
              frameborder="0" style="border:0"
              src="https://drive.google.com/file/d/18p4CMFDFByV6w-dDtJZESglmvwhbp0qN/preview">
            </iframe>
          </div>
          <div>
            <iframe
              width="100%"
              height="480"
              frameborder="0" style="border:0"
              src="https://drive.google.com/file/d/1QwthXslDjK6FAWkzp9U9p4v4ouyvSihi/preview">
            </iframe>
          </div>
          <div>
            <iframe
              width="100%"
              height="480"
              frameborder="0" style="border:0"
              src="https://drive.google.com/file/d/1w3i-OjArqLERJ1A_u5Rs4aQYh232bUM8/preview">
            </iframe>
          </div>
          <div>
            <iframe
              width="100%"
              height="480"
              frameborder="0" style="border:0"
              src="https://drive.google.com/file/d/1vo30US0ERGVeGf0Oa4O0yFZbCMPk38P-/preview">
            </iframe>
          </div>
        </iron-pages>

        <!-- TODO -->
        <!-- <h2>Tutors</h2> -->
      </app-container>
    `;
  }

  static get properties() {
    return {
      selected: { type: Number, value: 0 }
    }
  }
}

window.customElements.define('page-tutoring', PageTutoring);
