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
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

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
import './elements/poly-toolbar.js';

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
        background-color: var(--background-color);

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
      app-header img.logo {
        width: 36px;
        height: 36px;
        margin-right: 12px;
      }
      app-toolbar {
        position: absolute;
        left: 0;
        right: 0;
        padding: 0 8px;
        background-color: var(--color-background);
        z-index: 10;
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
        transition: 0.4s width, 0.4s opacity;
        opacity: 1;
      }
      app-toolbar img[gone] {
        width: 0px;
        opacity: 0;
      }
      app-drawer {
        z-index: 500;
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
        --paper-progress-active-color: white;
        --paper-progress-container-color: var(--primary-color);
      }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <paper-progress indeterminate hidden$="[[!loading]]"></paper-progress>

      <app-header reveals fixed>
        <app-toolbar transparent$="[[_active(page,'')]]">
          <app-container style="width: 100%">
            <div>
              <a href="[[rootPath]]" style="height:48px"><img src="https://s3.amazonaws.com/ieee-utd/branding/ieeeutd_icon_color_bordered.svg" draggable=false gone$="[[_active(page,'')]]"></img></a>
              <span class="tab"><a href="[[rootPath]]" active$="[[_active(page,'')]]">Home</a></span>
              <span class="tab"><a href="[[rootPath]]about" active$="[[_active(page,'about')]]">About</a></span>
              <span class="tab"><a href="[[rootPath]]tutoring" active$="[[_active(page,'tutoring')]]">Tutoring</a></span>
              <span class="tab"><a href="[[rootPath]]contact" active$="[[_active(page,'contact')]]">Contact</a></span>
            </div>
          </app-container>
        </app-toolbar>
      </app-header>

      <div class="main">
        <iron-pages selected="[[_page]]" attr-for-selected="name" role="main">
          <page-main name=""></page-main>
          <page-about name="about"></page-about>
          <page-tutoring name="tutoring"></page-tutoring>
          <page-contact name="contact"></page-contact>
          <page-announcement name="announcement"></page-announcement>
        </iron-pages>
      </div>
    `;
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
      _subdrawerOpen: { type: Boolean, value: false }
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
      this.page = '';
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
    switch (page) {
      case '':
        import('./pages/page-main.js').then(() => { this._page = page; });
        break;
      case 'about':
        import('./pages/page-about.js').then(() => { this._page = page; });
        break;
      case 'tutoring':
        import('./pages/page-tutoring.js').then(() => { this._page = page; });
        break;
      case 'contact':
        import('./pages/page-contact.js').then(() => { this._page = page; });
        break;
      case 'ohnoes':
        import('./pages/page-ohnoes.js').then(() => { this._page = page; });
        break;
      case 'announcement':
        import('./pages/page-announcement.js').then(() => { this._page = page; });
        break;
    }
  }
}

window.customElements.define('app-shell', AppShell);
