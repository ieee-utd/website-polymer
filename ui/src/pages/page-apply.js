import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '@polymer/iron-image/iron-image';
import '@polymer/iron-icons/communication-icons.js';
import '../shared-styles.js';

class PageApply extends BaseElement {
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
      </style>

      <div class="hero-image">
        <div class="bg-overlay">
          <app-container>
            <h1 style="color:white;">Join us</h1>
          </app-container>
        </div>
        <iron-image class="bg" sizing="cover" src="/img/apply.jpg" preload fade></iron-image>
      </div>

      <app-container class="content" style="padding-top:0">
        <h2>Recruiting officers and tutors!</h2>
        <p>We are looking to fill several officer positions for Spring 2019 and later semesters. To join our team, please fill out the <b>officer application below</b>. Check out the <a href="/about#team">Officer List</a> to learn more about our team.</p>
        <p>Intersted in tutoring students in classes such as Digital System, ENA, and Signals and Systems? For those interested, please fill out the <b>tutor application below</b>.</p>
        <p><i>You can apply for both a tutoring and officer position - some of our officers are tutors as well.</i></p>

        <form-button label="Officer Application" style="display: inline-block; min-width: 140px" on-tap="_applyForOfficer"></form-button>
        <form-button label="Tutor Application" style="display: inline-block; min-width: 140px" on-tap="_applyForTutor"></form-button>
      </app-container>
    `;
  }

  static get properties() {
    return {

    }
  }

  _applyForOfficer() {
    this._openNewTab("https://ieeeutd1.typeform.com/to/f5EQRG")
  }

  _applyForTutor() {
    this._showToast("Tutor application coming soon")
  }
}

window.customElements.define('page-apply', PageApply);
