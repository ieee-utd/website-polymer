import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {IronOverlayBehavior} from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';

class ConfirmationDialog extends mixinBehaviors([IronOverlayBehavior], BaseElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        .dialog {
          background: var(--paper-grey-100);
          border-radius: 8px;
          min-width: 280px;
          min-height: 100px;
          padding: 16px;
          box-shadow: rgba(0, 0, 0, 0.24) -2px 5px 12px 0px, rgba(0, 0, 0, 0.12) 0px 0px 12px 0px;
        }
        
      </style>

      <paper-card class="dialog">
        <slot ></slot>
      </paper-card>
    `;
  }

  static get properties() {
    return {
      
    }
  }

  openDialog() {
    const body = document.querySelector('body');
    body.appendChild(this); // TODO: better binding
    this.open();
  }

  closeDialog() {
    this.close();
  }
}

window.customElements.define('confirmation-dialog', ConfirmationDialog);
