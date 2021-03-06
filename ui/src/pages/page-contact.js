import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '../shared-styles.js';

class PageContact extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        a {
          color: var(--color-background);
        }
      </style>

      <div class="hero-image">
        <div class="bg-overlay">
          <app-container>
            <h1 style="color:white;">Contact</h1>
          </app-container>
        </div>
        <iron-image class="bg" sizing="cover" src="/img/contact.png" preload fade></iron-image>
      </div>

      <app-container class="content" style="padding-top:0">
        <p style="margin-top: 0">
          Got an electrifying question? Contact us at the links below! Email us and we'll respond as soon as we can. Feel free to send us a Facebook message if you have simple questions about upcoming events.
        </p>

        <h2>Email</h2>
        <p><a href="mailto:ieeeutd@gmail.com">ieeeutd@gmail.com</a></p>

        <h2>Facebook</h2>
        <p><a href="https://www.facebook.com/IEEEUTD/" target="_blank">https://www.facebook.com/IEEEUTD/</a><br/><a href="https://m.me/IEEEUTD" target="_blank">(Messenger)</a></p>

        <h2>LinkedIn</h2>
        <p><a href="https://www.linkedin.com/company/ieee-utd/" target="_blank">https://www.linkedin.com/company/ieee-utd/</a></p>
      </app-container>
    `;
  }
}

window.customElements.define('page-contact', PageContact);
