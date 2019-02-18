import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../../base-element.js';
import '../../shared-styles.js';

class PageMemberEvents extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        h4 {
          margin: 0;
        }
      </style>

      <app-container>
        <div class="padding">

          <form-button label="Create event" style="display: inline-block; margin-bottom: 16px" on-tap="_createEvent"></form-button>

          <vaadin-grid items="[[events]]" height-by-rows on-active-item-changed="_activeItemChanged">
            <vaadin-grid-sort-column path="title" width="160px">
              <template class="header">Title</template>
              <template>[[item.title]]</template>
            </vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="locationName" width="160px">
              <template class="header">Location</template>
              <template>[[item.locationName]]</template>
            </vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="startTime" direction="asc" width="200px">
              <template class="header">Start time</template>
              <template>[[_prettyDate(item.startTime)]]</template>
            </vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="endTime" width="200px">
              <template class="header">End time</template>
              <template>[[_prettyDate(item.endTime)]]</template>
            </vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="active" header="Status" width="140px">
              <template class="header">Status</template>
              <template>
                <span style="color: var(--paper-red-600);" hidden$="[[item.active]]">Inactive</span>
                <span style="color: var(--paper-green-600);" hidden$="[[!item.active]]">Active</span>
              </template>
            </vaadin-grid-sort-column>
            <vaadin-grid-column width="160px">
              <template class="header">Tags</template>
              <template>
                <template is="dom-repeat" items="[[item.tags]]" as="tag">
                  <span style="margin-right:4px; background-color: var(--paper-grey-200); padding: 2px 4px; font-style: italic">[[tag]]</span>
                </template>
              </template>
            </vaadin-grid-column>
            <vaadin-grid-column width="360px">
              <template class="header">Recurrence</template>
              <template>[[item.recurrenceRulePretty]]</template>
            </vaadin-grid-column>
          </vaadin-grid>

        </div>
      </app-container>
    `;
  }

  static get properties() {
    return {
      events: { Type: Array, value: [] }
    }
  }

  _eventActive(startTime, endTime) {
    if (moment(endTime).isBefore(moment())) return false;
    return true;
  }

  onload() {
    return new Promise((resolve, reject) => {
      this._get("/events/editable")
      .then((events) => {
        this.set("events", events)
        resolve({ page: "Events" });
      })
      .catch((e) => {
        reject(e);
      });
    });
  }

  _createEvent() {
    this._navigateTo("/member/event/create");
  }

  _activeItemChanged(e) {
    var value = e.detail.value;
    if (!value && this._previouslySelectedItem) {
      this._navigateTo(`/member/event/${value.link}`);
    } else if (value) {
      this._previouslySelectedItem = value;
      this._navigateTo(`/member/event/${value.link}`);
    }
  }

  _prettyDate(isoDate) {
    return moment(isoDate).format('MMM D, YYYY hh:mma');
  }
}

window.customElements.define('page-member-events', PageMemberEvents);
