import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element.js';

class LayoutMemberLogin extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          background-color: var(--paper-grey-900);
        }
        div.main {
          opacity: 1;
          transition: 0.8s ease-in-out opacity;
        }
        div.main[loading] {
          opacity: 0.6;
          pointer-events: none!important;
        }
        div.center-container {
          @apply --layout-horizontal;
          @apply --layout-center-justified;
          @apply --layout-center;
          height: 100vh;
          width: 100%;
          background-color: var(--paper-grey-900);
          overflow-y: auto;
        }
        div.center-container > div {
          @apply --layout-vertical;
          @apply --layout-center-justified;
          @apply --layout-center;
          opacity: 0;
          position: relative;
          top: 16px;
          transition: 0.6s top ease-out, 0.6s opacity ease-out;
        }
        div.center-container[ready] > div {
          top: 0;
          opacity: 1;
        }
        img.logo {
          height: 96px;
          width: 96px;
        }
        div.card {
          width: 400px;
          background-color: white;
          @apply --shadow-elevation-6dp;
          color: var(--paper-grey-900);
          padding: 16px;
          border-radius: 8px;
          margin-top: 32px;
          text-align: left;
        }

        @media (max-width: 439px) {
          div.card {
            margin-left: 8px;
            margin-right: 8px;
            width: calc(100% - 48px);
          }
        }
        @media (max-height: 600px) {
          div.center-container {
            display: block;
            text-align: center;
          }
          div.center-container > div {
            padding: 32px 0;
          }
        }
      </style>

      <div class="center-container" ready$="[[_ready]]">
        <div>
          <img class="logo" preload src="https://s3.amazonaws.com/ieee-utd/branding/ieeeutd_icon_color_bordered.svg"/>
          <div class="card">
            <iron-pages selected="[[_page]]" attr-for-selected="name">
              <page-login name="login"></page-login>
              <page-forgot-password name="forgot-password"></page-forgot-password>
            </iron-pages>
          </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      _page: { type: String },
      toolbarPosition: String,
      routeData: Object,
      subroute: Object,
      _subdrawerOpen: { type: Boolean, value: false },
      _loading: { type: Boolean, value: true },
      _scrollTo: { type: Number, value: 0 },
      _ready: { type: Boolean, value: false }
    };
  }

  static get observers() {
    return [

    ];
  }

  ready() {
    super.ready();

    this.set("_ready", false);
    setTimeout(() => { this.set("_ready", true)}, 400)
  }

  onload(path) {
    return new Promise((resolve, reject) => {
      if (path.length < 2) return reject("Path too short");
      var page = path[1];

      this.set("_loading", true)
      this.set("subroute", path.slice(2))

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

  _active(page, expected) {
    return page === expected;
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

        resolve();
      })
      .catch((e) => { console.error(e); this._pageLoadFailed() })
    })
  }

  _pageLoadFailed() {
    this.set("_loading", false)
    this._fire("change-page", "/")
  }

  _loadPage(page) {
    return new Promise((resolve, reject) => {
      console.log("Load page", page)
      switch (page) {
        case 'login':
          import('../pages/members/page-login.js').then(resolve.bind(this, page)).catch(reject);
          break;
        case 'forgot-password':
          import('../pages/members/page-forgot-password.js').then(resolve.bind(this, page)).catch(reject);
          break;
      }
    })
  }
}

window.customElements.define('layout-member-login', LayoutMemberLogin);
