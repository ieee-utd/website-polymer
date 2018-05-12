import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';


class NotFoundPage extends PolymerElement {
  static get properties () {
    return {
      
    };
  }

  constructor() {
    super();
  }

  ready(){
    super.ready();
  }

  static get template () {
    return html`
      <style>
        
      </style>

      <div>404</div>
    `;
  }
}

customElements.define('page-notfound', NotFoundPage);