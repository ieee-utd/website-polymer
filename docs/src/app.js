import{PolymerElement,html}from"../node_modules/@polymer/polymer/polymer-element.js";import"../node_modules/@polymer/app-layout/app-drawer/app-drawer.js";import"../node_modules/@polymer/app-layout/app-header/app-header.js";import"../node_modules/@polymer/app-layout/app-scroll-effects/effects/waterfall.js";import"../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js";import"../node_modules/@polymer/app-route/app-route.js";import"../node_modules/@polymer/app-route/app-location.js";import"../node_modules/@polymer/iron-icons/iron-icons.js";import"../node_modules/@polymer/iron-selector/iron-selector.js";import"../node_modules/@polymer/iron-pages/iron-pages.js";import"../node_modules/@polymer/paper-icon-button/paper-icon-button.js";import"./home.js";import"./officers.js";import"./committees.js";import"./tutoring.js";import"./notfound.js";class PolymerApp extends PolymerElement{static get properties(){return{scroll:{type:Boolean,value:!0},view:String,page:String,routeData:Object,subRoute:Object}}static get observers(){return["_viewChanged(routeData.view)"]}connectedCallback(){super.connectedCallback();var scroll=this.scroll,observer=new MutationObserver(function(mutations){mutations.forEach(function(mutation){if("attributes"===mutation.type){if(scroll){disableScroll();scroll=!1}else{enableScroll();scroll=!0}}})}),targetNode=document.body;observer.observe(targetNode,{attributes:!0})}_viewChanged(view){this.view=view||"home";if(""!==view&&"home"!==view&&"officers"!==view&&"committees"!==view&&"tutoring"!==view){this.page="404";document.title="IEEE UTD | 404"}else{this.page=view.charAt(0).toUpperCase()+view.slice(1)||"Home";if("home"==this.view){document.title="IEEE UTD - The Student Chapter of IEEE at UTD"}else{document.title="IEEE UTD | "+this.page}}if(!this.$.drawer.persistent){this.$.drawer.close()}}_menuAction(){this.$.drawer.open()}static get template(){return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: #000;
          display: block;
        }
        .drawer-title {
          margin-left: 10px;
        }
        .drawer-list {
          margin: 0 20px;
        }
        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
          outline: none;
        }
        .drawer-list a.iron-selected {
          color: #000;
          font-weight: bold;
        }
        .spacer {
          height: 1em;
        }
        app-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 48px;
          z-index: 5;
        }
        app-toolbar {
          padding-left: 5px;
          height: 48px;
          background-color: #232323;
          color: #fff;
          --app-toolbar-font-size: 18px;
          position: sticky;
        }
        div[main-title] {
          margin-left: 20px;
        }
        paper-icon-button#menuIcon {
          width: 38px;
          height: 38px;
        }
        app-drawer {
          z-index: 10;
          
          --app-drawer-content-container: {
            background-color: #f1f1f1;
          }
        }
        #main {
          width: 100%;
          padding-top: 48px;
          height: calc(100vh - 48px);
        }
      </style>

      <app-location route="{{route}}"></app-location>
      <app-route
          route="{{route}}"
          pattern="/:view"
          data="{{routeData}}"
          tail="{{subroute}}">
      </app-route>
      
      <app-drawer id="drawer" swipe-open>
        <app-toolbar><div class="drawer-title">Menu</div></app-toolbar>
        <iron-selector
            selected="[[view]]" 
            attr-for-selected="name"
            class="drawer-list" 
            role="navigation">
          <a name="home" href="/home">Home</a>
          <a name="officers" href="/officers">Officers</a>
          <a name="committees" href="/committees">Committees</a>
          <a name="tutoring" href="/tutoring">Tutoring</a>
          <div class="spacer"></div>
          <a name="join" href="https://goo.gl/forms/27VNzLklSdBmFqgF3" target="_blank">Join Us!</a>
          <a name="contact" href="mailto:contact@ieeeutd.org">Contact Us!</a>
        </iron-selector>
      </app-drawer>
      <app-header slot="header" condenses reveals effects="waterfall">
        <app-toolbar>
          <paper-icon-button id="menuIcon" icon="menu" on-tap="_menuAction"></paper-icon-button>
          <div main-title><b>IEEE UTD</b> &mdash; [[page]]</div>
        </app-toolbar>    
      </app-header>

      <iron-pages
          id="main"
          selected="[[view]]" 
          attr-for-selected="name"
          fallback-selection="404">
        <page-home name="home"></page-home>
        <page-committees name="committees"></page-committees>
        <page-officers name="officers"></page-officers>
        <page-tutoring name="tutoring"></page-tutoring>
        <page-notfound name="404"></page-notfound>
      </iron-pages>
    `}}var keys={37:1,38:1,39:1,40:1};function preventDefault(e){e=e||window.event;if(e.preventDefault)e.preventDefault();e.returnValue=!1}function preventDefaultForScrollKeys(e){if(keys[e.keyCode]){preventDefault(e);return!1}}function disableScroll(){if(window.addEventListener){window.addEventListener("DOMMouseScroll",preventDefault,!1)}window.onwheel=preventDefault;window.onmousewheel=document.onmousewheel=preventDefault;window.ontouchmove=preventDefault;window.ontouchmove=preventDefault;document.onkeydown=preventDefaultForScrollKeys}function enableScroll(){if(window.removeEventListener){window.removeEventListener("DOMMouseScroll",preventDefault,!1)}window.onmousewheel=document.onmousewheel=null;window.onwheel=null;window.ontouchmove=null;document.onkeydown=null}customElements.define("polymer-app",PolymerApp);