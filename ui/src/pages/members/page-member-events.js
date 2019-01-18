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
            <vaadin-grid-column>
              <template class="header">Title</template>
              <template>[[item.title]]</template>
            </vaadin-grid-column>
            <vaadin-grid-column>
              <template class="header">Location</template>
              <template>[[item.locationName]]</template>
            </vaadin-grid-column>
            <vaadin-grid-column>
              <template class="header">Location URL</template>
              <template>[[item.locationUrl]]</template>
            </vaadin-grid-column>
            <vaadin-grid-column>
              <template class="header">Start time</template>
              <template>[[item.startTime]]</template>
            </vaadin-grid-column>
            <vaadin-grid-column>
              <template class="header">End time</template>
              <template>[[item.endTime]]</template>
            </vaadin-grid-column>
            <vaadin-grid-column>
              <template class="header">Recurrence</template>
              <template>[[item.recurrenceRule]]</template>
            </vaadin-grid-column>
            <vaadin-grid-column>
              <template class="header">Reservation URL</template>
              <template>[[item.reservationUrl]]</template>
            </vaadin-grid-column>
            <vaadin-grid-column>
              <template class="header">Tags</template>
              <template>[[item.tags]]</template>
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

  onload() {
    return new Promise((resolve, reject) => {
      this._get("/events")
      .then((events) => {
        this.set("events", events.dates[0].events);
        resolve({ page: "Announcements" });
      })
      .catch((e) => {
        reject(e);
      });
    });
  }
}

window.customElements.define('page-member-events', PageMemberEvents);
