import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '../node_modules/@polymer/polymer/lib/utils/settings.js';
import '../node_modules/@polymer/app-layout/app-drawer/app-drawer.js';
import '../node_modules/@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '../node_modules/@polymer/app-layout/app-header/app-header.js';
import '../node_modules/@polymer/app-layout/app-header-layout/app-header-layout.js';
import '../node_modules/@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../node_modules/@polymer/app-route/app-location.js';
import '../node_modules/@polymer/app-route/app-route.js';
import '../node_modules/@polymer/iron-pages/iron-pages.js';
import '../node_modules/@polymer/iron-selector/iron-selector.js';
import '../node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import './app-icons.js';

import './elements/poly-toolbar.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(AppGlobals.rootPath);

class AppShell extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
        }

        /* app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        } */

        poly-toolbar {
          --bar-height: 64px;
          --background-absolute: transparent;
          --background-relative: gray;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <!-- <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Menu</app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a name="view1" href="[[rootPath]]view1">View One</a>
            <a name="view2" href="[[rootPath]]view2">View Two</a>
            <a name="view3" href="[[rootPath]]view3">View Three</a>
          </iron-selector>
        </app-drawer>

        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="app-icons:menu" drawer-toggle=""></paper-icon-button>
              <div main-title="">My App</div>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <page-main name="main"></page-main>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout> -->

      <div class="main">
        <poly-toolbar position="[[toolbarPosition]]" page="[[page]]"></poly-toolbar>
        <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
          <page-main name="main"></page-main>
          <my-view2 name="view2"></my-view2>
          <my-view3 name="view3"></my-view3>
          <page-ohnoes name="ohnoes"></page-ohnoes>
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
      toolbarPosition: String,
      routeData: Object,
      subroute: Object,
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'main';
      this.toolbarPosition = 'absolute';
    } else if (['main', 'view2', 'view3'].indexOf(page) !== -1) {
      this.page = page;
      if (page === 'main') this.toolbarPosition = 'absolute';
      else this.toolbarPosition = 'relative';
    } else {
      this.page = 'ohnoes';
      this.toolbarPosition = 'relative';
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
      case 'main':
        import('./pages/page-main.js');
        break;
      case 'view2':
        import('./pages/page-officers.js');
        break;
      case 'view3':
        import('./pages/page-committees.js');
        break;
      case 'ohnoes':
        import('./pages/page-ohnoes.js');
        break;

    }
  }
}

window.customElements.define('app-shell', AppShell);
