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
        <h2 class="main-card__title main-card__title--size--normal">${postInfo.title}</h2>
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
          <div style="background-image: url('https://app.xleb.ru/assets/images/docs/381/love.jpg')"  class="main-card__img"></div>
        </div>
        <div class="main-card__text-area">
          <h2 class="main-card__title main-card__title--size--normal">${this.parameters.title}</h2>
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

class CreateNoSubscriptionsMainCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <div class="main-card__img-container">
          <div style="background-image: url('[+chunkWebPath+]/img/no-subscriptions.png')" class="main-card__img"></div>
        </div>
        <div class="main-card__text-area main-card__text-area--pisition--center">
        <h2 class="main-card__title main-card__title--size--normal">У вас еще нет активных абонементов</h2>
          <p class="main-card__text main-card__text--size--small main-card__text--theme--shadow">Приобрести их вы можете в любом магазине сети Хлебник</p>
        </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateSubscriptionsMainCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(subscriptionInfo, subscriptionUserInfo) {
    const {
      title, image, duration, id, description,
    } = subscriptionInfo;
    let date = `Действителен ${duration} дней`;

    const dateNowLocal = (new Date().toLocaleString('ru', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).replace('.', '').replace(' г.', ''));
    let templateAddress;
    if (subscriptionUserInfo) {
      date = `Действителен до ${transformationUtcToLocalDate(subscriptionUserInfo.endDate, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).replace('г.', '')}`;
      const shopName = storesDataObj.successData[subscriptionUserInfo.shopId].longTitle;
      templateAddress = `<div class="main-card__address-container">
          <div style="background-image: url('data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-point.svg]]')" class="main-card__icon--type--point"></div>
          <span class="main-card__address">${shopName}</span>
        </div>`;
    }

    this.element = document.createElement(this.parameters.selector);
    this.template = `
    <div class="main-card__content-container main-card__content-container--subscription">
      <div class="main-card__img-container">
        <div style="background-image: url('${image}')" class="main-card__img main-card__img--size--small"></div>
      </div>
      <div class="main-card__text-area main-card__text-area--type--subscription">
        <h2 class="main-card__title main-card__title--indentation--small main-card__title--size--big">${title}</h2>
        <p class="main-card__text main-card__date main-card__text--size--small main-card__text--theme--shadow main-card__text--indentation--bottom">${date}</p>
        
        <span class="main-card__text main-card__text--text--bold main-card__text--indentation--bottom-small">Условия:</span>
      </div>
    </div>
     <div class="main-card__content-container main-card__content-container--qr main-card__content-container--hide">
        <div class="main-card__text-area main-card__text-area--position--center">
          <h2 class="main-card__title main-card__title--indentation--small main-card__title--size--big">Отсканируйте код, чтобы получить скидку</h2>
        </div>
        <div class="main-card__img-container">
          <div class="main-card__img-qr"></div>
        </div>
        <div class="main-card__text-area main-card__text-area--position--center">
          <span class="main-card__text main-card__text--type--address main-card__text--indentation--bottom-small">г. Санкт-Петербург, проспект Металлистов, д 110</span>
          <span class="main-card__text main-card__text--size--small main-card__text--theme--shadow main-card__text--indentation--bottom-small">${dateNowLocal}</span>
        </div>
      </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.textArea = this.element.querySelector('.main-card__text-area--type--subscription');
    this.textArea.insertAdjacentHTML('beforeend', description);
    if (this.parameters.qr) {
      this.date = this.element.querySelector('.main-card__date');
      this.date.insertAdjacentHTML('afterend', templateAddress);
      this.contentContainer = this.element.querySelector('.main-card__content-container');
      /* eslint-disable-next-line */
      this.qrTemplate = `<div style="background-image: url('data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-qr.svg]]')" class="main-card__icon main-card__icon--type--qr"></div>`;
      this.contentContainer.insertAdjacentHTML('afterend', this.qrTemplate);
      this.qr = this.element.querySelector('.main-card__icon--type--qr');
      this.qrImage = this.element.querySelector('.main-card__img-qr');
      const qr = new QRCode(this.qrImage,
        {
          text: authorizationPhone,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H,
        });
      this.qr.addEventListener('click', () => {
        this.conentContainerQr = this.element.querySelector('.main-card__content-container--qr');
        this.conentContainerSubscription = this.element.querySelector('.main-card__content-container--subscription');
        if (this.qr.classList.contains('main-card__icon--type--qr')) {
          this.qr.classList.remove('main-card__icon--type--qr');
          this.conentContainerSubscription.classList.add('main-card__content-container--hide');
          this.conentContainerQr.classList.remove('main-card__content-container--hide');
          this.qr.classList.add('main-card__icon--type--close');
          this.qr.style.backgroundImage = "url('data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-close-white.svg]]')";
        } else {
          this.conentContainerSubscription.classList.remove('main-card__content-container--hide');
          this.conentContainerQr.classList.add('main-card__content-container--hide');
          this.qr.classList.add('main-card__icon--type--qr');
          this.qr.classList.remove('main-card__icon--type--close');
          this.qr.style.backgroundImage = "url('data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-qr.svg]]')";
        }
      });
    }
    /* const imgEl = this.element.querySelector('.main-card__img');
    if (!canUseWebP()) {
      loadImg(productInfo, imgEl, 'jpg');
    } else {
      loadImg(productInfo, imgEl, 'webp');
    } */
    return super.create(this.element);
  }
}


class CreateTextMainCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <div class="main-card__text-area">
          <p class="main-card__text main-card__text--size--big">${this.parameters.text}</p>
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
          <h2 class="main-card__title main-card__title--size--normal">${this.parameters.title}</h2>
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
      id, subject, client, timestamp, wasRead, message,
    } = messageInfo;
    console.log(messageInfo);
    this.date = transformationUtcToLocalDate(timestamp, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <div class="messages__element-icon messages__element-icon--heart"></div>
          <div class="messages__element-body">
              <div class="messages__element-title">${subject}</div>
              <div class="messages__element-wrapper">
                  <div class="messages__element-text">${message}</div>
                  <div class="messages__element-date">${this.date}</div>
              </div>
          </div>
        `;

    this.element.insertAdjacentHTML('beforeend', this.template);
    const title = this.element.querySelector('.messages__element-title');

    if (wasRead) {
      title.classList.add('main-card__title--font-weight--normal');
    }
    this.element.addEventListener('click', () => {
      togglePageInboxDetails.rendering(messageInfo);
      inboxPage.checkMessages();
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
          <h2 class="main-card__title main-card__title--size--normal main-card__title--indentation--top">${this.parameters.title}</h2>
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
        <div class="main-card__figure main-card__figure--theme--blood main-card__figure--size--normal main-card__figure--hide"><span class="main-card__info main-card__info--out-of">Закончилось</span></div>
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
      <h2 class="main-card__title main-card__title--size--normal">${this.parameters.title}</h2>`;
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
