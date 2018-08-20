import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PageAbout extends PolymerElement {
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
          padding: 32px 32px 64px 32px;
          margin: 0 auto;
        }

        h1 {
          margin: 0;
        }

        .section-spacer {
          display: block;
          height: 30px;
        }

        .banner {
          background-color: #c75b13;
          color: #e8e8e8;
          padding: 5px 20px;
          font-size: 11pt;
          border-radius: 10px;
        }

        .banner-link {
          color: #fff;
        }
      </style>

      <div class="main">
        <h1>About</h1>
        <p>
          We are the student chapter of the Institute of Electrical and Electronics Engineers (IEEE) at the University of Texas at Dallas (UTD).
          IEEE UTD was founded in [] by students passionate about engineering with only [] members. 
          Since then, IEEE UTD has grown to over [] members with students affiliated with other major engineering and computers science organizations, such as []. 
          By leveraging both IEEE and UTD resources, we provide resources for students to [].
        </p>
        <span class="section-spacer"></span>
        
        <h2>Officers</h2>
        <p>Our officers are dedicated to []. We recognize the talent and committement of [] &mdash; our officers range from freshmen and seniors!</p>
        <span class="section-spacer"></span>
        
        <h2>Committees</h2>
        <p>Our committees are devoted to []. </p>
        <!-- TODO: dom if -->
        <p class="banner">We are currently <a class="banner-link" href="" target="_blank">accepting applications</a> to join committees!</p>
      </div>
    `;
  }
}

window.customElements.define('page-about', PageAbout);
