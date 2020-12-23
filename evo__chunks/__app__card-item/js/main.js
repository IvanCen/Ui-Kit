class CreateCardItemProductCardNew extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(productInfo) {
    this.element = document.createElement('div');
    this.element.classList.add('catalog__list-element', 'catalog__list-element--hit');
    this.element.id = productInfo.id;
    let weight;
    if (productInfo.netWeight) {
      weight = `${productInfo.netWeight} г`;
    } else if (productInfo.volume) {
      weight = `${productInfo.volume} мл`;
    } else {
      weight = '';
    }

    let price;
    if (!isEmptyObj(userStore)) {
      if (userStore.store.priceGroup === null) {
        price = `${dataProductApi.successData.items[productInfo.id].price}`;
      } else {
        price = dataProductApi.successData.items[productInfo.id][`price${userStore.store.priceGroup}`];
      }
    } else {
      price = '';
    }

    price = changePriceSeasons({ price, id: productInfo.id });

    this.template = `
                <div class="catalog__list-element-image">
                    <div class="catalog__stickers"></div>
                </div>
                <div class="catalog__list-element-detail catalog__list-element-detail--type--border">
                    <div class="catalog__list-element-title">
                        <div class="catalog__list-element-name">${productInfo.name}</div>
                        <div class="catalog__list-element-price">${price} ₽</div>
                    </div>
                    <div class="catalog__list-element-additional">
                        <div class="catalog__list-element-name">${weight}</div>
                        <div class="catalog__list-element-plus element-plus">
                            <div class="catalog__list-element-plus-icon"></div>
                        </div>
                    </div>
                </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);
    /* this.stickersContainer = this.element.querySelector('.card-item__stickers-container');
    if (productInfo.stickers && productInfo.stickers.length !== 0) {
      productInfo.stickers.forEach((stickerName) => {
        const stickerEl = document.createElement('div');
        stickerEl.classList.add('text-area__icon', 'text-area__icon--size--big', `text-area__icon--type--${stickerName}`);
        this.stickersContainer.prepend(stickerEl);
      });
    } */

    if (isEmptyObj(userStore)) {
      this.priceEl = this.element.querySelector('.catalog__list-element-price');
      this.priceEl.classList.add('catalog__list-element-price--hide');
    }

    this.iconsPlus = this.element.querySelector('.catalog__list-element-plus');

    if (!isEmptyObj(outOfStock) && outOfStock.successData.itemsAndModifiers.length !== 0) {
      for (const id in outOfStock.successData.itemsAndModifiers) {
        if (Number(id) === productInfo.id) {
          this.element.classList.add('catalog__list-element--ended');
          break;
        }
      }
    }

    this.element.addEventListener('click', (e) => {
      if (!e.target.classList.contains('catalog__list-element-plus-icon')) {
        stopAction(() => {
          toggleModalPageCard.rendering(dataProductApi.successData.items[productInfo.id]);
        });
      }
    });

    this.iconsPlus.addEventListener('click', function () {
      this.iconsPlusIcon = this.querySelector('.catalog__list-element-plus-icon');
      this.iconsPlusIcon.classList.add('catalog__list-element-plus-icon--active');
      setTimeout(() => {
        this.iconsPlusIcon.classList.remove('catalog__list-element-plus-icon--active');
      }, 1000);
      basketArray.push({ id: productInfo.id, modifiers: [] });
      localStorage.setItem('basket', JSON.stringify(basketArray));
      checkEmptyBasket();
      animationAddProduct();
    });

    const imgEl = this.element.querySelector('.catalog__list-element-image');
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

class CreateCardItemReviewContainer extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create() {
    this.element = document.createElement(this.parameters.selector);
    this.template = `
          <div class="basket__header accordion__trigger basket__header-should-open basket__header-review" data-id="8">
              <div class="basket__title basket__title-products">Товаров (${basketArray.length})</div>
          </div>
          <section class="basket__offers accordion__container accordion__container-review" data-id="8">
              
          </section>`;
    this.element.insertAdjacentHTML('beforeend', this.template);
    return super.create(this.element);
  }
}

class CreateCardItemReview extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.create.bind(this);
  }

  create(productInfo, funcCheckBasket) {
    this.element = document.createElement('div');
    console.log(productInfo);

    let price;
    if (!isEmptyObj(userStore)) {
      if (userStore.store.priceGroup === null) {
        price = dataProductApi.successData.items[productInfo.id].price;
      } else {
        price = dataProductApi.successData.items[productInfo.id][`price${userStore.store.priceGroup}`];
      }
    } else {
      price = 0;
    }

    price = changePriceSeasons({ price, id: productInfo.id });


    this.template = `
          <div class="basket__offers-element banners__banner">
            <div class="basket__offers-element-image"></div>
            <div class="basket__offers-element-detail">
                <div class="basket__offers-element-title">
                    <div class="basket__offers-element-name">${dataProductApi.successData.items[productInfo.id].name}</div>
                    <div class="basket__offers-element-price"><span class="basket__offers-element-price-number">${price}</span> ₽</div>
                </div>
                <div class="basket__offers-element-additional">
                    <div class="basket__offers-element-name">${dataProductApi.successData.items[productInfo.id].volume || ''}</div>
                    <div class="basket__offers-element-count">
                        <div class="basket__offers-element-plus">
                            <div class="basket__offers-element-plus-icon"></div>
                        </div>
                    </div>
                </div>
                
                <div class="basket__offers-element-additional basket__offers-element-additional-end">
                    <button class="basket__offers-element-change-btn">Изменить</button>
                </div>
            </div>
        </div>
        <div class="card-item__zone card-item__zone--type--delete banners__banner">
          <img class="card-item__icon card-item__icon--size--big" src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-delete-basket.svg]]" alt="">
        </div>
        `;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.iconsPlus = this.element.querySelector('.basket__offers-element-plus');
    this.price = this.element.querySelector('.basket__offers-element-price');
    this.basketEl = this.element.querySelector('.basket__offers-element');
    this.buttonChange = this.element.querySelector('.basket__offers-element-change-btn');
    this.element.setAttribute('id', productInfo.id);
    if (!isEmptyObj(outOfStock) && outOfStock.successData.itemsAndModifiers.length !== 0) {
      for (const id in outOfStock.successData.itemsAndModifiers) {
        if (Number(id) === productInfo.id) {
          this.basketEl.classList.add('basket__offers-element--ended');
          break;
        }
      }
    }
    this.buttonChange.addEventListener('click', (e) => {
      isEditCard = {
        ...productInfo,
      };
      console.log(isEditCard);

      stopAction(() => {
        toggleModalPageCard.closePage();
        toggleModalPageCard.deletePage();
        toggleThirdPage.closePage();
        toggleThirdPage.deletePage();
        setTimeout(() => {
          toggleModalPageCard.rendering(dataProductApi.successData.items[productInfo.id]);
          toggleModalPageReviewOrder.closePage();
          toggleModalPageReviewOrder.deletePage();
        }, 300);
      });
    });

    this.element.addEventListener('click', (e) => {
      console.log(e.target);
      if (!e.target.classList.contains('basket__offers-element-plus')
        && !e.target.classList.contains('basket__offers-element-plus-icon')
        && !e.target.classList.contains('basket__offers-element-change-btn')) {
        stopAction(() => {
          toggleModalPageCard.closePage();
          toggleModalPageCard.deletePage();
          toggleThirdPage.closePage();
          toggleThirdPage.deletePage();
          setTimeout(() => {
            toggleModalPageCard.rendering(dataProductApi.successData.items[productInfo.id]);
            toggleModalPageReviewOrder.closePage();
            toggleModalPageReviewOrder.deletePage();
          }, 300);
        });
      }
    });

    const imgEl = this.element.querySelector('.basket__offers-element-image');
    if (!canUseWebP()) {
      loadImg(dataProductApi.successData.items[productInfo.id], imgEl, 'jpg');
    } else {
      loadImg(dataProductApi.successData.items[productInfo.id], imgEl, 'webp');
    }

    let priceAllModifier = 0;

    if (typeof dataProductApi.successData.items[productInfo.id] === 'object' && typeof productInfo.modifiers === 'object' && productInfo.modifiers.length !== 0) {
      const additionals = this.element.querySelector('.basket__offers-element-additional-end');
      const templateModif = `<div class="basket__offers-element-modifiers">
                    <div class="basket__offers-element-modifiers-title">Модификаторы</div>
                    <ul class="basket__offers-element-modifiers-list">
                    
                    </ul>
                </div>`;
      additionals.insertAdjacentHTML('beforebegin', templateModif);
      const cardItemList = this.element.querySelector('.basket__offers-element-modifiers-list');
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
          const template = `
                            <div class="basket__offers-element-modifiers-list-name">${dataProductApi.successData.modifiers[modifier.id].name} ${modifier.count}</div>
                            <div class="basket__offers-element-modifiers-list-element-price">+<span class="basket__offers-element-price-number">${priceAllModifier}</span> ₽</div>
                        `;
          cardItemListItem.insertAdjacentHTML('beforeend', template);
          cardItemListItem.classList.add('basket__offers-element-modifiers-list-element');
          cardItemListItem.id = modifier.id;
          cardItemList.append(cardItemListItem);
        }
      }
    }

    const cardItem = new CreateCardItemReview({
      style: ['banner__container'],
      modifier: [
        '--type--swipe',
      ],
    });

    this.iconsPlus.addEventListener('click', function () {
      this.iconsPlusIcon = this.querySelector('.basket__offers-element-plus-icon');
      this.iconsPlusIcon.classList.add('basket__offers-element-plus-icon--active');
      setTimeout(() => {
        this.iconsPlusIcon.classList.remove('basket__offers-element-plus-icon--active');
      }, 1000);
      basketArray.push(productInfo);
      localStorage.setItem('basket', JSON.stringify(basketArray));
      emitter.emit('event:counter-changed');
      const cardItemContainer = document.querySelector('.accordion__container-review');
      checkBasketCounter();
      const cardItemEl = cardItem.create(productInfo);
      cardItemContainer.append(cardItemEl);
      countResultPriceAndAllProductCounter();
      activeBanners(cardItemEl, { isSwipe: true });
      checkEmptyBasket();
      animationAddProduct();
      const accordionTriggers = document.querySelectorAll('.basket__header-review');
      accordionTriggers.forEach((trigger) => {
        const container = document.querySelector(`.accordion__container[data-id='${trigger.dataset.id}']`);
        container.style.maxHeight = `${container.scrollHeight}px`;
      });
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
    this.templateTitle = `<div class="title-bar title-bar--indentation--top title-bar--indentation--bottom-small">
                            <div class="title-bar__text-container">
                            <div>
                              <span class="title-bar__text title-bar__text--type--bold">№${productInfo.orderId}</span>
                              <span class="title-bar__text title-bar__text--type--bold">${orderStateName}</span>
                            </div>
                            <span class="title-bar__title title-bar__title--size--small title-bar__title--theme--shadow">${date}</span>
                            </div>
                            <button class="title-bar__button">Добавить все</button>
                          </div>`;
    this.elementWraper.insertAdjacentHTML('beforeend', this.templateTitle);

    for (const items of Object.values(productInfo.items)) {
      const item = dataProductApi.successData.items[items.itemId];

      this.element = document.createElement('div');
      this.element.classList.add('catalog__list-element', 'catalog__list-element--hit', 'catalog__list-element--indentation');

      let weight;
      if (item && item.netWeight) {
        weight = `${item.netWeight} г`;
      } else if (item && item.volume) {
        weight = `${item.volume} мл`;
      } else {
        weight = '';
      }

      let name;
      if (item && item.name) {
        name = item.name;
      } else {
        name = items.itemName;
      }

      let price;
      if (items.itemPrice) {
        price = items.itemPrice;
      } else {
        price = item.price;
      }

      this.template = `
                <div class="catalog__list-element-image">
                    <div class="catalog__stickers"></div>
                </div>
                <div class="catalog__list-element-detail catalog__list-element-detail--type--border">
                    <div class="catalog__list-element-title">
                        <div class="catalog__list-element-name">${name}</div>
                        <div class="catalog__list-element-price">${price} ₽</div>
                    </div>
                    <div class="catalog__list-element-additional">
                        <div class="catalog__list-element-name">${weight}</div>
                        <div class="catalog__list-element-plus element-plus">
                            <div class="catalog__list-element-plus-icon"></div>
                        </div>
                    </div>
                </div>`;
      this.element.insertAdjacentHTML('beforeend', this.template);

      this.iconsPlus = this.element.querySelector('.catalog__list-element-plus');

      if (item) {
        this.element.addEventListener('click', (e) => {
          console.log(e.target);
          if (!e.target.classList.contains('element-plus')) {
            stopAction(() => {
              toggleModalPageCard.rendering(dataProductApi.successData.items[item.id]);
            });
          }
        });

        this.iconsPlus.addEventListener('click', function () {
          this.iconsPlusIcon = this.querySelector('.catalog__list-element-plus');
          this.iconsPlusIcon.classList.add('catalog__list-element-plus--active');
          setTimeout(() => {
            this.iconsPlusIcon.classList.remove('basket__offers-element-plus-icon--active');
          }, 1000);
          basketArray.push({ id: item.id, modifiers: [...items.modifiers] });
          localStorage.setItem('basket', JSON.stringify(basketArray));
          checkEmptyBasket();
          animationAddProduct();
        });

        const imgEl = this.element.querySelector('.catalog__list-element-image');
        if (!canUseWebP()) {
          loadImg(dataProductApi.successData.items[items.itemId], imgEl, 'jpg');
        } else {
          loadImg(dataProductApi.successData.items[items.itemId], imgEl, 'webp');
        }
      }


      this.elementWraper.append(this.element);
    }
    this.buttonAddAll = this.elementWraper.querySelector('.title-bar__button');
    this.buttonAddAll.addEventListener('click', function () {
      for (const itemEl of Object.values(productInfo.items)) {
        if (itemEl.itemId === 281) return;
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
