// import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

// class BasicDialog extends BaseElement {
//   static get template() {
//     return html`
//       <style include="shared-styles">
//         :host {
//           margin: 0;
//           background-color: var(--paper-grey-50);
//           min-width: 400px;
//           max-width: 600px;
//           width: auto;
//           border-radius: 8px;
//           box-shadow: none;
//         }
//         div.header {
//           @apply --layout-horizontal;
//           @apply --layout-justified;
//           @apply --layout-center;
//           padding: 15px 15px;
//           color: var(--paper-grey-900);
//           margin-top: 0;
//           padding-left: 22px;
//           height: 40px;
//         }
//         div.header[red] {
//           color: var(--paper-red-700);
//         }
//         div.header > div[main-title] {
//           font-size: 26px;
//           font-family: var(--font-head);
//           font-weight: 700;
//         }
//         div.padding {
//           font-size: 16px;
//         }
//         div.buttons {
//           @apply --layout-horizontal;
//           @apply --layout-end-justified;
//           @apply --layout-center;
//         }
//         div.buttons ::slotted(form-button) {
//           display: inline-block;
//           margin-left: 9px;
//         }
//         div.padding[progress] {
//           color: white;
//           background-color: var(--color-primary-darker);
//         }
//         div.padding[progress][red] {
//           background-color: var(--paper-red-600);
//         }
//         div.padding[progress] ::slotted(p) {
//           color: white;
//           font-style: italic;
//           margin-bottom: 0;
//           opacity: 0.7;
//         }
//         div.padding[progress] ::slotted(paper-progress) {
//           width: 100%;
//           --paper-progress-active-color: white;
//           --paper-progress-container-color: var(--color-primary-darker);
//           --paper-progress-height: 8px;
//         }
//         div.padding[progress][red] ::slotted(paper-progress) {
//           --paper-progress-container-color: var(--paper-red-600);
//         }
//         paper-dialog-scrollable {
//           max-height: calc(100vh - 136px);
//           overflow: auto;
//         }
//         div.padding.none {
//           padding-left: 0;
//           padding-right: 0;
//           padding-top: 0;
//         }
//         ::slotted([disabled]) {
//           user-select: none!important;
//           pointer-events: none!important;
//         }
//         @media (max-width: 400px) {
//           :host {
//             min-width: 100%;
//             border-radius: 0;
//             width: 100%;
//           }
//         }
//       </style>

//       <div class="header" red$="[[red]]">
//         <div main-title>[[title]]</div>
//         <paper-icon-button icon="mdi:close" hidden$="[[!closeable]]" on-tap="close"></paper-icon-button>
//       </div>
//       <paper-dialog-scrollable style="max-height: 560px;">
//         <div class="padding none" red$="[[red]]" progress$="[[progress]]">
//           <slot name="content"></slot>
//         </div>
//       </paper-dialog-scrollable>
//       <div class="padding buttons" hidden$="[[progress]]">
//         <slot name="button"></slot>
//       </div>
//     `;
//   }

//   static get properties() {
//     return {
//       entryAnimation: { type: String, value: "scale-up-animation" },
//       exitAnimation: { type: String, value: "fade-out-animation" },
//       modal: { type: Boolean, value: true },
//       title: { type: String },
//       red: { type: Boolean, value: false },
//       progress: { type: Boolean, value: false },
//       closeable: { type: Boolean, value: false }
//     }
//   }

//   behaviors: [
//     Polymer.PaperDialogBehavior,
//     Polymer.NeonAnimationRunnerBehavior
//   ],

//   listeners: {
//     'neon-animation-finish': '_onNeonAnimationFinish'
//   },

//   openModal() {
//     var body = document.querySelector('body');
//     Polymer.dom(body).appendChild(this);
//     this.open();
//   }

//   _renderOpened() {
//     this.cancelAnimation();
//     this.playAnimation('entry');
//   },

//   _renderClosed() {
//     this.cancelAnimation();
//     this.playAnimation('exit');
//   },

//   _onNeonAnimationFinish() {
//     if (this.opened) {
//       this._finishRenderOpened();
//     } else {
//       this._finishRenderClosed();
//     }
//   }
// }

// window.customElements.define('basic-dialog', BasicDialog);



// <link rel="import" href="../../lib/neon-animation/neon-animation-runner-behavior.html">
// <link rel="import" href="../../lib/paper-dialog-behavior/paper-dialog-behavior.html">
// <link rel="import" href="../../lib/paper-dialog-behavior/paper-dialog-shared-styles.html">

