class ToggleModalPageStoresSearch extends ToggleModalPageSearch {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  chooseShop(page) {
    const storesButton = document.querySelector('.bottom-bar__select-item');
    const radioInputs = page.querySelectorAll('.radio__input');
    const mapItem = page.querySelectorAll('.map__item');
    [...mapItem].forEach((input) => {
      input.addEventListener('click', () => {
        [...radioInputs].forEach((item) => {
          if (item.checked) {
            storesDataObj.successData.forEach((el) => {
              if (el.id === Number(item.id)) {
                api.getShopOutOfStockItemsAndModifiers(el.id);
                userStore.store = el;
                localStorage.setItem('userStore', JSON.stringify(userStore));
                if (storesButton) {
                  storesButton.textContent = el.shortTitle;
                }
                /* const mapRadioInput = document.querySelectorAll('.map__radio-input');
                [...mapRadioInput].forEach((radio) => {
                  console.log(radio.id, item.id)
                  if (radio.id === item.id) {
                    radio.checked = true;
                  }
                }); */
              }
            });
          }
        });
      });
    });
  }

  searchStores() {
    this.storesMapItem = new CreateMapItemStores();
    this.inputSearch = this.modalPageSearch.querySelector('.top-bar-search__input-area');
    this.mapItemsContainer = this.modalPageSearch.querySelector('.map__container--type--search');
    this.searchString = this.inputSearch.value.toLowerCase().trim();
    let find = 0;

    if (this.mapItemsContainer !== null) {
      if (this.mapItemsContainer.childNodes.length !== 0) {
        this.arrHtml = Array.from(this.mapItemsContainer.children);
        this.arrHtml.splice(0, this.arrHtml.length).forEach((item) => item.remove());
      }
    }
    for (const store of storesDataObj.successData) {
      if (store.longTitle.toLowerCase().indexOf(this.searchString) > -1) {
        find++;
        this.mapItemsContainer.append(this.storesMapItem.create(store, undefined, undefined, 0));
      }
    }
  }

  rendering() {
    super.rendering();
    const topBar = new CreateTopBarSearch({
      selector: ['div'],
      style: ['top-bar-search'],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const mapItemStoresSearchWraper = new CreateMapItemStoresSearchWraper({
      selector: ['div'],
      style: ['map'],
      modifier: ['--type--search'],
    });

    this.modalPageSearch.append(createTopBarIos());
    this.modalPageSearch.append(topBar.create());
    this.modalPageSearch.append(mapItemStoresSearchWraper.create());
    const inputSearch = this.modalPageSearch.querySelector('.top-bar-search__input-area');
    const mapItemsContainer = this.modalPageSearch.querySelector('.map__container--type--search');

    inputSearch.addEventListener('focus', () => {
      this.modalPageSearch.classList.add('modal-page-search--focus-input');
    });

    inputSearch.addEventListener('blur', () => {
      this.modalPageSearch.classList.remove('modal-page-search--focus-input');
    });

    inputSearch.addEventListener('keyup', (event) => {
      if (event.code === 'Enter' || event.code === 'Go' || event.code === 13) {
        this.modalPageSearch.classList.remove('modal-page-search--focus-input');
        inputSearch.blur();
      }
      if (inputSearch.value.length < 1) {
        const arrHtml = Array.from(mapItemsContainer.children);
        arrHtml.splice(0, arrHtml.length).forEach((item) => item.remove());
      } else {
        toggleModalPageStoresSearch.searchStores();
        toggleModalPageStoresSearch.chooseShop(this.modalPageSearch);
      }
    });

    clearSearchActive();

    this.openPage();
  }
}
