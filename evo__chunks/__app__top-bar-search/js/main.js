function clearSearchActive() {
  const topBarSearchIconTypeDelete = document.querySelector('.top-bar-search__icon--type--delete');
  const topBarSearchInputArea = document.querySelector('.top-bar-search__input-area');

  topBarSearchIconTypeDelete.addEventListener('click', () => {
    topBarSearchInputArea.value = '';
  });
}


class CreateTopBarSearch extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-close.svg]]" alt="Кнопка закрытия панели" class="top-bar-search__icon top-bar-search__icon--type--close">
        <div class="form">
        <div class="form__input top-bar-search__input">
          <label class="form__input-underlined">
            <input class="form__input-area form__input-area--theme--orange top-bar-search__input-area" type="text" placeholder="Поиск">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-delete.svg]]" alt="Кнопка удаления введенных данных" class="top-bar-search__icon top-bar-search__icon--type--delete">
          </label>
        </div>
        </div>
        <span class="top-bar-search__info">Найдено</span>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.iconClose = this.element.querySelector('.top-bar-search__icon--type--close');

    this.iconClose.addEventListener('click', () => window.history.back());

    if (typeof this.parameters.eventCloseIcon === 'object') {
      for (const event of this.parameters.eventCloseIcon) {
        this.iconClose.addEventListener(event.type, event.callback);
      }
    }
    return super.create(this.element);
  }
}
