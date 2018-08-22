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
        }
        paper-card:hover {
          background-color: var(--card-color-hover);
          @apply --shadow-elevation-12dp;
        }

        div.title {
          margin: 6px 0 16px 0;
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
          background: linear-gradient(to bottom, transparent, var(--card-color));
          opacity: 1;
          transition: 0.24s opacity;
        }
        paper-card:hover div.content-mask {
          opacity: 0;
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
          transition: opacity 0.24s, background-color 0.24s;
        }
        paper-card:hover div.content-alt {
          opacity: 1;
          background-color: var(--card-color-hover);
        }

        /*
        div.title {
          height: 52px;
          margin: 0 24px;
          margin-top: 8px;
          display: flex;
          align-items: center;
        }
        div.content {
          position: relative;
          height: 70px;
          margin: 0 24px;
          overflow-y: hidden;
        }
        div.content-mask {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 30px;
          width: 100%;
          padding-bottom: 20px;
          background: linear-gradient(to bottom, transparent, var(--paper-grey-800));
          opacity: 1;
          transition: 0.24s opacity;
        }
        paper-card:hover div.content-mask {
          opacity: 0;
        }
        div.actions {
          height: 30px;
          margin: 12px 24px 0 24px;
          display: flex;
          align-items: center;
          color: var(--card-text-secondary);
        }
        paper-card:hover {
<<<<<<< HEAD
          box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
          transition: ease 0.5s;
        }
        div.mask {
          position: absolute;
          width: 100%;
          height: 150px;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          z-index: 2;
          pointer-events: none;
          background-color: transparent;
          transition: ease 0.5s;
        }
        paper-card:hover > div.mask {
          background-color: var(--card-hover-color);
          opacity: 0.5;
          transition: ease 0.5s;
=======
          @apply --shadow-elevation-12dp;
>>>>>>> 4a6eca146765d750a4b3b2896cb73e9a065a53c1
        }
        div.action-alt {
          position: absolute;
          bottom: 0px;
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
<<<<<<< HEAD
          background-color: var(--card-hover-action-color);
          visibility: hidden;
          opacity: 0;
          /* transition: visibility 0.3s ease, opacity 0.3s ease; */
          transition: ease 0.7s;
=======
          background-color: var(--paper-grey-800);
          visibility: hidden;
          opacity: 0;
          transition: visibility 0.24s, opacity 0.24s, background-color 0.24s;
>>>>>>> 4a6eca146765d750a4b3b2896cb73e9a065a53c1
        }
        paper-card:hover > div.action-alt {
          visibility: visible;
          opacity: 1;
<<<<<<< HEAD
          transition: ease 0.3s;
        }
        div.mask-bottom {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 10px;
          pointer-events: none;
          background-color: transparent;
          transition: ease 0.7s;
        }
        paper-card:hover > div.mask-bottom {
          background-color: var(--card-hover-color);
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          opacity: 0.5;
          transition: ease 0.5s;
        }
=======
          background-color: var(--paper-grey-700);
        }*/
>>>>>>> 4a6eca146765d750a4b3b2896cb73e9a065a53c1
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
        <div class="action-alt">
          <slot name="actions-alt"></slot>
        </div>
        <div class="mask-bottom"></div>
      </paper-card>
    `;
  }

  static get properties() {
    return {

    }
  }
}

window.customElements.define('app-card', AppCard);
