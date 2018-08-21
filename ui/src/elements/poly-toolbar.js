import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '../shared-styles.js';

class PolyToolbar extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          width: 100%;
          height: var(--bar-height);
          display: flex;
          justify-content: center;
          overflow: auto;
        }
        :host([position="absolute"]) {
          position: absolute;
          top: 0;
          z-index: 10;
          background-color: var(--background-absolute);
        }
        :host([position="relative"]) {
          position: relative;
          background-color: var(--background-relative);
        }
        nav.main {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: left;
          align-items: center;
        }
        a {
          color: white;
          text-decoration: none;
          font-size: 11pt;
          font-weight: 300;
          padding: 5px 0px;
        }
        span {
          display: inline-block;
          margin: 0px 12px;
        }
        a:hover {
          color: #d3d3d3;
        }

        .logo {
          display: block;
          margin: 0 0 0 24px;
        }

        iron-icon {
          --iron-icon-width: 42px;
          --iron-icon-height: 42px;
        }

        a[active] {
          color: #d3d3d3;
          border-bottom: 2px solid #d3d3d3;
        }
      </style>

      <nav class="main">
        <app-container>
          <span class="logo"><iron-icon src="[[icon]]"></iron-icon></span>
          <span><a href="[[rootPath]]main" active$="[[active.main]]">Home</a></span>
          <span><a href="[[rootPath]]about" active$="[[active.about]]">About</a></span>
          <span><a href="[[rootPath]]tutoring" active$="[[active.tutoring]]">Tutoring</a></span>
          <span><a href="[[rootPath]]contact" active$="[[active.contact]]">Contact</a></span>
        </app-container>
      </nav>
    `;
  }

  static get properties() {
    return {
      position: {
        type: String,
        reflectToAttribute: true,
        observer: '_positionChanged'
      },
      page: {
        type: String
      },
      active: {
        type: Object,
        computed: '_setActive(page)'
      }
    }
  }

  _positionChanged(position) {
    if (position === 'absolute') {
      this.icon = '/img/logo.svg';
    } else if (position === 'relative') {
      this.icon = '/img/logo-color.png';
    }
  }

  _setActive(page) {
    if (page === 'main') {
      return {main: true, about: false, tutoring: false, contact: false};
    } else if (page === 'about') {
      return {main: false, about: true, tutoring: false, contact: false};
    } else if (page === 'tutoring') {
      return {main: false, about: false, tutoring: true, contact: false};
    } else if (page === 'contact') {
      return {main: false, about: false, tutoring: false, contact: true};
    } else {
      return {main: false, about: false, tutoring: false, contact: false};
    }
  }
}

window.customElements.define('poly-toolbar', PolyToolbar);
