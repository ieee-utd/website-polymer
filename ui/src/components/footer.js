import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/iron-icon/iron-icon.js';

class Footer extends PolymerElement {
  static get properties () {
    return {
      
    };
  }

  constructor() {
    super();
  }

  ready(){
    super.ready();
  }

  static get template () {
    return html`
      <style>
        .footer {
          background: #232323;
          color: #ffffff;
          min-height: 230px;
          width: 100%;
          font-size: 13px;
        }
        .container {
          max-width: 1000px;
          display: flex;
          flex-flow: row wrap;
          padding: 10px;
        }
        .social, .contact, .affiliates {
          width: 250px;
          max-height: 320px;
          margin-right: 50px;
        }
        .link {
          list-style-type: none;
        }
        .link > li {
          margin-top: 10px;
        }
        .link > li > a {
          text-decoration: none;
          color: #ffffff;
          display: flex;
          align-items: center;
        }
        li.long {
          margin-bottom: 15px;  
        }
        .title {
          font-size: 20px;
          margin-left: 1.75em;
          color: #afafaf;
          margin-bottom: 0.2em;
        }
        p {
          margin: 0;
        }
        iron-icon {
          margin-right: 5px;
          height: 20px;
          width: 20px;
        }
        .copyright {
          width: 100%;
          align-self: flex-end;
          margin-left: 20px;
          margin-top: 50px;
          font-size: 12px;
        }
      </style>
      
      <iron-iconset-svg name="custom-icons" size="24">
        <svg>
          <defs>
            <g id="email">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </g>
            <g id="domain">
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
            </g>
            <g id="school">
              <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
            </g>
            <g id="facebook">
              <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z" />
            </g>
            <g id="messenger">
              <path d="M12,2C6.5,2 2,6.14 2,11.25C2,14.13 3.42,16.7 5.65,18.4L5.71,22L9.16,20.12L9.13,20.11C10.04,20.36 11,20.5 12,20.5C17.5,20.5 22,16.36 22,11.25C22,6.14 17.5,2 12,2M13.03,14.41L10.54,11.78L5.5,14.41L10.88,8.78L13.46,11.25L18.31,8.78L13.03,14.41Z" />
            </g>
          </defs>
        </svg>
      </iron-iconset-svg>

      <div class="footer">
        <div class="container">
          <div class="social">
            <h3 class="title">Social</h3>
            <ul class="link">
              <li>
                <a href="https://www.facebook.com/IEEEUTD" target="_blank">
                  <iron-icon icon="custom-icons:facebook"></iron-icon>
                  <p>Facebook</p>
                </a>
              </li>
            </ul>
          </div>
          <div class="contact">
            <h3 class="title">Contact</h3>
            <ul class="link">
              <li>
                <a href="mailto:contact@ieeeutd.org">
                  <iron-icon icon="custom-icons:email"></iron-icon>
                  <p>Email</p>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/messages/t/IEEEUTD" target="_blank">
                  <iron-icon icon="custom-icons:messenger"></iron-icon>
                  <p>Facebook Message</p>
                </a>
              </li>
            </ul>
          </div>
          <div class="affiliates">
            <h3 class="title">Affiliates</h3>
            <ul class="link">
              <li class="long">
                <a href="https://www.utdallas.edu/" target="_blank">
                  <iron-icon icon="custom-icons:domain"></iron-icon>
                  <p>The Institute of Electrial<br/> and Electronics Engineers</p>
                </a>
              </li>
              <li class="long">
                <a href="https://www.utdallas.edu/" target="_blank">
                  <iron-icon icon="custom-icons:school"></iron-icon>
                  <p>The University of Texas<br/> at Dallas</p>
                </a>
              </li>
            </ul>
          </div>
          <div class="copyright">&copy; 2018 IEEE UTD.</div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-footer', Footer);