// <dom-module id="basic-dialog">
//   <template>
//     <style include="paper-dialog-shared-styles"></style>
//     <style include="shared-styles">
//       :host {
//         margin: 0;
//         background-color: var(--paper-grey-50);
//         min-width: 400px;
//         max-width: 600px;
//         width: auto;
//         border-radius: 8px;
//         box-shadow: none;
//       }
//       div.header {
//         @apply --layout-horizontal;
//         @apply --layout-justified;
//         @apply --layout-center;
//         padding: 15px 15px;
//         color: var(--paper-grey-900);
//         margin-top: 0;
//         padding-left: 22px;
//         height: 40px;
//       }
//       div.header[red] {
//         color: var(--paper-red-700);
//       }
//       div.header > div[main-title] {
//         font-size: 26px;
//         font-family: var(--font-head);
//         font-weight: 700;
//       }
//       div.padding {
//         font-size: 16px;
//       }
//       div.buttons {
//         @apply --layout-horizontal;
//         @apply --layout-end-justified;
//         @apply --layout-center;
//       }
//       div.buttons ::slotted(form-button) {
//         display: inline-block;
//         margin-left: 9px;
//       }
//       div.padding[progress] {
//         color: white;
//         background-color: var(--color-primary-darker);
//       }
//       div.padding[progress][red] {
//         background-color: var(--paper-red-600);
//       }
//       div.padding[progress] ::slotted(p) {
//         color: white;
//         font-style: italic;
//         margin-bottom: 0;
//         opacity: 0.7;
//       }
//       div.padding[progress] ::slotted(paper-progress) {
//         width: 100%;
//         --paper-progress-active-color: white;
//         --paper-progress-container-color: var(--color-primary-darker);
//         --paper-progress-height: 8px;
//       }
//       div.padding[progress][red] ::slotted(paper-progress) {
//         --paper-progress-container-color: var(--paper-red-600);
//       }
//       paper-dialog-scrollable {
//         max-height: calc(100vh - 136px);
//         overflow: auto;
//       }
//       div.padding.none {
//         padding-left: 0;
//         padding-right: 0;
//         padding-top: 0;
//       }
//       ::slotted([disabled]) {
//         user-select: none!important;
//         pointer-events: none!important;
//       }
//       @media (max-width: 400px) {
//         :host {
//           min-width: 100%;
//           border-radius: 0;
//           width: 100%;
//         }
//       }
//     </style>
//     <div class="header" red$="[[red]]">
//       <div main-title>[[title]]</div>
//       <paper-icon-button icon="mdi:close" hidden$="[[!closeable]]" on-tap="close"></paper-icon-button>
//     </div>
//     <paper-dialog-scrollable style="max-height: 560px;">
//       <div class="padding none" red$="[[red]]" progress$="[[progress]]">
//         <slot name="content"></slot>
//       </div>
//     </paper-dialog-scrollable>
//     <div class="padding buttons" hidden$="[[progress]]">
//       <slot name="button"></slot>
//     </div>
//   </template>
// </dom-module>

// <script>
// Polymer({
//   is: 'basic-dialog',

//   properties: {
//     entryAnimation: { type: String, value: "scale-up-animation" },
//     exitAnimation: { type: String, value: "fade-out-animation" },
//     modal: { type: Boolean, value: true },
//     title: { type: String },
//     red: { type: Boolean, value: false },
//     progress: { type: Boolean, value: false },
//     closeable: { type: Boolean, value: false }
//   },

//   behaviors: [
//     Polymer.PaperDialogBehavior,
//     Polymer.NeonAnimationRunnerBehavior
//   ],

//   listeners: {
//     'neon-animation-finish': '_onNeonAnimationFinish'
//   },

//   openModal: function() {
//     var body = document.querySelector('body');
//     Polymer.dom(body).appendChild(this);
//     this.open();
//   },

//   _renderOpened: function() {
//     this.cancelAnimation();
//     this.playAnimation('entry');
//   },

//   _renderClosed: function() {
//     this.cancelAnimation();
//     this.playAnimation('exit');
//   },

//   _onNeonAnimationFinish: function() {
//     if (this.opened) {
//       this._finishRenderOpened();
//     } else {
//       this._finishRenderClosed();
//     }
//   }
// });
// </script>
