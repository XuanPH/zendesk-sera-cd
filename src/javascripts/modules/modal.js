/**
 *  Example app
 **/

import { render } from '../../javascripts/lib/helpers'
import getModalTemplate from '../../templates/model_create_ticket';


class Modal {
    constructor(client, appData) {
        this.state = {};
        this.initializePromise = this.init()
    }

    async init() {
        render('.loader', getModalTemplate());
    }
}
export default Modal