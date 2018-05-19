import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';
import './components/footer.js';

class JoinPage extends PolymerElement {
  static get properties () {
    return {
      loading: {
        type: Boolean,
        value: true
      },
      committees: {
        type: Array,
        value: []
      },
    };
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  static get template () {
    return html`
      <style>
        .container {
          min-height: calc(100vh - 48px);
          display: flex;
          flex-direction: column;
        }
        .body {
          flex-grow: 1;
          min-height: 350px;
          justify-content: center;
          background: #f7f7f7;
          display: flex;
        }
        .inner {
          margin: 10px 24px;
          width: 1200px;
        }
        .g-form {
          width: 100%;
          height: 100%;
        }

        @media only screen and (max-width: 400px) {
          .inner {
            width: 100%;
            margin: 0;
          }
          .g-form {
            height: 100%;
          }
        } 
      </style>

      <div class="container">
        <div class="body">
          <div class="inner">
            <iframe 
                class="g-form"
                src="https://docs.google.com/forms/d/e/1FAIpQLSf8WvfE4LSrsb5whyoPjKsuNHP46vuBxuUhGOahh8iawGJQDQ/viewform?embedded=true" 
                frameborder="0" 
                marginheight="0" 
                marginwidth="0">
              Loading...
            </iframe>
          </div>
        </div>
        <app-footer></app-footer>
      </div>
    `;
  }
}

customElements.define('page-join', JoinPage);