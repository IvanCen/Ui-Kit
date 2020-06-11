class TogglePageStoresSearch extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  chooseShop() {
    const page = document.querySelector('.page');
    const buttonChoose = page.querySelector('.button--type--choose-search');
    buttonChoose.addEventListener('click', () => {
      const radioInputs = page.querySelectorAll('.radio__input');
      console.log(radioInputs);
      [...radioInputs].forEach((item) => {
        if (item.checked) {
          storesDataObj.successData.forEach((el) => {
            if (el.id === Number(item.id)) {
              localStorage.setItem('short-name-shop', el.shortTitle);
              userStore.store = el;
              localStorage.setItem('userStore', JSON.stringify(userStore));
            }
          });
          togglePage.closePage();
          togglePage.deletePage();
          toggleStores.closePage();
          toggleStores.clearPage();
          toggleOrder.rendering();
          toggleOrder.openPage();
          toggleOrderMenuContent.rendering();
          toggleOrderHitsContent.rendering();
          toggleOrderHistoryContent.rendering();

          toggleSubPage.closePage();
          toggleSubPage.deletePage();
          toggleThirdPage.closePage();
          toggleThirdPage.deletePage();
          const footerButton = document.querySelectorAll('.footer__button');
          const footerButtonOrder = document.querySelector('.footer__button--type--order');
          [...footerButton].forEach((itemEl) => {
            itemEl.classList.remove('footer__button--active');
            itemEl.firstElementChild.classList.remove('footer__icon--active');
          });
          footerButtonOrder.classList.add('footer__button--active');
          footerButtonOrder.firstElementChild.classList.add('footer__icon--active');
        }
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
    const storesButtonChoiceOrange = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: ['--size--big',
        '--theme--tangerin',
        '--type--fixed',
        '--theme--shadow-big',
        '--type--choose-search',
      ],
      text: ['Выбрать'],
      event: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });

    this.page.append(createTopBarIos());
    this.page.append(topBar.create());
    this.page.append(mapItemStoresSearchWraper.create());
    this.page.append(storesButtonChoiceOrange.create());
    const inputSearch = document.querySelector('.top-bar-search__input-area');
    const mapItemsContainer = document.querySelector('.map__container--type--search');

    inputSearch.addEventListener('keyup', () => {
      if (inputSearch.value.length < 1) {
        const arrHtml = Array.from(mapItemsContainer.children);
        arrHtml.splice(0, arrHtml.length).forEach((item) => item.remove());
      } else {
        togglePageStoresSearch.searchStores();
        togglePageStoresSearch.chooseShop();
      }
    });

    clearSearchActive();
    activeButton();
    this.openPage();
  }
}
