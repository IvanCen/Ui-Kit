class ToggleModalPageOrderSearch extends ToggleModalPageSearch {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.activeSearch = this.activeSearch.bind(this);
    this.createFoundedElements = this.createFoundedElements.bind(this);
  }

  rendering(isCategory, categoryId) {
    super.rendering();

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

    this.activeSearch();
    this.openPage();
  }

  activeSearch() {
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
          for (const id in AllItemsForSearch) {
            if (id.indexOf(searchField.value) !== -1) {
              founded[id] = AllItemsForSearch[id];
            }
          }
          searchCount.textContent = `${Object.keys(founded).length} товаров`;
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
      let {
        name, price, weight, netWeight, volume,
      } = item;
      const element = document.createElement('div');
      element.classList.add('search__list-element');

      if (netWeight) {
        weight = `${netWeight} г`;
      } else if (volume) {
        weight = `${volume} мл`;
      } else {
        weight = '';
      }

      const template = `
        <div class="search__list-element-image">
            <div class="search__stickers"></div>
        </div>
        <div class="search__list-element-detail catalog__list-element-detail--type--border">
            <div class="search__list-element-title">
                <div class="search__list-element-name">${name}</div>
                <div class="catalog__list-element-price">${price}</div>
            </div>
            <div class="search__list-element-additional">
                <div class="search__list-element-name">${weight}</div>
                <div class="search__list-element-plus element-plus">
                    <div class="search__list-element-plus-icon"></div>
                </div>
            </div>
        </div>`;

      element.insertAdjacentHTML('beforeend', template);

      const imgEl = element.querySelector('.search__list-element-image');
      const iconsPlus = element.querySelector('.search__list-element-plus-icon');


      element.addEventListener('click', (e) => {
        if (!e.target.classList.contains('search__list-element-plus-icon')) {
          toggleModalPageSearch.closePage();
          toggleModalPageSearch.deletePage();
          toggleModalPageCard.rendering(dataProductApi.successData.items[item.id]);
        }
      });


      if (!isEmptyObj(outOfStock) && outOfStock.successData.itemsAndModifiers.length !== 0) {
        for (const id in outOfStock.successData.itemsAndModifiers) {
          if (Number(id) === item.id) {
            element.classList.add('catalog__list-element--ended');
            break;
          }
        }
      }

      iconsPlus.addEventListener('click', function () {
        const iconsPlusIcon = this.querySelector('.catalog__list-element-plus-icon');
        iconsPlusIcon.classList.add('catalog__list-element-plus-icon--active');
        setTimeout(() => {
          iconsPlusIcon.classList.remove('catalog__list-element-plus-icon--active');
        }, 1000);
        basketArray.push({ id: item.id, modifiers: [] });
        localStorage.setItem('basket', JSON.stringify(basketArray));
        checkEmptyBasket();
        animationAddProduct();
      });


      if (!canUseWebP()) {
        loadImg(dataProductApi.successData.items[item.id], imgEl, 'jpg');
      } else {
        loadImg(dataProductApi.successData.items[item.id], imgEl, 'webp');
      }

      container.append(element);
    }
  }
}
