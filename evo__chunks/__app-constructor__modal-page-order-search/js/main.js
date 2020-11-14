class ToggleModalPageOrderSearch extends ToggleModalPageSearch {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.onDOMContentLoaded = this.onDOMContentLoaded.bind(this);
    this.createFoundedElements = this.createFoundedElements.bind(this);
  }

  searchItem() {
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
        /* if (typeof dataProductApi.successData.items[item].intro !== 'undefined') {
          numberOfHits += (dataProductApi.successData.items[item].intro.toLowerCase().split(searchItemTextPart).length - 1);
        } */
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
    const arr = [];
    for (const el of Object.values(searchItems)) {
      arr.push(el);
    }
    arr.flat().forEach((item) => {
      cardItemContainerSearchEl.append(cardItem.create({ id: item.id }, true));
    });
  }

  searchItemCategory(categoryId) {
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
        /* if (typeof dataProductApi.successData.items[item].intro !== 'undefined') {
          numberOfHits += (dataProductApi.successData.items[item].intro.toLowerCase().split(searchItemTextPart).length - 1);
        } */
      }
      if (numberOfHits > 0) {
        if (typeof searchItems[numberOfHits] !== 'object') {
          searchItems[numberOfHits] = [];
        }
        searchItems[numberOfHits].push(dataProductApi.successData.items[item]);
      }
    }
    // console.log(searchItems);

    if (cardItemContainerSearchEl !== null) {
      if (cardItemContainerSearchEl.childNodes.length !== 0) {
        const arrHtml = Array.from(cardItemContainerSearchEl.children);
        arrHtml.splice(0, arrHtml.length).forEach((item) => item.remove());
      }
    }
    const arr = [];
    for (const el of Object.values(searchItems)) {
      arr.push(el);
    }
    arr.flat().forEach((item) => {
      cardItemContainerSearchEl.append(cardItem.create({ id: item.id }, true));
    });
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
    const textAreaSearch = new CreateTextAreaSearch({
      selector: ['div'],
      style: ['search'],
      modifier: ['--opened'],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });

    this.modalPageSearch.append(textAreaSearch.create());
    /* this.modalPageSearch.append(cardItemContainerSearch.create('search'));
    const inputSearch = document.querySelector('.top-bar-search__input-area');

    inputSearch.addEventListener('focus', () => {
      this.modalPageSearch.classList.add('modal-page-search--focus-input');
    });

    inputSearch.addEventListener('blur', () => {
      this.modalPageSearch.classList.remove('modal-page-search--focus-input');
    });

    inputSearch.addEventListener('keyup', (event) => {
      if (event.code === 'Enter' || event.code === 'Go' || event.code === 13) {
        this.fifthPage.classList.remove('modal-page-search--focus-input');
        inputSearch.blur();
      }
      if (inputSearch.value.length === 0) {
        const cardItemContainerSearchEl = document.querySelector('.card-item__container--search');
        const arrHtml = Array.from(cardItemContainerSearchEl.children);
        arrHtml.splice(0, arrHtml.length).forEach((item) => item.remove());
      } else if (isCategory) {
        toggleModalPageOrderSearch.searchItemCategory(categoryId);
      } else {
        console.log(isCategory);
        toggleModalPageOrderSearch.searchItem();
      }
    });
    this.modalPageSearch.addEventListener('scroll', () => {
      inputSearch.blur();
    });

    clearSearchActive(); */
    this.onDOMContentLoaded();
    this.openPage();
  }

  onDOMContentLoaded() {
    const newAllItemsForSearch = {};
    for (const id in dataProductApi.successData.items) {
      newAllItemsForSearch[dataProductApi.successData.items[id].name.toLowerCase()] = dataProductApi.successData.items[id];
    }
    AllItemsForSearch = newAllItemsForSearch;
    const searchBtn = document.querySelector('.catalog__categories-element--search');
    if (!searchBtn) return;
    const search = document.querySelector('.search');
    const closeBtn = document.querySelector('.search__close');
    const clearBtn = document.querySelector('.search__form-input-clear');
    const searchField = document.querySelector('.search__form-input');
    const searchResult = document.querySelector('.search__result');
    const searchCount = document.querySelector('.search__result-count');
    searchBtn.addEventListener('click', () => {
      search.classList.add('search--opened');
    });
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        search.classList.remove('search--opened');
      });
    }
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        clearBtn.parentElement.querySelector('input').value = '';
        searchResult.querySelector('.search__result-container').innerHTML = '';
        searchResult.classList.add('search__result--empty');
      });
    }
    if (searchField) {
      searchField.addEventListener('input', () => {
        const founded = {};
        for (const id in AllItemsForSearch) {
          if (id.indexOf(searchField.value.toLowerCase()) !== -1) {
            founded[id] = AllItemsForSearch[id];
          }
        }
        if (isEmptyObj(founded) || searchField.value === '') {
          searchResult.querySelector('.search__result-container').innerHTML = '';
          searchResult.classList.add('search__result--empty');
        } else {
          searchResult.classList.remove('search__result--empty');
          let count = 0;
          for (const id in AllItemsForSearch) {
            if (id.indexOf(searchField.value) !== -1) {
              count++;
              founded[id] = AllItemsForSearch[id];
            }
          }
          searchCount.textContent = `${count} товаров`;
          console.log(founded);
          searchResult.querySelector('.search__result-container').innerHTML = '';
          this.createFoundedElements(founded);
        }
        console.log(founded);
      });
    }
  }

  createFoundedElements(founded) {
    const container = document.querySelector('.search__result-container');
    for (const id in founded) {
      const item = founded[id];
      console.log(item);

      const element = document.createElement('div');
      element.classList.add('search__list-element');

      const image = document.createElement('div');
      image.classList.add('search__list-element-image');
      image.style.backgroundImage = `url(${item.mainPhoto.name})`;

      const detail = document.createElement('div');
      detail.classList.add('search__list-element-detail');

      element.append(image, detail);

      const title = document.createElement('div');
      title.classList.add('search__list-element-title');
      const name = document.createElement('div');
      name.classList.add('search__list-element-name');
      name.textContent = item.name;
      const price = document.createElement('div');
      price.classList.add('search__list-element-price');
      price.textContent = `${item.price} ₽`;
      title.append(name, price);

      const additional = document.createElement('div');
      additional.classList.add('search__list-element-additional');
      const weight = document.createElement('div');
      weight.classList.add('search__list-element-name');
      if (item.volume || item.netWeight) weight.textContent = item.volume ? `${item.volume} мл` : `${item.netWeight} г`;
      const plus = document.createElement('div');
      plus.classList.add('search__list-element-plus');
      plus.innerHTML = `<svg class="search__list-element-plus-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle class="search__list-element-plus-icon" opacity="0.12" cx="12.0001" cy="12" r="12" fill="#E6551E"></circle>
                            <path class="search__list-element-plus-icon" d="M12.0001 6.75V17.25" stroke="#E6551E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path class="search__list-element-plus-icon" d="M6.75006 12H17.2501" stroke="#E6551E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>`;
      additional.append(weight, plus);

      detail.append(title, additional);

      element.addEventListener('click', (e) => {
        if (!e.target.classList.contains('search__list-element-plus-icon')) {
          toggleModalPageSearch.closePage();
          toggleModalPageSearch.deletePage();
          toggleModalPageCard.rendering(dataProductApi.successData.items[item.id]);
        }
      });

      const iconsPlus = element.querySelector('.search__list-element-plus-icon');

      iconsPlus.addEventListener('click', function () {
        iconsPlus.classList.add('search__list-element-plus-icon--active');
        setTimeout(() => {
          iconsPlus.classList.remove('search__list-element-plus-icon--active');
        }, 1000);
        basketArray.push({ id: item.id, modifiers: [] });
        localStorage.setItem('basket', JSON.stringify(basketArray));
        checkEmptyBasket();
      });

      container.append(element);
    }
  }
}
