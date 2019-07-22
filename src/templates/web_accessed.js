function renderWebAccessed() {
    return `<div class="card">
            <h5 class="card-header">
              Customer info <i class="fas fa-chevron-down"></i>
              <div class='header-righ'>
                <i class="fas fa-plus" id='createTicket'></i>
              </div>
            </h5>
            <div class="card-body">
                <div class="container web-accessed">
                    <div class="row">
                        <div class="col-1">
                            <i class="fa fa-circle" aria-hidden="true" style='color:green'></i>
                        </div>
                        <div class="col-10 accessed-first">
                            First accessed 11 days ago at 10:26AM 23 June 2019
                        </div>
                        <div class="col-1">
                            <i class="fa fa-circle" aria-hidden="true" style='color:red'></i>
                        </div>
                        <div class="col-10 accessed-last">
                            Last accessed 4 minutes ago at 09:25PM July 2019
                        </div>
                        <br/>
                        <br/>
                        <div class="col-12">
                            <div class="c-tag c-tag--pill c-tag--lg"><span dir="ltr">Seen 10 pages</span></div>
                            <div class="c-tag c-tag--pill c-tag--lg"><span dir="ltr">Accessed 70 times</span></div>
                        </div>
                        <div class='col-12'>
                            <canvas id="myChart" width="400" height="400"></canvas>
                        </div>
                    </div>
                </div>
            </div >
          </div > `
}

export default function (args) {
    return renderWebAccessed(args);
}
