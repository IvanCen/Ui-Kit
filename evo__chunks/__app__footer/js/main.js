function switchActiveFooter() {
  const footerButton = document.querySelectorAll('.footer__button');
  [...footerButton].forEach((item) => {
    item.addEventListener('click', function () {
      if (!this.classList.contains('footer__button--type--stores')) {
        [...footerButton].forEach((itemEl) => {
          itemEl.classList.remove('footer__button--active');
          itemEl.firstElementChild.classList.remove('footer__icon--active');
        });
        this.classList.add('footer__button--active');
        this.firstElementChild.classList.add('footer__icon--active');
      }
    });
  });
}

function initMainPanel() {
  const pages = document.querySelectorAll('.page');
  const btns = document.querySelectorAll('.main-panel .main-panel__button');
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      btns.forEach((btn) => {
        btn.classList.remove('main-panel__button--active');
      });
      btn.classList.add('main-panel__button--active');

      const pageId = btn.getAttribute('data-page');
      const pageTitle = btn.getAttribute('data-page-title');

      pages.forEach((page) => {
        page.classList.remove('page--show');
      });

      const page = document.querySelector(`.page[data-page='${pageId}']`);
      if (page) {
        page.classList.add('page--show');
        const header = page.querySelector('.header');
        if (header) {
          document.body.style.paddingTop = `${header.clientHeight}px`;
        } else document.body.style.paddingTop = '0px';
      }
      if (window.swipArray) {
        window.swipArray.forEach((swip) => {
          swip.update();
        });
      }
    });
  });
}

function activeFooter(activeEl) {
  const footerButton = document.querySelectorAll('.footer__button');
  [...footerButton].forEach((item) => {
    item.classList.remove('footer__button--active');
    item.firstElementChild.classList.remove('footer__icon--active');
  });
  activeEl.classList.add('footer__button--active');
  activeEl.firstElementChild.classList.add('footer__icon--active');
}

