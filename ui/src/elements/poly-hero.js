import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PolyHero extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        .image {
          width: 100%;
          height: var(--hero-height);
          background: url("/images/circuit.jpg") no-repeat center center fixed;
          background-size: cover;
          position: absolute;
          display: inline-block;
          opacity: 0.3;
          top: 0;
          right: 0;
        }

        .gradient {
          width: 100%;
          height: var(--hero-height);
          background: linear-gradient(to bottom, rgba(0,0,0,0.7),rgba(0,0,0,0.15));
          position: absolute;
          top: 0;
          right: 0;
        }
      </style>

      <div class="image"></div>
      <div class="gradient"></div>
    `;
  }
}

window.customElements.define('poly-hero', PolyHero);
