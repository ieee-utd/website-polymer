import { html } from '@polymer/polymer/polymer-element.js';
import { BaseElement } from '../../base-element.js';
import '../../shared-styles.js';

class PageMemberUser extends BaseElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        form-edit-controls {
          margin-bottom: 32px;
        }
      </style>

      <app-container>
        <div class="padding">
          <h4>Member Info</h4>
          <app-form id="formToFocus" disabled$="[[_andNot(editing,_editingBasic)]]">
            <app-grid-item width=6 slot="field">
              <form-input readonly value="[[member.email]]" label="Email" autofocus></form-input>
            </app-grid-item>
            <app-grid-item width=6 slot="field"></app-grid-item>
            <app-grid-item width=6 slot="field">
              <form-input value="{{member.firstName}}" label="First Name" auto-readonly></form-input>
            </app-grid-item>
            <app-grid-item width=6 slot="field">
              <form-input value="{{member.lastName}}" label="Last Name" auto-readonly></form-input>
            </app-grid-item>
            <app-grid-item width=6 slot="field">
              <form-input value="{{member.position}}" label="Position" auto-readonly></form-input>
            </app-grid-item>
            <app-grid-item width=6 slot="field">
              <form-input value="{{member.memberSince}}" label="Member Since" auto-readonly></form-input>
            </app-grid-item>
            <app-grid-item width=12 slot="field">
              <form-textarea value="{{member.bioMarkdown}}" label="Bio" auto-readonly></form-textarea>
            </app-grid-item>
          </app-form>
          <form-edit-controls id="editControlsBasic" object="{{member}}" errors="{{errors}}" fields='["firstName","lastName","position","memberSince","bioMarkdown"]'  editing="{{_editingBasic}}" on-save="_saveData" ></form-edit-controls>

          <h4>Group and Permissions</h4>
          <p>Select this member's group. The member's role and permissions are based on the selected group.</p>
          <app-form disabled$="[[_andNot(editing,_editingGroup)]]">
            <app-grid-item width=6 slot="field">
              <vaadin-combo-box label="Group" items="[[groups]]" item-value-path="_id" item-label-path="name" value="{{member.group}}" required invalid$="[[errors.group]]" error-message$="[[errors.group]]" selected-item="{{_selectedGroup}}" auto-readonly></vaadin-combo-box>
            </app-grid-item>
            <app-grid-item width=6 slot="field"></app-grid-item>
          </app-form>
          <form-group-permissions readonly permissions="[[_selectedGroup.permissions]]"></form-group-permissions>
          <form-edit-controls id="editControlsGroup" object="{{member}}" errors="{{errors}}" fields='["group"]' editing="{{_editingGroup}}" on-save="_saveData"></form-edit-controls>
        </div>
      </app-container>
    `;
  }

  static get properties() {
    return {
      member: { type: Object, value: { }},
      groups: { type: Array, value: [ ]},
      errors: { type: Object, value: { }},
      editing: { type: Boolean, value: false },
      _editingBasic: { type: Boolean, value: false },
      _editingGroup: { type: Boolean, value: false },
      _selectedGroup: { type: Object, observer: "_selectedGroupChanged" }
    }
  }

  _selectedGroupChanged(group) {
    console.log(group)
  }

  _saveData(e) {
    var member = e.detail;
    this._put(`/members/${this.member._id}`, member)
    .then((member) => {
      this._showToast("Member info updated")
      this.$.editControlsBasic.done();
    })
    .catch(() => {
      this.$.editControlsBasic.fail();
    })
  }

  _finishLoading() {
    this.$.formToFocus.focus();
    this.set("errors", { })
    this.set("_editingBasic", false)
  }

  onload(path) {
    return new Promise((resolve, reject) => {
      if (path.length == 0) {
        return reject("Invalid user id")
      }

      //get allowed groups
      this._get(`/groups`)
      .then((groups) => {
        this.set("groups", groups)

        if (path[0] === "create") {
          this.set("editing", false)
          this.set("member", { })
          this._finishLoading();
          return resolve({ page: "Create Member" });
        }
        var id = path[0];

        this._get(`/members/${id}`)
        .then((member) => {
          this.set("editing", true)
          member.group = member.group._id;
          this.set("member", member)
          this._finishLoading();
          resolve({ page: member.firstName + " " + member.lastName });
        })
        .catch(reject)
      })
      .catch(reject)
    })
  }
}

window.customElements.define('page-member-user', PageMemberUser);
