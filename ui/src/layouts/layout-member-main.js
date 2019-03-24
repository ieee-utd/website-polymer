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
          background-color: var(--paper-grey-200);
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
          display: block;
          width: 100%;
          padding-top: 6px;
          padding-bottom: 8px;
          padding-left: 10px;
          @apply --layout-horizontal;
          @apply --layout-start-justified;
          @apply --layout-center;
          overflow: hidden;
        }
        app-drawer app-toolbar .drawer-title > img {
          height: 40px;
          width: 40px;
          min-width: 40px;
          margin-right: 14px;
        }
        app-drawer app-toolbar .drawer-title > h3 {
          user-select: none;
          color: var(--color-primary-blue);
        }
        app-drawer {
          z-index: 500;
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
          min-width: 40px;
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
          padding-left: 8px;
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
          margin-left: 24px;
        }
        app-drawer[narrow] iron-selector.drawer-list a > h4 {
          display: none;
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
          background-color: var(--paper-grey-100);
        }
        div.main[loading] {
          opacity: 0.6;
          pointer-events: none!important;
        }

        paper-tooltip {
          border-radius: 4px;
          overflow: hidden;
          --paper-tooltip-background: var(--paper-grey-900);
          --paper-tooltip-text-color: white;
          --paper-tooltip-delay-in: 100ms;
          --paper-tooltip-duration-in: 240ms;
          --paper-tooltip-duration-out: 240ms;
          --paper-tooltip: {
            font-size: 14px!important;
            padding: 8px;
            white-space: nowrap;
          };
        }

        paper-dialog#accountDialog {
          margin: 0;
          overflow: hidden;
          background-color: var(--paper-grey-300);
          border-radius: 8px;
          min-width: 280px;
          max-width: 380px;
        }
        paper-dialog#accountDialog div.account {
          @apply --layout-horizontal;
          @apply --layout-justified;
          @apply --layout-center;
          margin: 0;
          padding: 12px 20px;
        }
        paper-dialog#accountDialog div.account > iron-image,
        paper-dialog#accountDialog div.account > div.initials {
          border-radius: 50%;
          height: 48px;
          width: 48px;
          min-width: 48px;
          background-color: var(--paper-grey-200);
          border: 2px solid var(--paper-grey-400);
        }
        paper-dialog#accountDialog div.account > div.initials {
          @apply --layout-horizontal;
          @apply --layout-center-justified;
          @apply --layout-center;
          font-size: 18px;
          font-weight: 700;
          font-family: var(--font-head);
          color: var(--paper-grey-800);
        }
        paper-dialog#accountDialog div.account > h3 {
          margin: 0;
          margin-right: 16px;
          word-break: break-all;
        }
        paper-dialog#accountDialog div.actions {
          margin: 0;
          padding: 12px 0;
        }
        paper-dialog#accountDialog div.actions > paper-button {
          text-transform: none;
          @apply --layout-horizontal;
          @apply --layout-start-justified;
          @apply --layout-center;
          margin: 0;
          padding: 8px 20px;
          color: var(--paper-grey-800);
          transition: 0.24s background-color;
        }
        paper-dialog#accountDialog div.actions > paper-button:hover {
          background-color: var(--paper-grey-400);
        }
        paper-dialog#accountDialog div.actions > paper-button > span {
          font-family: var(--font-head);
          font-size: 14px;
          font-weight: bold;
          margin-left: 16px;
        }
      </style>

      <app-drawer-layout fullbleed force-narrow$="[[!_wideLayout]]" noscroll$="[[modalDialogOpen]]" tall$="[[!shortLayout]]">
        <app-drawer id="drawer" slot="drawer" opened="{{_mainDrawerOpened}}" narrow$="[[_narrowDrawer]]" wide swipe-open$="[[!_wideLayout]]">
          <app-toolbar class="light">
            <div class="drawer-title">
              <img src="https://s3.amazonaws.com/ieee-utd/branding/ieeeutd_icon_color_bordered.svg" draggable=false></img>
              <h3>IEEEUTD</h3>
            </div>
          </app-toolbar>
          <iron-selector
              selected="[[_page]]"
              class="drawer-list"
              role="navigation">
            <template is="dom-repeat" items="[[pages]]" as="it">
              <a href="[[rootPath]][[it.path]]" id="page-[[it.page]]" active$="[[_active(_page,it.page)]]"><iron-icon icon="[[it.icon]]"></iron-icon><h4>[[it.name]]</h4></a>
              <paper-tooltip position="right" for="page-[[it.page]]" hidden$="[[!_narrowDrawer]]">[[it.name]]</paper-tooltip>
            </template>
          </iron-selector>
        </app-drawer>
        <div class="main" loading$="[[_loading]]">
          <app-container>
            <page-title title="[[_pageTitle]]" user="[[user]]"></page-title>
          </app-container>
          <iron-pages selected="[[_page]]" attr-for-selected="name" role="main">
            <page-member-dashboard name="dashboard"></page-member-dashboard>
            <page-member-users name="users"></page-member-users>
            <page-member-user name="user"></page-member-user>
            <page-member-events name="events"></page-member-events>
            <page-member-event name="event"></page-member-event>
            <page-member-announcements name="announcements"></page-member-announcements>
            <page-member-announcement name="announcement"></page-member-announcement>
            <page-member-schedules name="schedules"></page-member-schedules>
            <page-member-schedule name="schedule"></page-member-schedule>
            <page-member-schedule-slot name="schedule-slot"></page-member-schedule-slot>
            <page-member-account name="account"></page-member-account>
          </iron-pages>
          <app-copyright></app-copyright>
        </div>
      </app-drawer-layout>

      <paper-dialog id="accountDialog" always-on-top with-backdrop horizontal-align="right" vertical-align="top" horizontal-offset=0 vertical-offset=0>
        <div class="account">
          <h3>[[user.firstName]] [[user.lastName]]</h3>
          <iron-image src="[[user.profileImageUrl]]" sizing="cover" preload fade hidden$="[[!user.profileImageUrl]]"></iron-image>
          <div class="initials" hidden$="[[user.profileImageUrl]]">[[user.initials]]</div>
        </div>
        <div class="actions">
          <paper-button on-tap="_openAccountPage"><iron-icon icon="mdi:account-circle"></iron-icon><span>Your Account</span></paper-button>
          <paper-button on-tap="_logout"><iron-icon icon="mdi:power"></iron-icon><span>Log Out</span></paper-button>
        </div>
      </paper-dialog>

      <iron-media-query query="(min-width: 768px)" query-matches="{{_wideLayout}}"></iron-media-query>
    `;
  }

  ready() {
    super.ready();
    this.drawer = this.$$('.drawer');
  }

  static get properties() {
    return {
      user: { type: Object },

      _page: { type: String },
      toolbarPosition: String,
      routeData: Object,
      subroute: Object,
      _subdrawerOpen: { type: Boolean, value: false },
      _loading: { type: Boolean, value: true },
      _scrollTo: { type: Number, value: 0 },
      _pageTitle: { type: String, value: "Dashboard" },

      _wideLayout: { type: Boolean, value: false },
      _narrowDrawer: { type: Boolean, computed: "_isNarrowDrawer(_page,_wideLayout)" },
      pages: { type: Array, value: [

      ]}
    };
  }

  static get observers() {
    return [

    ];
  }

  ready() {
    super.ready();
    this.addEventListener('open-drawer', () => {
      this.$.drawer.open();
    })
    this.addEventListener('open-account-dialog', () => {
      this.$.accountDialog.open();
    })
  }

  _isNarrowDrawer(page, wideLayout) {
    if (wideLayout && page !== "dashboard") {
      this.updateStyles({
        '--app-drawer-width': '72px',
      });
      return true;
    } else {
      this.updateStyles({
        '--app-drawer-width': '300px',
      });
      return false;
    }
  }

  _active(page, expected) {
    return page === expected;
  }

  _openAccountPage() {
    this._fire("change-page", "/member/account")
    this.$.accountDialog.close();
  }

  _logout() {
    this._post("/user/logout")
    .then(() => {
      window.location = "/member/login";
    })
    .catch(e => this._showToastError(e))
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

      var f = () => {
        this._loadPage(page)
        .then((page) => {
          return this._pageLoaded(page);
        })
        .then(resolve)
        .catch(reject)
      }

      //redirect if not logged in
      if (!this.user) {
        this._get("/user", { silent: true })
        .then((user) => {
          this.set("user", user)

          var pages = [{ path: "member/dashboard", page: "dashboard", name: "Dashboard", icon: "mdi:compass-outline" }];

          if (user.group.permissions.admin || user.group.permissions.members) {
            pages.push({ path: "member/users", page: "users", name: "Members", icon: "mdi:account-multiple" })
          }
          if (user.group.permissions.admin || user.group.permissions.events) {
            pages.push({ path: "member/events", page: "events", name: "Events", icon: "mdi:calendar-blank" })
          }
          if (user.group.permissions.admin || user.group.permissions.announcements) {
            pages.push({ path: "member/announcements", page: "announcements", name: "Announcements", icon: "mdi:bullhorn" })
          }
          if (user.group.permissions.admin || user.group.permissions.schedules) {
            pages.push({ path: "member/schedules", page: "schedules", name: "Tutoring Schedules", icon: "mdi:clock-outline" })
          }
          this.set("pages", pages)

          f();
        })
        .catch((e) => {
          window.location = "/member/login";
        })
      } else {
        f();
      }
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
      .then((titleData) => {
        this.set("_page", page)
        window.scroll(0, this._scrollTo);
        this.set("_scrollTo", 0);
        this.set("_loading", false)
        this.set("_pageTitle", titleData.page)

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
        case 'users':
          import('../pages/members/page-member-users.js').then(resolve.bind(this, page)).catch(reject);
          break;
        case 'user':
          import('../pages/members/page-member-user.js').then(resolve.bind(this, page)).catch(reject);
          break;
        case 'events':
          import('../pages/members/page-member-events.js').then(resolve.bind(this, page)).catch(reject);
          break;
        case 'event':
          import('../pages/members/page-member-event.js').then(resolve.bind(this, page)).catch(reject);
          break;
        case 'announcements':
          import('../pages/members/page-member-announcements.js').then(resolve.bind(this, page)).catch(reject);
          break;
        case 'announcement':
          import('../pages/members/page-member-announcement.js').then(resolve.bind(this, page)).catch(reject);
          break;
        case 'schedules':
          import('../pages/members/page-member-schedules.js').then(resolve.bind(this, page)).catch(reject);
          break;
        case 'schedule':
          import('../pages/members/page-member-schedule.js').then(resolve.bind(this, page)).catch(reject);
          break;
        case 'schedule-slot':
          import('../pages/members/page-member-schedule-slot.js').then(resolve.bind(this, page)).catch(reject);
          break;
        case 'account':
          import('../pages/members/page-member-account.js').then(resolve.bind(this, page)).catch(reject);
          break;
        default:
          this._pageLoadFailed("Page does not exist")
      }
    })
  }
}

window.customElements.define('layout-member-main', LayoutMemberMain);
