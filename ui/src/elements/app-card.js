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
          --card-color-hover-dark: var(--color-primary);
        }

        paper-card {
          width: 100%;
          height: 190px;
          border-radius: 8px;
          background-color: var(--card-color);
          color: white;
          cursor: pointer;
          overflow: hidden;
          padding: 16px;
          @apply --shadow-elevation-2dp;
          /*box-shadow: none;*/
          /*border: 1px solid var(--paper-grey-500);*/
          transition: 0.14s linear;
        }
        paper-card:hover {
          background-color: var(--card-color-hover);
          @apply --shadow-elevation-12dp;
          transition: 0.14s linear;
        }

        div.title {
          margin: 6px 0 16px 0;
          height: 30px;
          overflow: hidden;
        }

        div.content {
          overflow-y: hidden;
          height: 70px;
          opacity: 0.7;
          transition: 0.14s linear;
        }
        paper-card:hover div.content {
          opacity: 1;
        }
        div.content-mask {
          position: absolute;
          bottom: 50px;
          left: 0;
          height: 30px;
          width: 100%;
          padding-bottom: 20px;
          pointer-events: none;
          background: linear-gradient(to bottom, transparent, var(--card-color));
          transition: 0.14s linear;
        }
        paper-card:hover > div.content > div.content-mask {
          opacity: 0;
        }
        div.content-mask-hover {
          position: absolute;
          bottom: 50px;
          left: 0;
          height: 30px;
          width: 100%;
          padding-bottom: 20px;
          pointer-events: none;
          opacity: 0;
          background: linear-gradient(to bottom, transparent, var(--card-color-hover));
          transition: 0.14s linear;
        }
        paper-card:hover > div.content > div.content-mask-hover {
          opacity: 1;
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
          background-color: var(--card-color-hover-dark);
          font-family: var(--font-head);
          font-weight: 700;
          opacity: 0;
          transition: 0.14s linear;

        }
        paper-card:hover div.content-alt {
          opacity: 1;
          /*background-color: var(--card-color-hover);*/
        }
      </style>

      <paper-card>
        <div class="title">
          <slot name="title"></slot>
        </div>
        <div class="content">
          <slot name="content"></slot>
          <div class="content-mask"></div>
          <div class="content-mask-hover"></div>
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
