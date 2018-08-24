import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      :host {
        --color-primary: #C75B12;
        --color-primary-blue: #0072A6;
        --color-orange-complement: #E88F0C;
        --color-background: var(--paper-grey-900);
        --color-secondary: var(--paper-grey-800);
        --color-secondary-active: var(--paper-grey-700);
        --color-accent: #f2be32;

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
