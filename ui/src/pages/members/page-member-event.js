import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../../base-element.js';
import '../../elements/confirmation-dialog.js';
import '../../shared-styles.js';

class PageMemberEvent extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        form-edit-controls {
          margin-bottom: 32px;
        }
        .time-picker {
          margin-top: 33px;
        }
      </style>

      <app-container>
        <div class="padding">
          <h4>Event</h4>

          

        </div>
      </app-container>
    `;
  }

  static get properties() {
    return {
      event: { type: Object, value: {} },
      errors: { type: Object, value: {} },
      editing: { type: Boolean, value: false },
      _editingFields: { type: Boolean, value: false },
    }
  }

  onload(path) {
    return new Promise((resolve, reject) => {
      if (path.length == 0) {
        return reject("Invalid announcement id")
      }

      var id = path[0];
      
      return resolve({ page: "Event" });
    });
  }

  _finishLoading() {
    this.$.formToFocus.focus();
    this.set("errors", {});
  }

  _create() {
    
  }

  _saveData(e) {
    
  }
    
}

window.customElements.define('page-member-event', PageMemberEvent);
