/**
 *  Example app
 **/

import I18n from '../../javascripts/lib/i18n'
import { resizeContainer, render } from '../../javascripts/lib/helpers'
import getCustomerInfoTemplate from '../../templates/customer_info';
import getWebAccessed from '../../templates/web_accessed';
import Chart from 'chart.js';

const MAX_HEIGHT = 5000
const API_ENDPOINTS = {
  organizations: '/api/v2/organizations.json'
}

class App {
  constructor(client, appData) {
    this._client = client
    this._appData = appData

    this.states = {}

    // this.initializePromise is only used in testing
    // indicate app initilization(including all async operations) is complete
    this.initializePromise = this.init()
  }

  /**
   * Initialize module, render main template
   */
  async init() {
    const currentUser = (await this._client.get('currentUser')).currentUser
    this.states.currentUserName = currentUser.name

    I18n.loadTranslations(currentUser.locale)

    const organizations = await this._client
      .request(API_ENDPOINTS.organizations)
      .catch(this._handleError.bind(this))

    const ticketInfo = (await this._client.get('ticket'));
    // const assignedInfo = (await this._client.get('user'))
    if (ticketInfo) {
      render('.loader', getCustomerInfoTemplate(ticketInfo), () => {
        document.getElementById('createTicket').addEventListener('click', this._openModal.bind(this));
      });
      render('.webaccess', getWebAccessed(ticketInfo), () => {
        this._initChart();
      });
      return resizeContainer(this._client, MAX_HEIGHT, true)
    }
  }

  /**
   * Handle error
   * @param {Object} error error object
   */
  _handleError(error) {
    console.log('An error is handled here: ', error.message)
  }


  _openModal() {
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

  _initChart() {
    Chart.defaults.global.defaultFontColor = '#000000';
    Chart.defaults.global.defaultFontFamily = 'Arial';
    var lineChart = document.getElementById("myChart");
    var myChart = new Chart(lineChart, {
      type: 'line',
      data: {
        labels: ["27 June", "29 June", "01 July", "03 July"],
        datasets: [
          {
            label: '#Visit times',
            data: [80, 30, 63, 20],
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 128, 128, 0.7)',
            borderWidth: 3,
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              display: false
            }
          }]
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            filter: function (item, chart) {
              // Logic to remove a particular legend item goes here
              return item.text == null || !item.text.includes('label to remove');
            }
          }
        }
      }
    });
  };
}

export default App
