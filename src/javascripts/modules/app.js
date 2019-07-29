import I18n from '../../javascripts/lib/i18n'
import { resizeContainer, render } from '../../javascripts/lib/helpers'
import { renderCustomerInfo, openModalType, initCustomerInfoFunction } from '../../templates/customer_info';
import { renderWebAccessed, initWebAccessedFunction } from '../../templates/web_accessed';
import { renderCustomerCareInfo, initCustomerCreateInfoFunction } from '../../templates/customer_care_info'
import { renderDSI, initDSIFunction } from '../../templates/digital_source_info'
import { renderPopupCreateType, renderPopupFilter, initPopupFilterFunction, initPopupCreateFunction } from '../../templates/modal/popup'
import { renderInterationHistory, initInteractionHistoryFunction } from '../../templates/interation-history'
import { renderNotFound, initNotFoundFunction } from '../../templates/not_found';
const MAX_HEIGHT = 5000
const API_ENDPOINTS = {
  organizations: '/api/v2/organizations.json'
}

class App {
  constructor(client, appData, location) {
    this._client = client
    this._appData = appData
    this.o2oToken = appData.metadata.settings["O2O-Token"]
    this.states = {
      location: location
    }
    this.initializePromise = this.init()
    this.initWebAccessedFunction = initWebAccessedFunction.bind(this);
    this._handleDataUserTicket = this._handleDataUserTicket.bind(this);
  }
  /**
   * Initialize module, render main template
   */
  async init() {
    const currentUser = (await this._client.get('currentUser')).currentUser
    this.states.currentUserName = currentUser.name
    I18n.loadTranslations(currentUser.locale);

    const organizations = await this._client
      .request(API_ENDPOINTS.organizations)
      .catch(this._handleError.bind(this))


    this._client.on('ticket.save', function () {
      console.log('ticket on saved');
      return false;
    });



    const dataUser = await this._handleDataUserTicket();
    const isMaintain = true;
    // const assignedInfo = (await this._client.get('user'))
    if (dataUser && this.o2oToken && !isMaintain) {
      render('loader', renderCustomerInfo(dataUser), () => {
        // document.getElementById('openTypeCreate1').addEventListener('click', openModalType.bind(this));
        initCustomerInfoFunction(this._client);
      });

      render('customer_care_info', renderCustomerCareInfo(dataUser), () => {
        initCustomerCreateInfoFunction(this._client);
      });

      render('digital_source_info', renderDSI(dataUser), () => {
        initDSIFunction(this._client);
      });

      render('web_access', renderWebAccessed(dataUser), () => {
        this.initWebAccessedFunction();
      });

      render('interaction_history', renderInterationHistory(), () => {
        initInteractionHistoryFunction(this._client);
      });

      render('popup_create .popup_content', renderPopupCreateType(), () => {
        initPopupCreateFunction(this._client);
      });

      render('popup_filter .popup_content', renderPopupFilter(), () => {
        initPopupFilterFunction(this._client);
      });

      return resizeContainer(this._client, MAX_HEIGHT, true)
    } else {
      render('loader', renderNotFound(), () => {
        initNotFoundFunction();
      });
    }
  }

  /**
   * Handle error
   * @param {Object} error error object
   */
  _handleError(error) {
    console.log('An error is handled here: ', error.message)
  }

  async _handleDataUserTicket() {
    switch (this.states.location) {
      case 'ticket_sidebar': return (await this._client.get('ticket')).ticket.requester; break; //ticket location
      case 'user_sidebar': return (await this._client.get('user')).user; break; //ticket location
    }
  }
}

export default App
