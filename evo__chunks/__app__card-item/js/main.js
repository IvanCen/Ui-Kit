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
      togglePageOrderCategory.rendering(productInfo.name, category, Number(id));
      togglePageOrderCategory.openPage();
    });
    this.template = `
      <div class="card-item__image card-item__image--size--small"></div>
      <h3 class="card-item__title card-item__title--text--bold">${productInfo.name}</h3>`;

    this.element.insertAdjacentHTML('beforeend', this.template);

    const imgEl = this.element.querySelector('.card-item__image');
    if (!canUseWebP()) {
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
      stopAction(() => {
        toggleSubPageProductCard.rendering(productInfo);
        toggleSubPageProductCard.openPage();
      });
    });
    this.template = `
      <div class="card-item__image card-item__image--size--big">
        <div class="card-item__stickers-container"></div>
      </div>
      <div class="card-item__info-container">
        <h3 class="card-item__title card-item__title--text--normal card-item__title--position--center">${productInfo.name}</h3>
        <span class="card-item__available-info card-item__available-info--show">
      </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.stickersContainer = this.element.querySelector('.card-item__stickers-container');
    if (productInfo.stickers && productInfo.stickers.length !== 0) {
      productInfo.stickers.forEach((stickerName) => {
        const stickerEl = document.createElement('div');
        stickerEl.classList.add('text-area__icon', 'text-area__icon--size--big', `text-area__icon--type--${stickerName}`);
        this.stickersContainer.prepend(stickerEl);
      });
    }

    const imgEl = this.element.querySelector('.card-item__image');
    if (!canUseWebP()) {
      loadImg(productInfo, imgEl, 'jpg');
    } else {
      loadImg(productInfo, imgEl, 'webp');
    }

    return this.element;
  }
}

class CreateCardItemRewardCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(rewardInfo) {
    const {
      id, title, icon,
    } = rewardInfo;
    this.element = document.createElement('div');
    this.element.classList.add('card-item');
    this.element.id = id;
    this.element.addEventListener('click', () => {
      toggleModal.renderingReward(rewardInfo);
    });
    this.template = `
      <div style="background-image: url(${icon})" class="card-item__image-reward"></div>
      <div class="card-item__info-container">
        <h3 class="card-item__title card-item__title--text--normal card-item__title--position--center">${title}</h3>
        <span class="card-item__available-info card-item__available-info--show">
      </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);

    /* const imgEl = this.element.querySelector('.card-item__image');
    if (!canUseWebP()) {
      loadImg(productInfo, imgEl, 'jpg');
    } else {
      loadImg(productInfo, imgEl, 'webp');
    } */

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

  create(info, option) {
    this.element = document.createElement(this.parameters.selector);
    let state;
    let theme;
    const date = transformationUtcToLocalDate(info.timestamp);
    if (info.amount < 0) {
      state = 'Списано';
      theme = 'red';
    } else {
      state = 'Начислено';
      theme = 'green';
    }
    this.template = `
          <div class="card-item__content-container">
          <div class="card-item__container card-item__container--display--flex">
            <h3 class="card-item__title card-item__title--indentation--right card-item__title--text--bold card-item__title--theme--${theme}">${info.amount}</h3>
            <svg class="text-area__icon text-area__icon--size--small" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 8.28003C23 5.10003 20.41 2.53003 17.25 2.53003C14.96 2.53003 12.98 3.87003 12.05 5.82003C12.03 5.86003 11.97 5.86003 11.96 5.82003C11.04 3.88003 9.05 2.53003 6.76 2.53003C3.58 2.53003 1 5.10003 1 8.28003C1 8.95003 1.11 9.59003 1.33 10.19C1.57 10.87 1.94 11.5 2.4 12.03C2.6 12.26 2.81 12.47 3.04 12.67L11.82 21.39C11.87 21.44 11.94 21.47 12.02 21.47C12.1 21.47 12.16 21.45 12.22 21.39L21.33 12.34C21.92 11.75 22.39 11.03 22.67 10.23C22.88 9.62003 23 8.96003 23 8.28003Z" fill="#E3562F"/>
            </svg>
          </div>
          <span class="card-item__title card-item__title--text--big">${state}</span>
          <span class="card-item__info card-item__info--theme--shadow">${date}</span>
          </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);

    if (!option.heart) {
      this.heart = this.element.querySelector('.text-area__icon');
      this.heart.remove();
      this.titleNumber = this.element.querySelector('.card-item__title');
      console.log(this.titleNumber);
      this.titleNumber.classList.add('text-area__number', 'text-area__price', 'text-area__price--size--small');
    }
    return super.create(this.element);
  }
}

class CreateCardItemFavAndHisOrder extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(productInfo, isSearch) {
    console.log(productInfo);
    this.element = document.createElement(this.parameters.selector);
    this.template = `
          <img alt="" class="card-item__image card-item__image--size--small">
          <div class="card-item__content-container">
            <h3 class="card-item__title card-item__title--text--bold">${dataProductApi.successData.items[productInfo.id].name}</h3>
           
            <ul class="card-item__list"></ul>
            <div class="card-item__icon-container">
              <button class="card-item__button card-item__button--type--like card-item__button--size--big">
                <svg class="card-item__icon card-item__icon--type--like card-item__icon--liked" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M1.8 9.80005C1.6 9.25005 1.5 8.67005 1.5 8.05005C1.5 5.15005 3.86 2.80005 6.75 2.80005C8.84 2.80005 10.66 4.03005 11.5 5.80005C11.7 6.22005 12.29 6.22005 12.5 5.80005C13.35 4.02005 15.16 2.80005 17.25 2.80005C20.14 2.80005 22.5 5.15005 22.5 8.05005C22.5 8.67005 22.39 9.27005 22.19 9.83005C21.93 10.56 21.51 11.21 20.97 11.76L12.02 20.66L3.4 12.09L3.39 12.08L3.38 12.07C3.17 11.89 2.98 11.7 2.8 11.49C2.35 10.99 2.02 10.42 1.8 9.80005Z"/>
                </svg>
              </button>
              <button class="card-item__button card-item__button--size--big">
                <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-add-circle-plus.svg]]" alt=""
                     class="card-item__icon card-item__icon--type--add">
              </button>
            </div>
          </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.iconsLike = this.element.querySelector('.card-item__icon--type--like');
    this.img = this.element.querySelector('.card-item__image');
    this.iconsAdd = this.element.querySelector('.card-item__icon--type--add');
    this.element.setAttribute('data-id', productInfo.id);
    const el = this.element;
    console.log(productInfo);
    /* this.element.addEventListener('click', (e) => {
      console.log(e.target.classList.contains('card-item__icon'))
      if (!e.target.classList.contains('card-item__button') || !e.target.classList.contains('card-item__icon')) {
        toggleFifthPage.closePage();
        toggleSubPageProductCard.rendering(dataProductApi.successData.items[productInfo.id]);
        toggleFifthPage.deletePage();
      }
    }); */
    this.element.addEventListener('click', (e) => {
      const classArr = ['card-item__image', 'card-item__title'];
      classArr.forEach((classEl) => {
        if (e.target.classList.contains(classEl)) {
          toggleModalPageSearch.closePage();
          toggleModalPageSearch.deletePage();
          toggleSubPageProductCard.rendering(dataProductApi.successData.items[productInfo.id]);
        }
      });
    });

    if (typeof dataProductApi.successData.items[productInfo.id] === 'object' && typeof productInfo.modifiers === 'object') {
      const cardItemList = this.element.querySelector('.card-item__list');
      console.log(cardItemList, productInfo);
      productInfo.modifiers.forEach((modifier) => {
        if (typeof modifier.id === 'number' && typeof dataProductApi.successData.modifiers[modifier.id] !== 'undefined' && typeof modifier.count === 'number' && modifier.count > 0) {
          const cardItemListItem = document.createElement('li');
          cardItemListItem.classList.add('card-item__list-item');
          cardItemListItem.id = modifier.id;
          cardItemListItem.textContent = `${modifier.count} добав${number_of(modifier.count, ['ка', 'ки', 'ок'])} ${dataProductApi.successData.modifiers[modifier.id].name}`;
          cardItemList.append(cardItemListItem);
        }
      });
    }
    if (this.parameters.iconLiked) {
      this.iconsLike.addEventListener('click', () => {
        el.classList.add('card-item--animation');
        itemsArray.forEach((item, index) => {
          if (item.id === dataProductApi.successData.items[productInfo.id].id) {
            itemsArray.splice(index, 1);
          }
        });
        toggleOrderHistoryContent.clearTab();
        toggleOrderHistoryContent.rendering();
        localStorage.setItem('items', JSON.stringify(itemsArray));
        setTimeout(() => el.remove(), 200);
      });
    } else {
      this.iconsLike.classList.remove('card-item__icon--liked');
      itemsArray.forEach((item) => {
        if (item.id === productInfo.id) {
          this.iconsLike.classList.add('card-item__icon--liked');
        }
      });
      this.iconsLike.addEventListener('click', function () {
        const allIconsLikes = document.querySelectorAll('.card-item__icon--type--like');
        if (this.classList.contains('card-item__icon--liked')) {
          this.classList.remove('card-item__icon--liked');
          itemsArray.forEach((item, index) => {
            if (item.id === dataProductApi.successData.items[productInfo.id].id) {
              itemsArray.splice(index, 1);
            }
          });
          localStorage.setItem('items', JSON.stringify(itemsArray));
        } else {
          this.classList.add('card-item__icon--liked');
          [...allIconsLikes].forEach((like) => {
            if (like.closest('.card-item').getAttribute('data-id') === String(productInfo.id)) {
              like.classList.add('card-item__icon--liked');
            }
          });
          if (!doubleFav(productInfo)) {
            itemsArray.push({ id: productInfo.id });
          }
        }
      });
    }
    if (!canUseWebP()) {
      loadImg(dataProductApi.successData.items[productInfo.id], this.img, 'jpg');
    } else {
      loadImg(dataProductApi.successData.items[productInfo.id], this.img, 'webp');
    }

    this.iconsAdd.addEventListener('click', function () {
      const basketPopupIcon = document.querySelector('.bottom-bar__icon-popup');
      const basketPopupIconImg = document.querySelector('.bottom-bar__icon-popup-img');
      const modifiersArr = [];
      if (productInfo.modifiers !== undefined) {
        productInfo.modifiers.forEach((modif) => {
          modifiersArr.push({ id: modif.id, count: modif.count });
        });
      }
      basketArray.push({ id: productInfo.id, modifiers: modifiersArr });
      localStorage.setItem('basket', JSON.stringify(basketArray));
      emitter.emit('event:counter-changed');
      if (!canUseWebP()) {
        loadImg(dataProductApi.successData.items[productInfo.id], basketPopupIconImg, 'jpg');
      } else {
        loadImg(dataProductApi.successData.items[productInfo.id], basketPopupIconImg, 'webp');
      }
      basketPopupIcon.classList.add('bottom-bar__icon-popup--open');
      setTimeout(() => {
        basketPopupIcon.classList.remove('bottom-bar__icon-popup--open');
        basketPopupIconImg.style.backgroundImage = '';
      }, 3000);
      if (isSearch) {
        const cardItem = this.closest('.card-item');
        const iconAdd = cardItem.querySelector('.card-item__icon--type--add');
        console.log(iconAdd);
        cardItem.classList.add('animation-pulse');
        iconAdd.classList.add('card-item__icon--theme--grass');
        setTimeout(() => {
          cardItem.classList.remove('animation-pulse');
          iconAdd.classList.remove('card-item__icon--theme--grass');
        }, 1000);
      }
    });

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

  create(productInfo, funcCheckBasket) {
    this.element = document.createElement('div');
    this.energy = `Калорий ${dataProductApi.successData.items[productInfo.id].energy} г`;

    this.template = `
          <div class="card-item__container--direction--row-small banners__banner">
            <div class="card-item__image card-item__image--size--small"></div>
            <div class="card-item__content-container">
              <h3 class="card-item__title card-item__title--text--bold">${dataProductApi.successData.items[productInfo.id].name}</h3>
              <span class="card-item__info card-item__info--indentation--bottom card-item__info--theme--shadow card-item__info--type--energy">${this.energy}</span>
              <ul class="card-item__list"></ul>
              <span class="card-item__price"></span>
              <div class="card-item__icon-container">
                <button class="card-item__button card-item__button--type--minus">
                 <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-remove-circle.svg]]" alt=""
                       class="card-item__icon card-item__icon--type--minus">
                </button>
                <button class="card-item__button card-item__button--type--plus">
                  <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-add-circle-plus.svg]]" alt=""
                       class="card-item__icon card-item__icon--type--plus">
                </button>
              </div>
              <div class="main-card__figure main-card__figure--theme--blood main-card__figure--size--normal main-card__figure--hide"><span class="main-card__info main-card__info--out-of">Закончилось</span></div>
            </div>
          </div>
          <div class="card-item__zone card-item__zone--type--delete banners__banner">
            <img class="card-item__icon card-item__icon--size--big" src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-delete-basket.svg]]" alt="">
          </div>  
        `;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.iconsMinus = this.element.querySelector('.card-item__button--type--minus');
    this.iconsPlus = this.element.querySelector('.card-item__button--type--plus');
    this.price = this.element.querySelector('.card-item__price');
    this.figure = this.element.querySelector('.main-card__figure');
    this.energyEl = this.element.querySelector('.card-item__info--type--energy');
    this.element.setAttribute('id', productInfo.id);
    const el = this.element;
    const counterTopBar = document.querySelector('.top-bar__all-counter-order');
    const counterBottomBar = document.querySelector('.bottom-bar__counter');
    if (!isEmptyObj(outOfStock) && outOfStock.successData.itemsAndModifiers.length !== 0) {
      for (const id in outOfStock.successData.itemsAndModifiers) {
        if (Number(id) === productInfo.id) {
          this.figure.classList.remove('main-card__figure--hide');
          break;
        }
      }
    }
    this.element.addEventListener('click', (e) => {
      if (!e.target.classList.contains('card-item__button') && !e.target.classList.contains('card-item__icon')) {
        stopAction(() => {
          toggleSubPageProductCard.closePage();
          toggleSubPageProductCard.deletePage();
          toggleThirdPage.closePage();
          toggleThirdPage.deletePage();
          setTimeout(() => {
            toggleSubPageProductCard.rendering(dataProductApi.successData.items[productInfo.id], false);
            toggleModalPageReviewOrder.closePage();
            toggleModalPageReviewOrder.deletePage();
          }, 300);
        });
      }
    });
    if (!dataProductApi.successData.items[productInfo.id].energy) {
      this.energyEl.remove();
    }

    const imgEl = this.element.querySelector('.card-item__image');
    if (!canUseWebP()) {
      loadImg(dataProductApi.successData.items[productInfo.id], imgEl, 'jpg');
    } else {
      loadImg(dataProductApi.successData.items[productInfo.id], imgEl, 'webp');
    }

    let priceAllModifier = 0;

    if (typeof dataProductApi.successData.items[productInfo.id] === 'object' && typeof productInfo.modifiers === 'object') {
      const cardItemList = this.element.querySelector('.card-item__list');
      /**
       * Перебераем их
       */
      for (const modifier of productInfo.modifiers) {
        /**
         * Если у модификатора есть идентификатор и такой модификатор существует в каталоге, и количество модификаторов определено и больше 0, то добавляем модификаторы к описанию
         */
        if (typeof modifier.id === 'number' && typeof dataProductApi.successData.modifiers[modifier.id] !== 'undefined' && typeof modifier.count === 'number' && modifier.count > 0) {
          priceAllModifier += dataProductApi.successData.modifiers[modifier.id].price * modifier.count;
          const cardItemListItem = document.createElement('li');
          cardItemListItem.classList.add('card-item__list-item');
          cardItemListItem.id = modifier.id;
          cardItemListItem.textContent = `${modifier.count} добав${number_of(modifier.count, ['ка', 'ки', 'ок'])} ${dataProductApi.successData.modifiers[modifier.id].name}`;
          cardItemList.append(cardItemListItem);
        }
      }
    }
    if (!isEmptyObj(userStore)) {
      if (userStore.store.priceGroup === null) {
        this.price.textContent = priceAllModifier + dataProductApi.successData.items[productInfo.id].price;
      } else {
        this.price.textContent = priceAllModifier + dataProductApi.successData.items[productInfo.id][`price${userStore.store.priceGroup}`];
      }
    }

    this.iconsMinus.addEventListener('click', function () {
      (() => {
        if (!this.classList.contains('stop-action')) {
          counterTopBar.textContent = basketArray.length;
          counterBottomBar.textContent = basketArray.length;
          el.classList.add('card-item--animation');
          for (const [index, item] of Object.entries(basketArray)) {
            console.log(item.id, productInfo.id, item.id === productInfo.id);
            if (item.id === productInfo.id) {
              basketArray.splice(index, 1);
              break;
            }
          }
          localStorage.setItem('basket', JSON.stringify(basketArray));
          emitter.emit('event:counter-changed');

          checkEmptyBasket();
          setTimeout(() => el.remove(), 200);
          this.classList.add('stop-action');
        }
        setTimeout(() => this.classList.remove('stop-action'), 1000);
      })();
    });

    this.iconsPlus.addEventListener('click', () => {
      counterTopBar.textContent = basketArray.length;
      counterBottomBar.textContent = basketArray.length;
      basketArray.push(productInfo);
      localStorage.setItem('basket', JSON.stringify(basketArray));
      emitter.emit('event:counter-changed');
      const cardItemContainer = document.querySelector('.card-item__container--type--review');
      cardItemContainer.append(this.create(productInfo));
      activeBanners(this.element, true, checkEmptyBasket);
    });
    return super.create(this.element);
  }
}

