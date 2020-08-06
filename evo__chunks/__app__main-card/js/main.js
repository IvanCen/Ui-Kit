class CreateMainCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(postInfo) {
    this.element = document.createElement('div');
    this.element.classList.add('main-card--type--border', 'main-card--theme--shadow');
    this.template = `
      <div class="main-card__img-container">
        <div class="main-card__img"></div>
      </div>
      <div class="main-card__text-area">
        <h2 class="main-card__title">${postInfo.title}</h2>
        <p class="main-card__text">${postInfo.intro}</p>
      </div>
      <div class="main-card__button-container main-card__button-container--indentation--left main-card__button-container--indentation--bottom">
        <button class="button button--size--small button--theme--tangerin main-card__button">${postInfo.linkTitle}</button>
      </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.button = this.element.querySelector('.main-card__button');
    this.imgContainer = this.element.querySelector('.main-card__img-container');
    this.button.addEventListener('click', () => {
      toggleModal.renderingPost(postInfo);
      toggleModal.openPage();
    });
    this.imgContainer.addEventListener('click', () => {
      toggleModal.renderingPost(postInfo);
      toggleModal.openPage();
    });
    const imgEl = this.element.querySelector('.main-card__img');
    const infoImg = { mainPhoto: { name: postInfo.mainPhoto, edit: postInfo.mainPhotoEdit } };
    if (!canUseWebP()) {
      loadImgNotSquare(infoImg, imgEl, 'jpg');
    } else {
      loadImgNotSquare(infoImg, imgEl, 'webp');
    }

    return this.element;
  }
}

class CreateOurHistoryMainCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <div class="main-card__img-container">
          <div style="background-image: url('/assets/images/docs/381/love.jpg')" class="main-card__img"></div>
        </div>
        <div class="main-card__text-area">
          <h2 class="main-card__title">${this.parameters.title}</h2>
          <p class="main-card__text">${this.parameters.text}</p>
        </div>
        <div class="main-card__button-container main-card__button-container--indentation--left main-card__button-container--indentation--bottom">
          <button class="button button--size--small button--theme--tangerin main-card__button">${this.parameters.buttonText}</button>
        </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.button = this.element.querySelector('.main-card__button');
    this.imgContainer = this.element.querySelector('.main-card__img-container');
    this.button.addEventListener('click', () => {
      togglePageOurHistory.rendering();
    });
    this.imgContainer.addEventListener('click', () => {
      togglePageOurHistory.rendering();
    });
    return super.create(this.element);
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
    this.create = this.create.bind(this);
  }

  create(messageInfo) {
    const {
      id, subject, client, timestamp, wasRead,
    } = messageInfo;

    this.date = transformationUtcToLocalDate(timestamp);

    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <div class="main-card__text-area">
          <h2 class="main-card__title">${subject}</h2>
          <span class="main-card__info main-card__info--theme--shadow">${this.date}</span>
        </div>
        `;

    this.element.insertAdjacentHTML('beforeend', this.template);
    const title = this.element.querySelector('.main-card__title');

    if (wasRead) {
      title.classList.add('main-card__title--font-weight--normal');
    }
    this.element.addEventListener('click', () => {
      toggleModal.renderingInbox(messageInfo);
      if (!wasRead) {
        api.markMessageRead(client, timestamp, id);
      }
      title.classList.add('main-card__title--font-weight--normal');
    });
    return super.create(this.element);
  }
}

class CreateInboxMainCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    // <img src="[+chunkWebPath+]/img/main-card-noimg.jpg" alt="" class="main-card__img">
    this.template = `
       
        <div class="main-card__text-area">
          <h2 class="main-card__title main-card__title--indentation--top">${this.parameters.title}</h2>
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
        <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-close.svg]]" alt="" class="main-card__icon main-card__icon-close">
        <div class="main-card__content-img"></div>
        <h2 class="main-card__content-title main-card__content-title">${this.parameters.title}</h2>
        <div class="main-card__figure main-card__figure--hide"><span class="main-card__info main-card__info--out-of">Закончилось</span></div>
      </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.iconClose = this.element.querySelector('.main-card__icon-close');
    this.figure = this.element.querySelector('.main-card__figure');

    if (typeof this.parameters.eventCloseIcon === 'object') {
      for (const event of this.parameters.eventCloseIcon) {
        this.iconClose.addEventListener(event.type, event.callback);
      }
    }
    if (!isEmptyObj(outOfStock)) {
      for (const id in outOfStock.successData.itemsAndModifiers) {
        if (Number(id) === productInfo.id) {
          this.figure.classList.remove('main-card__figure--hide');
          break;
        }
      }
    }

    const imgEl = this.element.querySelector('.main-card__content-img');
    if (!canUseWebP()) {
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
