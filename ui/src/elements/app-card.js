import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '@polymer/paper-card/paper-card.js';

class AppCard extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        paper-card {
          position: relative;
          width: 100%;
          height: 210px;
          border-radius: 10px;
          background-color: var(--card-color);
          color: var(--card-text-primary);
          transition: ease 0.5s;
        }
        div.title {
          height: 50px;
          margin: 0 24px;
          display: flex;
          align-items: center;
        }
        div.content {
          position: relative;
          height: 100px;
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
          background: linear-gradient(to bottom, var(--card-gradient-from), var(--card-gradient-to));
        }
        div.actions {
          height: 30px;
          margin: 12px 24px 0 24px;
          display: flex;
          align-items: center;
          color: var(--card-text-secondary);
        }

        paper-card:hover {
          box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
          transition: ease 0.5s;
        }
        div.mask {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          z-index: 2;
          pointer-events: none;
          background-color: transparent;
          transition: ease 0.5s;
        }
        paper-card:hover > div.mask {
          background-color: var(--card-hover-color);
          opacity: 0.5;
          transition: ease 0.5s;
        }
        div.content-alt {
          position: absolute;
          bottom: 10px;
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
          background-color: var(--card-color);
          visibility: hidden;
          opacity: 0;
          transition: visibility 0.5s ease, opacity 0.5s ease;
          transition-delay: 1;
          transition: ease 0.5s;
        }
        paper-card:hover > div.content-alt {
          visibility: visible;
          opacity: 1;
        }
      </style>

      <paper-card>
        <div class="mask"></div>
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
