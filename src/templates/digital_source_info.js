import { addEventClickToElement, addEventShowHideHeader } from "../javascripts/lib/helpers";
import { triggerOpenPopupCreate } from "./modal/popup";

export function renderDSI(data) {
  let requester = data;
  requester.phone = _.filter(data.identities, (o) => { return o.type === 'phone_number' })[0];
  return `<div class="card digital_source_info">
            <h5 class="card-header">
              <i class="fas fa-chevron-up showHide pointer"></i> Digital source info
              <div class='header-righ'>
                <i class="fas fa-plus pointer" id='openTypeCreate3'></i>
              </div>
            </h5>
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <b>Conversion (Goals hit)</b> </br>
                    <div class="c-tag c-tag--red"><span dir="ltr">Click call button</span></div>
                    <div class="c-tag c-tag--red"><span dir="ltr">Call in</span></div>
                    <div class="c-tag c-tag--red"><span dir="ltr">Visited showroom</span></div>
                  </div>
                  <div class="col-12">
                    <b>Source / Medium</b> </br>
                    <div class="c-tag"><span dir="ltr">Google Search / CPC</span></div>
                    <div class="c-tag"><span dir="ltr">SEM / Click</span></div>
                    <div class="c-tag"><span dir="ltr">(direct) / (none)</span></div>
                  </div>
                  <div class="col-12">
                    <b>Campaign name</b> </br>
                    <div class="c-tag"><span dir="ltr">User Car June 2019</span></div>
                    <div class="c-tag"><span dir="ltr">Toyota Camry</span></div>
                    <div class="c-tag"><span dir="ltr">(not set)</span></div>
                  </div>
                  <div class="col-12">
                    <label><b>Keyword and terms</b> </br>
                    <div class="c-tag"><span dir="ltr">camry 2019 HCM</span></div>
                    <div class="c-tag"><span dir="ltr">price used car camry 2.0 2018</span></div>
                  </div>
                </div >
              </div >
            </div >
          </div > `
}
export function initDSIFunction(_client) {
  addEventClickToElement('#openTypeCreate3', (e) => { triggerOpenPopupCreate(e, true, _client) });
  addEventShowHideHeader('.digital_source_info', _client);
}