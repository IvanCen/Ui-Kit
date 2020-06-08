if ('serviceWorker' in navigator) {
  if (!(navigator.serviceWorker.controller)) {
    navigator.serviceWorker
      .register('/app-sw.js?v=0-0-1', {
        scope: './',
      });
  }
}

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
  clearTimeout(timer);
  // console.log(productInfo);
  let devicePixelRatio = 0;
  devicePixelRatio = window.devicePixelRatio;
  const windowScreenWidth = document.querySelector('body').offsetWidth * devicePixelRatio;

  function countScreenRatio(windowScreen) {
    const maxSize = 6000;
    if (windowScreen >= maxSize) {
      windowScreen = maxSize;
      return windowScreen;
    }
    return windowScreen;
  }

  function getCache(info) {
    if (info.success === false && info.errors[0] === 'Кеш файл еще не готов') {
      const timerSuccess = (delay) => setTimeout(() => {
        if (delay > 32) {
          clearTimeout(timer);
        }
        console.log(delay);
        loadImg(productInfo, imgEl, expansion, timerSuccess);
        timerSuccess(delay * 2);
      }, delay * 1000);
      if (!timer) timerSuccess(1);
    }
  }


  const urlPhoto = productInfo.mainPhoto;
  if (urlPhoto !== null) {
    const regExp = /(assets\/images\/docs)(\/\d*\/)([\d\D]*\.)(\D+)/g;
    const productName = urlPhoto.name.replace(regExp, '$3');
    const img = document.createElement('img');
    const screenRatio = countScreenRatio(Math.ceil(windowScreenWidth));
    img.src = `/${urlPhoto.name}_cache/${urlPhoto.edit}/${screenRatio}x${screenRatio}/${productName}${expansion}`;
    img.onerror = () => {
      const request = {
        method: 'image-cache-queue',
        originalFileUrl: urlPhoto.name,
        fileEditDate: urlPhoto.edit,
        extension: expansion,
        sizeX: `${screenRatio}`,
        sizeY: `${screenRatio}`,
      };
      console.log('error');
      api.imageCacheQueueApi(request, getCache);
    };


    img.onload = () => {
      console.log('load');
      clearTimeout(timer);
      imgEl.style.backgroundImage = `url(${img.src})`;
      img.remove();
    };
  }
}

function loadImgNotSquare(productInfo, imgEl, expansion, timer) {
  let devicePixelRatio = 0;
  devicePixelRatio = window.devicePixelRatio;
  const windowScreenWidth = document.querySelector('body').offsetWidth * devicePixelRatio;

  function countScreenRatio(windowScreen) {
    const maxSize = 6000;
    if (windowScreen >= maxSize) {
      windowScreen = maxSize;
      return windowScreen;
    }
    return windowScreen;
  }

  function getCache(info) {
    if (info.success === false && info.errors[0] === 'Кеш файл еще не готов') {
      const timerSuccess = (delay) => setTimeout(() => {
        console.log(delay);
        loadImg(productInfo, imgEl, expansion, timerSuccess);
        timerSuccess(delay * 2);
        if (delay > 32) {
          clearTimeout(timer);
        }
      }, delay * 1000);
      if (!timer) timerSuccess(1);
    }
  }


  const urlPhoto = productInfo.mainPhoto;
  if (urlPhoto !== null) {
    const regExp = /(assets\/images\/docs)(\/\d*\/)([\d\D]*\.)(\D+)/g;
    const productName = urlPhoto.name.replace(regExp, '$3');
    const img = document.createElement('img');
    const screenRatio = countScreenRatio(Math.ceil(windowScreenWidth));
    const screenRatioY = Math.floor(screenRatio * 0.85);
    img.src = `/${urlPhoto.name}_cache/${urlPhoto.edit}/${screenRatio}x${screenRatioY}/${productName}${expansion}`;
    img.onerror = () => {
      const request = {
        method: 'image-cache-queue',
        originalFileUrl: urlPhoto.name,
        fileEditDate: urlPhoto.edit,
        extension: expansion,
        sizeX: `${screenRatio}`,
        sizeY: `${screenRatioY}`,
      };
      api.imageCacheQueueApi(request, getCache);
    };

    img.onload = () => {
      console.log('load');
      clearTimeout(timer);
      imgEl.style.backgroundImage = `url(${img.src})`;
      img.remove();
    };
  }
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
      const { className } = element;
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
      setTimeout(() => this.page.remove(), 100);
    }
  }

  closePage() {
    this.page = document.querySelector('.page');
    if (this.page) {
      if (typeof this.parameters.classOpen === 'object') {
        for (const style of this.parameters.classOpen) {
          this.page.classList.remove(style);
        }
      }
      setTimeout(() => this.body.classList.remove('body'), 100);
      this.clearPage();
    }
  }

  openPage() {
    setTimeout(() => {
      this.page.classList.add(this.classOpen);
      this.body.classList.add('body');
    }, 200);
  }

  rendering() {
    this.body.append(createPage());
    this.page = document.querySelector('.page');
    this.openPage();
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
    if (this.subPage) {
      setTimeout(() => this.subPage.remove(), 100);
    }
  }

  closePage() {
    this.subPage = document.querySelector('.subpage');
    if (this.subPage) {
      if (typeof this.parameters.classOpen === 'object') {
        for (const style of this.parameters.classOpen) {
          this.subPage.classList.remove(style);
        }
      }
      setTimeout(() => this.body.classList.remove('body'), 100);
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
      setTimeout(() => this.thirdPage.remove(), 100);
    }
  }

  closePage() {
    this.thirdPage = document.querySelector('.third-page');
    if (this.thirdPage) {
      if (typeof this.parameters.classOpen === 'object') {
        for (const style of this.parameters.classOpen) {
          this.thirdPage.classList.remove(style);
        }
      }
      setTimeout(() => this.body.classList.remove('body'), 100);
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
      setTimeout(() => this.fourthPage.remove(), 100);
    }
  }

  closePage() {
    this.fourthPage = document.querySelector('.fourth-page');
    if (this.fourthPage) {
      if (typeof this.parameters.classOpen === 'object') {
        for (const style of this.parameters.classOpen) {
          this.fourthPage.classList.remove(style);
        }
      }
      setTimeout(() => this.body.classList.remove('body'), 100);
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

  rendering() {
    this.mainPageContent = document.createElement('div');
    this.mainPageContent.classList.add('main-page__content', 'main-page__content--size--small');
    this.mainPage.prepend(this.mainPageContent);
  }

  openPage() {
    this.mainPageContent = document.querySelector('.main-page__content');
    setTimeout(() => {
      this.mainPageContent.classList.add('main-page__content--opened');
    }, 100);
  }

  closePage() {
    this.mainPageContent = document.querySelector('.main-page__content');
    this.mainPageContent.classList.remove('main-page__content--opened');
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

  renderingBankInfo(text, callback) {
    this.mainPage = document.querySelector('.main-page');
    this.mainPage.append(createModalBankInfo(text, callback));
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
}*/
