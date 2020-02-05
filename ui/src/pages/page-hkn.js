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
        <p>Eta Kappa Nu (HKN) is the honor society of IEEE, promoting professional accomplishment, service, and development for students and professionals in electrical engineering, computer engineering, and other IEEE fields of interest. More information regarding the 2019-2020 cutoffs are coming soon.</p>

        <h2>Requirements</h2>
        <p>Below are the requirements Fall 2018 ECS majors with the cumulative GPA (Summer 2018) at the appropriate 1/5th, 1/4th, and 1/3rd point for HKN.</p>
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
        <p>In addition, applicants will need to have completed 15 hours of volunteer service in STEM-related fields.
        <br>Fill out this <a href="https://forms.gle/9FGH7Y96SB85u21fA">interest form</a> to learn more about HKN.
        </p>
      </app-container>
    `;
  }

  static get properties() {
    return {
      requirements: { type: Array, value: [
        {ecsMajor: "BMEN", so: 3.881, jr: 3.801, sr: 3.529},
        {ecsMajor: "CE", so: 3.690, jr: 3.442, sr: 3.442},
        {ecsMajor: "CS", so: 3.845, jr: 3.738, sr: 3.553},
        {ecsMajor: "EE", so: 3.750, jr: 3.584, sr: 3.484},
        {ecsMajor: "MECH", so: 3.704, jr: 3.484, sr: 3.375},
        {ecsMajor: "SE", so: 3.651, jr: 3.625, sr: 3.413}
      ]},
    }
  }
}

window.customElements.define('page-hkn', PageHKN);
