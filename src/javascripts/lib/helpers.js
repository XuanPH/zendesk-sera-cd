

export function resizeContainer(client, max = Number.POSITIVE_INFINITY, ignoreMax = false) {
  const newHeight = !ignoreMax ? Math.max(document.body.clientHeight, max) : document.body.clientHeight
  return client.invoke('resize', { height: newHeight })
}


/**
 * Helper to render a dataset using the same template function
 * @param {Array} set dataset
 * @param {Function} getTemplate function to generate template
 * @param {String} initialValue any template string prepended
 * @return {String} final template
 */
export function templatingLoop(set, getTemplate, initialValue = '') {
  return set.reduce((accumulator, item, index) => {
    return `${accumulator}${getTemplate(item, index)}`
  }, initialValue)
}

/**
 * Render template
 * @param {String} replacedNodeSelector selector of the node to be replaced
 * @param {String} htmlString new html string to be rendered
 */
export function render(replacedNodeSelector, htmlString, callback) {
  replacedNodeSelector = `.${replacedNodeSelector}`
  const fragment = document.createRange().createContextualFragment(htmlString)
  const replacedNode = document.querySelector(replacedNodeSelector)

  replacedNode.parentNode.replaceChild(fragment, replacedNode)
  callback && callback(replacedNode);
}

/**
 * Helper to escape unsafe characters in HTML, including &, <, >, ", ', `, =
 * @param {String} str String to be escaped
 * @return {String} escaped string
 */
export function escapeSpecialChars(str) {
  if (typeof str !== 'string') throw new TypeError('escapeSpecialChars function expects input in type String')

  const escape = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
    '=': '&#x3D;'
  }

  return str.replace(/[&<>"'`=]/g, function (m) { return escape[m] })
}

export function addEventClickToElement(querySelector, fn, callback) {
  var element = $(querySelector);
  if (element && element.length > 0) {
    element.each(function (index, elChild) {
      elChild.addEventListener('click', fn);
    })
  }
  callback && callback();
}

export function addEventShowHideHeader(component, client, callback) {
  var selector = document.querySelector(`${component} i.showHide`);
  if (selector) {
    selector.addEventListener('click', (e) => {
      var currentState = $(e.target).hasClass('fa-chevron-up');
      if (currentState) {
        $(selector).closest('div').find('div.card-body').hide(200);
        $(e.target).addClass('fa-chevron-down');
        $(e.target).removeClass('fa-chevron-up');
      } else {
        $(selector).closest('div').find('div.card-body').show(200);
        $(e.target).addClass('fa-chevron-up');
        $(e.target).removeClass('fa-chevron-down');
      }
      setTimeout(() => {
        resizeContainer(client, 0, true);
      }, 250);
    });
  }
}

export function renderSelect2(querySelector, defaultOption = {}) {
  setTimeout(() => {
    $(querySelector).select2(defaultOption);
  }, 200);
}

export function abbreviate_number(num, fixed) {
  if (num === null) {
    return null;
  } // terminate early
  if (num === 0) {
    return '0';
  } // terminate early
  if (typeof (num) === "string") {
    if (num.indexOf('/') > -1 || num.indexOf('-') > -1) {
      return num;
    }
    try {
      let new_num = parseFloat(num);
      if (isNaN(new_num)) {
        return num;
      }
    } catch (error) {
      return num;
    }
  } else if (typeof (num) === "object") {
    return num;
  }
  fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
  var f = '';
  if (num < 0) {
    num = Math.abs(num);
    f = '-';
  }
  if (num > 0 && num <= 9999) {
    return num
  }
  // terminate early
  var b = (num).toPrecision(2).split("e"), // get power
    k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
    c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
    d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
    e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
  return f + e;
}

export function getShortLabel(str, num) {
  //var words = str.split(' ').slice(0, num).join(' ') + '...';
  return words
}

export function goToByScroll(id) {
  // Remove "link" from the ID
  id = id.replace("link", "");
  // Scroll
  $('html,body').animate({
    scrollTop: $("#" + id).offset().top
  }, 'slow');
}

export function setLocalStorage(key, data) {
  if (data) {
    var dataS = JSON.stringify(data);
    localStorage.setItem(key, dataS);
  }
}

export function getLocalStorage(key, getAndRemove = false) {
  var data = localStorage.getItem(key);
  if (data) {
    var jdata = JSON.parse(data);
    getAndRemove && localStorage.removeItem(key);
    return jdata;
  }
  return null;
}

export function isNullOrTempty(data, replaceTrue = '', repaceFalse = '') {
  if (!data || data === '' || data === null) return repaceFalse;
  if (replaceTrue === '') return data;
  return replaceTrue;
}

export function substrByNum(str, number, defaultLastPrefix = "...") {
  if (str.length > number) {
    return `${str.substr(0, number)}${defaultLastPrefix}`
  }
  return str
}

export function renderLoading(insideContent = false, selector = '', ) {
  if (insideContent) {
    $(selector).html('');
    $(selector).html(`<div style='height: 100px;'><img class="loader" style='top: 30%;' src="spinner.gif" /></div>`);
  } else {
    return `<div style='height: 100px;'><img class="loader" style='top: 30%;' src="spinner.gif" /></div>`
  }

}