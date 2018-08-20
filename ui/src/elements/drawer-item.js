import { html } from '@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import * as Gestures from '@polymer/polymer/lib/utils/gestures.js';

import { BaseElement } from '../base-element.js'

class DrawerItem extends GestureEventListeners(BaseElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          height: 32px;
          padding: 8px 16px;
          @apply --layout-horizontal;
          @apply --layout-center;
          @apply --layout-start-justified;
          font-family: "Roboto";
          font-weight: 600;
          font-size: 14px;
        }
        iron-icon {
          margin-right: 24px;
        }
        div {
          @apply --layout-vertical;
          @apply --layout-start;
          @apply --layout-center-justified;
        }
        span.grey {
          color: var(--paper-grey-600);
        }
        iron-icon[selected], span.text[selected] {
          color: var(--primary-color);
        }
      </style>

      <iron-icon icon="[[icon]]" selected$="{{selected}}"></iron-icon><div><span class="text" selected$="{{selected}}">[[text]]</span><span class="grey">[[subtext]]</span></div>
    `
  }

  static get is() { return 'drawer-item'; }

  static get properties() {
    return {
      icon: String,
      text: String,
      subtext: String,
      selected: { type: Boolean, value: false, reflectToAttribute: true },
      page: String, //page of element
      on: String //current page
    }
  }

  static get observers() {
    return [
      '_pageChanged(on, page)'
    ]
  }

  constructor() {
    super();
    Gestures.addListener(this, 'tap', e => this._changePage(e));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    Gestures.removeListener(this, 'tap', e => this._changePage(e));
  }

  _pageChanged(on, page) {
    this.set("selected", on === page);
  }

  _changePage() {
    if (!this.selected)
      this._fire("change-page", "#" + this.get("page"));
    else
      this._fire("close-drawer");
  }
}

window.customElements.define(DrawerItem.is, DrawerItem);
