import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>

    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
