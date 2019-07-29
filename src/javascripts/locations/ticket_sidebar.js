import App from '../modules/app'
import Modal from '../modules/modal'
import { handleBackgroundFunction } from '../modules/background_handle';
/* global ZAFClient */
var client = ZAFClient.init()

client.on('app.registered', function (appData) {
  return init(appData.context.location, client, appData);
})

client.get('instances').then(function (data) {
  var instanceGuids = Object.keys(data.instances);
  Object.keys(data.instances).forEach(function (instanceGuid) {
    if (data.instances[instanceGuid].location === 'background') {
      console.log('instances: ', data.instances[instanceGuid]);
      client.on('ticket.save', function () {
        console.log('ticket on saved instances');
        return false;
      });
    }
  });

});

client.on('instance.created', function (context) {
  if (context.location === 'ticket_sidebar') {
    console.log('instances.created: ', context);
    client.on('ticket.save', function () {
      console.log('ticket on saved instance.created');
      return false;
    });
  }

});

const init = (location, client, appData) => {
  if (location === 'modal') {
    return new Modal(client, appData)
  } else {
    return new App(client, appData, location);
  }
}