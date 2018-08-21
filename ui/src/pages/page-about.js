import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image';
import '@polymer/iron-icons/communication-icons.js';
import '@polymer/paper-icon-button/paper-icon-button';
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
          min-height: calc(100vh - 160px);
          min-height: 700px;
          padding: 72px 32px 64px 32px;
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
        <div class="officers-container">
          <dom-repeat items="[[officers]]">
            <template>
              <div class="officer-content">
                <!-- TODO: placeholder not working -->
                <iron-image style="width:100px; height:100px; background: url('/img/placeholder-avatar.png'); background-size: cover; border-radius: 50%;" sizing="cover" fade src="[[item.img]]"></iron-image>
                <h3 class="officer-title">[[item.name]]</h3>
                <div class="officer-mid">
                  <p class="officer-position">[[item.position]]</p>
                  <dom-if if="[[item.email]]">
                    <template>
                      <a href="mailto:[[item.email]]"><paper-icon-button class="officer-email" icon="communication:email" noink></paper-icon-button></a>
                    </template>
                  </dom-if>
                </div>
                <p class="officer-blurb">[[item.blurb]]</p>
              </div>
            </template>
          </dom-repeat>
          <span class="officer-content-spacer"></span>
          <span class="officer-content-spacer"></span>
        </div>
        <span class="section-spacer"></span>
        
        <h2>Committees</h2>
        <p>Our committees are devoted to []. </p>
        <!-- TODO: dom if -->
        <p class="banner">We are currently <a class="banner-link" href="" target="_blank">accepting applications</a> to join committees!</p>
        <div class="committees-container">
          More info coming soon!
        </div>
      </div>
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
