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

        .top-bg {
          height: 400px;
          width: 100%;
          background-color: var(--color-background);
        }

        .content {
          padding: 16px 32px;
          display: block;
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

        .officers-container {
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
          background-color: #f8f8f8;
          padding: 10px 0;
          border-radius: 12px;
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        }

        .officer-content {
          width: 290px;
          margin: 5px;
          padding: 5px 10px;
          background-color: #f2f2f2;
          border-left: 3px solid #c75b13;
        }

        .officer-content-spacer {
          width: 313px;
          height: 0;
          margin: 5px;
        }

        .officer-title {
          margin: 0 0 5px 0;
          color: #2b3137;
        }

        .officer-middle {
          width: 100%;
          display: flex;
          flex-flow: row wrap;
          align-content: center;
        }

        .officer-position {
          margin: 0;
          font-style: italic;
          display: inline-block;
          color: #ff6f00;
        }

        .officer-email {
          color: gray;
          padding: 3px;
          width: 28px;
          height: 28px;
          margin-left: 20px;
        }

        .officer-blurb {
          margin: 5px 0 0 0;
          max-height: 120px;
          overflow: auto;
        }

        .committees-container {
          height: 450px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: lightgray;
        }

        h1 {
          font-size: 2.4em;
          margin: 0 16px;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 400px;
          background: linear-gradient(to bottom, var(--color-background), transparent);
          z-index: 1;
        }
      </style>

      <div class="image">
        <div class="overlay"></div>
        <iron-image class="top-bg" sizing="cover" src="/img/about.jpg" preload fade></iron-image>
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
        <span class="section-spacer"></span>

        <h2>Officers</h2>
        <p>Our officers are dedicated to []. We recognize the talent and committement of [] &mdash; our officers range from freshmen and seniors!</p>

        <h2>Committees</h2>
        <p>Our committees are devoted to []. </p>
      </app-container>
    `;
  }

  static get properties() {
    return {
      officers: {
        type: Array,
        value: [
          {
            name: 'First Last',
            img: 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png',
            position: 'position',
            email: '',
            blurb: 'Something, something...'
          },
          {
            name: 'First Last',
            img: '',
            position: 'position',
            email: 'caleb.t.fung@gmail.com',
            blurb: 'Something, something...'
          },
          {
            name: 'First Last',
            img: '',
            position: 'position',
            email: '',
            blurb: 'Cronut slow-carb try-hard, austin YOLO flexitarian flannel drinking vinegar hot chicken occupy ennui sriracha farm-to-table ramps marfa. Copper mug church-key before they sold out knausgaard VHS art party neutra chia pickled banjo biodiesel. Leggings cred hoodie farm-to-table. Lyft tbh gastropub tacos distillery, wayfarers pok pok roof party readymade listicle pabst. Cold-pressed asymmetrical jianbing raw denim.'
          },
          {
            name: 'First Last',
            img: '',
            position: 'position',
            email: '',
            blurb: 'Something, something...'
          }
        ]
      }
    }
  }
}

window.customElements.define('page-about', PageAbout);
