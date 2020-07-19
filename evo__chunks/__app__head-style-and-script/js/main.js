if ('serviceWorker' in navigator) {
  if (!(navigator.serviceWorker.controller)) {
    navigator.serviceWorker
      .register('/app-sw.js?v=0-0-1', {
        scope: './',
      });
  }
}
const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent);
function createTopBarIos() {
  const el = document.createElement('div');
  if (isIos) {
    el.classList.add('top-bar--ios');
    return el;
  }
  return el;
}
console.log(navigator.userAgent)
function switchActive(nodeList, activeClass) {
  [...nodeList].forEach((item) => {
    item.addEventListener('click', function () {
      [...nodeList].forEach((el) => {
        el.classList.remove(activeClass);
      });
      this.classList.add(activeClass);
    });
  });
}

function doubleFav(productInfo) {
  return itemsArray.some((el) => {
    if (el.id === productInfo.itemId) {
      return true;
    }
    return false;
  });
}

function checkMessageInbox() {
  const dotMessage = document.querySelector('.top-bar__icon-dot');
  if(userMessages.success !== false && userMessages.successData.messages.length !== 0) {
    userMessages.successData.messages.every((message) => {
      if (message.wasRead === null) {
        dotMessage.classList.remove('top-bar__icon-dot--hide');
        return false;
      }
      return true;
    });
  }

}

function openHistory() {
  renderMainPage.clearPage();
  toggleOrder.rendering();
  toggleOrder.openPage();
  toggleOrderHistoryContent.rendering();
  toggleOrderMenuContent.rendering();
  toggleOrderHitsContent.rendering();

  const elements = document.querySelectorAll('.main-page__tab-content');
  const elementsTab = document.querySelectorAll('.top-bar__tab');
  [...elements, ...elementsTab].forEach((item) => item.classList.remove('main-page__tab-content--open', 'top-bar__tab--active'));
  const element = document.querySelector('.main-page__tab-content--history');
  const elementTabHistory = document.querySelector('.top-bar__tab--history');
  element.classList.add('main-page__tab-content--open');
  elementTabHistory.classList.add('top-bar__tab--active');
}

function isEmptyObj(obj) {
  for (const key in obj) {
    return false;
  }
  return true;
}

function checkBasket() {
  const iconDot = document.querySelector('.footer__icon-dot');
  if (basketArray.length !== 0) {
    iconDot.classList.add('footer__icon-dot--show');
  } else {
    iconDot.classList.remove('footer__icon-dot--show');
  }
}

function canUseWebP() {
  const elem = document.createElement('canvas');

  if (elem.getContext && elem.getContext('2d')) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
}

function loadImg(productInfo, imgEl, expansion, timer) {
  let aspectRatio = 1;
  (() => {
    load_image_with_correct_extension_and_resolution(productInfo, imgEl, expansion, 1000, aspectRatio);
  })();
  return '';
}

function loadImgSmall(productInfo, imgEl, expansion, timer) {
  let aspectRatio = 0.9;
  (() => {
    load_image_with_correct_extension_and_resolution(productInfo, imgEl, expansion, 1000, aspectRatio);
  })();
  return '';
}


