function clearSearchActive() {
  const topBarSearchIconTypeDelete = document.querySelector('.top-bar-search__icon--type--delete');
  const topBarSearchInputArea = document.querySelector('.top-bar-search__input-area');

  topBarSearchIconTypeDelete.addEventListener('click', () => {
    topBarSearchInputArea.value = '';
  });
}


class CreateTopBarSearchStores extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <img src="[+chunkWebPath+]/img/icon-close.svg" alt="Кнопка закрытия панели" class="top-bar-search__icon top-bar-search__icon--type--close">
        <div class="form">
        <div class="form__input top-bar-search__input">
          <label class="form__input-underlined">
            <input class="form__input-area form__input-area--valid top-bar-search__input-area" type="text" placeholder="Location">
            <img src="[+chunkWebPath+]/img/icon-delete.svg" alt="Кнопка удаления введенных данных" class="top-bar-search__icon top-bar-search__icon--type--delete">
          </label>
        </div>
        </div>
        <span class="top-bar-search__info">find</span>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.iconClose = this.element.querySelector('.top-bar-search__icon--type--close');
    if (typeof this.parameters.eventCloseIcon === 'object') {
      for (const event of this.parameters.eventCloseIcon) {
        this.iconClose.addEventListener(event.type, event.callback);
      }
    }
    return super.create(this.element);
  }
}
