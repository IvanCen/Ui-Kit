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

function counterOrder() {
  const cardItem = document.querySelectorAll('.card-item--type--order');
  const counterNumber = document.querySelector('.top-bar__all-counter-order');
  counterNumber.textContent = cardItem.length;
}

function counterBasket() {
  const basket = document.querySelector('.bottom-bar__icon--type--basket');
  const counterIcon = document.querySelector('.bottom-bar__counter');
  basket.classList.add('bottom-bar__icon--full');

  if (counterIcon.textContent === 0) {
    counterIcon.textContent = 1;
  } else {
    counterIcon.textContent = Number(`${counterIcon.textContent}`) + 1;
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

  rendering() {
    this.mainPage = document.querySelector('.main-page');
    this.mainPage.append(createModal());
  }
}
