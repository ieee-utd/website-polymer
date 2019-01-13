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
        h4 {
          margin: 0;
        }
      </style>

      <app-container>
        <div class="padding">
          <h4>Member</h4>
        </div>
      </app-container>
    `;
  }

  static get properties() {
    return {
      member: { type: Object, value: { }},
      editing: { type: Boolean, value: false }
    }
  }

  onload(path) {
    return new Promise((resolve, reject) => {
      if (path.length == 0) {
        return reject("Invalid user id")
      }
      if (path[0] === "create") {
        this.set("editing", false)
        this.set("member", { })
        return resolve({ page: "Create Member" });
      }
      var id = path[0];
      this._get(`/members/${id}`)
      .then((member) => {
        this.set("member", member)
        resolve({ page: member.firstName + " " + member.lastName });
      })
    })
  }
}

window.customElements.define('page-member-user', PageMemberUser);
