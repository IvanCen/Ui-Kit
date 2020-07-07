class ToggleFifthPageOrderSearch extends ToggleFifthPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  searchItem() {
    console.log('dsada');
    const cardItem = new CreateCardItemFavAndHisOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--border--bottom',
      ],
    });
    const inputSearch = document.querySelector('.top-bar-search__input-area');
    const cardItemContainerSearchEl = document.querySelector('.card-item__container--search');
    let searchItemText = inputSearch.value;
    searchItemText = searchItemText.toLowerCase();
    const searchItemTextArray = searchItemText.split(' ');
    const searchItems = {};
    for (const item in dataProductApi.successData.items) {
      let numberOfHits = 0;
      for (const searchItemTextPart of searchItemTextArray) {
        numberOfHits += (dataProductApi.successData.items[item].name.toLowerCase().split(searchItemTextPart).length - 1);
        if (typeof dataProductApi.successData.items[item].intro !== 'undefined') {
          numberOfHits += (dataProductApi.successData.items[item].intro.toLowerCase().split(searchItemTextPart).length - 1);
        }
      }
      if (numberOfHits > 0) {
        if (typeof searchItems[numberOfHits] !== 'object') {
          searchItems[numberOfHits] = [];
        }
        searchItems[numberOfHits].push(dataProductApi.successData.items[item]);
      }
    }

    if (cardItemContainerSearchEl !== null) {
      if (cardItemContainerSearchEl.childNodes.length !== 0) {
        const arrHtml = Array.from(cardItemContainerSearchEl.children);
        arrHtml.splice(0, arrHtml.length).forEach((item) => item.remove());
      }
    }
    for (const el of Object.values(searchItems)) {
      cardItemContainerSearchEl.prepend(cardItem.create({ id: el[0].id }));
    }
  }

  searchItemCategory(categoryId) {
    console.log('dsada');
    const cardItem = new CreateCardItemFavAndHisOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--border--bottom',
      ],
    });
    const inputSearch = document.querySelector('.top-bar-search__input-area');
    const cardItemContainerSearchEl = document.querySelector('.card-item__container--search');
    let searchItemText = inputSearch.value;
    searchItemText = searchItemText.toLowerCase();
    const searchItemTextArray = searchItemText.split(' ');
    const searchItems = {};

    /**
     * если задана категория для поиска
     */
    const categoryForSearch = categoryId;
    console.log('Категория в которой ищем');
    console.log(categoryForSearch);
    let availableItems;
    if (typeof categoryForSearch !== 'undefined') {
      const availableCategories = searchClassMethod.getChildrenCategories(categoryForSearch, dataProductApi.successData.categoriesTree);
      availableItems = searchClassMethod.getChildrenItems(availableCategories);
      // console.log('Массив товаров для фильтрации');
      // console.log(categoryForSearch);
      availableItems = searchClassMethod.convertItemsArrayToObject(availableItems);
      // console.log('Массив товаров для фильтрации идентификатрами, как нужно');
      // console.log(availableItems);
    }


    for (const item in dataProductApi.successData.items) {
      /**
       * Если есть список идентификаторов в котором можно искать и текущий идентификатор товара не входит в этот список, то пропускаем итерацию и переходим к следующему товару
       */
      if (typeof availableItems === 'object' && typeof availableItems[item] === 'undefined') {
        continue;
      }


      let numberOfHits = 0;
      for (const searchItemTextPart of searchItemTextArray) {
        numberOfHits += (dataProductApi.successData.items[item].name.toLowerCase().split(searchItemTextPart).length - 1);
        if (typeof dataProductApi.successData.items[item].intro !== 'undefined') {
          numberOfHits += (dataProductApi.successData.items[item].intro.toLowerCase().split(searchItemTextPart).length - 1);
        }
      }
      if (numberOfHits > 0) {
        if (typeof searchItems[numberOfHits] !== 'object') {
          searchItems[numberOfHits] = [];
        }
        searchItems[numberOfHits].push(dataProductApi.successData.items[item]);
      }
    }
    console.log(searchItems);

    if (cardItemContainerSearchEl !== null) {
      if (cardItemContainerSearchEl.childNodes.length !== 0) {
        const arrHtml = Array.from(cardItemContainerSearchEl.children);
        arrHtml.splice(0, arrHtml.length).forEach((item) => item.remove());
      }
    }
    for (const el of Object.values(searchItems)) {
      cardItemContainerSearchEl.prepend(cardItem.create({ id: el[0].id }));
    }
  }

  rendering(isCategory, categoryId) {
    super.rendering();
    const topBar = new CreateTopBarSearch({
      selector: ['div'],
      style: ['top-bar-search'],
      modifier: ['--indentation--bottom'],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const cardItemContainerSearch = new CreateCardItemContainer();

    this.fifthPage.append(createTopBarIos());
    this.fifthPage.append(topBar.create());
    this.fifthPage.append(cardItemContainerSearch.create('search'));
    const inputSearch = document.querySelector('.top-bar-search__input-area');

    inputSearch.addEventListener('focus', () => {
      this.fifthPage.classList.add('fifth-page--focus-input');
    });

    inputSearch.addEventListener('blur', () => {
      this.fifthPage.classList.remove('fifth-page--focus-input');
    });

    inputSearch.addEventListener('keyup', (event) => {
      if (event.code === 'Enter' || event.code === 'Go' || event.code === 13) {
        this.fifthPage.classList.remove('fifth-page--focus-input');
        inputSearch.blur();
      }
      console.log(isCategory);
      if (inputSearch.value.length === 0) {
        const cardItemContainerSearchEl = document.querySelector('.card-item__container--search');
        const arrHtml = Array.from(cardItemContainerSearchEl.children);
        arrHtml.splice(0, arrHtml.length).forEach((item) => item.remove());
      } else if (isCategory) {
        toggleFifthPageOrderSearch.searchItemCategory(categoryId);
      } else {
        toggleFifthPageOrderSearch.searchItem();
      }
    });

    clearSearchActive();
    this.openPage();
  }
}
