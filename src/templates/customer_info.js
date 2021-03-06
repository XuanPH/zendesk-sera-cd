import { addEventClickToElement, addEventShowHideHeader, setLocalStorage, isNullOrTempty } from '../javascripts/lib/helpers'
import { triggerOpenPopupCreate } from './modal/popup'

export function renderCustomerInfo(leads) {
  return `<div class="card customer-info">
            <h5 class="card-header">
              <i class="fas fa-chevron-up showHide pointer"></i>  Customer info
              <div class='header-righ'>
                <i class="fas fa-pen pointer"></i>
                <i class="fas fa-plus pointer" data-ticket_subject='add customer info' id='openTypeCreate1'></i>
              </div>
            </h5>
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <div class="col-4">
                    <img src="https://assets.zendesk.com/images/2016/default-avatar-80.png" alt="Avatar" class="avatar">
                  </div>
                  <div class="col-8">
                    <span class="info-name">${leads.name}</span><br/>
                    ${isNullOrTempty(leads.email, `<span style="color: cornflowerblue;">${leads.email}</span>`, '<span><i>(Email not avaialbe)</i></span>')}<br/>
                    <span style="color: cornflowerblue;">
                      ${isNullOrTempty(leads.phone, (leads.phone + `&nbsp;&nbsp;<a href='tel:${leads.phone}'>
                        <i class="fas fa-phone-volume"></i></a>&nbsp;&nbsp;<a href='tel:${leads.phone}'>
                        <i class="fas fa-comment-dots" ></i></a>`), '')}
                      </span>
                  </div >
                </div >
              </div >
            </div >
          </div > `
}


export function initCustomerInfoFunction(_client, data) {
  addEventClickToElement('#openTypeCreate1', (e) => {
    var subject = $(e.target).data().ticket_subject || 'unknown subject';
    data.subject = subject;
    setLocalStorage('requester', data);
    _client.invoke('routeTo', 'ticket', 'new');
    // triggerOpenPopupCreate(e, true, _client)
  });
  addEventShowHideHeader('.customer-info', _client);
}