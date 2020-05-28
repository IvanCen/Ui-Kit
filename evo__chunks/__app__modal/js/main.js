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
              <button class="button button--size--small button--theme--tangerin modal__button modal__button-accept">Понятно</button>
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
              <button class="button button--size--small button--theme--tangerin modal__button modal__button-accept">Понятно</button>
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
      <p class="modal__text">На ваш email была отправлена ссылка для подтверждения, пройдите по ней, чтобы мы могли присылать вам сообщения</p>
      <div class="modal__button-container">
        <button class="button button--size--small button--theme--tangerin modal__button modal__button-accept">Понятно</button>
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
