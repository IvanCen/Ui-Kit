class ToggleModalPageStoresSearch extends ToggleModalPageSearch {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  chooseShop(page) {
    const storesButtonBottomBar = document.querySelector('.bottom-bar__select-item');
    const modalPageReview = document.querySelector('.modal-page-order-review');
    const radioInputs = page.querySelectorAll('.radio__input');
    const mapItem = page.querySelectorAll('.map__item');
    console.log(page.querySelectorAll('.radio__input'));
    [...radioInputs].forEach((radio) => {
      const radioId = radio.getAttribute('data-id');
      if (!isEmptyObj(userStore) && `0${userStore.store.id}` === radioId) {
        radio.checked = true;
        console.log('checked');
      }
    });
    [...mapItem].forEach((input) => {
      input.addEventListener('click', () => {
        [...radioInputs].forEach((item) => {
          const inputId = item.getAttribute('data-id');

          if (item.checked) {
            Object.values(storesDataObj.successData).forEach((el) => {
              if (el.id === Number(inputId)) {
                api.getShopOutOfStockItemsAndModifiers(el.id);
                userStore.store = el;
                localStorage.setItem('userStore', JSON.stringify(userStore));
                if (modalPageReview) {
                  toggleModalPageReviewOrder.deletePage();
                  setTimeout(() => toggleModalPageReviewOrder.rendering(), 100);
                }
                if (storesButtonBottomBar) {
                  storesButtonBottomBar.textContent = el.shortTitle;
                }
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
    const classIdentifier = 'radio__input-search';
    if (this.mapItemsContainer !== null) {
      if (this.mapItemsContainer.childNodes.length !== 0) {
        this.arrHtml = Array.from(this.mapItemsContainer.children);
        this.arrHtml.splice(0, this.arrHtml.length).forEach((item) => item.remove());
      }
    }
    for (const store of storesDataObj.successData) {
      if (store.longTitle.toLowerCase().indexOf(this.searchString) > -1) {
        find++;
        this.mapItemsContainer.append(this.storesMapItem.create(store, undefined, undefined, 0, this.modalPageSearch));
        console.log(this.modalPageSearch);
      }
    }
  }

  rendering() {
    super.rendering();
    const topBar = new CreateTopBarSearch({
      selector: ['div'],
      style: ['top-bar-search'],
      eventCloseIcon: [
        {
          type: 'click',
          callback: () => {
            this.closePage();
            this.deletePage();
            storesPage.chooseShop(document.querySelector('.modal-page__content'));
          },
        },
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
