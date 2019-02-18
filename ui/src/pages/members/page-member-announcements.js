import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../../base-element.js';
import '../../shared-styles.js';

class PageMemberAnnouncements extends BaseElement {
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

          <form-button label="Create announcement" style="display: inline-block; margin-bottom: 16px" on-tap="_createAnnouncement"></form-button>

          <vaadin-grid items="[[announcements]]" height-by-rows on-active-item-changed="_activeItemChanged">
            <vaadin-grid-sort-column width="220px" path="title">
              <template class="header">Title</template>
              <template>[[item.title]]</template>
            </vaadin-grid-sort-column>
            <vaadin-grid-sort-column width="200px" direction="asc" path="visibleFrom">
              <template class="header">Visible from</template>
              <template>[[_prettyDate(item.visibleFrom)]]</template>
            </vaadin-grid-sort-column>
            <vaadin-grid-sort-column width="200px" path="visibleUntil">
              <template class="header">Visible until</template>
              <template>[[_prettyDate(item.visibleUntil)]]</template>
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
          </vaadin-grid>
        </div>
      </app-container>
    `;
  }

  static get properties() {
    return {
      schedules: { type: Array, value: [] }
    }
  }

  onload() {
    return new Promise((resolve, reject) => {
      this._get("/announcements/editable")
      .then((announcements) => {
        this.set("announcements", announcements)
        resolve({ page: "Announcements" });
      })
      .catch((e) => {
        reject(e);
      });
    });
  }

  _createAnnouncement() {
    this._navigateTo("/member/announcement/create");
  }

  _activeItemChanged(e) {
    var value = e.detail.value;
    if (!value && this._previouslySelectedItem) {
      this._navigateTo(`/member/announcement/${value.link}`);
    } else if (value) {
      this._previouslySelectedItem = value;
      this._navigateTo(`/member/announcement/${value.link}`);
    }
  }

  _prettyDate(isoDate) {
    return moment(isoDate).format('MMM D, YYYY hh:mma');
  }
}

window.customElements.define('page-member-announcements', PageMemberAnnouncements);
