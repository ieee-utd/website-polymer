import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PageContact extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        .bg {
          height: 400px;
          width: 100%;
          background-color: var(--color-background);
        }

        .bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 400px;
          background: linear-gradient(to bottom, var(--color-background), transparent);
          z-index: 1;
        }

        .content {
          padding: 16px 32px;
          display: block;
        }

        h1 {
          font-size: 2.4em;
          margin: 0 16px;
        }

        a {
          color: var(--color-background);
        }
      </style>

      <div class="image">
        <div class="bg-overlay"></div>
        <iron-image class="bg" sizing="cover" src="/img/contact.png" preload fade></iron-image>
        <app-container style="position:relative;top:-72px;margin-bottom:-36px;padding: 0 16px;">
          <h1 style="color:white;">Contact</h1>
        </app-container>
      </div>

      <app-container class="content" style="padding-top:0">
        <p style="margin-top: 0">
          Got an electrifying question? Contact us at the links below! Email us and we'll respond as soon as we can. Feel free to send us a Facebook message if you have simple questions about upcoming events.
        </p>

        <h2>Email</h2>
        <p><a href="mailto:ieeeutd@gmail.com">ieeeutd@gmail.com</a></p>

        <h2>Facebook</h2>
        <p><a href="https://www.facebook.com/IEEEUTD/" target="_blank">https://www.facebook.com/IEEEUTD/</a><br/><a href="http://m.me/IEEEUTD" target="_blank">(Messenger)</a></p>

        <h2>LinkedIn</h2>
        <p><a href="https://www.linkedin.com/company/ieee-utd/" target="_blank">https://www.linkedin.com/company/ieee-utd/</a></p>
      </app-container>
    `;
  }
}

window.customElements.define('page-contact', PageContact);
