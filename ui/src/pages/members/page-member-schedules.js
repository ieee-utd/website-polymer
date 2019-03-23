import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../../base-element.js';
import '../../shared-styles.js';

/**
  Member UI:

  - /schedules: dropdown of schedules (DS, etc.) and list of titles
**/

class PageMemberSchedules extends BaseElement {
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

          <vaadin-select label="Schedule" placeholder="Please select" value="{{_currentScheduleId}}" style="margin-right:16px;">
            <template>
              <vaadin-list-box>
                <template is="dom-repeat" items="[[schedules]]" as="schedule">
                  <vaadin-item value="[[schedule._id]]">[[schedule.name]]</vaadin-item>
                </template>
              </vaadin-list-box>
            </template>
          </vaadin-select>
          <form-button label="Create schedule" style="display: inline-block; margin-bottom: 16px" on-tap="_createSchedule"></form-button>

          <h3>Slots</h3>

          <div>
            <form-button label="Add slot to schedule" style="display: inline-block; margin-bottom: 16px" on-tap="_createScheduleSlot"></form-button>
          </div>


          <vaadin-grid items="[[events]]" height-by-rows on-active-item-changed="_activeItemChanged">
            <vaadin-grid-sort-column path="title" width="220px" direction="asc">
              <template class="header">Title</template>
              <template>[[item.title]]</template>
            </vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="startTime" width="200px">
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
            <vaadin-grid-sort-column path="location" width="160px">
              <template class="header">Location</template>
              <template>[[item.locationName]]</template>
            </vaadin-grid-sort-column>
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
      schedules: { type: Array, value: [
        {
          name: "Digital Systems",
          shortName: "DS",
          _id: "123"
        }
      ]},
      _currentScheduleId: { type: String, observer: "_scheduleSelectionChanged" },
      _scheduleSlots: { type: Array, value: [
        {
          title: "Caleb Fung",
          notes: "Hello world!",
          location: "",
          locationUrl: "",
          color: "#4286f4",
          instances: [{
            //7:30-10a
            startTime: "2019-03-23T07:30:00-06:00",
            endTime: "2019-03-23T10:00:00-06:00",
            recurrenceRule: "FREQ=DAILY;INTERVAL=2;COUNT=4",
            recurrenceRulePretty: "Every Sunday" //not from API
          }]
        }
      ] }
    }
  }

  _scheduleSelectionChanged(id) {

  }

  onload() {
    return new Promise((resolve, reject) => {
      resolve({ page: "Tutoring Schedules" });
    })
  }
}

window.customElements.define('page-member-schedules', PageMemberSchedules);