async function load_image_with_correct_extension_and_resolution(productInfo, imgEl, extension, timeOutDelay, aspectRatio) {
  /**
   * Определяем размер области под картинку
   */
  const maxImageWidth = 6000;
  let imageBlockWidth = 0;
  if (typeof window.loadImageWithCorrectExtensionAndSesolutionCacheByClass === 'undefined') {
    window.loadImageWithCorrectExtensionAndSesolutionCacheByClass = {};
  }
  let imageElementClassList = imgEl.classList.toString();
  if (typeof window.loadImageWithCorrectExtensionAndSesolutionCacheByClass[imageElementClassList] !== 'undefined') {
    imageBlockWidth = window.loadImageWithCorrectExtensionAndSesolutionCacheByClass[imageElementClassList];
  } else {

    if (!imgEl.classList.contains('bottom-bar__icon-popup-img')) {
      let tempEl = imgEl.cloneNode(false);
      document.body.appendChild(tempEl);
      imageBlockWidth = tempEl.offsetWidth * window.devicePixelRatio;
      // imageBlockWidth = tempEl.offsetWidth;
      document.body.removeChild(tempEl);
    }
    if (imageBlockWidth === 0) {
      imageBlockWidth = document.querySelector('body').offsetWidth * window.devicePixelRatio;
    }
    imageBlockWidth = Math.ceil(imageBlockWidth);
    if(aspectRatio === 1 && document.location.hash !== 'debug' && document.location.hash !== '#debug'){
      imageBlockWidth=400;
    }
    window.loadImageWithCorrectExtensionAndSesolutionCacheByClass[imageElementClassList] = imageBlockWidth;
  }
  /**
   * Ограничиваем максимальную ширину картинки
   */
  if (imageBlockWidth > maxImageWidth) {
    imageBlockWidth = maxImageWidth;
  }
  let imageBlockHeight = Math.floor(imageBlockWidth * aspectRatio);
  /**
   * Подготавливаем данные об изображении
   */
  let image = productInfo.mainPhoto;
  let regExp = /(assets\/images\/docs)(\/\d*\/)([\d\D]*\.)(\D+)/g;
  let productName = image.name.replace(regExp, '$3');

  let source = `/${image.name}_cache/${image.edit}/${imageBlockWidth}x${imageBlockHeight}/${productName}${extension}`;


  if(aspectRatio === 1 && document.location.hash !== 'debug' && document.location.hash !== '#debug'){

    imgEl.style.backgroundImage = `url(${source})`;
  }
  else {
    let imageWasSet = false;
    try {
      /**
       * Если картинка уже лежит в локальном кеше, то получаем url из ее blob данных и подстваляем в адрес(реального выполнения запроса со всеми накладными расходами тут нет)
       */
      let request = {
        method: 'HEAD', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'only-if-cached', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          // 'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
      };
      let rawResponse = await fetch(source, request);
      if (rawResponse.ok) {
        let responseBlob = await rawResponse.blob();
        imgEl.style.backgroundImage = `url(${window.URL.createObjectURL(responseBlob)})`;
        imageWasSet = true;
      }
    } catch {
      /**
       * Если не получилось взять картинку из кеша, то запрашиваем HEAD картинки без кеша
       */
      let request = {
        method: 'HEAD', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          // 'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
      };
      let rawResponse = await fetch(source, request);
      let responseBlob = await rawResponse.blob();
      if (rawResponse.ok) {
        imgEl.style.backgroundImage = `url(${source})`;
        imageWasSet = true;
      }
    } finally {
      if (!imageWasSet) {
        /**
         * Если картинка еще нет в локальном кеше, то делаем запрос на создание кеша
         */
        let request = {
          method: 'image-cache-queue',
          originalFileUrl: image.name,
          fileEditDate: image.edit,
          extension: extension,
          sizeX: `${imageBlockWidth}`,
          sizeY: `${imageBlockHeight}`,
          src: source,
        };
        let rawResponse = await fetch('[~30~]', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/html'
          },
          body: JSON.stringify(request)
        });
        let responseJson = await rawResponse.json();
        /**
         * Если кеш уже создан, то перезагружаем картинки и помещаем ее в кеш, а из полученных данных строим url и подставляем его
         */
        if (responseJson.success === true) {

          let request = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'reload', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              // 'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
          };
          let rawResponse = await fetch(source, request);
          let responseBlob = await rawResponse.blob();
          if (rawResponse.ok) {
            imgEl.style.backgroundImage = `url(${window.URL.createObjectURL(responseBlob)})`;

          }
        } else {
          /**
           * Если кеш еще не готов, то повторяем запрос, удваивая время на задержку перед ним
           */
          timeOutDelay *= 2;
          setTimeout(async () => {
            await load_image_with_correct_extension_and_resolution(productInfo, imgEl, extension, timeOutDelay, aspectRatio);
          }, timeOutDelay);
        }
      }


    }
  }





}

function loadImgNotSquare(productInfo, imgEl, expansion, timer) {
  let aspectRatio = 0.85;
  (() => {
    load_image_with_correct_extension_and_resolution(productInfo, imgEl, expansion, 1000, aspectRatio);
  })();
  return '';
}

function counterBasket() {
  const basket = document.querySelector('.bottom-bar__icon--type--basket');
  const counterIcon = document.querySelector('.bottom-bar__counter');
  basket.classList.add('bottom-bar__icon--full');

  if (basketArray.length === 0) {
    counterIcon.textContent = '0';
    basket.classList.remove('bottom-bar__icon--full');
  } else {
    counterIcon.textContent = basketArray.length;
  }
  if (basketArray.length === 0) {
    counterIcon.style.right = '22px';
  } else if (basketArray.length >= 20) {
    counterIcon.style.right = '18px';
  } else if (basketArray.length >= 10) {
    counterIcon.style.right = '19px';
  } else {
    counterIcon.style.right = '23px';
  }
}

