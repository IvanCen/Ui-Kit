function closeModal() {
  const modal = document.querySelector('.modal');
  const modalButtonAccept = modal.querySelector('.modal__button-accept');

  document.addEventListener('click', (event) => {
    if (event.target === modal || event.target === modalButtonAccept) {
      modal.classList.remove('modal--open');
      modal.remove();
    }
  });
}

function createModal({subject, text}) {
  const element = document.createElement('div');
  element.classList.add('modal');
  const template = `
    <div class="modal__content-container modal__content-container--visible">
      <h2 class="modal__title">${subject}</h2>
      <p class="modal__text modal__text--theme--shadow">${text}</p>
      <div class="modal__button-container">
        <button class="button button--size--small button--theme--oranges-transparent modal__button modal__button-accept">ОК</button>
      </div>
    </div>`;

  element.innerHTML = template;

  return element;
}

function createModalBankInfo(text, callback) {
  const element = document.createElement('div');
  element.classList.add('modal');
  const template = `
    <div class="modal__content-container modal__content-container--visible">
      <h2 class="modal__title">${text}</h2>
      <div class="modal__button-container">
        <button class="button button--size--small button--theme--tangerin modal__button modal__button-accept">Закрыть</button>
      </div>
    </div>`;

  element.innerHTML = template;
  const button = element.querySelector('.modal__button-accept');
  button.addEventListener('click', () => {
    callback();
  });
  return element;
}

function createModalReward(info) {
  const {
    title, description, promoCode = '', unlockDate, image,
  } = info;
  this.date = transformationUtcToLocalDate(unlockDate);

  this.element = document.createElement('div');
  this.element.classList.add('modal');
  this.template = `
    <div class="modal__content-container modal__content-container--visible">
      <h2 class="modal__title">${title}</h2>
      <div style="background-image: url(${image})" class="modal__img"></div>
      <p class="modal__text modal__text--indentation--big modal__text--size--big">${description}</p>
      <p class="modal__text modal__text--indentation--small modal__text--size--normal modal__text--theme--shadow modal__text--type--promo-code">${promoCode}</p>
      <span class="modal__text modal__text--size--small modal__text--theme--shadow modal__text--indentation--big">${this.date}</span>
      <div class="modal__button-container">
        <button class="button button--size--small button--theme--tangerin modal__button modal__button-accept">Закрыть</button>
      </div>
    </div>`;

  this.element.innerHTML = this.template;
  if (!promoCode) {
    this.promoCode = this.element.querySelector('.modal__text--type--promo-code');
    this.promoCode.remove();
  }
  return this.element;
}

function createModalInbox(info) {
  const {
    subject, message, timestamp, image,
  } = info;
  this.date = transformationUtcToLocalDate(timestamp);
  this.element = document.createElement('div');
  this.element.classList.add('modal');

  this.template = `
    <div class="modal__content-container modal__content-container--visible">
      <h2 class="modal__title">${subject}</h2>
      
      <p class="modal__text modal__text--indentation--big modal__text--size--big">${message}</p>
      <span class="modal__text modal__text--size--small modal__text--theme--shadow modal__text--indentation--big">${this.date}</span>
      <div class="modal__button-container">
        <button class="button button--size--small button--theme--tangerin modal__button modal__button-accept">Закрыть</button>
      </div>
    </div>`;

  this.element.innerHTML = this.template;

  if (image) {
    this.title = this.element.querySelector('.modal__title');
    this.templateImg = `<div style="background-image: url(${image})" className="modal__img"></div>`;
    this.title.insertAdjacentHTML('afterend', this.templateImg);
  }

  return this.element;
}

function createModalPost(modalInfo) {
  const element = document.createElement('div');
  element.classList.add('modal');
  const template = `
    <div class="modal__content-container modal__content-container--visible">
    ${modalInfo.content}
      <div class="modal__button-container">
        <button class="button button--size--small button--theme--tangerin modal__button modal__button-accept modal__button--indentation--top">Закрыть</button>
      </div>
    </div>`;

  element.innerHTML = template;

  return element;
}

function createModalEmail() {
  const element = document.createElement('div');
  element.classList.add('modal');
  const template = `
    <div class="modal__content-container modal__content-container--visible">
      <h2 class="modal__title">Подтвердите email</h2>
      <p class="modal__text modal__text--indentation--big">На ваш email была отправлена ссылка, пройдите по ней, для подтверждения.</p>
      <div class="modal__button-container">
        <button class="button button--size--small button--theme--tangerin modal__button modal__button-accept">Закрыть</button>
      </div>
    </div>`;

  element.innerHTML = template;

  return element;
}

function createModalPromoCodeClose(callback) {
  const element = document.createElement('div');
  element.classList.add('modal');
  const template = `
    <div class="modal__content-container modal__content-container--visible">
    Вы уверены, что хотите покинуть страницу оплаты? Введенный промокод, возможно, нельзя будет использовать повторно.
      <div class="modal__button-container">
        <button class="button button--size--small button--theme--tangerin modal__button modal__button-close modal__button--indentation--top">Закрыть страницу</button>
        <button class="button button--size--small button--theme--tangerin modal__button modal__button-accept modal__button--indentation--top">Остаться</button>
      </div>
    </div>`;

  element.innerHTML = template;

  const buttonClose = element.querySelector('.modal__button-close');
  buttonClose.addEventListener('click', () => {
    callback();
    toggleModal.closePage();
    toggleModal.deletePage();
  });

  return element;
}
