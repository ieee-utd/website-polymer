define(["../../node_modules/@polymer/polymer/polymer-element.js","../../node_modules/@polymer/iron-image/iron-image.js"],function(_polymerElement){"use strict";class Banner extends _polymerElement.PolymerElement{static get properties(){return{}}constructor(){super()}ready(){super.ready()}static get template(){return _polymerElement.html`
      <style>
        .container {
          height: 400px;
        }
        .banner-img-l {
          position: absolute;
          top: 0;
          left: 0;
          padding-top: 64px;
          width: 100%;
          height: 400px;
          background-image: url(https://i.imgur.com/LhRuGiy.jpg);
          filter: blur(14px);
          z-index: -2;
          background-position: left center;
        }
        .banner-img {
          position: absolute;
          top: 0;
          padding-top: 64px;
          width: 100%;
          height: 400px;
          background-image: url(https://i.imgur.com/LhRuGiy.jpg);
          filter: blur(5px);
          z-index: -2;
          background-position: center center;
          background-repeat: no-repeat;
        }
        .banner-img-r {
          position: absolute;
          top: 0;
          right: 0;
          padding-top: 64px;
          width: 100%;
          height: 400px;
          background-image: url(https://i.imgur.com/LhRuGiy.jpg);
          filter: blur(14px);
          z-index: -3;
          background-position: right center;
        }
        .banner {
          position: absolute;
          top: 0;
          padding-top: 64px;
          width: 100%;
          height: 400px;
          z-index: -1;
          display: flex;
          background: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3));
        }
        .inner {
          flex-grow: 1;
          padding: 10px;
        }
        .title-container {
          margin-top: 50px;
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
          align-items: center;
        }
        h1#title {
          font-size: 52px;
          color: #ffffff;
          margin: 0;
          padding-left: 10px;
        }
        .desc-container {
          padding-top: 20px;
          padding-left: 5px;
          padding-right: 5px;
          text-align: center;
          display: flex;
          justify-content: center;
        }
        p {
          color: #ffffff;
          font-size: 18px;
          font-style: italic;
          max-width: 550px;
        }
        iron-image.banner-logo {
          --iron-image-width: 100px;
        }

        @media only screen and (max-width: 640px) {
          h1#title {
            font-size: 42px;
            padding-left: 10px;
          }
          iron-image.banner-logo {
            --iron-image-width: 80px;
          }
        }
      </style>

      <div class="container">
        <div class="banner-img-l"></div>
        <div class="banner-img"></div>
        <div class="banner-img-r"></div>
        <div class="banner">
          <div class="inner">
            <div class="title-container">
              <iron-image class="banner-logo" src="https://i.imgur.com/1O6ZZuV.png"></iron-image>
              <h1 id="title">IEEE UTD</h1>
            </div>
            <div class="desc-container">
              <p>We are the student branch of The Institute for Electric and Electronics Engineers (IEEE) at The University of Texas at Dallas.</p>
            </div>
          </div>    
        </div>
      </div>
    `}}customElements.define("app-banner",Banner)});