const topBarTabs = document.querySelectorAll('.top-bar__tab');

switchActive(topBarTabs, 'top-bar__tab--active');

class CreateTopBar extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <h1 class="top-bar__title top-bar__title--type--single">${this.parameters.textTitle}</h1>
      <div class="top-bar__nav-container">
          <button class="top-bar__button top-bar__button--type--sign-in">
            <img src="[+chunkWebPath+]/img/icon-sign-in.svg" alt="Кнопка входа" class="top-bar__icon">
            <span class="top-bar__icon-text">Sign in</span>
          </button>
          <button class="top-bar__button top-bar__button--type--inbox">
            <img src="[+chunkWebPath+]/img/icon-inbox.svg" alt="Кнопка сообщений" class="top-bar__icon">
            <img src="[+chunkWebPath+]/img/icon-dot.svg" alt="Иконка непрочитанного сообщения" class="top-bar__icon-dot">
            <span class="top-bar__icon-text">Inbox</span>
          </button>
            <button class="top-bar__button">
              <img src="[+chunkWebPath+]/img/icon-history.svg" alt="Кнопка истории заказов" class="top-bar__icon">
              <span class="top-bar__icon-text">History</span>
             </button>
            <button class="top-bar__button top-bar__button--position--right"></button>
          <button class="top-bar__button top-bar__button--position--right top-bar__button--type--account">
            <img src="[+chunkWebPath+]/img/icon-accaunt.svg" alt="Кнопка входа в личный кабинет" class="top-bar__icon">
          </button>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonSignIn = this.element.querySelector('.top-bar__button--type--sign-in');
    this.buttonInbox = this.element.querySelector('.top-bar__button--type--inbox');
    this.buttonAccount = this.element.querySelector('.top-bar__button--type--account');

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
            <img src="[+chunkWebPath+]/img/icon-close-white.svg" alt="Кнопка закрытия" class="top-bar__icon top-bar__icon--type--close">
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

    return super.create(this.element);
  }
}

class CreateTopBarDarkWithCloseIcon extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="top-bar__content-container">
        <div class="top-bar__header top-bar__header--indentation--top">
          <button class="top-bar__button">
            <img src="[+chunkWebPath+]/img/icon-close-white.svg" alt="Кнопка закрытия" class="top-bar__icon top-bar__icon--type--close">
          </button>
          <h1 class="top-bar__header-title top-bar__header-title--type--uppercase">${this.parameters.textTitle}</h1>
        </div>
        
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
            <img src="[+chunkWebPath+]/img/icon-back.svg" alt="Кнопка назад" class="top-bar__icon top-bar__icon-back">
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
            <img src="[+chunkWebPath+]/img/icon-back.svg" alt="Кнопка назад" class="top-bar__icon top-bar__icon-back">
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
          <button class="button top-bar__search-button">
            <img src="[+chunkWebPath+]/img/icon-search.svg" alt="Кнопка поиска" class="top-bar__icon">
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
            <img src="[+chunkWebPath+]/img/icon-back.svg" alt="Кнопка назад" class="top-bar__icon top-bar__icon-back">
          </button>
        </div>
        <h1 class="top-bar__title">Inbox</h1>
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

class CreateTopBarOrderCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="top-bar__content-container top-bar__content-container--size--small">
        <div class="top-bar__header">
          <button class="button top-bar__back-button">
            <img src="[+chunkWebPath+]/img/icon-back.svg" alt="Кнопка назад" class="top-bar__icon top-bar__icon-back">
          </button>
          <button class="button top-bar__search-button">
            <img src="[+chunkWebPath+]/img/icon-search.svg" alt="Кнопка поиска" class="top-bar__icon">
          </button>
          </div>
        <h1 class="top-bar__title">${this.parameters.title}</h1>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.iconBack = this.element.querySelector('.top-bar__back-button');
    if (typeof this.parameters.eventBack === 'object') {
      for (const event of this.parameters.eventBack) {
        this.iconBack.addEventListener(event.type, event.callback);
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
      <div class="top-bar__content-container top-bar__content-container--size--small">
        <div class="top-bar__header">
          <button class="button button--size--small top-bar__filter-button">Фильтр</button>
          <button class="button top-bar__search-button">
          <img src="[+chunkWebPath+]/img/icon-search.svg" alt="Кнопка поиска" class="top-bar__icon">
          </button>
        </div>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonFilter = this.element.querySelector('.top-bar__filter-button');
    this.buttonSearch = this.element.querySelector('.top-bar__search-button');

    if (typeof this.parameters.eventOpenFilter === 'object') {
      for (const event of this.parameters.eventOpenFilter) {
        this.buttonFilter.addEventListener(event.type, event.callback);
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

class CreateTopBarReviewOrder extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <div class="top-bar__content-container top-bar__content-container--size--small">
          <div class="top-bar__header">
            <button class="button top-bar__button top-bar__button--theme--dark top-bar__button--type--back">
              <img src="[+chunkWebPath+]/img/icon-back.svg" alt="Кнопка назад"
                   class="top-bar__icon top-bar__icon-back">
            </button>
          </div>
          <h1 class="top-bar__title">Review order (<span class="top-bar__all-counter-order"></span>)</h1>
          <span class="top-bar__info">Самовывоз по адресу</span>
          <div class="top-bar__select-container">
            <button class="top-bar__select-item top-bar__select-item--theme--dark">
              Адрес магазина
              <img src="[+chunkWebPath+]/img/icon-expand-direction-bottom-white.svg" alt="Кнопка выбора адреса магазина"
                   class="top-bar__icon top-bar__icon-arrow-down">
            </button>
            <button class=" top-bar__select-item top-bar__select-item--theme--dark top-bar__select-item--size--small">
              <img src="[+chunkWebPath+]/img/icon-man-white.svg" alt="" class="top-bar__icon">
              <img src="[+chunkWebPath+]/img/icon-expand-direction-bottom-white.svg" alt="Кнопка выбора"
                   class="top-bar__icon top-bar__icon-arrow-down">
            </button>
          </div>
        </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonFilter = this.element.querySelector('.top-bar__filter-button');
    this.buttonSearch = this.element.querySelector('.top-bar__search-button');

    this.iconBack = this.element.querySelector('.top-bar__button--type--back');
    if (typeof this.parameters.eventBack === 'object') {
      for (const event of this.parameters.eventBack) {
        this.iconBack.addEventListener(event.type, event.callback);
      }
    }

    return super.create(this.element);
  }
}