class CreateCardItemHistory extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.create.bind(this);
  }

  create(productInfo) {
    this.elementWraper = document.createElement('div');
    this.elementWraper.classList.add('history-order');
    let { orderStateName, orderDate } = productInfo;
    const date = transformationUtcToLocalDate(orderDate);
    if (productInfo.orderStateName === 'Создан' && productInfo.paid !== 0) {
      orderStateName = 'Оплачен';
    }
    this.templateTitle = `<div class="title-bar title-bar--theme--dark title-bar--indentation--top title-bar--indentation--bottom-small">
                            <div class="title-bar__text-container">
                            <div>
                              <span class="title-bar__text title-bar__text--theme--shadow">№${productInfo.orderId}</span>
                              <span class="title-bar__text title-bar__text--theme--shadow">${orderStateName}</span>
                            </div>
                            <span class="title-bar__title title-bar__title--size--small title-bar__title--theme--shadow">${date}</span>
                            </div>
                            <button class="title-bar__button">Добавить все</button>
                          </div>`;
    this.elementWraper.insertAdjacentHTML('beforeend', this.templateTitle);

    for (const item of Object.values(productInfo.items)) {
      this.element = document.createElement('div');
      this.element.classList.add('card-item', 'card-item--direction--row', 'card-item--border--bottom', 'card-item--indentation--bottom-big');
      this.template = `
          <img alt="" class="card-item__image card-item__image--size--small">
          <div class="card-item__content-container">
            <h3 class="card-item__title card-item__title--text--bold">${item.itemName}</h3>
            <ul class="card-item__list"></ul>
            <span class="card-item__price">${item.itemPrice}</span>
            <div class="card-item__icon-container card-item__icon-container--size--small">
              <button class="button card-item__button card-item__button--type--like">
                <svg class="card-item__icon card-item__icon--type--like" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.8 9.80005C1.6 9.25005 1.5 8.67005 1.5 8.05005C1.5 5.15005 3.86 2.80005 6.75 2.80005C8.84 2.80005 10.66 4.03005 11.5 5.80005C11.7 6.22005 12.29 6.22005 12.5 5.80005C13.35 4.02005 15.16 2.80005 17.25 2.80005C20.14 2.80005 22.5 5.15005 22.5 8.05005C22.5 8.67005 22.39 9.27005 22.19 9.83005C21.93 10.56 21.51 11.21 20.97 11.76L12.02 20.66L3.4 12.09L3.39 12.08L3.38 12.07C3.17 11.89 2.98 11.7 2.8 11.49C2.35 10.99 2.02 10.42 1.8 9.80005Z"/>
                </svg>
              </button>
              <button class="card-item__button card-item__button--type--plus">
                <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-add-circle-plus.svg]]" alt=""
                     class="card-item__icon card-item__icon--type--plus">
              </button>
            </div>
          </div>`;
      this.element.insertAdjacentHTML('beforeend', this.template);
      this.iconsPlus = this.element.querySelector('.card-item__button--type--plus');
      this.buttonPlus = this.element.querySelector('.card-item__button--type--plus');
      this.price = this.element.querySelector('.card-item__price');
      this.iconsLike = this.element.querySelector('.card-item__icon--type--like');
      this.buttonLike = this.element.querySelector('.card-item__button--type--like');

      this.element.setAttribute('data-id', item.itemId);

      const imgEl = this.element.querySelector('.card-item__image');
      if (dataProductApi.successData.items[item.itemId]) {
        if (!canUseWebP()) {
          loadImg(dataProductApi.successData.items[item.itemId], imgEl, 'jpg');
        } else {
          loadImg(dataProductApi.successData.items[item.itemId], imgEl, 'webp');
        }
      }

      let priceAllModifier = 0;

      /**
       * Если есть модификаторы
       */
      if (typeof dataProductApi.successData.items[item.itemId] === 'object' && typeof item.modifiers === 'object') {
        const cardItemList = this.element.querySelector('.card-item__list');
        /**
         * Перебераем их
         */
        let itemForCompare = {
          id: item.itemId,
          modifiers: [], // нужно раскомментировать, если модификаторы, хотя бы пустые обязательны в избранном
        };
        const modifierArray = [];
        item.modifiers.forEach((modifier) => {
          if (typeof modifier.modificationId === 'number' && typeof dataProductApi.successData.modifiers[modifier.modificationId] !== 'undefined' && typeof modifier.count === 'number' && modifier.count > 0) {
            priceAllModifier += dataProductApi.successData.modifiers[modifier.modificationId].price * modifier.count;
            const cardItemListItem = document.createElement('li');
            cardItemListItem.classList.add('card-item__list-item');
            cardItemListItem.id = modifier.modificationId;
            cardItemListItem.textContent = `${modifier.count} добав${number_of(modifier.count, ['ка', 'ки', 'ок'])} ${dataProductApi.successData.modifiers[modifier.modificationId].name}`;
            cardItemList.append(cardItemListItem);

            modifierArray.push({
              id: modifier.modificationId,
              count: modifier.count,
            });
          }
        });
        itemForCompare.modifiers = modifierArray;
        let favouriteItemFlag = false;
        itemForCompare = JSON.stringify(itemForCompare);
        for (let itemOfFavourites of Object.values(itemsArray)) {
          itemOfFavourites = JSON.stringify(itemOfFavourites);

          if (itemForCompare === itemOfFavourites) {
            favouriteItemFlag = true;
            this.iconsLike.classList.add('card-item__icon--liked');
            break;
          }
        }
      }

      this.price.textContent = priceAllModifier + item.itemPrice;

      this.buttonPlus.addEventListener('click', () => {
        const basketPopupIcon = document.querySelector('.bottom-bar__icon-popup');
        const basketPopupIconImg = document.querySelector('.bottom-bar__icon-popup-img');
        const modifiersArr = [];
        item.modifiers.forEach((modif) => {
          modifiersArr.push({ id: modif.modificationId, count: modif.count });
        });
        basketArray.push({ id: item.itemId, modifiers: modifiersArr });
        localStorage.setItem('basket', JSON.stringify(basketArray));
        emitter.emit('event:counter-changed');
        if (!canUseWebP()) {
          loadImg(dataProductApi.successData.items[item.itemId], basketPopupIconImg, 'jpg');
        } else {
          loadImg(dataProductApi.successData.items[item.itemId], basketPopupIconImg, 'webp');
        }
        basketPopupIcon.classList.add('bottom-bar__icon-popup--open');
        setTimeout(() => {
          basketPopupIcon.classList.remove('bottom-bar__icon-popup--open');
          basketPopupIconImg.style.backgroundImage = '';
        }, 3000);
      });


      this.iconsLike.addEventListener('click', function () {
        console.log(item, this, productInfo);
        if (this.classList.contains('card-item__icon--liked')) {
          const allIconsLiked = document.querySelectorAll('.card-item__icon--liked');
          this.classList.remove('card-item__icon--liked');
          [...allIconsLiked].forEach((like) => {
            if (like.closest('.card-item').getAttribute('data-id') === String(item.itemId)) {
              like.classList.remove('card-item__icon--liked');
            }
          });
          itemsArray.forEach((el, index) => {
            if (el.id === item.itemId) {
              itemsArray.splice(index, 1);
            }
          });
        } else {
          console.log(this);
          this.classList.add('card-item__icon--liked');
          const allIconsLikes = document.querySelectorAll('.card-item__icon--type--like');
          [...allIconsLikes].forEach((like) => {
            if (like.closest('.card-item').getAttribute('data-id') === String(item.itemId)) {
              like.classList.add('card-item__icon--liked');
            }
          });
          console.log(doubleFav(item));
          if (!doubleFav(item)) {
            const modifiersArr = [];
            item.modifiers.forEach((modif) => {
              modifiersArr.push({ id: modif.modificationId, count: modif.count });
            });
            itemsArray.push({ id: item.itemId, modifiers: modifiersArr });
          }
        }
        localStorage.setItem('items', JSON.stringify(itemsArray));
      });

      if (typeof dataProductApi.successData.items[item.itemId] === 'undefined') {
        this.iconsLike.remove();
        this.buttonPlus.remove();
      } else {
        this.element.addEventListener('click', (e) => {
          const classArr = ['card-item__image', 'card-item__title', 'card-item__price'];
          classArr.forEach((classEl) => {
            if (e.target.classList.contains(classEl)) {
              toggleFifthPage.closePage();
              toggleSubPageProductCard.rendering(dataProductApi.successData.items[item.itemId]);
              toggleFifthPage.deletePage();
            }
          });
        });
      }
      this.elementWraper.append(this.element);
    }
    this.buttonAddAll = this.elementWraper.querySelector('.title-bar__button');
    this.buttonAddAll.addEventListener('click', function () {
      for (const itemEl of Object.values(productInfo.items)) {
        const modifiersArr = [];
        itemEl.modifiers.forEach((modif) => {
          modifiersArr.push({ id: modif.modificationId, count: modif.count });
        });
        basketArray.push({ id: itemEl.itemId, modifiers: modifiersArr });
      }
      localStorage.setItem('basket', JSON.stringify(basketArray));
      const wraper = this.closest('.history-order');
      wraper.classList.add('animation-pulse');
      setTimeout(() => wraper.classList.remove('animation-pulse'), 1000);
      emitter.emit('event:counter-changed');
    });

    return this.elementWraper;
  }
}
