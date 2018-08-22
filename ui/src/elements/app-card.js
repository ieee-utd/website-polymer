import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '@polymer/paper-card/paper-card.js';

class AppCard extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          --card-color: var(--paper-grey-800);
          --card-color-hover: var(--paper-grey-700);
        }

        paper-card {
          width: 100%;
          height: 190px;
          border-radius: 8px;
          background-color: var(--card-color);
          color: white;
          cursor: pointer;
          overflow: hidden;
          transition: 0.24s background-color, 0.24s box-shadow;
          padding: 16px;
          @apply --shadow-elevation-2dp;
          transition: 0.5s ease;
        }
        paper-card:hover {
          background-color: var(--card-color-hover);
          @apply --shadow-elevation-12dp;
          transition: 0.5s ease;
        }

        div.title {
          margin: 6px 0 16px 0;
          height: 30px;
          overflow: hidden;
        }

        div.content {
          overflow-y: hidden;
          height: 70px;
        }
        div.content-mask {
          position: absolute;
          bottom: 50px;
          left: 0;
          height: 30px;
          width: 100%;
          padding-bottom: 20px;
          /* background-color: var(--card-color); */
          background: linear-gradient(to bottom, transparent, var(--card-color));
          transition: 0.5s opacity ease, 0.5s background-color ease;
        }
        paper-card:hover > div.content > div.content-mask {
          /* background-color: var(--card-hover-color); */
          background: linear-gradient(to bottom, transparent, var(--card-hover-color));
          transition: 0.5s opacity ease, 0.5s background-color ease;
        }
        div.actions {
          height: 30px;
          margin: 12px 0;
          display: flex;
          align-items: center;
        }
        div.content-alt {
          position: absolute;
          bottom: 0px;
          left: 0;
          right: 0;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
          background-color: var(--card-color);
          font-family: var(--font-head);
          font-weight: 700;
          opacity: 0;
          transition: 0.5s ease;
          
        }
        paper-card:hover div.content-alt {
          opacity: 1;
          background-color: var(--card-color-hover);
          transition: 0.5s ease;
        }
      </style>

      <paper-card>
        <div class="title">
          <slot name="title"></slot>
        </div>

        <div class="content">
          <slot name="content"></slot>
          <div class="content-mask"></div>
        </div>
        <div class="actions">
          <slot name="actions"></slot>
        </div>
        <div class="content-alt">
          <slot name="actions-alt"></slot>
        </div>
      </paper-card>
    `;
  }

  static get properties() {
    return {

    }
  }
}

window.customElements.define('app-card', AppCard);
