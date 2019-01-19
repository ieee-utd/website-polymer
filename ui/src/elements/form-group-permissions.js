import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../base-element';
import '../shared-styles.js';

class FormGroupPermissions extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          margin-bottom: 16px;
        }
        vaadin-checkbox[readonly] {
          pointer-events: none;
        }
        div.permission {
          @apply --layout-horizontal;
          @apply --layout-justified;
          @apply --layout-center;
          padding: 8px;
        }
        div.permission > span {
          display: inline-block;
        }
        div.permission > vaadin-checkbox {
          text-align: right;
        }
        div.permissions > div.permission:nth-child(2n+1) {
          background-color: var(--paper-grey-200);
        }
      </style>

      <app-grid>
        <app-grid-item width=6>
          <vaadin-combo-box items="[[allowedPerms.roles]]" label="Role" value="{{role}}" readonly$="[[readonly]]"></vaadin-combo-box>
        </app-grid-item>
      </app-grid>
      <div class="permissions">
        <div class="permission">
          <span><b>Login</b>: user can login to the system and change or reset their password</span>
          <vaadin-checkbox disabled$="[[readonly]]" checked="{{permissions.login}}"></vaadin-checkbox>
        </div>
        <div class="permission">
          <span><b>Profile</b>: user can edit own profile</span>
          <vaadin-checkbox disabled$="[[readonly]]" checked="{{permissions.editOwnProfile}}"></vaadin-checkbox>
        </div>
        <div class="permission">
          <span><b>Members</b>: user can see and manage members</span>
          <vaadin-checkbox disabled$="[[readonly]]" checked="{{permissions.members}}"></vaadin-checkbox>
        </div>
        <div class="permission">
          <span><b>Events</b>: user can create and edit events</span>
          <vaadin-combo-box items="[[allowedPerms.events]]" item-value-path="v" item-label-path="l" value="{{permissions.events}}" readonly$="[[readonly]]"></vaadin-combo-box>
        </div>
        <div class="permission">
          <span><b>Announcements</b>: user can create and edit important announcements</span>
          <vaadin-combo-box items="[[allowedPerms.announcements]]" item-value-path="v" item-label-path="l" value="{{permissions.announcements}}" readonly$="[[readonly]]"></vaadin-combo-box>
        </div>
        <div class="permission">
          <span><b>Tutoring Schedules</b>: user can see and edit tutoring schedules</span>
          <vaadin-combo-box items="[[allowedPerms.schedules]]" item-value-path="v" item-label-path="l" value="{{permissions.schedules}}" readonly$="[[readonly]]"></vaadin-combo-box>
        </div>
        <div class="permission">
          <span><b>Admin</b>: allows user full access to the system and API</span>
          <vaadin-checkbox disabled$="[[readonly]]" checked="{{permissions.admin}}"></vaadin-checkbox>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      readonly: { type: Boolean, value: false },
      permissions: { type: Object, notify: true },
      role: { type: String, notify: true },
      allowedPerms: { type: Object, value: {
        schedules: [
          { v: null, l: "No access" },
          { v: "own", l: "Only own schedule" },
          { v: "section", l: "Own section" },
          { v: "all", l: "Full access" }
        ],
        events: [
          { v: null, l: "No access" },
          { v: "own", l: "Create and edit own" },
          { v: "all", l: "Full access" }
        ],
        announcements: [
          { v: null, l: "No access" },
          { v: "own", l: "Create and edit own" },
          { v: "all", l: "Full access" }
        ],
        roles: [
          "Member",
          "Tutor",
          "Officer",
          "Leader",
          "Advisor",
          "Alumnus"
        ]
      }}
    }
  }
}

window.customElements.define('form-group-permissions', FormGroupPermissions);
