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
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-progress/paper-progress.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tooltip/paper-tooltip.js';

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

/* Administration */
import './elements/form-button.js';
import './elements/form-input.js';

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
    `;
  }

  ready() {
    super.ready();
    this.addEventListener('change-page', this._navigate);
    this.addEventListener('go-back', this._goBack);
  }

  static get properties() {
    return {
      _layout: { type: String },
      _loading: { type: Boolean, value: true },
      _scrollTo: { type: Number, value: 0 },
      _path: { type: Array }
    };
  }

  static get observers() {
    return [
      '_pathChanged(route.path)'
    ];
  }

  _pathChanged(_path) {
    let path = _path.split("/").slice(1);
    this.set("_path", path)

    let layout = path[0];
    console.log("Path", path)
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

    console.log("Layout", layout)

    switch (layout) {
      case 'main':
        import('./layouts/layout-main.js').then(this._layoutLoaded.bind(this, layout)).catch(this._layoutLoadFailed);
        break;
      case 'member-login':
        import('./layouts/layout-member-login.js').then(this._layoutLoaded.bind(this, layout)).catch(this._layoutLoadFailed);
        break;
      case 'member-main':
        import('./layouts/layout-member-main.js').then(this._layoutLoaded.bind(this, layout)).catch(this._layoutLoadFailed);
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