class CreateItem {
  constructor(parameters) {
    this.parameters = parameters;
    if (typeof this.parameters !== 'object') {
      this.parameters = {};
    }
  }

  create(element) {
    element.classList.add(this.parameters.style);

    if (typeof this.parameters.modifier === 'object') {
      const {className} = element;
      for (const style of this.parameters.modifier) {
        element.classList.add(className + style);
      }
    }
    return element;
  }
}

class TogglePage {
  constructor(parameters) {
    this.parameters = parameters;
    this.body = document.querySelector('body');
    this.page = document.querySelector('.page');
    this.pageContent = document.querySelector('.page__content');
    this.mainPage = document.querySelector('.main-page');
    this.classOpen = this.parameters.classOpen;

    this.closePage = this.closePage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.openPage = this.openPage.bind(this);

    if (typeof this.parameters !== 'object') {
      this.parameters = {};
    }
  }

  clearPage() {
    this.page = document.querySelector('.page');
    if (this.page !== null) {
      if (this.page.childNodes.length !== 0) {
        this.arrHtml = Array.from(this.page.children);
        this.arrHtml.forEach((item) => item.remove());
      }
    }
  }

  deletePage() {
    if (this.page) {
      setTimeout(() => this.page.remove(), 300);
    }
  }

  closePage() {
    this.page = document.querySelector('.page');
    if (this.page) {
      this.page.querySelectorAll('button').forEach((button) => {
        button.remove();
      });
      if (typeof this.parameters.classOpen === 'object') {
        for (const style of this.parameters.classOpen) {
          this.page.classList.remove(style);
        }
      }
      setTimeout(() => {
        this.body.classList.remove('body');
        this.clearPage();
      }, 300);
    }
  }

  openPage() {
    setTimeout(() => {
      if(this.page) {
        this.classOpen.forEach((classes) => {
          this.page.classList.add(classes);
        })
      }
      this.body.classList.add('body');
    }, 100);
  }

  rendering() {
    this.body.append(createPage());
    this.page = document.querySelector('.page');
    this.openPage();
  }
}


