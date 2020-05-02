function closeModal() {
  const modal = document.querySelector('.modal');
  const modalButtonAccept = modal.querySelector('.modal__button-accept');

  document.addEventListener('click', (event) => {
    if (event.target === modal || event.target === modalButtonAccept) {
      modal.classList.remove('modal--open');
    }
  });
}

function createModal() {
  const element = document.createElement('div');
  element.classList.add('modal');
  const template = `
          <div class="modal__content-container modal__content-container--visible">
            <h2 class="modal__title">Для этого понадобится включить общий доступ к вашему местоположению</h2>
            <p class="modal__text">Перейдите в настройки, если хотите включить общий доступ к вашему местоположению</p>
            <label class="checkbox modal__checkbox">Not show again
              <input class="checkbox__input" type="checkbox">
              <span class="checkbox__checkmark"></span>
            </label>
            <div class="modal__button-container">
              <button class="button button--size--small button--theme--tangerin-transparent modal__button">Настройки</button>
              <button class="button button--size--small button--theme--tangerin modal__button modal__button-accept">Понятно</button>
            </div>
          </div>`;

  element.innerHTML = template;
  return element;
}
