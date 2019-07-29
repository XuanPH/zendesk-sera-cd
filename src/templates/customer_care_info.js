import { addEventClickToElement, addEventShowHideHeader } from '../javascripts/lib/helpers';
import { triggerOpenPopupCreate } from './modal/popup';
export function renderCustomerCareInfo(data) {
  let requester = data;
  requester.phone = _.filter(data.identities, (o) => { return o.type === 'phone_number' })[0];
  return `<div class="card customer_care_info">
            <h5 class="card-header">
              <i class="fas fa-chevron-up showHide pointer"></i> Customer care info
              <div class='header-righ'>
                <i class="fas fa-pen pointer"></i>
                <i class="fas fa-plus pointer" id='openTypeCreate2'></i>
              </div>
            </h5>
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <div class="col-1">
                      <i class="far fa-heart"></i>
                  </div>
                  <div class="col-10">
                      Care status <b>Opportunity</b>
                  </div>
                  <div class="col-1">
                      <i class="fas fa-user"></i>
                  </div>
                  <div class="col-10 accessed-last">
                     Salesman: <b>salesman01@quesera.sg</b>
                  </div>
                  <div class="col-1">
                      <i class="fas fa-calendar-alt"></i>
                  </div>
                  <div class="col-10 accessed-last">
                     Have appointment at <b>10:20 AM 18 June 2019</b>
                  </div>
                   <div class="col-1">
                      <i class="far fa-clipboard"></i>
                  </div>
                  <div class="col-10 accessed-last">
                     Take note: customers are very fastiditious, he...
                  </div>
                  <div class="col-1">
                  </div>
                  <div class="col-10 accessed-last">
                      <div class="c-tag"><span dir="ltr">Toyota Camry 2.5 AT</span></div>
                    <div class="c-tag"><span dir="ltr">2018</span></div>
                    <div class="c-tag"><span dir="ltr">Budget %25,000</span></div>
                    <div class="c-tag"><span dir="ltr">Buy for business</span></div>
                    <div class="c-tag"><span dir="ltr">Plan in this month</span></div>
                  </div>
                </div >
              </div >
            </div >
          </div > `
}

export function openModal() {
  let self = this;
  return self._client.invoke('instances.create', {
    location: 'modal',
    url: 'assets/iframe.html',
    size: {
      width: '800px',
      height: '300px'
    }
  }).then(function (modalContext) {
    var instanceGuid = modalContext['instances.create'][0].instanceGuid;
    self._client.instance(instanceGuid);
  });
}

export function initCustomerCreateInfoFunction(_client) {
  addEventClickToElement('#openTypeCreate2', (e) => { triggerOpenPopupCreate(e, true, _client) });
  addEventShowHideHeader('.customer_care_info', _client);
}