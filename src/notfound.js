import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';


class NotFoundPage extends PolymerElement {
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
          display: flex;
          justify-content: center;
          align-items: center;
        }
        a {
          color: #3488ff;
          text-decoration: none;
          border-bottom: 1px #3488ff dotted;
        }
      </style>

      <div class="container">
        <div class="body">
          <div class="inner">
            <p>Sorry, we couldn't find what you were looking for.<br/> Head <a href="/home">home</a>.</p>
          </div>
        </div>
        <app-footer></app-footer>
      </div>
    `;
  }
}

customElements.define('page-notfound', NotFoundPage);