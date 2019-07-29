/**
 *  Example app
 **/

import { render, renderSelect2 } from '../../javascripts/lib/helpers'
import { webAccessedModal } from '../../templates/modal/web_access_detail'
import { ticketCreateModal, initCreateTicketFunction } from '../../templates/modal/ticket_create'
import 'select2'
class Modal {
    constructor(client, appData) {
        this.state = {};
        this.typeModal = "typeModal";
        this.handleModal = this.handleModal.bind(this);
        this._client = client;
        this._appData = appData;
        client.on('template_getting_type', (template_getting_type) => {
            this._parentClient = client.instance(template_getting_type.parentGuid);
            this.initializePromise = this.init(template_getting_type.type);
        });
    }

    async init(type) {
        let ticketInfo = (await this._parentClient.get('ticket'));
        render('loader', this.handleModal(type, ticketInfo), () => {
            if (type === 'create_ticket') {
                renderSelect2('#assignee', { templateResult: this.templateAssign });
                renderSelect2('#type, #piority');
                renderSelect2('#tags', { tags: true });
                initCreateTicketFunction(this._client);
            }
        });
    }
    handleModal(type, data) {
        switch (type) {
            case 'web_access_log': return webAccessedModal(data); break;
            case 'create_ticket': return ticketCreateModal(data, this); break;
            default: return webAccessedModal()
        }
    }
    templateAssign(state) {
        var $state = $(
            '<span><i class="fas fa-user"></i>    ' + state.text + '</span>'
        );
        return $state;
    }

}

export default Modal