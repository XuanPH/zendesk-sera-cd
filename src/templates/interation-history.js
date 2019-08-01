import { addEventClickToElement, addEventShowHideHeader, templatingLoop, setLocalStorage } from "../javascripts/lib/helpers";
import { triggerOpenPopupFilter, triggerOpenPopupCreate, openCreateTicket } from "./modal/popup";

function interactionItem(data) {
  return ` <li>
              <div><i class="${data.icon}"></i></div>
              <a target='_blank' href='javascript:void(0)' >${data.title}</a>
              <i class="fas fa-plus pointer" data-ticket_subject='${data.title}'></i>
              <p>${data.time} ${data.perfix} ${data.note}</p>
            </li>`
}

export function renderInterationHistory() {
  var data = this.o2oApi.getInteractionHistory();
  return `<div class="card interaction_history">
            <h5 class="card-header">
              <i class="fas fa-chevron-up showHide pointer"></i> Interaction history
              <div class='header-righ'>
                <i class="fas fa-filter pointer" id='openTypeFilter'></i>
              </div>
            </h5>
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <ul class="timeline">
                        ${templatingLoop(data, interactionItem)}
                    </ul>
                    <div class='col-2'>
                    </div>
                    <div class='col-10'>
                      <a href='#'>Load more <i class="fas fa-long-arrow-alt-right"></i></a>
                    </div>
                </div >
              </div >
            </div >
          </div > `
}
export function initInteractionHistoryFunction(_client, data) {
  addEventClickToElement('#openTypeFilter', (e) => { triggerOpenPopupFilter(e, true, _client) });
  addEventClickToElement('ul.timeline i.fa-plus', (e) => {
    var subject = $(e.target).data().ticket_subject || 'unknown subject';
    data.subject = subject;
    setLocalStorage('requester', data);
    _client.invoke('routeTo', 'ticket', 'new');
  });
  addEventShowHideHeader('.interaction_history', _client);
}