import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../elements/poly-hero.js';
import '../elements/poly-card.js';
import '../shared-styles.js';

class PageMain extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        .main {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          min-height: 700px;
          height: 100vh;
          background-color: #212121;
        }

        .content {
          position: absolute;
          top: 0;
          left: 0;
          margin: 64px 0;
          width: 100%;
          height: calc(100% - 128px);
          z-index: 1;
        }

        .content-inner {
          width: 100%;
          max-width: 980px;
          height: 100%;
          margin: 0 auto;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-around;
        }

        .col {
          flex-grow: 1;
          min-width: 320px;
          max-width: calc(100% / 2 - 64px);
          margin: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .no-content-link {
          color: #fff;
          font-weight: 500;
        }
      </style>

      <!-- TODO: fix background height -->
      <div class="main">
        <poly-hero></poly-hero>
        <div class="content">
          <div class="content-inner">
            <div class="col">
              <poly-card title="Announcements" button='{"name": "Subscribe", "link": "https://groups.google.com/forum/#!forum/ieee-utd-fall-2017--present/join"}' items="[]" image="/img/shrug.svg">
                <span class="no-content-message">Wanna browse <a class="no-content-link" href="[[rootPath]]announcement-archives">our archives</a> instead?</span>
              </poly-card>
            </div>
            <div class="col">
              <poly-card title="Events" button='{"name": "Add to GCal", "link": "https://calendar.google.com/calendar?cid=ZTluYjE4YTE3cWY2OThoNzJnMnRyNGVjYW9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"}' items='[]' image="/img/calendar-question.svg">
                <span class="no-content-message">Check back soon for the latest events.</span>
              </poly-card>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  ready() {
    super.ready();
    // make request
  }

  static get properties() {
    return {
      items: {
        type: Array,
        // value: [{"title": "Row 1", "time": "Jan 3, 4-6pm", "location": {"name": "Makerspace", "link": "https://www.google.com/maps/place/UTDallas+Makerspace/@32.9982837,-96.6722161,13z/data=!4m8!1m2!2m1!1sutd+makerspace!3m4!1s0x864c2206dfe20ddb:0x1906acd349077109!8m2!3d32.9935207!4d-96.7521344"}, "content": "Fixie thundercats 90's pabst etsy. Messenger bag echo park humblebrag yr, sriracha gastropub hella gentrify etsy chia forage air plant tumblr. Hot chicken blue bottle actually mlkshk disrupt copper mug kogi enamel pin. Coloring book hashtag banh mi, viral gochujang whatever post-ironic listicle meditation pinterest."}]
        // value: [{"title": "Row 1", "time": "Jan 3, 4-6pm", "location": {}, "content": "Fixie thundercats 90's pabst etsy. Messenger bag echo park humblebrag yr, sriracha gastropub hella gentrify etsy chia forage air plant tumblr. Hot chicken blue bottle actually mlkshk disrupt copper mug kogi enamel pin. Coloring book hashtag banh mi, viral gochujang whatever post-ironic listicle meditation pinterest."}]
      }
    }
  }
}

{{window.customElements.define('page-main', PageMain);
