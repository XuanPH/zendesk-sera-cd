import App from '../modules/app'
import Modal from '../modules/modal'
/* global ZAFClient */
var client = ZAFClient.init()

client.on('app.registered', function (appData) {
  return init(appData.context.location, client, appData);
})

const init = (location, client, appData) => {
  if (location === 'modal') {
    return new Modal(client, appData)
  } else {
    return new App(client, appData);
  }
}