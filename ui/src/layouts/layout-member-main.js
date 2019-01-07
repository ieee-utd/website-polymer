import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element.js';

class LayoutMemberMain extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          background-color: var(--paper-grey-100);

          --app-drawer-width: 300px;
        }
        app-drawer app-toolbar {
          position: absolute;
          left: 0;
          right: 0;
          padding: 0 8px;
          background-color: var(--primary-color);
          z-index: 10;
        }
        app-drawer app-toolbar.light {
          background-color: var(--paper-grey-100);
          padding-top: 8px;
        }
        app-drawer[narrow] app-toolbar {
          background-color: transparent;
        }
        app-drawer app-toolbar div {
          @apply --layout-horizontal;
          @apply --layout-center;
          @apply --layout-start-justified;
        }
        app-drawer app-toolbar span.tab {
          @apply --layout-vertical;
          @apply --layout-center;
          @apply --layout-center-justified;
        }
        app-drawer app-toolbar span.tab > a {
          font-family: "Rubik";
          font-size: 16px;
          font-weight: 700;
          color: var(--paper-grey-400);
          text-decoration: none;
          margin: 0 16px;
          transition: 0.4s color;
        }
        app-drawer app-toolbar span.tab > a[active] {
          color: white;
        }
        app-drawer app-toolbar span.tab > a:hover {
          color: var(--paper-grey-100);
        }
        app-drawer app-toolbar img {
          height: 48px;
          width: 48px;
          margin-right: 16px;
          transition: 0.4s width, 0.4s opacity, 0.4s margin-right;
          opacity: 1;
        }
        app-drawer app-toolbar img[gone] {
          width: 0px;
          opacity: 0;
          margin-right: 0;
        }
        app-drawer app-toolbar .drawer-title {
          text-align: center;
          display: block;
          width: 100%;
          padding-top: 6px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--paper-grey-400);
        }
        app-drawer[narrow] app-toolbar .drawer-title {
          border-bottom: 0;
        }
        app-drawer app-toolbar .drawer-title > img {
          height: 40px;
          width: auto;
        }
        app-drawer {
          z-index: 500;
          --app-drawer-content-container: {
            background-color: var(--paper-grey-100);
          };
        }
        app-drawer[narrow] {
          --app-drawer-content-container: {
            background-color: var(--paper-grey-200);
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
        div.main {
          opacity: 1;
          transition: 0.8s ease-in-out opacity;
        }
        div.main[loading] {
          opacity: 0.6;
          pointer-events: none!important;
        }
      </style>

      <app-drawer-layout fullbleed force-narrow$="[[!_wideLayout]]" noscroll$="[[modalDialogOpen]]" tall$="[[!shortLayout]]">
        <app-drawer id="drawer" slot="drawer" opened="{{_mainDrawerOpened}}" narrow$="[[_narrowDrawer]]" wide swipe-open$="[[!_wideLayout]]">
          <app-toolbar class="light">
            <div class="drawer-title">
              <img src="https://s3.amazonaws.com/ieee-utd/branding/ieeeutd_logo.svg" draggable=false hidden$="[[_narrowDrawer]]"></img>
              <img src="https://s3.amazonaws.com/ieee-utd/branding/ieeeutd_logo.svg" draggable=false hidden$="[[!_narrowDrawer]]"></img>
            </div>
          </app-toolbar>
          <iron-selector
              selected="[[_page]]"
              class="drawer-list"
              role="navigation">

            <template is="dom-repeat" items="[[pages]]" as="it">
              <a href="[[rootPath]][[it.path]]" active$="[[_active(_page,it.page)]]"><iron-icon icon="[[it.icon]]"></iron-icon><h4>[[it.name]]</h4></a>
            </template>
          </iron-selector>
        </app-drawer>
      </app-drawer-layout>

      <!--<app-header reveals fixed>
        <app-toolbar>
          <app-container class="wide-toolbar" style="width: 100%">
            <div>
              <template is="dom-repeat" items="[[pages]]" as="it">
                <span class="tab"><a href="[[rootPath]][[it.path]]" active$="[[_active(_page,it.page)]]">[[it.name]]</a></span>
              </template>
            </div>
          </app-container>
          <app-container class="narrow-toolbar">
            <paper-icon-button icon="mdi:menu" on-tap="_openDrawer"></paper-icon-button>
            <span>Member Menu</span>
          </app-container>
        </app-toolbar>
      </app-header>-->

      <div class="main" loading$="[[_loading]]">
        <iron-pages selected="[[_page]]" attr-for-selected="name" role="main">
          <page-member-dashboard name="dashboard"></page-member-dashboard>
        </iron-pages>
      </div>

      <iron-media-query query="(min-width: 768px)" query-matches="{{_wideLayout}}"></iron-media-query>
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
      _scrollTo: { type: Number, value: 0 },

      _wideLayout: { type: Boolean, value: false },
      _narrowDrawer: { type: Boolean, computed: "_isNarrowDrawer(_page,_wideLayout)" },
      pages: { type: Array, value: [
        { path: "member", page: "dashboard", name: "Dashboard", icon: "mdi:compass-outline" },
        { path: "member/events", page: "events", name: "Members", icon: "mdi:compass-outline" },
        { path: "member/events", page: "events", name: "Events", icon: "mdi:compass-outline" },
        { path: "member/events", page: "events", name: "Announcements", icon: "mdi:compass-outline" },
        { path: "member/events", page: "events", name: "Tutoring Schedules", icon: "mdi:compass-outline" }
      ]}
    };
  }

  static get observers() {
    return [

    ];
  }

  _isNarrowDrawer(page, wideLayout) {
    if (wideLayout && page !== "dashboard") {
      this.updateStyles({
        '--app-drawer-width': '72px',
      });
    } else {
      this.updateStyles({
        '--app-drawer-width': '300px',
      });
    }
    return wideLayout;
  }

  _active(page, expected) {
    return page === expected;
  }

  onload(path) {
    return new Promise((resolve, reject) => {
      var page = path.length > 1 ? path[1] : "";

      this.set("_loading", true)
      this.set("subroute", path.slice(2))

      //change page info
      if (page === "") page = "dashboard";

      let el = this.$$(`iron-pages [name="${page}"]`);
      if (!el) return reject("Page not found")

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

        if (!this.$.drawer.persistent) {
          setTimeout(() => { // otherwise it looks like garbage
            this.$.drawer.close();
          }, 300);
        }

        resolve();
      })
      .catch(this._pageLoadFailed.bind(this))
    })
  }

  _pageLoadFailed(e) {
    console.error(e)
    this.set("_loading", false)
    this._fire("change-page", "/")
  }

  _loadPage(page) {
    return new Promise((resolve, reject) => {
      switch (page) {
        case 'dashboard':
          import('../pages/members/page-member-dashboard.js').then(resolve.bind(this, page)).catch(reject);
          break;
        default:
          this._pageLoadFailed("Page does not exist")
      }
    })
  }
}

window.customElements.define('layout-member-main', LayoutMemberMain);
