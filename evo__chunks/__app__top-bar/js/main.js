const topBarTabs = document.querySelectorAll('.top-bar__tab');
switchActive(topBarTabs, 'top-bar__tab--active');

class CreateTopBar extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);

    this.template = `
        <div class="header__top-bar top-bar">
            <button class="header__menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12C4 11.4477 4.44772 11 5 11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H5C4.44772 13 4 12.5523 4 12ZM4 7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7Z" fill="white"/>
                    <line x1="5" y1="17" x2="10" y2="17" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
            <div class="header__status">Главная</div>
            <div class="header__basket">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21C9.55228 21 10 20.5523 10 20C10 19.4477 9.55228 19 9 19C8.44772 19 8 19.4477 8 20C8 20.5523 8.44772 21 9 21Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19 21C19.5523 21 20 20.5523 20 20C20 19.4477 19.5523 19 19 19C18.4477 19 18 19.4477 18 20C18 20.5523 18.4477 21 19 21Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 2H5.63636L8.07273 14.497C8.15586 14.9267 8.38355 15.3127 8.71595 15.5874C9.04835 15.8621 9.46427 16.0081 9.89091 15.9997H18.7273C19.1539 16.0081 19.5698 15.8621 19.9022 15.5874C20.2346 15.3127 20.4623 14.9267 20.5455 14.497L22 6.66655H6.54545" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonBasket = this.element.querySelector('.header__basket');
    this.buttonMenu = this.element.querySelector('.header__menu');


    if (typeof this.parameters.eventOpenBasket === 'object') {
      for (const event of this.parameters.eventOpenBasket) {
        this.buttonBasket.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventOpenMenu === 'object') {
      for (const event of this.parameters.eventOpenMenu) {
        this.buttonMenu.addEventListener(event.type, event.callback);
      }
    }


    return super.create(this.element);
  }
}

class CreateTopBarWithCloseIcon extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="top-bar__content-container">
        <div class="top-bar__header">
          <button class="top-bar__button">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-close-white.svg]]" alt="Кнопка закрытия" class="top-bar__icon top-bar__icon--type--close">
          </button>
        </div>
        <h1 class="top-bar__title">${this.parameters.textTitle}</h1>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.iconClose = this.element.querySelector('.top-bar__icon--type--close');
    if (typeof this.parameters.eventCloseIcon === 'object') {
      for (const event of this.parameters.eventCloseIcon) {
        this.iconClose.addEventListener(event.type, event.callback);
      }
    }
    this.iconClose.addEventListener('click', () => window.history.back());

    return super.create(this.element);
  }
}

class CreateTopBarSignIn extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="login__close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.7502 0L8.9992 6.75L2.2498 0L0 2.25L6.7494 9L0 15.75L2.2498 18L8.9992 11.25L15.7502 18L18 15.75L11.2506 9L18 2.25L15.7502 0Z" fill="#919191"/>
            </svg>
        </div>
        <div class="login__header-title">Вход</div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.iconClose = this.element.querySelector('.login__close');
    if (typeof this.parameters.eventCloseIcon === 'object') {
      for (const event of this.parameters.eventCloseIcon) {
        this.iconClose.addEventListener(event.type, event.callback);
      }
    }
    this.iconClose.addEventListener('click', () => window.history.back());

    return super.create(this.element);
  }
}

class CreateTopBarDarkWithCloseIcon extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(productInfo) {
    this.element = document.createElement(this.parameters.selector);

    let allCountAdds = 0;
    if (typeof userDataObj[productInfo.id] === 'object') {
      for (const modifiersUserItem of Object.values(userDataObj[productInfo.id])) {
        allCountAdds += modifiersUserItem;
      }
    }
    this.template = `
      <div class="top-bar__content-container">
        <div class="top-bar__header">
          <button class="top-bar__button">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-close-white.svg]]" alt="Кнопка закрытия" class="top-bar__icon top-bar__icon--type--close">
          </button>
          <h1 class="top-bar__header-title top-bar__header-title--type--uppercase">${this.parameters.textTitle}</h1>
        </div>
        <div class="text-area__counter-container">
          <span class="text-area__all-counter-title">У вашего напитка сейчас </span>
          <span class="text-area__all-counter"><span class="text-area__all-counter-number">${allCountAdds} добавок</span></span>
        </div>
      </div>`;

    this.element.insertAdjacentHTML('beforeend', this.template);
    this.iconClose = this.element.querySelector('.top-bar__icon--type--close');

    this.iconClose.addEventListener('click', () => window.history.back());

    if (typeof this.parameters.eventCloseIcon === 'object') {
      for (const event of this.parameters.eventCloseIcon) {
        this.iconClose.addEventListener(event.type, event.callback);
        this.iconClose.addEventListener('click', () => {
          toggleModalPageCard.clearPage();
          toggleModalPageCard.rendering(productInfo);
        });
      }
    }
    return super.create(this.element);
  }
}

class CreateTopBarDefault extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="top-bar__content-container">
        <h1 class="top-bar__title">${this.parameters.textTitle}</h1>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);
    return super.create(this.element);
  }
}

class CreateTopBarWithBackButton extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="top-bar__content-container">
       <div class="top-bar__header">
          <button class="button top-bar__back-button">
             <svg class="top-bar__icon top-bar__icon-back" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="white"/>
              </svg>
          </button>
          <h1 class="top-bar__title top-bar__title--size--small">${this.parameters.textTitle}</h1>
        </div>
      </div>
      `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.buttonBack = this.element.querySelector('.top-bar__back-button');
    if (typeof this.parameters.eventBack === 'object') {
      for (const event of this.parameters.eventBack) {
        this.buttonBack.addEventListener(event.type, event.callback);
      }
    }
    this.buttonBack.addEventListener('click', () => window.history.back());
    return super.create(this.element);
  }
}

