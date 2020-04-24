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
          <button class="top-bar__button">
            <img src="[+chunkWebPath+]/img/icon-inbox.svg" alt="Кнопка сообщений" class="top-bar__icon">
            <img src="[+chunkWebPath+]/img/icon-dot.svg" alt="Иконка непрочитанного сообщения" class="top-bar__icon-dot">
            <span class="top-bar__icon-text">Inbox</span>
          </button>
            <button class="top-bar__button">
              <img src="[+chunkWebPath+]/img/icon-history.svg" alt="Кнопка истории заказов" class="top-bar__icon">
              <span class="top-bar__icon-text">History</span>
             </button>
            <button class="top-bar__button top-bar__button--position--right"></button>
          <button class="top-bar__button top-bar__button--position--right">
            <img src="[+chunkWebPath+]/img/icon-accaunt.svg" alt="Кнопка входа в личный кабинет" class="top-bar__icon">
          </button>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonSignIn = this.element.querySelector('.top-bar__button--type--sign-in');
    if (typeof this.parameters.eventOpenSignInPage === 'object') {
      for (const event of this.parameters.eventOpenSignInPage) {
        this.buttonSignIn.addEventListener(event.type, event.callback);
      }
    }
    return super.create(this.element);
  }
}

class CreateTopBarSignIn extends CreateItem {
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
    if (typeof this.parameters.text === 'object') {
      this.element.textContent = this.parameters.text;
    }

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
