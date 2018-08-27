import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PageOhNoes extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        <style>
        :host {
          display: block;
        }

        div.top-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 64px;
          width: 100%;
          background-color: var(--color-background);
        }

        div.content {
          padding: 16px;
          height: 700px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .image {
          height: 400px;
          width: 400px;
          max-width: 100%;
          margin-top: 32px;
        }
        @media (max-width: 676px) {
          .image {
            height: 200px;
          }
        }

        div.center {
          text-align: center;
          opacity: 0.7;
        }
        h1 {
          font-size: 42px;
        }
        h4 {
          font-weight: normal;
        }
        a {
          font-family: var(--font-head);
        }
      </style>


      <div class="top-bar"></div>
      <app-container>
        <div class="content">
          <iron-image class="image" src="/img/broken.svg" sizing="contain"></iron-image>
          <div class="center">
            <h1>Oh noes :(</h1>
            <h4>The page you are looking for may be lost in the quantum realm.</h4>
            <a href="[[rootPath]]">Back to reality</a>
          </div>
        </div>
      </app-container>
    `;
  }
}

window.customElements.define('page-ohnoes', PageOhNoes);
