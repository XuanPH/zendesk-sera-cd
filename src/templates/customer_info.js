function renderCustomerInfo(data) {
  let requester = data.ticket.requester;
  requester.phone = _.filter(data.ticket.requester.identities, (o) => { return o.type === 'phone_number' })[0];
  return `<div class="card">
            <h5 class="card-header">
              Customer info <i class="fas fa-chevron-down"></i>
              <div class='header-righ'>
                <i class="fas fa-pen"></i>
                <i class="fas fa-plus" id='createTicket'></i>
              </div>
            </h5>
            <div class="card-body">
              <div class="container customer-info">
                <div class="row">
                  <div class="col-4">
                    <img src="${requester.avatarUrl}" alt="Avatar" class="avatar">
                  </div>
                  <div class="col-8">
                    <span class="info-name">${requester.name}</span>
                    <span style="color: cornflowerblue;">${requester.email}</span></br>
                    <span style="color: cornflowerblue;">
                      ${requester.phone ? (requester.phone.value + `&nbsp;&nbsp;<a href='tel:${requester.phone.value}'>
                        <i class="fas fa-phone-volume"></i></a>&nbsp;&nbsp;<a href='tel:${requester.phone.value}'>
                        <i class="fas fa-comment-dots" ></i></a>`) : ''}</span>
                  </div >
                </div >
              </div >
            </div >
          </div > `
}

export default function (args) {
  return renderCustomerInfo(args);
}
