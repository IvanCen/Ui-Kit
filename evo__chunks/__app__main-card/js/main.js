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
          <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/no-subscriptions.svg]]" class="basket__empty-section-img" alt="">
        </div>
        <div class="main-card__text-area main-card__text-area--position--center">
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
    const { buy = true } = this.parameters;
    let date = `Действителен ${duration} дней`;

    let shopName = '';
    if (subscriptionUserInfo) {
      date = `Действителен до ${transformationUtcToLocalDate(subscriptionUserInfo.endDate, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).replace('г.', '')}`;
      shopName = storesDataObj.successData[subscriptionUserInfo.shopId].longTitle;
    }

    this.element = document.createElement(this.parameters.selector);
    this.template = `
    <div class="main-card__content-container main-card__content-container--subscription">
      <div class="main-card__img-container">
        <div style="background-image: url('https://app.xleb.ru/${image}')" class="main-card__img main-card__img--size--small"></div>
      </div>
      <div class="main-card__text-area main-card__text-area--type--subscription">
        <h2 class="main-card__title main-card__title--indentation--small main-card__title--size--big">${title}</h2>
        <p class="main-card__text main-card__date main-card__text--size--small main-card__text--theme--shadow main-card__text--indentation--bottom">${date}</p>
        <div class="main-card__address-container">
          <div style="background-image: url('data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-point.svg]]')" class="main-card__icon--type--point"></div>
          <span class="main-card__address">${shopName}</span>
        </div>
        <span class="main-card__text main-card__text--text--bold main-card__text--indentation--bottom-small">Условия:</span>
        ${description}
        <div class="basket__header basket__header--dark accordion__trigger">
            <div class="basket__title">Купить абонемент</div>
        </div>
        <section class="accordion__container">
            <div class="form__group basket__group">
              <div class="form__group basket__group">
                <label class="form__label form__label--creditCard">
                    <input id="creditCard" type="radio" class="form__input" name="payment" checked>
                    Банковская карта
                </label>
                <label class="form__label form__label--balance">
                    <input id="balance" type="radio" class="form__input" name="payment">
                    Баланс ${userInfoObj.successData.balance || ''}
                </label>
                <label class="form__label form__label--bonus form__label--indention--bottom">
                    <input id="bonus" type="radio" class="form__input" name="payment">
                    Бонусы ${userInfoObj.successData.bonus || ''}
                </label>
            </div>
            <button class="button button--theme--tangerin button--size--medium">Купить</button>
          </div>
        </section>
      </div>
    </div>
     `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.trigger = this.element.querySelector('.accordion__trigger');
    this.buttonBuy = this.element.querySelector('.button');
    this.inputs = this.element.querySelectorAll('.form__input');

    if (!buy) {
      this.element.querySelector('.accordion__container').remove();
      this.element.querySelector('.accordion__trigger').remove();
    }

    this.trigger.addEventListener('click', (e) => {
      const container = document.querySelector('.accordion__container');
      this.trigger.classList.toggle('accordion__trigger--active');
      container.classList.toggle('accordion__container--show');
      if (container.style.maxHeight) {
        container.style.maxHeight = null;
      } else {
        container.style.maxHeight = `${container.scrollHeight}px`;
      }
    });

    this.buttonBuy.addEventListener('click', () => {
      api.makeOrderApi(
        userInfoObj.successData.phone,
        [],
        userStore.store.id,
        '',
        {},
        '',
        'toGo',
        id,
      ).then((data) => {
        if (data.success) {
          [...this.inputs].forEach((item) => {
            if (item.checked) {
              api.payOrderApi(item.id, orderInfo.successData)
                .then((payInfo) => {
                  if (payInfo.success) {
                    let successText = 'Ваш заказ успешно оплачен';
                    let successTextTimeout = 300;
                    if (typeof payInfo.successData.payUrl !== 'undefined') {
                      successText = 'Если платеж был успешным, то скоро мы получим его и обновим статус вашего заказа или доставим средства на счет';
                      successTextTimeout = 2000;
                      const link = document.querySelector('.text-area__link');
                      document.location.href = payInfo.successData.payUrl;
                      link.href = payInfo.successData.payUrl;
                      link.click();
                    }
                    setTimeout(() => {
                      this.trigger.click();
                      toggleModal.rendering({ subject: 'Информация', text: successText });
                    }, successTextTimeout);
                  } else {
                    toggleModal.rendering({ subject: 'Ошибка', text: payInfo.errors[0] });
                  }
                }).then(() => api.getClientSeasons());
            }
          });
        } else {
          toggleModal.rendering({ subject: 'Ошибка', text: data.errors[0] });
        }
      });
    });

    /*const imgEl = this.element.querySelector('.main-card__img');
    if (!canUseWebP()) {
      loadImg(subscriptionInfo, imgEl, 'jpg');
    } else {
      loadImg(subscriptionInfo, imgEl, 'webp');
    }*/
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
    this.date = transformationUtcToLocalDate(timestamp, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <div class="messages__element-icon messages__element-icon--heart"></div>
          <div class="messages__element-body">
              <div class="messages__element-title">Системные сообщения</div>
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
      stopAction(() => {
        togglePageInboxDetails.rendering(messageInfo);
        if (!isEmptyObj(userMessages) && userMessages.success && userMessages.successData.messages.length !== 0 && !isEmptyObj(userInfoObj)) {
          userMessages.successData.messages.forEach((messageInfos) => {
            if (messageInfos.wasRead === null) {
              api.markMessageRead(messageInfos.client, messageInfos.timestamp, messageInfos.id);
            }
          });
        }
        inboxPage.checkMessages();
        /* if (!wasRead) {
          api.markMessageRead(client, timestamp, id);
        } */
        title.classList.add('main-card__title--font-weight--normal');
      });
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
