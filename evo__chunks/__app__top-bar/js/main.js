const topBarTabs = document.querySelectorAll('.top-bar__tab');
switchActive(topBarTabs, 'top-bar__tab--active');

class CreateTopBar extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    let balance;
    let bonus;
    if (userInfoObj.successData) {
      balance = userInfoObj.successData.balance;
      bonus = userInfoObj.successData.bonus;
    } else {
      balance = '0';
      bonus = '0';
    }
    const date = new Date();
    const timeNow = [date.getHours(), date.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(':');
    this.template = `
      <div class="top-bar__content-container top-bar__content-container--theme--dark ${isIos ? 'top-bar__content-container--size--big--ios' : 'top-bar__content-container--size--big'}">
        <h1 class="top-bar__title top-bar__title--type--single">${this.parameters.textTitle}</h1>
        <div class="top-bar__content-container top-bar__content-container--score top-bar__content-container--direction--row
         top-bar__content-container--position-items--space-between top-bar__content-container--indentation--bottom">
          <div class="top-bar__content-container top-bar__content-container--direction--column">
            <p class="top-bar__text">Доступно на сегодня, ${timeNow}</p>
            <span class="top-bar__number top-bar__number--theme--white top-bar__number--size--normal">${balance}</span>
            <div class="top-bar__bonus-container">
              <span class="top-bar__number top-bar__number--size--small">${bonus}</span>
              <svg class="top-bar__icon top-bar__icon--heart" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 8.28003C23 5.10003 20.41 2.53003 17.25 2.53003C14.96 2.53003 12.98 3.87003 12.05 5.82003C12.03 5.86003 11.97 5.86003 11.96 5.82003C11.04 3.88003 9.05 2.53003 6.76 2.53003C3.58 2.53003 1 5.10003 1 8.28003C1 8.95003 1.11 9.59003 1.33 10.19C1.57 10.87 1.94 11.5 2.4 12.03C2.6 12.26 2.81 12.47 3.04 12.67L11.82 21.39C11.87 21.44 11.94 21.47 12.02 21.47C12.1 21.47 12.16 21.45 12.22 21.39L21.33 12.34C21.92 11.75 22.39 11.03 22.67 10.23C22.88 9.62003 23 8.96003 23 8.28003Z" fill="#E3562F"/>
              </svg>
            </div>
          </div>
          <button class="top-bar__button top-bar__button--type--fill button-route">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-rubles-white.svg]]" alt="Иконка рубля" class="top-bar__icon-ruble">
          </button>   
        </div>
      </div>
      <div class="top-bar__nav-container">
          <button class="top-bar__button top-bar__button--type--sign-in button-route">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-sign-in.svg]]" alt="Кнопка входа" class="top-bar__icon">
            <span class="top-bar__icon-text ">Войти</span>
          </button>
          <button class="top-bar__button top-bar__button--type--inbox button-route">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-inbox.svg]]" alt="Кнопка сообщений" class="top-bar__icon">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-dot.svg]]" alt="Иконка непрочитанного сообщения" class="top-bar__icon-dot top-bar__icon-dot--hide">
            <span class="top-bar__icon-text ">Сообщения</span>
          </button>
            <button class="top-bar__button top-bar__button--type--history button-route">
              <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-history.svg]]" alt="Кнопка истории заказов" class="top-bar__icon">
              <span class="top-bar__icon-text ">История</span>
             </button>
            <button class="top-bar__button top-bar__button--position--right"></button>
          <button class="top-bar__button top-bar__button--position--right top-bar__button--type--account button-route">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-accaunt.svg]]" alt="Кнопка входа в личный кабинет" class="top-bar__icon">
          </button>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonSignIn = this.element.querySelector('.top-bar__button--type--sign-in');
    this.buttonInbox = this.element.querySelector('.top-bar__button--type--inbox');
    this.buttonAccount = this.element.querySelector('.top-bar__button--type--account');
    this.buttonHistory = this.element.querySelector('.top-bar__button--type--history');
    this.buttonBalanceFill = this.element.querySelector('.top-bar__button--type--fill');
    this.navContainer = this.element.querySelector('.top-bar__nav-container');
    this.buttonContainerScore = this.element.querySelector('.top-bar__content-container--score');

    if (typeof this.parameters.eventOpenHistory === 'object') {
      for (const event of this.parameters.eventOpenHistory) {
        this.buttonHistory.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventOpenSignInPage === 'object') {
      for (const event of this.parameters.eventOpenSignInPage) {
        this.buttonSignIn.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventOpenInboxPage === 'object') {
      for (const event of this.parameters.eventOpenInboxPage) {
        this.buttonInbox.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventOpenAccountPage === 'object') {
      for (const event of this.parameters.eventOpenAccountPage) {
        this.buttonAccount.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventOpenBalanceFill === 'object') {
      for (const event of this.parameters.eventOpenBalanceFill) {
        this.buttonBalanceFill.addEventListener(event.type, event.callback);
      }
    }

    if (!isEmptyObj(userInfoObj)) {
      this.buttonSignIn.remove();
    } else {
      this.navContainer.remove();
      this.buttonContainerScore.remove();
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
          toggleSubPageProductCard.clearPage();
          toggleSubPageProductCard.rendering(productInfo);
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
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-back.svg]]" alt="Кнопка назад" class="top-bar__icon top-bar__icon-back">
          </button>
        </div>
        <h1 class="top-bar__title">${this.parameters.textTitle}</h1>
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
      <div class="top-bar__content-container top-bar__content-container--size--small">
        <div class="top-bar__header">
         <button class="button top-bar__back-button">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-back.svg]]" alt="Кнопка назад" class="top-bar__icon top-bar__icon-back">
          </button>
        </div>
        <h1 class="top-bar__title">Входящие сообщения</h1>
      </div>
      <div class="top-bar__tab-container">
        <button class="top-bar__tab top-bar__tab--messages top-bar__tab--active">Сообщения</button>
        <button class="top-bar__tab top-bar__tab--last-offers">Последние предложения</button>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.topBarTabMessages = this.element.querySelector('.top-bar__tab--messages');
    this.topBarTabLastOffers = this.element.querySelector('.top-bar__tab--last-offers');
    this.iconBack = this.element.querySelector('.top-bar__back-button');

    this.iconBack.addEventListener('click', () => window.history.back());

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
    if (typeof this.parameters.eventBack === 'object') {
      for (const event of this.parameters.eventBack) {
        this.iconBack.addEventListener(event.type, event.callback);
      }
    }

    return super.create(this.element);
  }
}

class CreateTopBarSubscription extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="top-bar__content-container top-bar__content-container--size--small">
        <div class="top-bar__header">
         <button class="button top-bar__back-button">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-back.svg]]" alt="Кнопка назад" class="top-bar__icon top-bar__icon-back">
          </button>
          <h1 class="top-bar__title top-bar__title--size--small top-bar__title--theme--light">Абонементы</h1>
        </div>
      </div>
      <div class="top-bar__tab-container top-bar__tab-container--type--grid-equal">
        <button class="top-bar__tab top-bar__tab--actual top-bar__tab--active-light">Актуальные</button>
        <button class="top-bar__tab top-bar__tab--my">Мои</button>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.topBarTabActual = this.element.querySelector('.top-bar__tab--actual');
    this.topBarTabMy = this.element.querySelector('.top-bar__tab--my');
    this.iconBack = this.element.querySelector('.top-bar__back-button');

    this.iconBack.addEventListener('click', () => window.history.back());

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
    if (typeof this.parameters.eventBack === 'object') {
      for (const event of this.parameters.eventBack) {
        this.iconBack.addEventListener(event.type, event.callback);
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
    // <button class="button button--size--small top-bar__filter-button">Фильтр</button> кнопка фильтра, добавить позже
    this.template = `
      <div class="top-bar__content-container top-bar__content-container--size--medium">
        <div class="top-bar__header">
          <button class="top-bar__button">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-close-white.svg]]" alt="Кнопка закрытия" class="top-bar__icon top-bar__icon--type--close">
          </button>
          <button class="button top-bar__search-button top-bar__search-button--store button-route">
          <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-search.svg]]" alt="Кнопка поиска" class="top-bar__icon">
          </button>
        </div>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    // this.buttonFilter = this.element.querySelector('.top-bar__filter-button');
    this.buttonSearch = this.element.querySelector('.top-bar__search-button');
    this.iconClose = this.element.querySelector('.top-bar__icon--type--close');

    this.iconClose.addEventListener('click', () => window.history.back());

    if (typeof this.parameters.eventCloseIcon === 'object') {
      for (const event of this.parameters.eventCloseIcon) {
        this.iconClose.addEventListener(event.type, event.callback);
      }
    }
    /* if (typeof this.parameters.eventOpenFilter === 'object') {
      for (const event of this.parameters.eventOpenFilter) {
        this.buttonFilter.addEventListener(event.type, event.callback);
      }
    } */
    if (typeof this.parameters.eventOpenSearch === 'object') {
      for (const event of this.parameters.eventOpenSearch) {
        this.buttonSearch.addEventListener(event.type, event.callback);
      }
    }

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
