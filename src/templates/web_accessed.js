import { addEventClickToElement, addEventShowHideHeader } from '../javascripts/lib/helpers';
import { triggerOpenPopupCreate } from './modal/popup';
window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};
export function renderWebAccessed(leads) {
    return `<div class="card web_access">
            <h5 class="card-header">
              <i class="fas fa-chevron-up showHide pointers"></i> Web accessed
              <div class='header-righ'>
                <i class="fas fa-plus pointer" id='openTypeCreate4'></i>
              </div>
            </h5>
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col-1">
                            <i class="fa fa-circle" aria-hidden="true" style='color:green'></i>
                        </div>
                        <div class="col-10 accessed-first">
                            <b>First accessed</b><br/>
                            ${moment(leads.first_web_access_time).fromNow()} <span class='time-gray'>at ${moment(leads.first_web_access_time).format('hh:mm A DD MMMM YYYY')}</span>
                        </div>
                        <div class="col-1">
                            <i class="fa fa-circle" aria-hidden="true" style='color:red'></i>
                        </div>
                        <div class="col-10 accessed-last">
                             <b>Last accessed</b><br/>
                             ${moment(leads.last_web_access_time).fromNow()} <span class='time-gray'>at ${moment(leads.last_web_access_time).format('hh:mm A DD MMMM YYYY')}</span>
                        </div>
                        <div class="col-1"></div>
                        <div class="col-10 marginTop8">
                            <a href='#' id='viewDetail'>View detailed log accessed <i class="fas fa-long-arrow-alt-right"></i></a>
                        </div>
                        <div class="col-1"></div>
                        <div class="col-11 marginTop8">
                            <div class="c-tag"><span dir="ltr">Seen 10 pages</span></div>
                            <div class="c-tag"><span dir="ltr">Accessed 70 times</span></div>
                        </div>
                        <div class="col-8 marginTop15 gray13">#Total visits 3 days ago </div>
                        <div class="col-4 marginTop15"> <a href='#'>View more <i class="fas fa-long-arrow-alt-right"></i></a> </div>
                        <div class='col-12 marginTop8'>
                            <canvas id="visitChart" width="400" height="200"></canvas>
                        </div>
                         <div class="col-8 marginTop15 gray13">#Accessed/page 3 days ago </div>
                        <div class="col-4 marginTop15"> <a href='#'>View more <i class="fas fa-long-arrow-alt-right"></i></a> </div>
                        <div class='col-12 marginTop8'>
                            <canvas id="pageViewChart" width="400" height="200"></canvas>
                        </div>
                    </div>
                </div>
            </div >
          </div > `
}

export function initChartVisitChart() {
    Chart.defaults.global.defaultFontColor = '#000000';
    Chart.defaults.global.defaultFontFamily = 'Arial';
    var visitChart = document.getElementById("visitChart");
    var myChart = new Chart(visitChart, {
        type: 'line',
        data: {
            labels: ["27 June", "29 June", "01 July", "03 July"],
            datasets: [
                {
                    label: '#Visit times',
                    data: [80, 30, 63, 20],
                    backgroundColor: window.chartColors.blue,
                    borderColor: window.chartColors.blue,
                    fill: false,
                    borderWidth: 3,
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    //display: true,
                    ticks: {
                        display: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: '#Visit'
                    }
                }]
            },
            legend: {
                display: false,
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        return tooltipItem[0].label
                    },
                    label: function (tooltipItem, data) {
                        return [`#Visit: ${tooltipItem.yLabel} times`, `#View 3 pages`]
                    },
                }
            }
        }
    });
};

export function initChartPageView() {
    Chart.defaults.global.defaultFontColor = '#000000';
    Chart.defaults.global.defaultFontFamily = 'Arial';
    var pageViewChart = document.getElementById("pageViewChart");
    var myChart = new Chart(pageViewChart, {
        type: 'horizontalBar',
        data: {
            labels: ["anycar.vn/ford/ranger-n..", "anycar.vn/need-to-sell-card", "anycar.vn/contact-us", "anycar.vn/showroom-hanoi", "anycar.vn"],
            datasets: [
                {
                    label: '#Page view',
                    data: [10, 8, 5, 4, 3],
                    backgroundColor: window.chartColors.yellow,
                    borderColor: window.chartColors.yellow,
                    borderWidth: 3,
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        display: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Page name'
                    }
                }],
                xAxes: [{
                    ticks: {
                        display: false
                    }
                }],
            },
            legend: { display: false },
            maintainAspectRatio: false,
            tooltips: {
                callbacks: {
                    title: function (tooltipItems, data) {
                        var idx = tooltipItems[0].index;
                        var title = data.labels[idx];
                        // return `${title}: ${(tooltipItems[0].xLabel, 2)}`
                        return title
                    },
                    label: function (tooltipItem, data) {
                        return '';
                    },
                }
            },
            plugins: {
                datalabels: {
                    align: 'end',
                    clamp: true,
                    clip: true,
                    anchor: 'start',
                    display: 'auto',
                    textAlign: 'end',
                    color: "#000",
                    // padding: {
                    //     top: -20,
                    //     bottom: 0,
                    // },
                    font: function (context) {
                        var w = context.chart.width;
                        return {
                            size: w < 512 ? 12 : 14
                        }
                    },
                    formatter: function (value, context) {
                        //return value
                        return context.chart.data.labels[context.dataIndex] + `(${value})`;
                    }
                }
            }
        }
    });
};

export function initWebAccessedFunction() {
    addEventClickToElement('#openTypeCreate4', (e) => { triggerOpenPopupCreate(e, true, this._client) });
    addEventClickToElement('#viewDetail', openAccessLog.bind(this))
    addEventShowHideHeader('.web_access', this._client);
    initChartPageView();
    initChartVisitChart();
}

export function openAccessLog() {
    let _client = this._client;
    let o2oApi = this.o2oApi;
    return _client.invoke('instances.create', {
        location: 'modal',
        url: 'assets/iframe.html',
        size: {
            width: '520px',
            height: '600px'
        }
    }).then(function (modalContext) {
        var instanceGuid = modalContext['instances.create'][0].instanceGuid;
        var modalClient = _client.instance(instanceGuid);
        setTimeout(() => {
            var passParams = { type: 'web_access_log', parentGuid: _client._instanceGuid, o2oApi: o2oApi };
            modalClient.trigger('template_getting_type', passParams);
        }, 500);
    });
}
