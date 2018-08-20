import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';

class LoadingBlock extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          background-color: transparent;
          --loading-max-width: 1600px;
          --loading-height: 96px;
          --overlay-color: var(--paper-grey-50);
          --background-color: #eeeeee;
          --background-color-darker: #dddddd;
          --button-height: 42px;
          font-family: Roboto;
          border-radius: 8px;
        }

        .shimmer-container {
          background-color: transparent;
          box-sizing: border-box;
          overflow: hidden;
          border-radius: 2px;
          height: var(--loading-height);
        }
        .shimmer-container[button][loading] {
          height: var(--button-height);
          max-width: 200px;
        }

        @keyframes shimmer{
          0%{
            background-position: 0 0
          }
          100%{
            background-position: calc(var(--loading-max-width) * 2) 0
          }
        }

        .animated-background {
          animation-duration: 2s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: shimmer;
          animation-timing-function: linear;
          background: var(--background-color);
          background: linear-gradient(to right, var(--background-color) 8%, var(--background-color-darker) 18%, var(--background-color) 33%);
          background-repeat: repeat-x;
          background-size: var(--loading-max-width);
          height: var(--loading-height);
          position: relative;
          border-radius: 8px!important;
        }

        .overlay {
          height: var(--loading-height);
          display: block;
          @apply --layout-horizontal;
          @apply --layout-center;
          @apply --layout-center-justified;
        }
        .overlay > .center {
          font-size: 18px;
          opacity: 0.4;
          font-style: italic;
          color: var(--paper-grey-900);
        }

        .shimmer-container[button][loading] .overlay {
          height: var(--button-height);
        }
        .shimmer-container[button][loading] .animated-background {
          height: var(--button-height);
        }

        .mask {
          background: var(--overlay-color);
          position: absolute;
        }
        .shimmer-container:not([button]) .mask {
          display: none;
        }
      </style>

      <div class="shimmer-container" hidden$="[[!loading]]" loading$="[[loading]]" height="[[height]]" button$="[[button]]">
        <div class="animated-background">
          <div class="overlay">
            <div class="center">
              [[label]]
            </div>
          </div>
          <!-- <div class="mask label-top"></div>
          <div class="mask label-right"></div>
          <div class="mask label-bottom"></div>
          <div class="mask label-left"></div> -->
        </div>
      </div>

      <div hidden="[[loading]]"><slot></slot></div>
    `;
  }

  static get properties() {
    return {
      loading: { type: Boolean, value: true, notify: true, reflectToAttribute: true },
      label: { type: String, value: "" },
      height: { type: String, value: "" },
      button: { type: Boolean, value: false }
    }
  }
}

window.customElements.define('loading-block', LoadingBlock);