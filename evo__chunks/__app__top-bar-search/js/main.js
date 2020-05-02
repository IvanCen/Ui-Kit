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
    this.template = '<span class="top-bar-search__info">Поблизости</span>';
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}
