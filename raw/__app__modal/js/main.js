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

function createModal(text) {
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
  const element = document.createElement('div');
  element.classList.add('modal');
  const template = `
          <div class="modal__content-container modal__content-container--visible">
            <h2 class="modal__title">${info.title}</h2>
            <div style="background-image: url('[+chunkWebPath+]/img/img__main-card--reward.jpg')"alt="" class="modal__img"></div>
            <p class="modal__text modal__text--indentation--big modal__text--size--big">${info.text}</p>
            <p class="modal__text modal__text--indentation--small modal__text--size--normal modal__text--theme--shadow">${info.promoCode}</p>
            <span class="modal__text modal__text--size--small modal__text--theme--shadow modal__text--indentation--big">${info.date}</span>
            <div class="modal__button-container">
              <button class="button button--size--small button--theme--tangerin modal__button modal__button-accept">Закрыть</button>
            </div>
          </div>`;

  element.innerHTML = template;

  return element;
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
  const button = element.querySelector('.modal__button-accept');
  button.addEventListener('click', () => {
    setTimeout(() => {
      togglePage.closePage();
      togglePage.deletePage();
      renderMainPage.clearPage();
      renderMainPage.rendering();
      renderMainPage.openPage();
    }, 2500);
  });
  return element;
}
