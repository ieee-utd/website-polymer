import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../../base-element.js';
import '../../shared-styles.js';

class PageMemberUsers extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        h4 {
          margin: 0;
        }
        div.account > iron-image,
        div.account > div.initials {
          border-radius: 50%;
          height: 40px;
          width: 40px;
          min-width: 40px;
          background-color: var(--paper-grey-200);
          position: relative;
          top: 2px;
        }
        div.account > div.initials {
          @apply --layout-horizontal;
          @apply --layout-center-justified;
          @apply --layout-center;
          font-size: 14px;
          font-weight: 700;
          font-family: var(--font-head);
          color: var(--paper-grey-800);
        }
      </style>

      <app-container>
        <div class="padding">

          <form-button label="Add new member" style="display: inline-block; margin-bottom: 16px" on-tap="_createUser"></form-button>

          <vaadin-grid items="[[members]]" height-by-rows on-active-item-changed="_activeItemChanged">
            <vaadin-grid-column width="64px" flex-grow=0>
              <template>
                <div class="account">
                  <iron-image src="[[item.profileImageUrl]]" sizing="cover" preload fade hidden$="[[!item.profileImageUrl]]"></iron-image>
                  <div class="initials" hidden$="[[item.profileImageUrl]]">[[item.initials]]</div>
                </div>
              </template>
            </vaadin-grid-column>
            <vaadin-grid-sort-column path="firstName" direction="asc">
              <template class="header">First Name</template>
              <template>[[item.firstName]]</template>
            </vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="lastName">
              <template class="header">Last Name</template>
              <template>[[item.lastName]]</template>
            </vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="group.name" header="Group">
              <template class="header">Group</template>
              <template>[[item.group.name]]</template>
            </vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="memberSince">
              <template class="header">Member Since</template>
              <template>[[item.memberSince]]</template>
            </vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
      </app-container>
    `;
  }

  static get properties() {
    return {
      members: { type: Array, value: [ ]}
    }
  }

  _createUser() {
    this._navigateTo("/member/user/create");
  }

  _activeItemChanged(e) {
    var value = e.detail.value;
    if (!value && this._previouslySelectedItem) {
      this._navigateTo(`/member/user/${value._id}`)
    } else if (value) {
      this._previouslySelectedItem = value;
      this._navigateTo(`/member/user/${value._id}`)
    }
  }

  onload() {
    return new Promise((resolve, reject) => {
      this._get("/members")
      .then((members) => {
        this.set("members", members)
        resolve({ page: "Members" });
      })
      .catch((e) => {
        reject(e)
      })
    })
  }
}

window.customElements.define('page-member-users', PageMemberUsers);
