function activeLike() {
  const cardItemIconTypeLike = document.querySelectorAll('.card-item__icon--type--like');
  [...cardItemIconTypeLike].forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('card-item__icon--liked');
    });
  });
}


class CreateCardItemOrder extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(productInfo, products) {
    this.element = document.createElement('div');
    this.element.classList.add('card-item', 'card-item--direction--row');
    this.element.id = productInfo.id;
    const { id } = this.element;
    this.element.addEventListener('click', () => {
      const category = [];
      for (const item of Object.values(products.items)) {
        if (item.category === Number(id)) {
          category.push(item);
        }
      }
      togglePageOrderCategory.rendering(productInfo.name, category);
      togglePageOrderCategory.openPage();
    });
    this.template = `
      <div class="card-item__image card-item__image--size--small"></div>
      <h3 class="card-item__title card-item__title--text--bold">${productInfo.name}</h3>`;

    this.element.insertAdjacentHTML('beforeend', this.template);

    const imgEl = this.element.querySelector('.card-item__image');
    if (iOS()) {
      loadImg(productInfo, imgEl, 'jpg');
    } else {
      loadImg(productInfo, imgEl, 'webp');
    }

    return this.element;
  }
}

class CreateCardItemOrderProductCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(productInfo) {
    this.element = document.createElement('div');
    this.element.classList.add('card-item', 'card-item--direction--column');
    this.element.id = productInfo.id;
    this.element.addEventListener('click', () => {
      toggleSubPageProductCard.rendering(productInfo);
      toggleSubPageProductCard.openPage();
    });
    this.template = `
      <div class="card-item__image card-item__image--size--big"></div>
      <div class="card-item__info-container">
        <h3 class="card-item__title card-item__title--text--normal card-item__title--position--center">${productInfo.name}</h3>
        <span class="card-item__available-info card-item__available-info--show">
      </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);

    const imgEl = this.element.querySelector('.card-item__image');
    if (iOS()) {
      if (productInfo.mainPhoto !== null) {
        imgEl.style.backgroundImage = `url(${productInfo.mainPhoto.name})`;
      }
    } else {
      loadImg(productInfo, imgEl);
    }

    return this.element;
  }
}

class CreateCardItemContainerProductCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(identificator, classAdd) {
    this.element = document.createElement('div');
    if (classAdd) {
      this.element.classList.add(classAdd);
    }
    this.element.classList.add(
      'card-item__container',
      'card-item__container--with--border',
      'card-item__container--direction--row',
      `card-item__container--${identificator}`,
    );

    return this.element;
  }
}

class CreateCardItemContainer extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(identificator) {
    this.element = document.createElement('div');
    this.element.classList.add(
      'card-item__container',
      'card-item__container--indentation-column--small',
      'card-item__container--with--border',
      'card-item__container--direction--column',
      `card-item__container--${identificator}`,
    );

    return this.element;
  }
}

class CreateCardItemBalance extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create() {
    this.element = document.createElement(this.parameters.selector);
    this.template = `
          <div class="card-item__content-container">
            <h3 class="card-item__title card-item__title--text--bold card-item__title--theme--${this.parameters.themeNumber}">${this.parameters.number}</h3>
            <span class="card-item__title card-item__title--text--big">${this.parameters.state}</span>
            <span class="card-item__info card-item__info--theme--shadow">${this.parameters.data}</span>
          </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateCardItemFavAndHisOrder extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(productInfo) {
    console.log(productInfo);
    this.element = document.createElement(this.parameters.selector);
    this.template = `
          <img alt="" class="card-item__image card-item__image--size--small">
          <div class="card-item__content-container">
            <h3 class="card-item__title card-item__title--text--bold">${productInfo.name}</h3>
            <span class="card-item__info card-item__info--indentation--normal">${productInfo.intro}</span>
            <span class="card-item__info card-item__info--theme--shadow">Калорий ${productInfo.energy} г</span>
            <div class="card-item__icon-container">
              <button class="card-item__button card-item__button--type--like ">
                <svg class="card-item__icon card-item__icon--type--like card-item__icon--liked" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M1.8 9.80005C1.6 9.25005 1.5 8.67005 1.5 8.05005C1.5 5.15005 3.86 2.80005 6.75 2.80005C8.84 2.80005 10.66 4.03005 11.5 5.80005C11.7 6.22005 12.29 6.22005 12.5 5.80005C13.35 4.02005 15.16 2.80005 17.25 2.80005C20.14 2.80005 22.5 5.15005 22.5 8.05005C22.5 8.67005 22.39 9.27005 22.19 9.83005C21.93 10.56 21.51 11.21 20.97 11.76L12.02 20.66L3.4 12.09L3.39 12.08L3.38 12.07C3.17 11.89 2.98 11.7 2.8 11.49C2.35 10.99 2.02 10.42 1.8 9.80005Z"/>
                </svg>
              </button>
              <button class="card-item__button">
                <img src="[+chunkWebPath+]/img/icon-add-circle-plus.svg" alt=""
                     class="card-item__icon card-item__icon--type--add">
              </button>
            </div>
          </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.iconsLike = this.element.querySelector('.card-item__icon--type--like');
    this.iconsAdd = this.element.querySelector('.card-item__icon--type--add');
    const el = this.element;
    this.iconsLike.addEventListener('click', () => {
      el.classList.add('card-item--animation');
      itemsArray.forEach((item, index) => {
        if (item.id === productInfo.id) {
          itemsArray.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(itemsArray));
      setTimeout(() => el.remove(), 200);
    });

    this.iconsAdd.addEventListener('click', () => {
      basketArray.push({ id: productInfo.id });
      localStorage.setItem('basket', JSON.stringify(basketArray));
      counterBasket();
      checkBasket();
    });

    const imgEl = this.element.querySelector('.card-item__image');
    if (iOS()) {
      if (productInfo.mainPhoto !== null) {
        imgEl.style.backgroundImage = `url(${productInfo.mainPhoto.name})`;
      }
    } else {
      loadImg(productInfo, imgEl);
    }

    return super.create(this.element);
  }
}

class CreateCardItemContainerFavAndHisOrder extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
  }

  create() {
    return super.create(this.element);
  }
}

class CreateCardItemReviewOrder extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.create.bind(this);
  }

  create(productInfo) {
    /**
     * Создаем и заполняем HTML блок с товаром для корзины
     * @type {HTMLDivElement}
     */
    this.element = document.createElement('div');
    this.template = `
          <img alt="" class="card-item__image card-item__image--size--small">
          <div class="card-item__content-container">
            <h3 class="card-item__title card-item__title--text--bold">${dataProductApi['successData']['items'][productInfo.id]['name']}</h3>
            <span class="card-item__info card-item__info--indentation--bottom card-item__info--theme--shadow">Калорий ${dataProductApi['successData']['items'][productInfo.id]['energy']} г</span>
            <ul class="card-item__list"></ul>
            <span class="card-item__price">${dataProductApi['successData']['items'][productInfo.id]['price']}</span>
            <div class="card-item__icon-container">
              <button class="card-item__button card-item__button--type--minus">
               <img src="[+chunkWebPath+]/img/icon-remove-circle.svg" alt=""
                     class="card-item__icon card-item__icon--type--minus">
              </button>
              <button class="card-item__button card-item__button--type--plus">
                <img src="[+chunkWebPath+]/img/icon-add-circle-plus.svg" alt=""
                     class="card-item__icon card-item__icon--type--plus">
              </button>
            </div>
          </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.iconsMinus = this.element.querySelector('.card-item__button--type--minus');
    this.iconsPlus = this.element.querySelector('.card-item__button--type--plus');
    this.price = this.element.querySelector('.card-item__price');
    const el = this.element;
    const counterTopBar = document.querySelector('.top-bar__all-counter-order');
    const counterBottomBar = document.querySelector('.bottom-bar__counter');

    const imgEl = this.element.querySelector('.card-item__image');
    if (iOS()) {
      if (dataProductApi['successData']['items'][productInfo.id]['mainPhoto'] !== null) {
        imgEl.style.backgroundImage = `url(${dataProductApi['successData']['items'][productInfo.id]['mainPhoto']['name']})`;
      }
    } else {
      loadImg(dataProductApi['successData']['items'][productInfo.id], imgEl, 'webp');
    }
    let priceAllModifier = 0;





    // if (typeof userDataObj[productInfo.id] === 'object') {
    //   for (const modifier of Object.values(dataProductApi.successData.modifiers)) {
    //     for (const modifiersUserItem in userDataObj[productInfo.id]) {
    //       if (String(modifier.id) === modifiersUserItem) {
    //         const counter = userDataObj[productInfo.id][modifiersUserItem];
    //         if (counter !== 0) {
    //           priceAllModifier += modifier.price * userDataObj[productInfo.id][modifiersUserItem];
    //           const cardItemListItem = document.createElement('li');
    //           cardItemListItem.classList.add('card-item__list-item');
    //           cardItemListItem.id = modifier.id;
    //           cardItemListItem.textContent = cardItemListItem.textContent = `${counter} добав${number_of(counter, ['ка', 'ки', 'ок'])} ${modifier.name}`;
    //           cardItemList.append(cardItemListItem);
    //         }
    //       }
    //     }
    //   }
    // }
    /**
     * Если есть модификаторы
     */
    if( typeof dataProductApi['successData']['items'][productInfo.id] === 'object' && typeof productInfo.modifiers === 'object' ){
      const cardItemList = this.element.querySelector('.card-item__list');
      /**
       * Перебераем их
       */
      for (let  modifier of productInfo.modifiers) {
        /**
         * Если у модификатора есть идентификатор и такой модификатор существует в каталоге, и количество модификаторов определено и больше 0, то добавляем модификаторы к описанию
         */
        if( typeof modifier['id'] === 'number' && typeof dataProductApi['successData']['modifiers'][modifier['id']] !== 'undefined' && typeof modifier['count'] === 'number' && modifier['count'] > 0 ){
          priceAllModifier += dataProductApi['successData']['modifiers'][modifier['id']]['price'] * modifier['count'];
          let cardItemListItem = document.createElement('li');
          cardItemListItem.classList.add('card-item__list-item');
          cardItemListItem.id = modifier['id'];
          cardItemListItem.textContent = `${modifier['count']} добав${number_of(modifier['count'], ['ка', 'ки', 'ок'])} ${dataProductApi['successData']['modifiers'][modifier['id']]['name']}`;
          cardItemList.append(cardItemListItem);
        }

      }
    }
    this.price.textContent = priceAllModifier + dataProductApi['successData']['items'][productInfo.id]['price'];

    /**
     * Добавляем события
     */
    this.iconsMinus.addEventListener('click', () => {
      counterTopBar.textContent = Number(counterTopBar.textContent) - 1;
      counterBottomBar.textContent = Number(counterBottomBar.textContent) - 1;
      el.classList.add('card-item--animation');
      /**
       * Проходим корзину
       */
      for (const [index, item] of Object.entries(basketArray)) {
        /**
         * Удаляем первое полное совпадение и обязательно выходим из цикла
         */
        if (item === productInfo) {
          basketArray.splice(index, 1);
          break;
        }
      }
      localStorage.setItem('basket', JSON.stringify(basketArray));
      counterBasket();
      checkBasket();
      setTimeout(() => el.remove(), 200);
    });
    // this.iconsMinus.addEventListener('click', () => {
    //   counterTopBar.textContent = Number(counterTopBar.textContent) - 1;
    //   counterBottomBar.textContent = Number(counterBottomBar.textContent) - 1;
    //   el.classList.add('card-item--animation');
    //   basketArray.forEach((item, index) => {
    //     if (item.id === productInfo.id) {
    //       basketArray.splice(index, 1);
    //     }
    //   });
    //   localStorage.setItem('basket', JSON.stringify(basketArray));
    //   counterBasket();
    //   checkBasket();
    //   setTimeout(() => el.remove(), 200);
    // });

    // this.iconsPlus.addEventListener('click', () => {
    //   counterTopBar.textContent = Number(counterTopBar.textContent) + 1;
    //   basketArray.push({ id: productInfo.id });
    //   localStorage.setItem('basket', JSON.stringify(basketArray));
    //   counterBasket();
    //   const cardItemContainer = document.querySelector('.card-item__container--type--review');
    //   this.arrHtml = Array.from(cardItemContainer.children);
    //   this.arrHtml.splice(0, this.arrHtml.length).forEach((item) => item.remove());
    //   basketArray.forEach((item) => {
    //     for (const elem of Object.values(dataProductApi.successData.items)) {
    //       if (item.id === elem.id) {
    //         cardItemContainer.append(this.create(elem));
    //       }
    //     }
    //   });
    // });
    this.iconsPlus.addEventListener('click', () => {
      counterTopBar.textContent = Number(counterTopBar.textContent) + 1;
      basketArray.push(productInfo);
      localStorage.setItem('basket', JSON.stringify(basketArray));
      counterBasket();
      const cardItemContainer = document.querySelector('.card-item__container--type--review');
      // this.arrHtml = Array.from(cardItemContainer.children);
      // this.arrHtml.splice(0, this.arrHtml.length).forEach((item) => item.remove());
      cardItemContainer.append(this.create(productInfo));
    });
    return super.create(this.element);
  }
}
