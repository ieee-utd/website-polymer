import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element.js';

class LayoutLogin extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          background-color: var(--paper-grey-100);
        }
        paper-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          width: 100%;
          --paper-progress-active-color: var(--color-primary);
          --paper-progress-container-color: var(--color-background);
          --paper-progress-height: 6px;
        }
        div.main {
          opacity: 1;
          transition: 0.8s ease-in-out opacity;
        }
        div.main[loading] {
          opacity: 0.6;
          pointer-events: none!important;
        }
      </style>

      <paper-progress indeterminate hidden$="[[!_loading]]"></paper-progress>

      <h1>Login</h1>

      <div class="main" loading$="[[_loading]]">
        <iron-pages selected="[[_page]]" attr-for-selected="name" role="main">
          <page-login name="login"></page-login>
        </iron-pages>
      </div>
    `;
  }

  ready() {
    super.ready();
    this.drawer = this.$$('.drawer');
  }

  static get properties() {
    return {
      _page: { type: String },
      toolbarPosition: String,
      routeData: Object,
      subroute: Object,
      _subdrawerOpen: { type: Boolean, value: false },
      _loading: { type: Boolean, value: true },
      _scrollTo: { type: Number, value: 0 }
    };
  }

  static get observers() {
    return [

    ];
  }

  _active(page, expected) {
    return page === expected;
  }

  onload(path) {
    return new Promise((resolve, reject) => {
      var page = path[0];

      this.set("_loading", true)
      this.set("subroute", path.slice(1))

      let el = this.$$(`iron-pages [name="${page}"]`);
      if (!el) {
        return reject();
      }

      this._loadPage(page)
      .then((page) => {
        return this._pageLoaded(page);
      })
      .then(resolve)
      .catch(reject)
    })
  }

  _openDrawer() {
    this.$$('.drawer').open();
  }

  _pageLoaded(page) {
    return new Promise((resolve, reject) => {
      let el = this.$$(`iron-pages [name="${page}"]`);
      var promise = () => { return Promise.resolve(); }
      if (typeof el.onload === 'function') {
        promise = el.onload;
      }

      promise.call(el, this.subroute, window.scrollY)
      .then(() => {
        this.set("_page", page)
        window.scroll(0, this._scrollTo);
        this.set("_scrollTo", 0);
        this.set("_loading", false)

        if (!this.$$('.drawer').persistent) {
          setTimeout(() => { // otherwise it looks like garbage
            this.$$('.drawer').close();
          }, 300);
        }

        resolve();
      })
      .catch(this._pageLoadFailed.bind(this))
    })
  }

  _pageLoadFailed() {
    this.set("_loading", false)
    this._fire("change-page", "/")
  }

  _loadPage(page) {
    return new Promise((resolve, reject) => {
      switch (page) {
        case 'login':
          import('../pages/page-login.js').then(resolve.bind(this, page)).catch(reject);
          break;
        case 'forgot-password':
          import('../pages/page-forgot-password.js').then(resolve.bind(this, page)).catch(reject);
          break;
      }
    })
  }
}

window.customElements.define('layout-main', LayoutLogin);
