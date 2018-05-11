define(["https://cdnjs.cloudflare.com/ajax/libs/tabletop.js/1.5.1/tabletop.min.js","../node_modules/@polymer/polymer/polymer-element.js","../node_modules/@polymer/polymer/lib/elements/dom-if.js","../node_modules/@polymer/polymer/lib/elements/dom-repeat.js","../node_modules/@polymer/iron-pages/iron-pages.js","../node_modules/@polymer/paper-tabs/paper-tabs.js","./components/footer.js"],function(_tabletopMin,_polymerElement){"use strict";class CommitteesPage extends _polymerElement.PolymerElement{static get properties(){return{loading:{type:Boolean,value:!0},committees:{type:Array,value:[]}}}constructor(){super()}connectedCallback(){super.connectedCallback();Tabletop.init({key:"https://docs.google.com/spreadsheets/d/18k69-NZcpUhzbuw0OVTmYuCDFZxnfSK8l-rSgYNBzAQ/pubhtml",callback:data=>{this.committees=data;this.selected=0;this.loading=!1},simpleSheet:!0})}static get template(){return _polymerElement.html`
      <style>
        :host {
          display: block;
          --paper-tab-ink: #232323;
        }
        .container {
          min-height: calc(100vh - 48px);
          display: flex;
          flex-direction: column;
        }
        .body {
          flex-grow: 1;
          min-height: 350px;
          justify-content: center;
          background: #f7f7f7;
          display: flex;
        }
        .inner {
          margin: 10px 24px;
          width: 1200px;
        }
        h1 {
          margin: 10px 18px;
          color: #212121;
          font-size: 32px;
        }
        a {
          color: #3488ff;
          text-decoration: none;
          border-bottom: 1px #3488ff dotted;
        }
        paper-tabs {
          margin-top: 5px;
          font-family: 'Roboto', 'Noto', sans-serif;
          --paper-tabs-selection-bar-color: #ffffff;
          width: 100%;
          color: #ffffff;
          background: #5a5a5a;
          text-transform: uppercase;
          margin-bottom: 1px;
        }
        paper-tab.iron-selected {
          font-weight: 800;
        }
        iron-pages {
          width: calc(100% - 20px);
          min-height: 300px;
          background: #e1e1e1;
          padding: 10px;
        }
        .committee-container {
          margin: 0 48px;
        }
        .committee-container > p {
          margin-top: 0;
        }

        @media only screen and (max-width: 400px) {
          .inner {
            width: calc(100% - 48px);
          }
          .committee-container {
            margin: 0;
            font-size: 14px;
          }
        } 
      </style>

      <div class="container">
        <div class="body">
          <div class="inner">
            <h1>Committees</h1>
            <p>If you want to join a committee, fill out this <a href="#" target="_blank">form</a>.</p>
            
            <paper-tabs scrollable selected="{{selected}}">
              <dom-repeat items="[[committees]]">
                <template>
                  <paper-tab>[[item.name]]</paper-tab>
                </template>
              </dom-repeat>
            </paper-tabs>
            <iron-pages selected="{{selected}}">
              <template is="dom-if" if="[[loading]]">
                Loading...
              </template>
              <dom-repeat items="[[committees]]">
                <template>
                  <!-- TODO: inner-h-t-m-l is terrible; find something better -->
                  <div class="committee-container" inner-h-t-m-l="[[item.about]]"></div>
                </template>
              </dom-repeat>
            </iron-pages>
          
          </div>
        </div>
        <app-footer></app-footer>
      </div>
    `}}customElements.define("page-committees",CommitteesPage)});