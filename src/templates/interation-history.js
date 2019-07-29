import { addEventClickToElement, addEventShowHideHeader } from "../javascripts/lib/helpers";
import { triggerOpenPopupFilter, triggerOpenPopupCreate, openCreateTicket } from "./modal/popup";

export function renderInterationHistory() {
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
                        <li>
                            <div><i class="fab fa-facebook-square"></i></div>
                            <a target='_blank' href='javascript:void(0)' >Liêm Nguyễn send message from Facebook</a>
                            <i class="fas fa-plus pointer"></i>
                            <p>20 minutes ago ∙ please send me quotation for Toyota...</p>
                             
                        </li>
                        <li>
                            <div><i class="fas fa-phone"></i></div>
                            <a href="#">Missed call from Liêm Nguyễn</a>
                            <i class="fas fa-plus pointer"></i>
                            <p>Yester day</p>

                        </li>
                        <li>
                            <div><i class="fas fa-shoe-prints"></i></div>
                            <a href="#">Salesman changed status for Liêm Nguyễn</a>
                            <i class="fas fa-plus pointer"></i>
                            <p>Yester day ∙ From Prospect to Considering</p>
                        </li>
                         <li>
                            <div><i class="fas fa-phone"></i></div>
                            <a href="#">Called Liêm Nguyễn</a>
                            <i class="fas fa-plus pointer"></i>
                            <p>2 days ago ∙ 30 sec <a href='#'>play now</a></p>
                        </li>
                        <li>
                            <div><i class="fas fa-phone"></i></div>
                            <a href="#">Liêm Nguyễn Called</a>
                            <i class="fas fa-plus pointer"></i>
                            <p>5 days ago ∙ 23 sec <a href='#'>play now</a></p>
                        </li>
                         <li>
                            <div><i class="fas fa-comment-dots"></i></div>
                            <a href="#">Liêm Nguyễn comment on your post</a>
                            <i class="fas fa-plus pointer"></i>
                            <p>5 days ago ∙ Google service</p>
                        </li>
                         <li>
                            <div><i class="fas fa-qrcode"></i></div>
                            <a href="#">Liêm Nguyễn scanned Promotion Qrcode</a>
                            <i class="fas fa-plus pointer"></i>
                            <p>5 days ago</p>
                        </li>
                         <li>
                            <div><i class="fas fa-wifi"></i></div>
                            <a href="#">Liêm Nguyễn connected wifi</a>
                            <i class="fas fa-plus pointer"></i>
                            <p>5 days ago</p>
                        </li>
                         <li>
                            <div><i class="fas fa-sms"></i></div>
                            <a href="#">Send SMS To Liêm Nguyễn</a>
                            <i class="fas fa-plus pointer"></i>
                            <p>5 days ago ∙ Hi Mr.Liem, thanks for your...</p>
                        </li>
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
export function initInteractionHistoryFunction(_client) {
  addEventClickToElement('#openTypeFilter', (e) => { triggerOpenPopupFilter(e, true, _client) });
  addEventClickToElement('ul.timeline i.fa-plus', openCreateTicket.bind(_client));
  addEventShowHideHeader('.interaction_history', _client);
}