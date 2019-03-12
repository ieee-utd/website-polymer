import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '@polymer/iron-image/iron-image';
import '@polymer/iron-icons/communication-icons.js';
import '../shared-styles.js';

class PageHKN extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        .filler {
          height: 350px;
          background-color: var(--paper-grey-300);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .map {
          background-color: var(--paper-grey-300);
        }
        a {
          color: var(--color-background);
        }
        .header-text {
          color: var(--color-primary-blue-lighter);
        }
      </style>

      <div class="hero-image">
        <div class="bg-overlay">
          <app-container>
            <h1 style="color:white;">Eta Kappa Nu Honor Society</h1>
          </app-container>
        </div>
        <iron-image class="bg" sizing="cover" src="/img/hkn.jpg" preload fade></iron-image>
      </div>

      <app-container class="content" style="padding-top:0">
        <p>Eta Kappa Nu (HKN) is the honor society of IEEE, promoting professional accomplishment, service, and development for students and professionals in electrical engineering, computer engineering, and other IEEE fields of interest.</p>

        <h2>Requirements</h2>
        <p>Below are the requirements Fall 2018 ECS majors with the cumulative GPA (Summer 2019) at the appropriate 1/5th, 1/4th, and 1/3rd point for HKN.</p>
        <vaadin-grid items="[[requirements]]" height-by-rows>
          <vaadin-grid-column width="160px">
            <template class="header"><span class="header-text">ECS Major</span></template>
            <template>[[item.ecsMajor]]</template>
          </vaadin-grid-column>
          <vaadin-grid-column width="160px">
            <template class="header"><span class="header-text">SO @ 1/5th</span></template>
            <template>[[item.so]]</template>
          </vaadin-grid-column>
          <vaadin-grid-column width="160px">
            <template class="header"><span class="header-text">JR @ 1/4th</span></template>
            <template>[[item.jr]]</template>
          </vaadin-grid-column>
          <vaadin-grid-column width="160px">
            <template class="header"><span class="header-text">SR @ 1/3rd</span></template>
            <template>[[item.sr]]</template>
          </vaadin-grid-column>
        </vaadin-grid>
        <p>In addition, applicants will need to have completed 15 hours of volunteer service in STEM-related fields.</p>
      </app-container>
    `;
  }

  static get properties() {
    return {
      requirements: { type: Array, value: [
        {ecsMajor: "BMEN", so: 3.825, jr: 3.539, sr: 3.571},
        {ecsMajor: "CE", so: 3.654, jr: 3.628, sr: 3.460},
        {ecsMajor: "CS", so: 3.753, jr: 3.717, sr: 3.567},
        {ecsMajor: "EE", so: 3.484, jr: 3.667, sr: 3.418},
        {ecsMajor: "MECH", so: 3.655, jr: 3.600, sr: 3.401},
        {ecsMajor: "SE", so: 3.677, jr: 3.499, sr: 3.351},
      ]},
    }
  }
}

window.customElements.define('page-hkn', PageHKN);