class CreateFooter extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.switchNavElem = this.switchNavElem.bind(this);
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="main-panel ${isIos ? 'main-panel--ios' : ''}">
        <button class="main-panel__button main-panel__button--type--main main-panel__button--active" data-page="main" data-page-title="Отличный день для кофе ☕">
            <svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 207.59 186.67" style="enable-background:new 0 0 207.59 186.67;" xml:space="preserve" width="20" height="20">
            <style type="text/css">
                .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#FF6000;}
            </style>
                        <path class="st0" d="M207.07,55c-6.01-46.17-35.79-56-66.11-54.63C110.64,1.74,87.15,22.5,56.83,61.29c0,0-0.68,0.96,0.27-3.96
                c4.78-25.54,19.46-45.55,22.2-49.72c2.73-4.17,5.33-4.78,2.66-5.33C16.4-10.56,0.28,33.97,0.01,56.37s5.46,35.24,28.96,61.74
                c23.49,26.5,74.3,68.57,74.3,68.57s34.69-28.68,62.28-55.18C193.14,104.99,210.9,82.32,207.07,55z M144.81,84.91
                c-14.06,0-25.46-11.4-25.46-25.46c0-14.06,11.4-25.46,25.46-25.46c14.06,0,25.46,11.4,25.46,25.46
                C170.28,73.51,158.88,84.91,144.81,84.91z"/>
            </svg>
            <span>Главная</span>
        </button>
        <button class="main-panel__button main-panel__button--type--stores" data-page="stores">
            <svg width="15" height="20" viewBox="0 0 16 20" fill="#FF6000" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0C3.865 0 0.5 3.38833 0.5 7.55417C0.5 13.4733 7.295 19.585 7.58417 19.8417C7.70333 19.9475 7.85167 20 8 20C8.14833 20 8.29667 19.9475 8.41583 19.8425C8.705 19.585 15.5 13.4733 15.5 7.55417C15.5 3.38833 12.135 0 8 0ZM8 11.6667C5.7025 11.6667 3.83333 9.7975 3.83333 7.5C3.83333 5.2025 5.7025 3.33333 8 3.33333C10.2975 3.33333 12.1667 5.2025 12.1667 7.5C12.1667 9.7975 10.2975 11.6667 8 11.6667Z" fill="#FF6000"/>
            </svg>
            <span>Магазины</span>
        </button>
        <button class="main-panel__button main-panel__button--type--balance" data-page="balance">
            <svg width="15" height="20" viewBox="0 0 15 17" fill="#FF6000" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17H5V14H11V12H5V10H9.5C12.257 10 14.5 7.757 14.5 5C14.5 2.243 12.257 0 9.5 0H4C3.447 0 3 0.448 3 1V8H0V10H3V12H0V14H3V17ZM5 2H9.5C11.154 2 12.5 3.346 12.5 5C12.5 6.654 11.154 8 9.5 8H5V2Z" fill="#FF6000"/>
            </svg>
            <span>Баланс</span>
        </button>
        <button class="main-panel__button main-panel__button--type--messages" data-page="messages">
            <svg width="18" height="20" viewBox="0 0 18 18" fill="#FF6000" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6 0H5.4C2.4219 0 0 2.4219 0 5.4V17.1C0 17.5977 0.4023 18 0.9 18H12.6C15.5781 18 18 15.5781 18 12.6V5.4C18 2.4219 15.5781 0 12.6 0ZM10.8 11.7H4.5V9.9H10.8V11.7ZM13.5 8.1H4.5V6.3H13.5V8.1Z" fill="#FF6000"/>
            </svg>
            <span>Сообщения</span>
        </button>
        <button class="main-panel__button main-panel__button--type--profile" data-page="profile" data-page-title="Профиль">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#FF6000" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C4.579 0 0 4.579 0 10C0 15.421 4.579 20 10 20C15.421 20 20 15.421 20 10C20 4.579 15.421 0 10 0ZM10 5C11.727 5 13 6.272 13 8C13 9.728 11.727 11 10 11C8.274 11 7 9.728 7 8C7 6.272 8.274 5 10 5ZM4.894 14.772C5.791 13.452 7.287 12.572 9 12.572H11C12.714 12.572 14.209 13.452 15.106 14.772C13.828 16.14 12.015 17 10 17C7.985 17 6.172 16.14 4.894 14.772Z" fill="#FF6000"/>
            </svg>
            <span>Профиль</span>
        </button>
    </div>`;
  }

  switchNavElem(activeClassName, showBasket = true) {
    this.navElems = document.querySelectorAll('.navigation-element');
    this.activeEl = document.querySelector(`.navigation-element-${activeClassName}`);
    this.headerBasket = document.querySelector('.header__basket');

    this.navElems.forEach((el) => {
      el.classList.remove('navigation-element--active');
    });
    this.activeEl.classList.add('navigation-element--active');
    if (showBasket) {
      this.headerBasket.classList.remove('header__basket--hide');
    }
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);


    this.buttonMain = this.element.querySelector('.main-panel__button--type--main');
    this.buttonBalance = this.element.querySelector('.main-panel__button--type--balance');
    this.buttonMessages = this.element.querySelector('.main-panel__button--type--messages');
    this.buttonProfile = this.element.querySelector('.main-panel__button--type--profile');
    this.buttonStores = this.element.querySelector('.main-panel__button--type--stores');

    if (typeof this.parameters.eventOpenMainPage === 'object') {
      for (const event of this.parameters.eventOpenMainPage) {
        this.buttonMain.addEventListener(event.type, () => {
          event.callback();
          this.switchNavElem('main');
        });
      }
    }
    if (typeof this.parameters.eventOpenBalancePage === 'object') {
      for (const event of this.parameters.eventOpenBalancePage) {
        this.buttonBalance.addEventListener(event.type, () => {
          event.callback();
          this.switchNavElem('balance');
        });
      }
    }

    if (typeof this.parameters.eventOpenMessagesPage === 'object') {
      for (const event of this.parameters.eventOpenMessagesPage) {
        this.buttonMessages.addEventListener(event.type, () => {
          event.callback();
          this.switchNavElem('inbox');
        });
      }
    }

    if (typeof this.parameters.eventOpenProfilePage === 'object') {
      for (const event of this.parameters.eventOpenProfilePage) {
        this.buttonProfile.addEventListener(event.type, () => {
          event.callback();
          this.switchNavElem('profile');
        });
      }
    }

    if (typeof this.parameters.eventOpenStoresPage === 'object') {
      for (const event of this.parameters.eventOpenStoresPage) {
        this.buttonStores.addEventListener(event.type, () => {
          event.callback();
          this.switchNavElem('stores', false);
        });
      }
    }

    return super.create(this.element);
  }
}
