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
          <form-button label="Create schedule" style="display: inline-block; margin-bottom: 16px; margin-right: 8px;" on-tap="_createSchedule"></form-button>
          <form-button label="Edit schedule" style="display: inline-block; margin-bottom: 16px;" on-tap="_editSchedule"></form-button>

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
      schedules: { type: Array, value: [] },
      slots: { type: Array, value: [] }
    }
  }

  _scheduleSelectionChanged(id) {

  }

  _createSchedule() {
    this._navigateTo("/member/schedule/create");
  }

  _editSchedule() {
    this._navigateTo("/member/schedule/edit");
  }

  onload() {
    return new Promise((resolve, reject) => {
      this._get("/schedules/editable")
      .then((schedules) => {
        this.set("schedules", schedules)
        if (schedules.length > 0) {
          this.set("_currentScheduleId", schedules[0]._id);
          this._getSlots(schedules[0]._id);
        }
        resolve({ page: "Schedules" });
      })
      .catch((e) => {
        reject(e);
      });
    });
  }

  _getSlots(id) {
    this._get(`/schedules/${id}/slots/editable`)
      .then((slots) => {
        this.set("slots", slots);
      })
      .catch((e) => {
        console.error(e);
      });
  }
}

window.customElements.define('page-member-schedules', PageMemberSchedules);
