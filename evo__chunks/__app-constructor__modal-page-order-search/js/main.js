class ToggleModalPageOrderSearch extends ToggleModalPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;

    this.className = 'search';

    this.body.append(createModalPage(this.className));

    this.modalPageEl = document.querySelector(`.modal-page-${this.className}`);
    this.modalPageContentEl = document.querySelector(`.modal-page-${this.className}__content`);

    this.closePage = this.closePage.bind(this);
    this.openPage = this.openPage.bind(this);
    this.rendering = this.rendering.bind(this);
    this.activeSearch = this.activeSearch.bind(this);
    this.createFoundedElements = this.createFoundedElements.bind(this);
  }

  closePage() {
    super.closePage(this.modalPageEl);
  }

  openPage() {
    this.body.append(this.modalPageEl);
    this.body.classList.add('body');
    setTimeout(() => {
      if (isIos) {
        this.modalPageEl.classList.add('modal-page--ios');
      }
      this.modalPageEl.classList.add(this.parameters.classOpen);
    }, 100);


    this.activeSearch(this.modalPageEl);
    history.pushState({ state: `#modal-page-${this.className}` }, null, `#modal-page-${this.className}`);
  }

  rendering() {
    const textAreaSearch = new CreateTextAreaSearch({
      selector: ['div'],
      style: ['search'],
      eventCloseIcon: [
        {
          type: 'click',
          callback: () => {
            this.closePage();
            this.clearButton.click();
          },
        },
      ],
    });

    this.modalPageContentEl.append(textAreaSearch.create());
    this.clearButton = this.modalPageEl.querySelector('.search__form-input-clear');
  }

  activeSearch() {
    const newAllItemsForSearch = {};
    Object.keys(dataProductApi.successData.items).forEach((id) => {
      newAllItemsForSearch[dataProductApi.successData.items[id].name.toLowerCase()] = dataProductApi.successData.items[id];
    });
    AllItemsForSearch = newAllItemsForSearch;
    const clearBtn = this.modalPageEl.querySelector('.search__form-input-clear');
    const searchField = this.modalPageEl.querySelector('.search__form-input');
    const searchResult = this.modalPageEl.querySelector('.search__result');
    const searchCount = this.modalPageEl.querySelector('.search__result-count');
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
          searchResult.querySelector('.search__result-container').innerHTML = '';
          this.createFoundedElements(founded);
        }
        console.log(founded);
      });
    }
  }

  createFoundedElements(founded) {
    const container = this.modalPageEl.querySelector('.search__result-container');
    for (const id in founded) {
      console.log(id);
      const item = founded[id];
      console.log(item);
      const {
        name, netWeight, volume,
      } = item;
      let {
        weight,
        price,
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

      if (!isEmptyObj(dataUserSeasons)) {
        Object.values(dataUserSeasons.successData).forEach((itemEl) => {
          if (dataSeasons.successData[itemEl.id]) {
            Object.values(dataSeasons.successData[itemEl.id].items).forEach((el) => {
              console.log(el, item.id);
              if (el === item.id) {
                price = dataSeasons.successData[itemEl.id].price;
              }
            });
          }
        });
      }

      const template = `
        <div class="search__list-element-image">
            <div class="search__stickers"></div>
        </div>
        <div class="search__list-element-detail catalog__list-element-detail--type--border">
            <div class="search__list-element-title">
                <div class="search__list-element-name">${name}</div>
                <div class="catalog__list-element-price">${price} ₽</div>
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
            element.classList.add('search__list-element--ended');
            break;
          }
        }
      }

      iconsPlus.addEventListener('click', function () {
        this.classList.add('search__list-element-plus-icon--active');
        setTimeout(() => {
          this.classList.remove('search__list-element-plus-icon--active');
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
