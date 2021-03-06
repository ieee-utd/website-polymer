import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { BaseElement } from "../base-element.js";

class LayoutMain extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
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
          <a href="[[rootPath]]" active$="[[_active(_page,'home')]]"><iron-icon icon="mdi:home-outline"></iron-icon><h4>Home</h4></a>
          <a href="[[rootPath]]about" active$="[[_active(_page,'about')]]"><iron-icon icon="mdi:information-outline"></iron-icon><h4>About</h4></a>
          <a href="[[rootPath]]forge" active$="[[_active(_page,'forge')]]"><iron-icon icon="mdi:hammer"></iron-icon><h4>The Forge</h4></a>
          <a href="[[rootPath]]tech" active$="[[_active(_page,'tech')]]"><iron-icon icon="mdi:hammer"></iron-icon><h4>Tech Committee</h4></a>
          <a href="[[rootPath]]tutoring" active$="[[_active(_page,'tutoring')]]"><iron-icon icon="mdi:comment-question-outline"></iron-icon><h4>Tutoring</h4></a>
          <a href="https://comethack.org"><iron-icon icon="mdi:laptop"></iron-icon><h4>Comet Hack</h4></a>
          <a href="[[rootPath]]hkn" active$="[[_active(_page,'hkn')]]"><iron-icon icon="mdi:account-group-outline"></iron-icon><h4>HKN</h4></a>
          <a href="[[rootPath]]contact" active$="[[_active(_page,'contact')]]"><iron-icon icon="mdi:email-outline"></iron-icon><h4>Contact</h4></a>
          <!-- <a href="[[rootPath]]join" active$="[[_active(_page,'apply')]]"><iron-icon icon="mdi:account-heart"></iron-icon><h4>Join Us</h4></a> -->
        </iron-selector>
      </app-drawer>

      <app-header reveals fixed>
        <app-toolbar transparent>
          <app-container class="wide-toolbar" style="width: 100%">
            <div>
              <a href="[[rootPath]]" style="height:48px"><img src="https://s3.amazonaws.com/ieee-utd/branding/ieeeutd_icon_color_bordered.svg" draggable=false gone$="[[_active(_page,'home')]]"/></a>
              <span class="tab"><a href="[[rootPath]]" active$="[[_active(_page,'home')]]">Home</a></span>
              <span class="tab"><a href="[[rootPath]]about" active$="[[_active(_page,'about')]]">About</a></span>
              <span class="tab"><a href="[[rootPath]]forge" active$="[[_active(_page,'forge')]]">The Forge</a></span>
              <span class="tab"><a href="[[rootPath]]tech" active$="[[_active(_page,'tech')]]">Tech Committee</a></span>
              <span class="tab"><a href="[[rootPath]]tutoring" active$="[[_active(_page,'tutoring')]]">Tutoring</a></span>
              <span class="tab"><a href="https://comethack.org">Comet Hack</a></span>
              <span class="tab"><a href="[[rootPath]]hkn" active$="[[_active(_page,'hkn')]]">HKN</a></span>
              <span class="tab"><a href="[[rootPath]]contact" active$="[[_active(_page,'contact')]]">Contact</a></span>
              <!-- <span class="tab"><a href="[[rootPath]]join" active$="[[_active(_page,'apply')]]">Join Us</a></span> -->
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
          <page-home name="home"></page-home>
          <page-about name="about"></page-about>
          <page-apply name="apply"></page-apply>
          <page-forge name="forge"></page-forge>
          <page-tech name="tech"></page-tech>
          <page-tutoring name="tutoring"></page-tutoring>
          <page-hkn name="hkn"></page-hkn>
          <page-contact name="contact"></page-contact>
          <page-announcement name="announcement"></page-announcement>
          <page-event name="event"></page-event>
          <page-events name="events"></page-events>
          <page-ohnoes name="ohnoes"></page-ohnoes>
        </iron-pages>
      <app-sponsors></app-sponsors>
      </div>
    `;
  }

  ready() {
    super.ready();
    this.drawer = this.$$(".drawer");
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
    };
  }

  static get observers() {
    return [];
  }

  _active(page, expected) {
    return page === expected;
  }

  onload(path) {
    return new Promise((resolve, reject) => {
      var page = path[0];

      this.set("_loading", true);
      this.set("subroute", path.slice(1));

      //change page info
      if (page === "") page = "home";
      if (page === "a") page = "announcement";
      if (page === "e") page = "event";
      if (page === "join" || page === "joinus" || page === "join-us")
        page = "apply";

      let el = this.$$(`iron-pages [name="${page}"]`);
      if (!el) page = "ohnoes";

      this._loadPage(page)
        .then((page) => {
          return this._pageLoaded(page);
        })
        .then(resolve)
        .catch(reject);
    });
  }

  _openDrawer() {
    this.$$(".drawer").open();
  }

  _pageLoaded(page) {
    return new Promise((resolve, reject) => {
      let el = this.$$(`iron-pages [name="${page}"]`);
      var promise = () => {
        return Promise.resolve();
      };
      if (typeof el.onload === "function") {
        promise = el.onload;
      }

      promise
        .call(el, this.subroute, window.scrollY)
        .then(() => {
          this.set("_page", page);
          window.scroll(0, this._scrollTo);
          this.set("_scrollTo", 0);
          this.set("_loading", false);

          if (!this.$$(".drawer").persistent) {
            setTimeout(() => {
              // otherwise it looks like garbage
              this.$$(".drawer").close();
            }, 300);
          }

          resolve();
        })
        .catch(this._pageLoadFailed.bind(this));
    });
  }

  _pageLoadFailed(e) {
    console.error(e);
    this.set("_loading", false);
    this._fire("change-page", "/");
  }

  _loadPage(page) {
    return new Promise((resolve, reject) => {
      switch (page) {
        case "home":
          import("../pages/page-home.js")
            .then(resolve.bind(this, page))
            .catch(reject);
          break;
        case "about":
          import("../pages/page-about.js")
            .then(resolve.bind(this, page))
            .catch(reject);
          break;
        case "apply":
          import("../pages/page-apply.js")
            .then(resolve.bind(this, page))
            .catch(reject);
          break;
        case "forge":
          import("../pages/page-forge.js")
            .then(resolve.bind(this, page))
            .catch(reject);
          break;
        case "tech":
          import("../pages/page-tech.js")
            .then(resolve.bind(this, page))
            .catch(reject);
          break;
        case "tutoring":
          import("../pages/page-tutoring.js")
            .then(resolve.bind(this, page))
            .catch(reject);
          break;
        case "hkn":
          import("../pages/page-hkn.js")
            .then(resolve.bind(this, page))
            .catch(reject);
          break;
        case "contact":
          import("../pages/page-contact.js")
            .then(resolve.bind(this, page))
            .catch(reject);
          break;
        case "announcement":
          import("../pages/page-announcement.js")
            .then(resolve.bind(this, page))
            .catch(reject);
          break;
        case "event":
          import("../pages/page-event.js")
            .then(resolve.bind(this, page))
            .catch(reject);
          break;
        case "events":
          import("../pages/page-events.js")
            .then(resolve.bind(this, page))
            .catch(reject);
          break;
        default:
          import("../pages/page-ohnoes.js")
            .then(resolve.bind(this, page))
            .catch(reject);
          break;
      }
    });
  }
}

window.customElements.define("layout-main", LayoutMain);
