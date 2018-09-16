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
            <h1 style="color:white;">About</h1>
          </app-container>
        </div>
        <iron-image class="bg" sizing="cover" src="/img/about.jpg" preload fade></iron-image>
      </div>

      <app-container class="content" style="padding-top:0">
        <p style="margin-top:0">
          We are the student chapter of the Institute of Electrical and Electronics Engineers (IEEE) at the University of Texas at Dallas (UTD).
          Since its founding, IEEE UTD has remained true to its mission. IEEE UTD members are often involved in other engineering and computer science organizations, such as the American Society of Mechanical Engineers (ASME), UTD Makerspace, the Association for Computing Machinery (ACM), and many more!.
          By leveraging both IEEE and UTD resources, we help students to enforce engineering knowledge they learn and develop connections with other engineers within their fields of interest.
        </p>
        
        <h2>Location</h2>
        <p>We are located at<br/><a href="https://www.google.com/maps/place/Synergy+Park+North+Building+-+UT+Dallas/@32.9939073,-96.7545257,17z/data=!3m1!4b1!4m5!3m4!1s0x864c2206e04feeb9:0x54e35d04c429ba8a!8m2!3d32.9939073!4d-96.752337" target="_blank">Synergy Park North 2.220<br/>3000 Waterview Pkwy,<br/>Richardson, TX 75080</a></p>
        <div class="map">
          <iframe
            width="100%"
            height="450"
            frameborder="0" style="border:0"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAfPLw0W2oEPGS_GaXsJhCpaZw0zTXAxOI
              &q=Synergy+Park+North+Building+-+UT+Dallas,Richardson,TX" allowfullscreen>
          </iframe>
        </div>

        <!-- <h2>Officers</h2>
        <p>Our officers are dedicated to helping the engineering community grow through our diverse backgrounds and interests &mdash; our officers range from freshmen and seniors!</p> -->

        <h2>Committees</h2>
        <p>Committees at IEEE UTD allow students to collaborate with peers who share their interests. The smaller sizes of committees allow students to work closely to accomplish engineering-related goals. We are currently accepting <a href="https://goo.gl/forms/F95iMbny5StOXn8i2" target="_blank">applications</a>!</p>
        <div class="filler">More information will be added soon.</div>
      </app-container>
    `;
  }

  static get properties() {
    return {

    }
  }
}

window.customElements.define('page-about', PageAbout);
