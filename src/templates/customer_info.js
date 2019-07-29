import { addEventClickToElement, addEventShowHideHeader } from '../javascripts/lib/helpers'
import { triggerOpenPopupCreate } from './modal/popup'

export function renderCustomerInfo(data) {
  let requester = data;
  requester.phone = _.filter(data.identities, (o) => { return o.type === 'phone_number' })[0];
  return `<div class="card customer-info">
            <h5 class="card-header">
              <i class="fas fa-chevron-up showHide pointer"></i>  Customer info
              <div class='header-righ'>
                <i class="fas fa-pen pointer"></i>
                <i class="fas fa-plus pointer" id='openTypeCreate1'></i>
              </div>
            </h5>
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <div class="col-4">
                    <img src="${requester.avatarUrl}" alt="Avatar" class="avatar">
                  </div>
                  <div class="col-8">
                    <span class="info-name">${requester.name}</span><br/>
                    <span style="color: cornflowerblue;">${requester.email}</span><br/>
                    <span style="color: cornflowerblue;">
                      ${requester.phone ? (requester.phone.value + `&nbsp;&nbsp;<a href='tel:${requester.phone.value}'>
                        <i class="fas fa-phone-volume"></i></a>&nbsp;&nbsp;<a href='tel:${requester.phone.value}'>
                        <i class="fas fa-comment-dots" ></i></a>`) : ''}</span>
                  </div >
                </div >
              </div >
            </div >
          </div > `
}



export function initCustomerInfoFunction(_client) {
  addEventClickToElement('#openTypeCreate1', (e) => { triggerOpenPopupCreate(e, true, _client) });
  addEventShowHideHeader('.customer-info', _client);
}