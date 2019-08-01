import { addEventClickToElement, addEventShowHideHeader, templatingLoop } from "../javascripts/lib/helpers";

export function renderDSI(leads) {
  return `<div class="card digital_source_info">
            <h5 class="card-header">
              <i class="fas fa-chevron-up showHide pointer"></i> Digital source info
            </h5>
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <b>Conversion (Goals hit)</b> </br>
                    ${leads.conversion ? templatingLoop(leads.conversion, (data) => { return `<div class="c-tag c-tag--red"><span dir="ltr">${data}</span></div>` }) : ''}
                  </div>
                  <div class="col-12">
                    <b>Source / Medium</b> </br>
                    ${leads.conversion ? templatingLoop(leads.source_medium, (data) => { return `<div class="c-tag"><span dir="ltr">${data}</span></div>` }) : ''}
                  </div>
                  <div class="col-12">
                    <b>Campaign name</b> </br>
                    ${leads.conversion ? templatingLoop(leads.campaign_name, (data) => { return `<div class="c-tag"><span dir="ltr">${data}</span></div>` }) : ''}
                  </div>
                  <div class="col-12">
                    <label><b>Keyword and terms</b> </br>
                    ${leads.conversion ? templatingLoop(leads.keywords_terms, (data) => { return `<div class="c-tag"><span dir="ltr">${data}</span></div>` }) : ''}
                  </div>
                </div >
              </div >
            </div >
          </div > `
}
export function initDSIFunction(_client) {
  addEventShowHideHeader('.digital_source_info', _client);
}