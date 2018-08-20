import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PolyHero extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        .hero {
          width: 100%;
          height: 500px;
          position: absolute;
          top: 0;
          left: 0;
          background: url('/img/hero.svg');
          background-position: center 10%;
          background-size: cover;
        }
      </style>

      <div class="hero">

      </div>
    `;
  }
}

window.customElements.define('poly-hero', PolyHero);
