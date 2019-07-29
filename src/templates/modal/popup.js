import { addEventClickToElement, resizeContainer } from '../../javascripts/lib/helpers';
// render function
export function renderPopupCreateType() {
  return `<div class="card">
            <h5 class="card-header">
              Option
              <div class='header-righ'>
                <i class="fas fa-times pointer"></i>
              </div>
            </h5>
            <div class="card-body">
              <div class="row pointer item">
                <div class="col-12"> + Create a ticket</div>
              </div>
              <hr/>
              <div class="row pointer item">
                <div class="col-12"> + Add to interactions</div>
              </div>
            </div >
          </div > `
}

export function renderPopupFilter() {
  return `<div class="card">
            <h5 class="card-header">
              Filter
              <div class='header-righ'>
                <i class="fas fa-times pointer"></i>
              </div>
            </h5>
            <div class="card-body">
              <div class="row pointer item">
                <div class="col-10"> All interaction</div>
                <div class="col-1"><i class="fas fa-check"></i></div>
              </div>
              <hr/>
              <div class="row pointer item">
                <div class="col-10"> Changes care status</div>
                <div class="col-1"><i class="fas fa-check"></i></div>
              </div>
               <hr/>
              <div class="row pointer item">
                <div class="col-10"> Social interactions</div>
                <div class="col-1"><i class="fas fa-check"></i></div>
              </div>
               <hr/>
              <div class="row pointer item">
                <div class="col-10"> Call logs</div>
                <div class="col-1"><i class="fas fa-check"></i></div>
              </div>
               <hr/>
              <div class="row pointer item">
                <div class="col-10"> SMS</div>
                <div class="col-1"><i class="fas fa-check"></i></div>
              </div>
               <hr/>
              <div class="row pointer item">
                <div class="col-10"> Offline touched point</div>
                <div class="col-1"><i class="fas fa-check"></i></div>
              </div>
               <hr/>
              <div class="row pointer">
                <div class="col-6">
                  <button type="button" class="btn btn-secondary btn-md" id='cancel'>Cancel</button>
                </div>
                 <div class="col-6">
                  <button type="button" class="btn btn-primary btn-md" id='apply'>Apply</button>
                </div>
              </div>
            </div >
          </div > `
}

// trigger function
export function triggerOpenPopupCreate(obj, isShow, _client, defaultOffsetPlus = 30, defaultClosest = 'div.card') {
  debugger;
  var target = $(obj.target);
  var offsetTopEl = target.closest(defaultClosest)[0].offsetTop;
  if (isShow) {
    document.getElementsByClassName('popup_create')[0].style.display = "block"
    $(".popup_create .card").offset({ top: offsetTopEl + defaultOffsetPlus });
  } else {
    document.getElementsByClassName('popup_create')[0].style.display = "none"
  }
  let elHeight = (offsetTopEl + target.closest('div.card').width());
  resizeContainer(_client, elHeight, !isShow);
  console.log(offsetTopEl)
}

export function triggerOpenPopupFilter(obj, isShow, _client, offsetPSubstract = 40) {
  var offsetTopEl = $(obj.target).closest('div.card')[0].offsetTop;
  if (isShow) {
    document.getElementsByClassName('popup_filter')[0].style.display = "block"
    $(".popup_filter .card").offset({ top: offsetTopEl - offsetPSubstract });
  } else {
    document.getElementsByClassName('popup_filter')[0].style.display = "none"
  }
  let elHeight = (offsetTopEl + $(obj.target).closest('div.card').width());
  resizeContainer(_client, elHeight, !isShow);
}
// init function
export function initPopupFilterFunction(_client) {
  addEventClickToElement('.popup_filter .fa-times,#cancel', (e) => { triggerOpenPopupFilter(e, false, _client) });
  addEventClickToElement('.popup_filter .item', (e) => { triggerOpenPopupFilter(e, false, _client); });
}

export function initPopupCreateFunction(_client) {
  addEventClickToElement('.popup_create .fa-times', (e) => { triggerOpenPopupCreate(e, false, _client); });
  addEventClickToElement('.popup_create .item:first-child', openCreateTicket.bind(_client))
}


export function openCreateTicket() {
  let _client = this;
  return _client.invoke('instances.create', {
    location: 'modal',
    url: 'assets/iframe.html',
    size: {
      width: '1024px',
      height: '450px'
    }
  }).then(function (modalContext) {
    var instanceGuid = modalContext['instances.create'][0].instanceGuid;
    var modalClient = _client.instance(instanceGuid);
    setTimeout(() => {
      document.querySelector('.popup_create .fa-times').click();
      var passParams = { type: 'create_ticket', parentGuid: _client._instanceGuid };
      modalClient.trigger('template_getting_type', passParams);
    }, 500);
  });
}