let MD5 = function(d){ d=unescape(encodeURIComponent(d));var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

class TogglePageOrderCard {
  constructor(parameters) {
    this.parameters = parameters;
    this.body = document.querySelector('body');
    this.page = document.querySelector('.page-order');
    this.pageContent = document.querySelector('.page-order__content');
    this.mainPage = document.querySelector('.main-page');
    this.classOpen = this.parameters.classOpen;

    this.closePage = this.closePage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.openPage = this.openPage.bind(this);

    if (typeof this.parameters !== 'object') {
      this.parameters = {};
    }
    // let parametersString = JSON.stringify(this);
    // console.log('TogglePage parameters'+parametersString);
  }

  clearPage() {
    // this.page = document.querySelector('.page');
    // if (this.page !== null) {
    //   if (this.page.childNodes.length !== 0) {
    //     this.arrHtml = Array.from(this.page.children);
    //     this.arrHtml.forEach((item) => item.remove());
    //   }
    // }
  }

  deletePage() {
    // if (this.page) {
    //   setTimeout(() => this.page.remove(), 300);
    // }
  }

  closePage() {
    // this.page = document.querySelector('.page');
    if (this.page) {
      // this.page.querySelectorAll('button').forEach((button) => {
      //   button.remove();
      // });
      if (typeof this.parameters.classOpen === 'object') {
        for (const style of this.parameters.classOpen) {
          this.page.classList.remove(style);
        }
      }
      setTimeout(() => {
        this.body.classList.remove('body');
        // this.clearPage();
      }, 300);
    }
  }

  openPage() {
    /**
     * Получаем hash для ноды this.page
     */
    let hash = MD5(this.page.outerHTML);
    /**
     * Если объект с массивом нод страниц не существует, то создаем его
     */
    if(typeof window.preRenderPages === 'undefined'){
      window.preRenderPages={};
    }
    /**
     * Если объект текущей ноды не существует, то записываем текущую ноду в массив(используя в качестве ключа хеш от этой ноды) и прикрепляем ее к body
     */
    if(typeof window.preRenderPages[hash] === 'undefined') {
      window.preRenderPages[hash] = this.page;
      this.body.append(this.page);
    }
    /**
     * Если объект текущей ноды существует в массиве, то подменяем текущую ноду нодой из массива
     */
    else{
      this.page = window.preRenderPages[hash];
    }
    setTimeout(() => {
      this.page.classList.add(this.classOpen);
      this.body.classList.add('body');
    }, 100);
  }

  rendering() {
    let parametersString = JSON.stringify(this);
    // let pageElement = createPage();
    // console.log('TogglePage parameters'+pageElement.innerHTML);
    // this.body.append(pageElement);

    this.page = createPageOrderCard();
    /*let hash = MD5(this.page.outerHTML);
    if(typeof window.preRenderPages[hash] !== 'undefined') {
      this.page = window.preRenderPages[hash];
    }*/
    // this.openPage();
  }
}

class ToggleSubPage {
  constructor(parameters) {
    this.parameters = parameters;
    this.body = document.querySelector('body');
    this.subPage = document.querySelector('.subpage');
    this.subPageContent = document.querySelector('.subpage__content');
    this.classOpen = this.parameters.classOpen;

    this.closePage = this.closePage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.openPage = this.openPage.bind(this);

    if (typeof this.parameters !== 'object') {
      this.parameters = {};
    }
  }

  clearPage() {
    this.page = document.querySelector('.subpage');
    if (this.page !== null) {
      if (this.page.childNodes.length !== 0) {
        this.arrHtml = Array.from(this.page.children);
        this.arrHtml.forEach((item) => item.remove());
      }
    }
  }

  deletePage() {
    this.page = document.querySelector('.subpage');
    if (this.page) {
      setTimeout(() => this.page.remove(), 300);
    }
  }

  closePage() {
    this.subPage = document.querySelector('.subpage');
    if (this.subPage) {
      this.subPage.querySelectorAll('button').forEach((button) => {
        button.remove();
      });
      if (typeof this.parameters.classOpen === 'object') {
        for (const style of this.parameters.classOpen) {
          this.subPage.classList.remove(style);
        }
      }
      setTimeout(() => {
        this.body.classList.remove('body');
        this.clearPage();
      }, 300);
    }
  }

  openPage() {
    setTimeout(() => {
      this.subPage.classList.add(this.classOpen);
      this.body.classList.add('body');
    }, 100);
  }

  rendering() {
    this.body.append(createSubPage());
    this.subPage = document.querySelector('.subpage');
    this.openPage();
  }
}

class ToggleThirdPage {
  constructor(parameters) {
    this.parameters = parameters;
    this.body = document.querySelector('body');
    this.thirdPage = document.querySelector('.third-page');
    this.thirdPageContent = document.querySelector('.third-page__content');
    this.classOpen = this.parameters.classOpen;

    this.closePage = this.closePage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.openPage = this.openPage.bind(this);
    this.clearPage = this.clearPage.bind(this);

    if (typeof this.parameters !== 'object') {
      this.parameters = {};
    }
  }

  clearPage() {
    this.page = document.querySelector('.third-page');
    if (this.page !== null) {
      if (this.page.childNodes.length !== 0) {
        this.arrHtml = Array.from(this.page.children);
        this.arrHtml.forEach((item) => item.remove());
      }
    }
  }

  deletePage() {
    if (this.thirdPage) {
      setTimeout(() => this.thirdPage.remove(), 300);
    }
  }

  closePage() {
    this.thirdPage = document.querySelector('.third-page');
    if (this.thirdPage) {
      this.thirdPage.querySelectorAll('button').forEach((button) => {
        button.remove();
      });
      if (typeof this.parameters.classOpen === 'object') {
        for (const style of this.parameters.classOpen) {
          this.thirdPage.classList.remove(style);
        }
      }
      setTimeout(() => {
        this.body.classList.remove('body');
        this.clearPage();
      }, 300);
    }
  }

  openPage() {
    setTimeout(() => {
      this.thirdPage.classList.add(this.classOpen);
      this.body.classList.add('body');
    }, 100);
  }

  rendering() {
    this.body.append(createThirdPage());
    this.thirdPage = document.querySelector('.third-page');
  }
}

class ToggleFourthPage {
  constructor(parameters) {
    this.parameters = parameters;
    this.body = document.querySelector('body');
    this.fourthPage = document.querySelector('.fourth-page');
    this.fourthPageContent = document.querySelector('.fourth-page__content');
    this.classOpen = this.parameters.classOpen;

    this.closePage = this.closePage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.openPage = this.openPage.bind(this);

    if (typeof this.parameters !== 'object') {
      this.parameters = {};
    }
  }

  clearPage() {
    this.page = document.querySelector('.fourth-page');
    if (this.page !== null) {
      if (this.page.childNodes.length !== 0) {
        this.arrHtml = Array.from(this.page.children);
        this.arrHtml.splice(0, this.arrHtml.length).forEach((item) => item.remove());
      }
    }
  }

  deletePage() {
    if (this.fourthPage) {
      setTimeout(() => this.fourthPage.remove(), 300);
    }
  }

  closePage() {
    this.fourthPage = document.querySelector('.fourth-page');
    if (this.fourthPage) {
      this.fourthPage.querySelectorAll('button').forEach((button) => {
        button.remove();
      });
      if (typeof this.parameters.classOpen === 'object') {
        for (const style of this.parameters.classOpen) {
          this.fourthPage.classList.remove(style);
        }
      }
      setTimeout(() => {
        this.body.classList.remove('body');
        this.clearPage();
      }, 300);
    }
  }

  openPage() {
    setTimeout(() => {
      this.fourthPage.classList.add(this.classOpen);
      this.body.classList.add('body');
    }, 100);
  }

  rendering() {
    this.body.append(createFourthPage());
    this.fourthPage = document.querySelector('.fourth-page');
  }
}

class ToggleFifthPage {
  constructor(parameters) {
    this.parameters = parameters;
    this.body = document.querySelector('body');
    this.fifthPage = document.querySelector('.fifth-page');
    this.fifthPageContent = document.querySelector('.fifth-page__content');
    this.classOpen = this.parameters.classOpen;

    this.closePage = this.closePage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.openPage = this.openPage.bind(this);

    if (typeof this.parameters !== 'object') {
      this.parameters = {};
    }
  }

  clearPage() {
    this.page = document.querySelector('.fifth-page');
    if (this.page !== null) {
      if (this.page.childNodes.length !== 0) {
        this.arrHtml = Array.from(this.page.children);
        this.arrHtml.forEach((item) => item.remove());
      }
    }
  }

  deletePage() {
    if (this.fifthPage) {
      setTimeout(() => this.fifthPage.remove(), 100);
    }
  }

  closePage() {
    this.fifthPage = document.querySelector('.fifth-page');
    if (this.fifthPage) {
      this.fifthPage.querySelectorAll('button').forEach((button) => {
        button.remove();
      });
      if (typeof this.parameters.classOpen === 'object') {
        for (const style of this.parameters.classOpen) {
          this.fifthPage.classList.remove(style);
        }
      }
      setTimeout(() => this.body.classList.remove('body'), 100);
    }
  }

  openPage() {
    this.fifthPage = document.querySelector('.fifth-page');
    setTimeout(() => {
      this.fifthPage.classList.add(this.classOpen);
      this.body.classList.add('body');
    }, 100);
  }

  rendering() {
    this.body = document.querySelector('body');
    this.body.append(createFifthPage());
    this.fifthPage = document.querySelector('.fifth-page');
  }
}

class ToggleSixthPage {
  constructor(parameters) {
    this.parameters = parameters;
    this.body = document.querySelector('body');
    this.sixthPage = document.querySelector('.sixth-page');
    this.sixthPageContent = document.querySelector('.sixth-page__content');
    this.classOpen = this.parameters.classOpen;

    this.closePage = this.closePage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.openPage = this.openPage.bind(this);

    if (typeof this.parameters !== 'object') {
      this.parameters = {};
    }
  }

  clearPage() {
    this.page = document.querySelector('.sixth-page');
    if (this.page !== null) {
      if (this.page.childNodes.length !== 0) {
        this.arrHtml = Array.from(this.page.children);
        this.arrHtml.forEach((item) => item.remove());
      }
    }
  }

  deletePage() {
    if (this.sixthPage) {
      setTimeout(() => this.sixthPage.remove(), 100);
    }
  }

  closePage() {
    this.sixthPage = document.querySelector('.sixth-page');
    if (this.sixthPage) {
      this.sixthPage.querySelectorAll('button').forEach((button) => {
        button.remove();
      });
      if (typeof this.parameters.classOpen === 'object') {
        for (const style of this.parameters.classOpen) {
          this.sixthPage.classList.remove(style);
        }
      }
      setTimeout(() => this.body.classList.remove('body'), 100);
    }
  }

  openPage() {
    this.sixthPage = document.querySelector('.sixth-page');
    setTimeout(() => {
      this.sixthPage.classList.add(this.classOpen);
      this.body.classList.add('body');
    }, 100);
  }

  rendering() {
    this.body = document.querySelector('body');
    this.body.append(createSixthPage());
    this.sixthPage = document.querySelector('.sixth-page');
  }
}

class ToggleModalPage {
  constructor(parameters) {
    this.parameters = parameters;
    this.body = document.querySelector('body');
    this.modalPage = document.querySelector('.modal-page');
    this.modalPageContent = document.querySelector('.modal-page__content');
    this.classOpen = this.parameters.classOpen;

    this.closePage = this.closePage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.openPage = this.openPage.bind(this);

    if (typeof this.parameters !== 'object') {
      this.parameters = {};
    }
  }

  clearPage() {
    this.modalPage = document.querySelector('.modal-page');
    if (this.modalPage !== null) {
      if (this.modalPage.childNodes.length !== 0) {
        this.arrHtml = Array.from(this.modalPage.children);
        this.arrHtml.forEach((item) => item.remove());
      }
    }
  }

  deletePage() {
    if (this.modalPage) {
      setTimeout(() => this.modalPage.remove(), 100);
    }
  }

  closePage() {
    this.modalPage = document.querySelector('.modal-page');
    if (this.modalPage) {
      this.modalPage.querySelectorAll('button').forEach((button) => {
        button.remove();
      });
      if (typeof this.parameters.classOpen === 'object') {
        for (const style of this.parameters.classOpen) {
          this.modalPage.classList.remove(style);
        }
      }
      setTimeout(() => this.body.classList.remove('body'), 100);
    }
  }

  openPage() {
    this.modalPage = document.querySelector('.modal-page');
    setTimeout(() => {
      this.modalPage.classList.add(this.classOpen);
      this.body.classList.add('body');
    }, 100);
  }

  rendering() {
    this.body = document.querySelector('body');
    this.body.append(createModalPage());
    this.modalPage = document.querySelector('.modal-page');
    this.modalPageContent = document.querySelector('.modal-page__content');
  }
}

class ToggleMainPage {
  constructor(parameters) {
    this.parameters = parameters;
    this.body = document.querySelector('body');
    this.mainPage = document.querySelector('.main-page');
    this.mainPageContent = document.querySelector('.main-page__content');

    this.closePage = this.closePage.bind(this);
    if (typeof this.parameters !== 'object') {
      this.parameters = {};
    }
  }

  rendering(identifier) {
    this.mainPageContent = document.createElement('div');
    this.mainPageContent.classList.add('main-page__content', 'main-page__content--size--small', `main-page__content-${identifier}`);
    this.mainPage.prepend(this.mainPageContent);
  }

  openPage() {
    this.mainPageContent = document.querySelector('.main-page__content');
    setTimeout(() => {
      if(this.mainPageContent) {
        this.mainPageContent.classList.add('main-page__content--opened');
      }
    }, 100);
  }

  closePage() {
    this.mainPageContent = document.querySelector('.main-page__content');
    if(this.mainPageContent){
      this.mainPageContent.classList.remove('main-page__content--opened');
    }
    setTimeout(() => this.body.classList.remove('body'), 100);
  }

  clearPage() {
    this.mainPage = document.querySelector('.main-page');
    if (this.mainPage.classList.contains('main-page--type--search')) {
      this.mainPage.classList.remove('main-page--type--search');
    }

    this.bottomBar = document.querySelector('.bottom-bar');
    if (this.bottomBar) {
      this.bottomBar.remove();
    }
    if (this.bottomBar) {
      this.bottomBar.remove();
    }
    this.arrHtml = Array.from(this.mainPage.children);
    this.arrHtml.splice(0, this.arrHtml.length - 1).forEach((item) => item.remove());
  }
}


class ToggleOrderTabContent {
  constructor(parameters) {
    this.parameters = parameters;
    this.body = document.querySelector('body');
    this.mainPage = document.querySelector('.main-page');

    this.clearPage = this.clearPage.bind(this);
    if (typeof this.parameters !== 'object') {
      this.parameters = {};
    }
  }

  rendering() {
    this.mainPageTabContent = document.createElement('div');
    this.mainPageTabContent.classList.add('main-page__tab-content');
    this.mainPageContent = document.querySelector('.main-page__content');
  }

  clearPage() {
    this.mainPageTabContent = document.querySelector('.main-page__tab-content');
    this.mainPageTabContent.remove();
  }
}

class ToggleInboxTabContent {
  constructor(parameters) {
    this.parameters = parameters;
    this.body = document.querySelector('body');
    this.page = document.querySelector('.page');

    this.clearPage = this.clearPage.bind(this);
    if (typeof this.parameters !== 'object') {
      this.parameters = {};
    }
  }

  rendering() {
    this.pageTabContent = document.createElement('div');
    this.pageTabContent.classList.add('page__tab-content');
    this.pageContent = document.querySelector('.page__content');
  }

  clearPage() {
    this.pageTabContent = document.querySelector('.page__tab-content');
    this.pageTabContent.remove();
  }
}

class ToggleModal {
  constructor(parameters) {
    this.parameters = parameters;

    this.modal = document.querySelector('.modal');

    this.closePage = this.closePage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.openPage = this.openPage.bind(this);

    if (typeof this.parameters !== 'object') {
      this.parameters = {};
    }
  }

  deletePage() {
    if (this.modal) {
      setTimeout(() => this.modal.remove(), 100);
    }
  }

  closePage() {
    this.modal = document.querySelector('.modal');
    if (this.modal) {
      this.modal.classList.remove('modal--open');
    }
  }

  openPage() {
    this.modal = document.querySelector('.modal');
    this.modal.classList.add('modal--open');
    closeModal();
  }

  rendering(text) {
    this.body = document.querySelector('body');
    this.body.append(createModal(text));
    this.openPage();
  }

  renderingReward(info) {
    this.body = document.querySelector('body');
    this.body.append(createModalReward(info));
    this.openPage();
  }

  renderingPost(modalInfo) {
    this.mainPage = document.querySelector('.main-page');
    this.mainPage.append(createModalPost(modalInfo));
  }

  renderingEmail() {
    this.mainPage = document.querySelector('.main-page');
    this.mainPage.append(createModalEmail());
  }
}

/*
const favourites = itemsArray;
if (typeof userLastOrdersObj.successData.orders === 'object') {
  for (const order of Object.values(userLastOrdersObj.successData.orders)) {
    if (typeof order === 'object') {
      for (const el of Object.values(order.items)) {
        /!**
         * Код для определения находится ли товар в избранном
         *!/

        /!**
         * Делаем переменную для товара, которую мы заполним аналогично товару в избранном, чтобы их можно было сравнить
         *!/
        let itemForCompare = {
          id: el.itemId,
          modifiers: [], // нужно раскомментировать, если модификаторы, хотя бы пустые обязательны в избранном
        };
        /!**
         * Заполняем данные о модификаторах, если они есть
         *!/
        if (typeof el.modifiers === 'object') {
          const modifierArray = [];
          for (const modifierEl of Object.values(el.modifiers)) {
            modifierArray.push({
              id: modifierEl.modificationId,
              count: modifierEl.count,
            });
          }
          itemForCompare.modifiers = modifierArray;
        }
        // console.log(itemForCompare);
        /!**
         * Ставим флаг нахождения комбинации товара и модификаторов в false
         *!/
        let favouriteItemFlag = false;

        /!**
         * Преобразуем объект товара из заказа в строку, чтобы можно было легко сравнить
         *!/
        itemForCompare = JSON.stringify(itemForCompare);
        /!**
         * Проходим массив избранного
         * to do: стоит вытащить преобразование массива избранного в строки(в отдельный массив) чуть выше начала перебора заказов в истории, тогда нам не придется каждый раз преобразовывать объекты избранного в строки, достаточно будет пройтись по новому мессиву сравнить с их с товаром
         *!/
        for (let itemOfFavourites of Object.values(favourites)) {
          /!**
           * Преобразуем объекты комбинаций товара и модификаторов избранного в строку, чтобы можно было сравнивать
           *!/
          itemOfFavourites = JSON.stringify(itemOfFavourites);
          // console.log(itemForCompare, itemOfFavourites);
          /!**
           * Сравниваем строки,
           * если совпадение найдено меняем статус в флаг
           * и перестаем перебирать комбинации избранного
           *!/
          if (itemForCompare === itemOfFavourites) {
            favouriteItemFlag = true;

            console.log(order, 'find!');
            break;
          }
        }
      }
    }
  }
} */
