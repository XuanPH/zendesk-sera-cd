import { getUser, getGroup } from '../../api/zen_ticket_api'
import { addEventClickToElement } from '../../javascripts/lib/helpers';
import { is } from 'tcomb';

export function ticketCreateModal(data, client) {
    getAssigneeList(client);
    let requester = data;
    requester.phone = _.filter(data.identities, (o) => { return o.type === 'phone_number' })[0];
    return `
        <div class='create_ticket'>
            <div class="row">
                <div class='col-4'>
                    <div class='row padding-20-15'>
                        <div class="col-4">
                            <img src="${requester.avatarUrl}" alt="Avatar" class="avatar">
                        </div>
                        <div class="col-8">
                            <span class="info-name">${requester.name}</span>
                            <br/>
                            <span style="color: cornflowerblue;">${requester.email}</span>
                            <br/>
                            <span style="color: cornflowerblue;">
                                    ${requester.phone ? (requester.phone.value + `&nbsp;&nbsp;<a href='tel:${requester.phone.value}'>
                                        <i class="fas fa-phone-volume"></i></a>&nbsp;&nbsp;<a href='tel:${requester.phone.value}'>
                                        <i class="fas fa-comment-dots" ></i></a>`) : ''}</span>
                        </div>
                        <div class='col-12'>
                            <p></p>
                        </div>
                        <div class='col-12'>
                            <div class="form-group">
                                <label for="assignee">Assignee*</label>
                                <select class="form-control" id="assignee">
                                    <option>Xuân Phạm</option>
                                    <option>Tâm TN</option>
                                </select>
                            </div>
                        </div>
                        <div class='col-12'>
                            <div class="form-group">
                                <label for="ccs">CCs</label>
                                 <input class="form-control" id="ccs"></input>
                            </div>
                        </div>
                        <div class='col-12'>
                            <div class="form-group">
                                <label for="tags">Tags</label>
                                <select class="form-control"  multiple="multiple" id="tags"></select>
                            </div>
                        </div>
                        <div class='col-6'>
                            <div class="form-group">
                                <label for="type">Type</label>
                                <select class="form-control" id="type">
                                    <option selected>-</option>
                                    <option>Question</option>
                                    <option>Incident</option>
                                    <option>Problem</option>
                                    <option>Task</option>
                                </select>
                            </div>
                        </div>
                        <div class='col-6'>
                            <div class="form-group">
                                <label for="piority">Priority</label>
                                <select class="form-control" id="piority">
                                    <option selected>-</option>
                                    <option>Low</option>
                                    <option>Normal</option>
                                    <option>Hight</option>
                                    <option>Urgent</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='col-8'>
                    <div class='row padding-20-15'>
                        <div class='col-12'>
                            <div class="form-group">
                                <label for="subject">Subject</label>
                                <input class="form-control" id="subject"></input>
                            </div>
                        </div>
                        <div class='col-12'>
                            <div class="form-group">
                                <label class='tab active pointer' id="public_reply">Public reply</label>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <label class='tab pointer' id="internal_note">Internal note</label>
                                <textarea class="form-control" id="content_note" rows="12"></textarea>
                            </div>
                        </div>
                        <div class='col-7'></div>
                        <div class='col-2'>
                            <button style='width: 80px;'  id='closeModal' type="button" class="btn btn-secondary">Cancel</button>
                        </div>
                        <div class='col-3'>
                            <div class='popup_submit'>
                               <ul>
                                <li class='pointer'><span class="badge new">&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;Submit as New</li>
                                <li class='pointer'><span class="badge open">&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;Submit as Open</li>
                                <li class='pointer'><span class="badge pending">&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;Submit as Pending</li>
                                <li class='pointer'><span class="badge badge-secondary">&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;Submit as Solved</li>
                               </ul>
                            </div>
                            <div class="btn-group">
                                <button type="button" class="btn btn-primary">Submit as <b>New</b></button>&nbsp;
                                <button type="button" id='extra-submit' class="btn btn-primary"><i class="fas fa-chevron-down" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `
}
async function getAssigneeList(client) {
    var user = await getGroup(client._parentClient);
    console.log(user);
}
export function initCreateTicketFunction(client) {
    addEventClickToElement('div.create_ticket label.tab', (e) => {
        var target = $(e.target);
        var textTarget = $('div.create_ticket textarea#content_note');
        $("label.tab").each((i, el) => { $(el).removeClass('active') });
        target.addClass('active');
        debugger;
        if (target[0].id === 'internal_note') {
            textTarget.addClass('active');
        } else {
            textTarget.removeClass('active');
        }
    });
    addEventClickToElement('#extra-submit', (e) => {
        let iconExtra = $("#extra-submit > i");
        let isHide = iconExtra.hasClass('fa-chevron-down');
        if (isHide) {
            $("div.popup_submit").show();
            iconExtra.removeClass('fa-chevron-down').addClass('fa-chevron-up')
        } else {
            $("div.popup_submit").hide();
            iconExtra.removeClass('fa-chevron-up').addClass('fa-chevron-down')
        }
    });
    addEventClickToElement('#closeModal', (e) => { client.invoke('destroy'); });
}