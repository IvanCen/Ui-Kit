class CreateMainCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(postInfo) {
    this.element = document.createElement('div');
    this.element.classList.add('main-card--type--border', 'main-card--theme--shadow');
    this.template = `
      <img src="${postInfo.mainPhoto}" alt="" class="main-card__img">
      <div class="main-card__text-area">
        <h2 class="main-card__title">${postInfo.title}</h2>
        <p class="main-card__text">${postInfo.intro}</p>
      </div>
      <div class="main-card__button-container main-card__button-container--indentation--left main-card__button-container--indentation--bottom">
        <button class="button button--size--small button--theme--tangerin main-card__button">${postInfo.linkTitle}</button>
      </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.button = this.element.querySelector('.main-card__button');
    this.button.addEventListener('click', () => {
      toggleModal.renderingPost(postInfo);
      toggleModal.openPage();
    });

    return this.element;
  }
}

class CreateCardsMainCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <img src="[+chunkWebPath+]/img/main-card-noimg.jpg" alt="" class="main-card__img">
        <div class="main-card__text-area">
          <p class="main-card__text">${this.parameters.text}</p>
        </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateCardsBalanceMainCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <div class="main-card__text-area">
          <p class="main-card__text">${this.parameters.text}</p>
        </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateOrderMainCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <img src="[+chunkWebPath+]/img/main-card-noimg.jpg" alt="" class="main-card__img">
        <div class="main-card__text-area">
          <h2 class="main-card__title">${this.parameters.title}</h2>
          <p class="main-card__text">${this.parameters.text}</p>
        </div>
        <div class="main-card__button-container main-card__button-container--indentation--left main-card__button-container--indentation--bottom">
          <button class="button button--size--small button--theme--tangerin main-card__button main-card__button-sign-in">Sign in</button>
          <button class="button button--size--small button--theme--tangerin-transparent main-card__button main-card__button-join-now">Join now</button>
        </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonSignIn = this.element.querySelector('.main-card__button-sign-in');
    this.buttonJoinNow = this.element.querySelector('.main-card__button-join-now');
    if (typeof this.parameters.eventOpenSignInPage === 'object') {
      for (const event of this.parameters.eventOpenSignInPage) {
        this.buttonSignIn.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventOpenJoinNowPage === 'object') {
      for (const event of this.parameters.eventOpenJoinNowPage) {
        this.buttonJoinNow.addEventListener(event.type, event.callback);
      }
    }
    return super.create(this.element);
  }
}

class CreateInboxMainCardNews extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <img src="[+chunkWebPath+]/img/main-card-noimg.jpg" alt="" class="main-card__img">
        <div class="main-card__text-area">
          <h2 class="main-card__title">${this.parameters.title}</h2>
          <p class="main-card__text">${this.parameters.text}</p>
        </div>
        <div class="main-card__button-container main-card__button-container--indentation--left main-card__button-container--indentation--bottom">
          <button class="button button--size--small button--theme--tangerin main-card__button main-card__button-details">Подробнее</button>
          <button class="button button--size--small button--theme--tangerin-transparent main-card__button main-card__button-delete">Удалить</button>
        </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.buttonDetails = this.element.querySelector('.main-card__button-details');
    this.buttonDelete = this.element.querySelector('.main-card__button-delete');
    if (typeof this.parameters.eventOpenDetails === 'object') {
      for (const event of this.parameters.eventOpenDetails) {
        this.buttonDetails.addEventListener(event.type, event.callback);
      }
    }
    this.buttonDelete.addEventListener('click', () => this.element.remove());

    return super.create(this.element);
  }
}

class CreateInboxMainCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <img src="[+chunkWebPath+]/img/main-card-noimg.jpg" alt="" class="main-card__img">
        <div class="main-card__text-area">
          <h2 class="main-card__title">${this.parameters.title}</h2>
          <p class="main-card__text">${this.parameters.text}</p>
        </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateOrderProductMainCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
  }

  create(productInfo) {
    this.template = `
      <div class="main-card__content">
        <img src="[+chunkWebPath+]/img/icon-close.svg" alt="" class="main-card__icon main-card__icon-close">
        <div alt="" class="main-card__content-img"></div>
        <h2 class="main-card__content-title main-card__content-title">${this.parameters.title}</h2>
      </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.iconClose = this.element.querySelector('.main-card__icon-close');
    if (typeof this.parameters.eventCloseIcon === 'object') {
      for (const event of this.parameters.eventCloseIcon) {
        this.iconClose.addEventListener(event.type, event.callback);
      }
    }

    const imgEl = this.element.querySelector('.main-card__content-img');
    if (iOS()) {
      loadImg(productInfo, imgEl, 'jpg');
    } else {
      loadImg(productInfo, imgEl, 'webp');
    }

    return super.create(this.element);
  }
}

class CreateGiftMainCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <img src="[+chunkWebPath+]/img/main-card-noimg.jpg" alt="" class="main-card__img main-card__img--theme--shadow">
      <h2 class="main-card__title">${this.parameters.title}</h2>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    if (typeof this.parameters.eventOpenCard === 'object') {
      for (const event of this.parameters.eventOpenCard) {
        this.element.addEventListener(event.type, event.callback);
      }
    }

    return super.create(this.element);
  }
}
