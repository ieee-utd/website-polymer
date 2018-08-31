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
        --color-paper: #EEEEEE;

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

      /** HEADER IMAGE **/
      div.hero-image {
        margin-bottom: 16px;
      }
      div.hero-image > iron-image.bg {
        height: 300px;
        width: 100%;
        background-color: var(--color-background);
      }
      div.hero-image > div.bg-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 300px;
        background: linear-gradient(to bottom, rgba(33,33,33,1), rgba(33,33,33,0.3));
        z-index: 1;
        @apply --layout-vertical;
        @apply --layout-end-justified;
      }
      div.hero-image > div.bg-overlay > app-container {
        display: block;
        padding: 8px 32px;
        z-index: 2;
      }
      @media (max-width: 768px) {
        div.hero-image > iron-image.bg,
        div.hero-image > div.bg-overlay {
          height: 200px;
        }
      }

      app-container.content {
        padding: 16px 32px 32px 32px;
        display: block;
      }

      h1 {
        font-size: 2.4em;
        margin: 0;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
