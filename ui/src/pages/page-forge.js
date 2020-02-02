import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '../shared-styles.js';

class PageForge extends BaseElement {
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
          max-width: 120px;
          transition: 0.2s color, 0.2s background-color;
        }
        paper-tab:hover {
          background-color: var(--paper-grey-300);
        }
        paper-tab.iron-selected {
          font-weight: 600;
          background-color: var(--color-primary);
          color: white;
        }
        iron-pages {
          background-color: var(--paper-grey-300);
          min-height: 480px;
        }

        div.day-container {
          color: white;
          font-family: var(--font-head);
          font-weight: 500;
          @apply --layout-horizontal;
          @apply --layout-justified;
          @apply --layout-start;
          width: 100%;
          padding: 16px 0;
        }
        div.day-container > div.day {
          color: var(--paper-grey-800);
          @apply --layout-vertical;
          @apply --layout-center-justified;
          @apply --layout-center;
          width: 120px;
          padding: 6px;
        }
        div.day-container > div.day > h2 {
          margin: 0;
          font-size: 42px;
        }
        div.day-container > div.right {
          width: 100%;
        }
        div.day-container > div.right > app-grid {
          --grid-padding-bottom: 0;
        }

        @media (max-width: 680px) {
          div.day-container {
            @apply --layout-vertical;
            @apply --layout-start-justified;
            @apply --layout-start;
          }
          div.day-container > div.day {
            @apply --layout-horizontal;
            @apply --layout-start-justified;
            @apply --layout-center;
            font-family: var(--font-head);
          }
          div.day-container > div.day > span {
            font-family: var(--font-head);
            margin-right: 8px;
            display: inline-block;
          }
        }
      </style>

      <div class="hero-image">
        <div class="bg-overlay">
          <app-container>
            <h1 style="color:white;">The Forge</h1>
          </app-container>
        </div>
        <iron-image class="bg" sizing="cover" src="/img/forge-background.jpg" preload fade></iron-image>
      </div>

      <app-container class="content" style="padding-top:0">
        <p style="margin-top:0">
          The Forge is a multidisciplinary project-focused innovation hub focusing on developing the
          next generation of creative and technical leaders while solving engineering challenges in
          the community. All our projects are made by UTD students for UTD students.
          <br><br>
          Students are placed in interdisciplinary teams of 4-6 and challenged to complete 10-week projects.
          Past projects integrated web development with prototyping and electrical engineering skills to build devices for the UTDallas Makerspace.
        </p>
        <h2>The Selection Process</h2>
        <p>
          Many projects require no/little initial experience so students are encouraged to apply regardless of experience and skillset.
          majors and experience. If you don't have any experience this is a great opportunity to get some!
          <br><br>
          There is an inital screening process students where students upload resumes and select projects they would like to work on.
          Afterwards, there will be interviews to best determine project fit based on majors, skills and interests.
          <br><br>
          If you are interested in joining The Forge you can start the process by filling out this form: <a href="https://bit.ly/forge-s20-interest">bit.ly/forge-s20-interest</a>
        </p>
        <h2>FAQ</h2>
        <p>
          <h4>I'm a beginner, can I still join?</h4>
          Of course! We have several beginner friendly projects and each team is assigned a mentor who can help in the learning process.
          <br><br>
          <h4>What is the time commitment?</h4>
          It varies from project to project but most are within a 4-6 hour range. Teams are also expected to attend weekly meetings with
          project mentors and/or sponsors. You only have 10-weeks so the projects do have to move relatively fast.
          <h4>I have a project idea! Can Forge do it?</h4>
          If your idea solves an engineering challenge within a community, we would love to hear about it. 
          Please reach out to us with a 2-4 sentence elevator speech.
        </p>
        <h2>Contact Us</h2>
        <p>
          Have questions, ideas, or just want to learn more? You can contact us at <a href="mailto:forge@ieeeutd.org">forge@ieeeutd.org</a>
        </p>
      </app-container>
    `;
  }

  static get properties() {
    return {
      selected: { type: Number, value: 0 },
      eventDates: { type: Array, value: [ ] }
    }
  }

  onload(subroute) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this._get("/events?t=tutoring", { silent: true }),
        // this._get("/announcements?t=tutoring", { silent: true })
      ])
      .then((data) => {
        this.set("eventDates", data[0].dates);
        // this.set("announcements", data[1]);
        resolve();
      })
      .catch(reject)
    })
  }

  _navigate(e) {
    let url = this._getAttributeFromEvent(e, 'url', "");
    this._fire('change-page', url);
  }
}

window.customElements.define('page-forge', PageForge);