class CreateTopBarTabsBalance extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="header__top-tabs-element header__top-tabs-element--active" data-id="1">Счет</div>
      <div class="header__top-tabs-element" data-id="2">Бонусы</div>
      `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateTopBarTabsInbox extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="header__top-tabs-element header__top-tabs-element--active" data-id="1">Входящие</div>
      <div class="header__top-tabs-element" data-id="2">Последние предложения</div>
      `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateTopBarStoresInfo extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="top-bar__content-container">
       <div class="top-bar__header">
          <button class="button top-bar__back-button">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-back.svg]]" alt="Кнопка назад" class="top-bar__icon top-bar__icon-back">
          </button>
        </div>
        <h1 class="top-bar__title">${this.parameters.textTitle}</h1>
        <h2 class="top-bar__subtitle">${this.parameters.textSubTitle}</h2>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.buttonBack = this.element.querySelector('.top-bar__back-button');
    if (typeof this.parameters.eventBack === 'object') {
      for (const event of this.parameters.eventBack) {
        this.buttonBack.addEventListener(event.type, event.callback);
      }
    }
    this.buttonBack.addEventListener('click', () => window.history.back());
    return super.create(this.element);
  }
}

class CreateTopBarOrder extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="top-bar__content-container top-bar__content-container--size--small">
        <div class="top-bar__header">
          <button class="button top-bar__search-button button-route">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-search.svg]]" alt="Кнопка поиска" class="top-bar__icon">
          </button>
        </div>
        <h1 class="top-bar__title">Заказать</h1>
      </div>
      <div class="top-bar__tab-container">
        <button class="top-bar__tab top-bar__tab--menu top-bar__tab--active">Меню</button>
        <button class="top-bar__tab top-bar__tab--hits">Хиты</button>
        <button class="top-bar__tab top-bar__tab--history">История</button>
        <button class="top-bar__tab top-bar__tab--favorite">Избранное</button>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.topBarTabMenu = this.element.querySelector('.top-bar__tab--menu');
    this.topBarTabHits = this.element.querySelector('.top-bar__tab--hits');
    this.topBarTabHistory = this.element.querySelector('.top-bar__tab--history');
    this.topBarTabFavorite = this.element.querySelector('.top-bar__tab--favorite');
    this.buttonSearch = this.element.querySelector('.top-bar__search-button');

    if (typeof this.parameters.eventToggleMenu === 'object') {
      for (const event of this.parameters.eventToggleMenu) {
        this.topBarTabMenu.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventToggleHits === 'object') {
      for (const event of this.parameters.eventToggleHits) {
        this.topBarTabHits.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventToggleHistory === 'object') {
      for (const event of this.parameters.eventToggleHistory) {
        this.topBarTabHistory.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventToggleFavorite === 'object') {
      for (const event of this.parameters.eventToggleFavorite) {
        this.topBarTabFavorite.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventOpenSearch === 'object') {
      for (const event of this.parameters.eventOpenSearch) {
        this.buttonSearch.addEventListener(event.type, event.callback);
      }
    }

    return super.create(this.element);
  }
}

class CreateTopBarInbox extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="top-bar__tab-container">
        <button class="top-bar__tab top-bar__tab--messages top-bar__tab--active">Сообщения</button>
        <button class="top-bar__tab top-bar__tab--last-offers">Последние предложения</button>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.topBarTabMessages = this.element.querySelector('.top-bar__tab--messages');
    this.topBarTabLastOffers = this.element.querySelector('.top-bar__tab--last-offers');
    /*    this.iconBack = this.element.querySelector('.top-bar__back-button');

    this.iconBack.addEventListener('click', () => window.history.back()); */

    if (typeof this.parameters.eventToggleMessages === 'object') {
      for (const event of this.parameters.eventToggleMessages) {
        this.topBarTabMessages.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventToggleLastOffers === 'object') {
      for (const event of this.parameters.eventToggleLastOffers) {
        this.topBarTabLastOffers.addEventListener(event.type, event.callback);
      }
    }
    /* if (typeof this.parameters.eventBack === 'object') {
      for (const event of this.parameters.eventBack) {
        this.iconBack.addEventListener(event.type, event.callback);
      }
    } */

    return super.create(this.element);
  }
}

class CreateTopBarSubscription extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="top-bar__tab-container top-bar__tab-container--type--grid-equal">
        <button class="top-bar__tab top-bar__tab--actual top-bar__tab--active-light">Актуальные</button>
        <button class="top-bar__tab top-bar__tab--my">Мои</button>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.topBarTabActual = this.element.querySelector('.top-bar__tab--actual');
    this.topBarTabMy = this.element.querySelector('.top-bar__tab--my');

    if (typeof this.parameters.eventToggleActualSubscription === 'object') {
      for (const event of this.parameters.eventToggleActualSubscription) {
        this.topBarTabActual.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventToggleMySubscription === 'object') {
      for (const event of this.parameters.eventToggleMySubscription) {
        this.topBarTabMy.addEventListener(event.type, event.callback);
      }
    }

    return super.create(this.element);
  }
}

class CreateTopBarOrderCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="top-bar__content-container">
        <div class="top-bar__header">
          <button class="button top-bar__back-button">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-back.svg]]" alt="Кнопка назад" class="top-bar__icon top-bar__icon-back">
          </button>
          <button class="button top-bar__search-button button-route">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-search.svg]]" alt="Кнопка поиска" class="top-bar__icon">
          </button>
          </div>
        <h1 class="top-bar__title">${this.parameters.title}</h1>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.iconBack = this.element.querySelector('.top-bar__back-button');
    this.iconSearch = this.element.querySelector('.top-bar__search-button');

    this.iconBack.addEventListener('click', () => window.history.back());

    if (typeof this.parameters.eventBack === 'object') {
      for (const event of this.parameters.eventBack) {
        this.iconBack.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventOpenSearch === 'object') {
      for (const event of this.parameters.eventOpenSearch) {
        this.iconSearch.addEventListener(event.type, event.callback);
      }
    }

    return super.create(this.element);
  }
}

class CreateTopBarStores extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="top-bar__content-container top-bar__content-container--size--medium">
        <div class="top-bar__header-search">
          <button class="top-bar__button">
            <svg class="top-bar__icon top-bar__icon--type--close" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.192 6.34399L11.949 10.586L7.707 6.34399L6.293 7.75799L10.535 12L6.293 16.242L7.707 17.656L11.949 13.414L16.192 17.656L17.606 16.242L13.364 12L17.606 7.75799L16.192 6.34399Z" fill="white"/>
            </svg>
          </button>
          <div class="header__search">
              <input class="header__input" type="text">
              <button class="header__reset"></button>
          </div>
        </div>
      </div>
      `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.iconClose = this.element.querySelector('.top-bar__icon--type--close');
    this.resetButton = this.element.querySelector('.header__reset');
    this.searchInput = this.element.querySelector('.header__input');

    this.iconClose.addEventListener('click', () => window.history.back());

    if (typeof this.parameters.eventCloseIcon === 'object') {
      for (const event of this.parameters.eventCloseIcon) {
        this.iconClose.addEventListener(event.type, event.callback);
      }
    }
    this.resetButton.addEventListener('click', () => {
      this.searchInput.value = '';
      this.mapItems = document.querySelectorAll('.map__item');
      this.mapItems.forEach((item) => item.classList.remove('map__item--hide'));
    });
    return super.create(this.element);
  }
}

class CreateTopBarReviewOrder extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }


  create() {
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <div class="top-bar__content-container">
          <div class="top-bar__header">
            <button class="button top-bar__button top-bar__button--theme--dark top-bar__button--type--close">
              <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-close-white.svg]]" alt="Кнопка закрытия" class="top-bar__icon top-bar__icon--type--close">
            </button>
          </div>
          <h1 class="top-bar__title">Товаров в корзине (<span class="top-bar__all-counter-order"></span>)</h1>
          <span class="top-bar__info">Самовывоз по адресу</span>
          <div class="top-bar__select-container">
            <button class="top-bar__select-item top-bar__select-item--theme--dark top-bar__select-item--type--stores button-route">
              ${!isEmptyObj(userStore) ? userStore.store.shortTitle : 'Адрес магазина' || 'Адрес магазина'}
              <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-expand-direction-bottom-white.svg]]" alt="Кнопка выбора адреса магазина"
                   class="top-bar__icon top-bar__icon-arrow-down">
            </button>
            <button class=" top-bar__select-item top-bar__select-item--theme--dark top-bar__select-item--size--small top-bar__select-item--hide button-route">
              <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-man-white.svg]]" alt="" class="top-bar__icon">
              <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-expand-direction-bottom-white.svg]]" alt="Кнопка выбора"
                   class="top-bar__icon top-bar__icon-arrow-down">
            </button>
          </div>
        </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.counter = this.element.querySelector('.top-bar__all-counter-order');
    this.counter.textContent = basketArray.length.toString();
    this.buttonSearch = this.element.querySelector('.top-bar__search-button');
    this.storesButton = this.element.querySelector('.top-bar__select-item--type--stores');
    this.info = this.element.querySelector('.top-bar__info');
    this.selectContainer = this.element.querySelector('.top-bar__select-container');
    this.iconClose = this.element.querySelector('.top-bar__button--type--close');

    if (this.parameters.isClose) {
      this.iconClose.addEventListener('click', () => window.history.back());
    }

    if (typeof this.parameters.eventStores === 'object') {
      for (const event of this.parameters.eventStores) {
        this.storesButton.addEventListener(event.type, event.callback);
      }
    }

    if (typeof this.parameters.eventClose === 'object') {
      for (const event of this.parameters.eventClose) {
        this.iconClose.addEventListener(event.type, event.callback);
      }
    }

    if (this.parameters.withOutAddress) {
      this.selectContainer.remove();
      this.info.remove();
    }

    return super.create(this.element);
  }
}

class CreateTopBarOrderHistory extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create() {
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <div class="top-bar__content-container">
          <div class="top-bar__header">
            <button class="button top-bar__button top-bar__button--theme--dark top-bar__button--type--close">
              <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-close-white.svg]]" alt="Кнопка закрытия" class="top-bar__icon top-bar__icon--type--close">
            </button>
          </div>
          <h1 class="top-bar__title">Товаров в корзине (<span class="top-bar__all-counter-order"></span>)</h1>
          <span class="top-bar__info">Самовывоз по адресу</span>
          <div class="top-bar__select-container">
            <button class="top-bar__select-item top-bar__select-item--theme--dark top-bar__select-item--type--stores button-route">
              ${!isEmptyObj(userStore) ? userStore.store.shortTitle : 'Адрес магазина' || 'Адрес магазина'}
              <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-expand-direction-bottom-white.svg]]" alt="Кнопка выбора адреса магазина"
                   class="top-bar__icon top-bar__icon-arrow-down">
            </button>
            <button class=" top-bar__select-item top-bar__select-item--theme--dark top-bar__select-item--size--small top-bar__select-item--hide button-route">
              <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-man-white.svg]]" alt="" class="top-bar__icon">
              <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-expand-direction-bottom-white.svg]]" alt="Кнопка выбора"
                   class="top-bar__icon top-bar__icon-arrow-down">
            </button>
          </div>
        </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.counter = this.element.querySelector('.top-bar__all-counter-order');
    this.counter.textContent = basketArray.length.toString();
    this.buttonSearch = this.element.querySelector('.top-bar__search-button');
    this.storesButton = this.element.querySelector('.top-bar__select-item--type--stores');
    this.info = this.element.querySelector('.top-bar__info');
    this.selectContainer = this.element.querySelector('.top-bar__select-container');
    this.iconClose = this.element.querySelector('.top-bar__button--type--close');

    if (this.parameters.isClose) {
      this.iconClose.addEventListener('click', () => window.history.back());
    }

    if (typeof this.parameters.eventStores === 'object') {
      for (const event of this.parameters.eventStores) {
        this.storesButton.addEventListener(event.type, event.callback);
      }
    }

    if (typeof this.parameters.eventClose === 'object') {
      for (const event of this.parameters.eventClose) {
        this.iconClose.addEventListener(event.type, event.callback);
      }
    }

    if (this.parameters.withOutAddress) {
      this.selectContainer.remove();
      this.info.remove();
    }

    return super.create(this.element);
  }
}


class CreateTopBarReview extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }


  create() {
    this.element = document.createElement(this.parameters.selector);
    this.template = `
    <div class="header ${isIos ? 'header--ios' : 'header--not-ios'}">
        <div class="header__top-bar">
            <button class="top-bar__button top-bar__button--type--close">
              <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-close-white.svg]]" alt="Кнопка закрытия" class="top-bar__icon top-bar__icon--type--close">
            </button>
            <div class="header__status header__status-basket">Корзина (<span class="top-bar__all-counter-order"></span>)</div>
        </div>
    </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.counter = this.element.querySelector('.top-bar__all-counter-order');
    this.counter.textContent = basketArray.length.toString();
    this.iconClose = this.element.querySelector('.top-bar__button--type--close');

    if (typeof this.parameters.eventClose === 'object') {
      for (const event of this.parameters.eventClose) {
        this.iconClose.addEventListener(event.type, event.callback);
      }
    }

    /* this.counter = this.element.querySelector('.top-bar__all-counter-order');
    this.counter.textContent = basketArray.length.toString();
    this.buttonSearch = this.element.querySelector('.top-bar__search-button');
    this.storesButton = this.element.querySelector('.top-bar__select-item--type--stores');
    this.info = this.element.querySelector('.top-bar__info');
    this.selectContainer = this.element.querySelector('.top-bar__select-container');
    this.iconClose = this.element.querySelector('.top-bar__button--type--close');

    if (this.parameters.isClose) {
      this.iconClose.addEventListener('click', () => window.history.back());
    }

    if (typeof this.parameters.eventStores === 'object') {
      for (const event of this.parameters.eventStores) {
        this.storesButton.addEventListener(event.type, event.callback);
      }
    }

    if (typeof this.parameters.eventClose === 'object') {
      for (const event of this.parameters.eventClose) {
        this.iconClose.addEventListener(event.type, event.callback);
      }
    }

    if (this.parameters.withOutAddress) {
      this.selectContainer.remove();
      this.info.remove();
    } */

    return super.create(this.element);
  }
}
