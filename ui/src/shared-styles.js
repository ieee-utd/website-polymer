import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      :host {
        --color-primary: #C75B12;
        --color-background: #212121;
        --color-secondary: #424242;
        --color-secondary-active: #666666;

        --font-head: "Rubik";
        --font-main: "Roboto";
      }

      h1, h2, h3, h4, h5, h6 {
        font-weight: 700;
        font-family: var(--font-head);
      }
      p {
        font-family: var(--font-main);
      }
      [hidden] {
        display: none!important;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
