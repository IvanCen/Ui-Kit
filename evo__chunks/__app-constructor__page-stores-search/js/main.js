class TogglePageStoresSearch extends ToggleModalPageSearch {
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
                /*const mapRadioInput = document.querySelectorAll('.map__radio-input');
                [...mapRadioInput].forEach((radio) => {
                  console.log(radio.id, item.id)
                  if (radio.id === item.id) {
                    radio.checked = true;
                  }
                });*/
              }
            });
          }
        });
      });
    });
  }

  searchStores() {
    const storesMapItem = new CreateMapItemStores();

    const inputSearch = document.querySelector('.top-bar-search__input-area');
    const mapItemsContainer = document.querySelector('.map__container--type--search');
    let searchItemText = inputSearch.value;
    searchItemText = searchItemText.toLowerCase();
    const searchItemTextArray = searchItemText.split(' ');
    const searchItems = {};

    storesDataObj.successData.forEach((item) => {
      let numberOfHits = 0;
      for (const searchItemTextPart of searchItemTextArray) {
        numberOfHits += (item.shortTitle.toLowerCase().split(searchItemTextPart).length - 1);
      }
      if (numberOfHits > 0) {
        if (typeof searchItems[numberOfHits] !== 'object') {
          searchItems[numberOfHits] = [];
        }
        searchItems[numberOfHits].push(item);
      }
    });
    if (mapItemsContainer !== null) {
      if (mapItemsContainer.childNodes.length !== 0) {
        const arrHtml = Array.from(mapItemsContainer.children);
        arrHtml.splice(0, arrHtml.length).forEach((item) => item.remove());
      }
    }
    for (const el of Object.values(searchItems)) {
      mapItemsContainer.append(storesMapItem.create(el[0], undefined, undefined, 0));
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
        togglePageStoresSearch.searchStores();
        togglePageStoresSearch.chooseShop(this.modalPageSearch);
      }
    });

    clearSearchActive();

    this.openPage();
  }
}
