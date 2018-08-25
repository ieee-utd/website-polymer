import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image';
import '@polymer/iron-icons/communication-icons.js';
import '../shared-styles.js';

class PageAbout extends PolymerElement {
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
        <iron-image class="bg" sizing="cover" src="/img/about.jpg" preload fade></iron-image>
        <app-container style="position:relative;top:-72px;margin-bottom:-36px;padding: 0 16px;">
          <h1 style="color:white;">About</h1>
        </app-container>
      </div>

      <app-container class="content">
        <p>
          We are the student chapter of the Institute of Electrical and Electronics Engineers (IEEE) at the University of Texas at Dallas (UTD).
          IEEE UTD was founded in [] by students passionate about engineering with only [] members.
          Since then, IEEE UTD has grown to over [] members with students affiliated with other major engineering and computers science organizations, such as [].
          By leveraging both IEEE and UTD resources, we provide resources for students to [].
        </p>

        <h2>Officers</h2>
        <p>Our officers are dedicated to []. We recognize the talent and committement of [] &mdash; our officers range from freshmen and seniors!</p>

        <h2>Committees</h2>
        <p>Our committees are devoted to []. </p>
      </app-container>
    `;
  }

  static get properties() {
    return {
      
    }
  }
}

window.customElements.define('page-about', PageAbout);
