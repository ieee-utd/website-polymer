import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-progress/paper-progress.js';

import './shared-styles.js';
import './app-icons.js';
import './mdi.js'
import { BaseElement } from './base-element.js';

import './elements/app-card.js';
import './elements/app-container.js';
import './elements/app-grid-item.js';
import './elements/app-grid.js';
import './elements/drawer-item.js';
import './elements/event-card.js';
import './elements/loading-block.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(AppGlobals.rootPath);

class AppShell extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          min-height: 100vh;
          background-color: var(--paper-grey-100);

          --app-drawer-width: 300px;
        }
        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }
        app-header {
          color: #fff;
          background-color: var(--primary-color);
        }
        app-header[transparent] {
          background-color: rgba(0,0,0,0.4);
        }
        app-header app-toolbar {
          @apply --font-head;
          font-size: 24px;
        }
        app-toolbar {
          position: absolute;
          left: 0;
          right: 0;
          padding: 0 8px;
          background-color: var(--color-background);
          z-index: 10;
        }
        app-toolbar.light {
          background-color: var(--paper-grey-100);
          padding-top: 8px;
        }
        app-toolbar[transparent] {
          background-color: transparent;
        }
        app-toolbar div {
          @apply --layout-horizontal;
          @apply --layout-center;
          @apply --layout-center-justified;
        }
        app-toolbar span.tab {
          @apply --layout-vertical;
          @apply --layout-center;
          @apply --layout-center-justified;
        }
        app-toolbar span.tab > a {
          font-family: "Rubik";
          font-size: 16px;
          font-weight: 700;
          color: var(--paper-grey-400);
          text-decoration: none;
          margin: 0 16px;
          transition: 0.4s color;
        }
        app-toolbar span.tab > a[active] {
          color: white;
        }
        app-toolbar span.tab > a:hover {
          color: var(--paper-grey-100);
        }
        app-toolbar img {
          height: 48px;
          width: 48px;
          margin-right: 16px;
          transition: 0.4s width, 0.4s opacity, 0.4s margin-right;
          opacity: 1;
        }
        app-toolbar img[gone] {
          width: 0px;
          opacity: 0;
          margin-right: 0;
        }
        app-toolbar .drawer-title {
          text-align: center;
          display: block;
          width: 100%;
          padding-top: 6px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--paper-grey-400);
        }
        app-toolbar .drawer-title > img {
          height: 40px;
          width: auto;
        }
        app-drawer {
          z-index: 500;
          --app-drawer-content-container: {
            background-color: var(--paper-grey-100);
          };
        }
        app-drawer > app-toolbar > div > h3 {
          color: white;
          margin: 0;
        }
        app-drawer > app-toolbar > div > iron-image {
          height: 40px;
          width: 40px;
          margin-right: 10px;
        }
        app-drawer > .top {
          height: 160px;
          background-color: var(--primary-color);
          @apply --layout-vertical;
          @apply --layout-center;
          @apply --layout-end-justified;
          margin-bottom: 8px;
        }
        app-drawer > .top > img {
          width: auto;
          height: 64px;
          margin-bottom: 16px;
        }
        app-drawer > .top paper-button {
          box-shadow: none;
          width: 100%;
          text-transform: none;
          @apply --layout-horizontal;
          @apply --layout-justified;
          @apply --layout-center;
          padding: 12px 16px;
          font-size: 14px;
        }
        app-drawer h5 {
          padding: 16px 16px 6px 16px;
          color: var(--paper-grey-600);
        }
        iron-selector.drawer-list {
          display: block;
          margin: 64px 0 0 0;
          padding-top: 16px;
          padding-left: 4px;
        }
        iron-selector.drawer-list a {
          display: block;
          padding: 16px;
          text-decoration: none;
          line-height: 16px;
          outline: none;
          color: var(--color-secondary);
          @apply --layout-horizontal;
          @apply --layout-start-justified;
          @apply --layout-center;
        }
        iron-selector.drawer-list a > h4 {
          margin: 0;
          margin-left: 16px;
        }
        iron-selector.drawer-list a[active] {
          color: var(--color-primary-blue);
        }

        hr {
          margin: 4px 16px 12px 16px;
        }
        div.grey {
          background-color: var(--paper-grey-200);
          @apply --layout-vertical;
          padding-bottom: 12px;
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

        app-container.narrow-toolbar {
          padding-left: 16px;
          @apply --layout-horizontal;
          @apply --layout-start-justified;
          @apply --layout-center;
        }
        app-container.narrow-toolbar > span {
          font-size: 14px;
          font-family: var(--font-head);
          opacity: 0.5;
          position: relative;
          top: -2px;
        }

        @media (min-width: 768px) {
          app-drawer.drawer {
            display: none;
          }
          app-container.narrow-toolbar {
            display: none;
          }
        }
        @media (max-width: 768px) {
          app-container.wide-toolbar {
            display: none;
          }
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <paper-progress indeterminate hidden$="[[!_loading]]"></paper-progress>

      <app-drawer class="drawer" swipe-open>
        <app-toolbar class="light">
          <div class="drawer-title">
            <img src="https://s3.amazonaws.com/ieee-utd/branding/ieeeutd_logo.svg" draggable=false></img>
          </div>
        </app-toolbar>
        <iron-selector
            selected="[[_page]]"
            class="drawer-list"
            role="navigation">
          <a href="[[rootPath]]" active$="[[_active(page,'')]]"><iron-icon icon="mdi:home-outline"></iron-icon><h4>Home</h4></a>
          <a href="[[rootPath]]about" active$="[[_active(page,'about')]]"><iron-icon icon="mdi:information-outline"></iron-icon><h4>About</h4></a>
          <a href="[[rootPath]]tutoring" active$="[[_active(page,'tutoring')]]"><iron-icon icon="mdi:comment-question-outline"></iron-icon><h4>Tutoring</h4></a>
          <a href="[[rootPath]]contact" active$="[[_active(page,'contact')]]"><iron-icon icon="mdi:email-outline"></iron-icon><h4>Contact</h4></a>
        </iron-selector>
      </app-drawer>

      <app-header reveals fixed>
        <app-toolbar transparent>
          <app-container class="wide-toolbar" style="width: 100%">
            <div>
              <a href="[[rootPath]]" style="height:48px"><img src="https://s3.amazonaws.com/ieee-utd/branding/ieeeutd_icon_color_bordered.svg" draggable=false gone$="[[_active(page,'')]]"/></a>
              <span class="tab"><a href="[[rootPath]]" active$="[[_active(page,'')]]">Home</a></span>
              <span class="tab"><a href="[[rootPath]]about" active$="[[_active(page,'about')]]">About</a></span>
              <span class="tab"><a href="[[rootPath]]tutoring" active$="[[_active(page,'tutoring')]]">Tutoring</a></span>
              <span class="tab"><a href="[[rootPath]]contact" active$="[[_active(page,'contact')]]">Contact</a></span>
            </div>
          </app-container>
          <app-container class="narrow-toolbar">
            <paper-icon-button icon="mdi:menu" on-tap="_openDrawer"></paper-icon-button>
            <span>IEEEUTD Menu</span>
          </app-container>
        </app-toolbar>
      </app-header>

      <div class="main" loading$="[[_loading]]">
        <iron-pages selected="[[_page]]" attr-for-selected="name" role="main">
          <page-main name=""></page-main>
          <page-about name="about"></page-about>
          <page-tutoring name="tutoring"></page-tutoring>
          <page-contact name="contact"></page-contact>
          <page-announcement name="announcement"></page-announcement>
          <page-event name="event"></page-event>
          <page-events name="events"></page-events>
          <page-ohnoes name="ohnoes"></page-ohnoes>
        </iron-pages>
      </div>
    `;
  }

  ready() {
    super.ready();
    this.addEventListener('change-page', this._navigate);
    this.addEventListener('go-back', this._goBack);
    this.drawer = this.$$('.drawer');
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      _page: { type: String },
      toolbarPosition: String,
      routeData: Object,
      subroute: Object,
      _subdrawerOpen: { type: Boolean, value: false },
      _loading: { type: Boolean, value: true }
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _active(page, expected) {
    return page === expected;
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = '';
      return;
    }

    let el = this.$$(`iron-pages [name="${page}"]`);
    if (el) {
      this.page = page;
    } else {
      this.page = 'ohnoes';
    }

    // Close a non-persistent drawer when the page & route are changed.
    // if (!this.$.drawer.persistent) {
    //   this.$.drawer.close();
    // }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    this.set("_loading", true)

    switch (page) {
      case '':
        import('./pages/page-main.js').then(this._pageLoaded.bind(this)).catch(this._pageLoadFailed.bind(this));
        break;
      case 'about':
        import('./pages/page-about.js').then(this._pageLoaded.bind(this)).catch(this._pageLoadFailed.bind(this));
        break;
      case 'tutoring':
        import('./pages/page-tutoring.js').then(this._pageLoaded.bind(this)).catch(this._pageLoadFailed.bind(this));
        break;
      case 'contact':
        import('./pages/page-contact.js').then(this._pageLoaded.bind(this)).catch(this._pageLoadFailed.bind(this));
        break;
      case 'announcement':
        import('./pages/page-announcement.js').then(this._pageLoaded.bind(this)).catch(this._pageLoadFailed.bind(this));
        break;
      case 'event':
        import('./pages/page-event.js').then(this._pageLoaded.bind(this)).catch(this._pageLoadFailed.bind(this));
        break;
      case 'events':
        import('./pages/page-events.js').then(this._pageLoaded.bind(this)).catch(this._pageLoadFailed.bind(this));
        break;
      default:
        import('./pages/page-ohnoes.js').then(this._pageLoaded.bind(this)).catch(this._pageLoadFailed.bind(this));
        break;
    }

    if (!this.$$('.drawer').persistent) {
      setTimeout(() => { // otherwise it looks like garbage
        this.$$('.drawer').close();
      }, 300);
    }
  }

  _openDrawer() {
    this.$$('.drawer').open();
  }

  _pageLoaded() {
    this._async(() => {
      let el = this.$$(`iron-pages [name="${this.page}"]`);
      var promise = () => { return Promise.resolve(); }
      if (typeof el.onload === 'function') {
        promise = el.onload;
      }

      promise.call(el, this.subroute, window.scrollY)
      .then(() => {
        this.set("_page", this.page)
        window.scroll(0, this._scrollTo);
        this.set("_loading", false)
      })
      .catch(this._pageLoadFailed.bind(this))
    })
  }

  _pageLoadFailed() {
    this.set("_loading", false)
    this._navigate({ detail: "/" })
  }

  _navigate(e) {
    var url = e.detail;
    if (e.detail.route) {
      url = e.detail.route;
      this.set("_scrollTo", e.detail.scroll || 0);
    } else {
      this.set("_scrollTo", 0);
    }
    this.set("route.path", url);
  }

  _goBack() {
    window.history.back();
  }
}

window.customElements.define('app-shell', AppShell);
