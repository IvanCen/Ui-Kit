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

function iOS() {
  const iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod',
  ];

  if (navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()) {
        return true;
      }
    }
  }
  return false;
}


function loadImg(productInfo, imgEl, expansion, timer) {
  let devicePixelRatio = 0;
  devicePixelRatio = window.devicePixelRatio;
  const windowScreenWidth = window.screen.width * devicePixelRatio;

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
        loadImg(productInfo, imgEl, expansion, timerSuccess);
        timerSuccess(delay * 2);

        if (delay > 32) {
          clearInterval(timer);
        }
      }, delay * 1000);
      timerSuccess(1);
    }
  }

  const screenRatio = countScreenRatio(Math.ceil(windowScreenWidth));
  console.log(productInfo)
  const urlPhoto = productInfo.mainPhoto;
  if (urlPhoto !== null) {
    const regExp = /(assets\/images\/docs)(\/\d*\/)([\d\D]*\.)(\D+)/g;
    const productName = urlPhoto.name.replace(regExp, '$3');
    const img = document.createElement('img');
    img.src = `http://demo.xleb.ru/${urlPhoto.name}_cache/${urlPhoto.edit}/${screenRatio}x${screenRatio}/${productName}${expansion}`;

    img.onerror = () => {
      const request = {
        method: 'image-cache-queue',
        originalFileUrl: urlPhoto.name,
        fileEditDate: urlPhoto.edit,
        extension: expansion,
        sizeX: `${screenRatio}`,
        sizeY: `${screenRatio}`,
      };
      api.imageCacheQueueApi(request, getCache);
    };
    img.onload = () => {
      clearInterval(timer);
      imgEl.style.backgroundImage = `url(${img.src})`;
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
    this.arrHtml = Array.from(this.page.children);
    this.arrHtml.forEach((item) => item.remove());
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
    this.arrHtml = Array.from(this.page.children);
    this.arrHtml.forEach((item) => item.remove());
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

    if (typeof this.parameters !== 'object') {
      this.parameters = {};
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
    this.fourthPage = document.querySelector('.fourth-page');
    this.arrHtml = Array.from(this.fourthPage.children);
    this.arrHtml.splice(0, this.arrHtml.length).forEach((item) => item.remove());
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
    this.fifthPage = document.querySelector('.fifth-page');
    this.arrHtml = Array.from(this.fifthPage.children);
    this.arrHtml.splice(0, this.arrHtml.length).forEach((item) => item.remove());
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
    this.body = document.querySelector('.body');
    this.mainPage.append(createModal(text));
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
