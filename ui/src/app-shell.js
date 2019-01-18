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
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-progress/paper-progress.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@vaadin/vaadin-time-picker/vaadin-time-picker.js';

import 'clipboard-copy-element';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';

import './shared-styles.js';
import './app-icons.js';
import './mdi.js'
import { BaseElement } from './base-element.js';

import './elements/app-container.js';
import './elements/app-grid-item.js';
import './elements/app-grid.js';
import './elements/drawer-item.js';
import './elements/event-card.js';
import './elements/loading-block.js';
import './elements/page-title.js';

/* Administration */
import './elements/form-button.js';
import './elements/form-input.js';
import './elements/form-edit-controls.js';
import './elements/form-group-permissions.js';
import './elements/form-textarea.js';
import './elements/app-form.js';
import './elements/app-copyright.js';

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

        paper-toast {
          width: 100%;
          max-width: 500px;
          z-index: 5000!important;
          @apply --layout-horizontal;
          @apply --layout-justified;
          @apply --layout-center;
          font-size: 16px;
          position: absolute;
        }
        paper-toast paper-icon-button {
          margin-right: -9px;
        }
        paper-toast[type="error"] {
          background-color: var(--paper-red-600);
        }
        paper-toast:not([type="error"]) paper-icon-button {
          display: none;
        }
        paper-toast div {
          @apply --layout-horizontal;
          @apply --layout-right-justified;
          @apply --layout-center;
        }
        paper-toast paper-button {
          border: 1px solid rgba(255,255,255,0.7);
          @apply --layout-horizontal;
          @apply --layout-center-justified;
          @apply --layout-center;
          margin-right: 8px;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:layout" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <paper-progress indeterminate hidden$="[[!_loading]]"></paper-progress>

      <div class="main" loading$="[[_loading]]">
        <iron-pages selected="[[_layout]]" attr-for-selected="name" role="main">
          <layout-main name="main"></layout-main>
          <layout-member-login name="member-login"></layout-member-login>
          <layout-member-main name="member-main"></layout-member-main>
        </iron-pages>
      </div>

      <paper-toast id="toast" duration="15000">
        <div>
          <!--<form-button on-tap="_openDetails" style="width:60px" hidden$="[[!_have(_errorDetails)]]">Details</form-button>-->
          <paper-icon-button on-tap="_closeToast" icon="mdi:close"></paper-icon-button>
        </div>
      </paper-toast>
    `;
  }

  static get properties() {
    return {
      _layout: { type: String },
      _loading: { type: Boolean, value: true },
      _scrollTo: { type: Number, value: 0 },
      _path: { type: Array },
      // _errorDetails: { type: String, value: "" }
    };
  }

  static get observers() {
    return [
      '_pathChanged(route.path)'
    ];
  }

  ready() {
    super.ready();
    this.addEventListener('change-page', this._navigate);
    this.addEventListener('go-back', this._goBack);
    this.addEventListener('show-toast', this._showToast);
  }

  _showToast(e) {
    var text = e.detail.text;
    var type = e.detail.type || "";
    var toast = this.$.toast;
    var persistent = e.detail.persistent;

    var show = () => {
      // this.set("_errorDetails", e.detail.detail || "");
      toast.text = text;
      toast.setAttribute("duration", type == "error" || persistent ? TOAST_ERROR_DURATION : TOAST_INFO_DURATION);
      toast.setAttribute("type", type);
      toast.show();
    }

    if (toast.opened) {
      toast.hide();
      setTimeout(show, 100);
    } else {
      show();
    }
  }

  _closeToast() {
    this.$.toast.hide();
  }

  _pathChanged(_path) {
    let path = _path.split("/").slice(1);
    this.set("_path", path)

    let layout = path[0];
    console.log("Navigating to", _path)
    if (!layout) return this._loadLayout("main");

    switch(layout) {
      case "a":
      case "announcement":
      case "e":
      case "event":
      case "":
      case "about":
      case "tutoring":
      case "contact":
        return this._loadLayout("main")
      case "member":
        if (path.length < 1) return this._layoutLoadFailed();
        let page = path.length == 1 ? "" : path[1];
        switch(page) {
          case "login":
          case "forgot-password":
          case "reset-password":
          case "confirm":
            return this._loadLayout("member-login")
          default:
            return this._loadLayout("member-main")
        }
      default:
        //ohnoes page
        return this._loadLayout("main")
    }
  }

  _loadLayout(layout) {
    this.set("_loading", true)

    switch (layout) {
      case 'main':
        import('./layouts/layout-main.js').then(this._layoutLoaded.bind(this, layout)).catch(this._layoutLoadFailed.bind(this));
        break;
      case 'member-login':
        import('./layouts/layout-member-login.js').then(this._layoutLoaded.bind(this, layout)).catch(this._layoutLoadFailed.bind(this));
        break;
      case 'member-main':
        import('./layouts/layout-member-main.js').then(this._layoutLoaded.bind(this, layout)).catch(this._layoutLoadFailed.bind(this));
        break;
      default:
        console.error("Layout not found")
    }
  }

  _layoutLoaded(layout) {
    let el = this.$$(`iron-pages [name="${layout}"]`);
    var promise = () => { return Promise.resolve(); }
    if (typeof el.onload === 'function') {
      promise = el.onload;
    }

    promise.call(el, this._path)
    .then(() => {
      this.set("_layout", layout)
      window.scroll(0, this._scrollTo);
      this.set("_scrollTo", 0);
      this.set("_loading", false)
    })
    .catch((e) => { console.error(e); this._layoutLoadFailed() })
  }

  _layoutLoadFailed(e) {
    console.error(e)
    this.set("_loading", false)
    this._navigate({ detail: "/ohnoes" })
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
