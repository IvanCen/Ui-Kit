function number_of(number, suffix) {
  const keys = [2, 0, 1, 1, 1, 2];
  const mod = number % 100;
  let suffixKey;

  if (mod > 4 && mod < 20) {
    suffixKey = 2;
  } else {
    suffixKey = keys[Math.min((mod % 10), 5)];
  }

  return suffix[suffixKey];
}


function switchAddNew(productInfo, el) {
  const textAreaButtonPlus = el.querySelectorAll('.card__modifiers-section-list-element-count-plus');
  [...textAreaButtonPlus].forEach((item) => {
    const textArea = item.closest('.card__modifiers-section-list-element');
    const iconPlus = item;
    const iconMinus = textArea.querySelector('.card__modifiers-section-list-element-count-minus');
    const allCounter = textArea.querySelector('.card__modifiers-section-list-element-quantity');

    let counter = 0;
    let allCountAdds = 0;
    if (typeof userDataObj[productInfo.id] === 'object' && !isEmptyObj(userDataObj)) {
      Object.entries(userDataObj[productInfo.id]).forEach(([key, value]) => {
        if (String(textArea.id) === key) {
          allCountAdds += value;
          counter += Number(value);
        }
      });
    }

    function setUserDataObj() {
      if (typeof userDataObj[productInfo.id] !== 'object') {
        userDataObj[productInfo.id] = {};
      }
      if (counter === 0) {
        delete userDataObj[productInfo.id][textArea.id];
      } else {
        userDataObj[productInfo.id][textArea.id] = counter;
      }
      localStorage.setItem('userData', JSON.stringify(userDataObj));
    }

    iconPlus.addEventListener('click', () => {
      counter += 1;
      allCountAdds += 1;
      allCounter.textContent = allCountAdds;
      if (counter !== 0) {
        iconMinus.classList.remove('card__modifiers-section-list-element-count-minus--hidden');
      }
      setUserDataObj();
    });
    iconMinus.addEventListener('click', () => {
      console.log(counter, allCountAdds);
      if (counter >= 1) {
        counter -= 1;
        allCountAdds -= 1;
        allCounter.textContent = allCountAdds;
      }
      if (counter === 0) {
        iconMinus.classList.add('card__modifiers-section-list-element-count-minus--hidden');
        allCounter.textContent = '';
      }
      setUserDataObj();
    });
  });
}

class CreateTextAreaProductCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
  }

  countNutrition(obj, el, counter) {
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== null) {
        const nutritionEl = el.querySelector(`.text-area__info-number--${key}`);
        if (nutritionEl) {
          const regExp = /(\d*\.?\d*).*/gm;
          const number = Number(nutritionEl.textContent.trim().replace(regExp, '$1'));
          const finalNumber = (number + (value * counter)).toFixed(1);
          nutritionEl.textContent = `${finalNumber} г`;
        }
      }
    });
  }

  create(productInfo) {
    let price;
    if (!isEmptyObj(userStore)) {
      if (userStore.store.priceGroup === null) {
        price = productInfo.price;
      } else {
        price = productInfo[`price${userStore.store.priceGroup}`];
      }
    } else {
      price = 0;
    }

    price = changePriceSeasons({ price, id: productInfo.id });

    this.template = `
      <div class="card__touch"></div>
        <div class="card__container">
            <div class="card__image">
                <div class="card__out-of-stock">закончилось</div>
                <div class="card__stickers"></div>
            </div>
            <div class="card__title">
                <div class="card__name">${productInfo.name}</div>
                <div class="card__bookmark">
                    <svg class="card__bookmark-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 3H6.99997C5.89997 3 5.00997 3.9 5.00997 5L4.99997 21L12 18L19 21V5C19 3.9 18.1 3 17 3ZM17 18L12 15.82L6.99997 18V5H17V18Z"/>
                    </svg>
                </div>
            </div>
            <div class="card__add-info">
                <div class="card__price">${price} ₽</div>
                <div class="card__count">
                    <div class="card__count-plus">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle opacity="0.12" cx="12.0001" cy="12" r="12" fill="#E6551E"/>
                            <path d="M12.0001 6.75V17.25" stroke="#E6551E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.75006 12H17.2501" stroke="#E6551E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="card__description">
                ${productInfo.intro}
            </div>
            <div class="card__modifiers">
                <div class="card__modifiers-header">
                    <div class="card__modifiers-header-title">Добавки</div>
                    <div class="card__modifiers-reset">Сбросить</div>
                </div>
                
            </div>
            <div class="card__info">
                <div class="card__info-section">
                    <div class="card__info-section-name">Подробная информация</div>
                    <div class="card__info-section-list">
                        <div class="card__info-components">
                            <div class="card__info-components-name">Масса нетто</div>
                            <div class="card__info-components-value">${productInfo.volume || ''}</div>
                        </div>
                        <div class="card__info-components">
                            <div class="card__info-components-name">Калорий</div>
                            <div class="card__info-components-value">${productInfo.energy || ''} </div>
                        </div>
                        <div class="card__info-components">
                            <div class="card__info-components-name">Б/Ж/У</div>
                            <div class="card__info-components-value">${productInfo.protein || ''}/${productInfo.fats || ''}/${productInfo.carbon || ''} г</div>
                        </div>
                        <div class="card__info-text">
                            КБЖУ блюда рассчитывается автоматически. Модификация товара приведет к перерассчету информации на этой странице. Если модификации не выбраны - будет показана информация основного рецепта.
                        </div>
                    </div>
                </div>
                <div class="card__info-section card__info-section--ingredients">
                    <div class="card__info-section-name">Ингридиенты</div>
                    <div class="card__info-section-list">
                        <div class="card__info-text card__info-text-ingredients">
                            
                        </div>
                    </div>
                </div>
                <div class="card__info-section">
                    <div class="card__info-section-name">Аллергены</div>
                    <div class="card__info-section-list">
                        <div class="card__info-text card__info-text-allergens">
                        </div><div class="card__info-text">
                            Мы не можем гарантировать отсутствие следов продуктов, которые могут вызвать аллергию в наших блюдах, так как мы используем общее оборудование для хранения.
                        </div>
                    </div>
                </div>
            </div>
            <button class="button button--theme--tangerin button--theme--shadow-big button--size--large card__button">В корзину</button>
        </div>
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.cardPage = document.querySelector('.card');
    this.buttonAdd = this.element.querySelector('.card__button');
    this.iconAdd = this.element.querySelector('.card__count-plus');
    this.introEl = this.element.querySelector('.card__description');
    this.price = this.element.querySelector('.card__price');
    this.stickersContainer = this.element.querySelector('.card__stickers');
    this.containerIngredients = this.element.querySelector('.card__info-section--ingredients');
    this.iconBookmark = this.element.querySelector('.card__bookmark-icon');
    this.buttonReset = this.element.querySelector('.card__modifiers-reset');
    this.cardContainer = this.element.querySelector('.card__container');

    if (isIos) {
      this.buttonAdd.classList.add('card__button--ios');
      this.cardContainer.classList.add('card__container--ios');
    }

    if (!isEmptyObj(outOfStock) && outOfStock.successData.itemsAndModifiers.length !== 0) {
      let active = true;
      for (const id in outOfStock.successData.itemsAndModifiers) {
        if (Number(id) === productInfo.id) {
          this.cardPage.classList.add('card--ended');
          active = !active;
          break;
        }
      }
    }

    this.buttonAdd.addEventListener('click', () => {
      addProductToBasket(productInfo);
      toggleModalPageCard.close();
    });
    this.iconAdd.addEventListener('click', () => {
      addProductToBasket(productInfo);
      toggleModalPageCard.close();
    });

    this.buttonReset.addEventListener('click', () => {
      delete userDataObj[productInfo.id];
      localStorage.setItem('userData', userDataObj);
      this.clearModif();
      this.renderModif(productInfo);
    });


    if (isEmptyObj(userStore)) {
      this.price.classList.add('text-area__price--hide');
    } else {
      this.price.classList.remove('text-area__price--hide');
    }

    if (productInfo.intro === '') {
      this.introEl.remove();
    }

    if (productInfo.stickers && productInfo.stickers.length !== 0) {
      productInfo.stickers.forEach((stickerName) => {
        const stickerEl = document.createElement('div');
        stickerEl.classList.add('card__stickers-element', `card__stickers-element--${stickerName}`);
        this.stickersContainer.prepend(stickerEl);
      });
    }

    const arrIngredientsProduct = [];
    const arrAllIngredientsProductName = [];
    const arrAllAllergensProductName = [];

    if (productInfo.ingredients !== null) {
      productInfo.ingredients.forEach((ingredient) => {
        arrIngredientsProduct.push(dataProductApi.successData.ingredients[ingredient]);
      });
    }

    arrIngredientsProduct.forEach((ingredient) => {
      if (ingredient) {
        arrAllIngredientsProductName.push(ingredient.name);
        if (ingredient.allergenFlag) {
          arrAllAllergensProductName.push(ingredient.name);
        }
      }
    });

    const elementIngredients = this.element.querySelector('.card__info-text-ingredients');
    const elementAllergens = this.element.querySelector('.card__info-text-allergens');
    elementIngredients.textContent = arrAllIngredientsProductName.join(', ');
    elementAllergens.textContent = arrAllAllergensProductName.join(', ');

    if (productInfo.ingredients === null) {
      this.containerIngredients.remove();
    }

    itemsArray.forEach((item) => {
      if (item.id === productInfo.id) {
        this.iconBookmark.classList.add('card__bookmark-icon--liked');
      }
    });

    this.iconBookmark.addEventListener('click', () => {
      this.iconBookmark.classList.toggle('card__bookmark-icon--liked');
      if (this.iconBookmark.classList.contains('card__bookmark-icon--liked')) {
        if (productInfo.modifiers !== null) {
          const modifiersArr = [];
          for (const modif in userDataObj[productInfo.id]) {
            modifiersArr.push({ id: Number(modif), count: userDataObj[productInfo.id][modif] });
          }
          itemsArray.push({ id: productInfo.id, modifiers: modifiersArr });
        } else {
          itemsArray.push({ id: productInfo.id, modifiers: [] });
        }
        localStorage.setItem('items', JSON.stringify(itemsArray));
      } else {
        itemsArray.every((item, index) => {
          if (item.id === dataProductApi.successData.items[productInfo.id].id) {
            itemsArray.splice(index, 1);
            return false;
          }
          return true;
        });
        localStorage.setItem('items', JSON.stringify(itemsArray));
      }
    });
    if (dataProductApi.successData.items[productInfo.id].modifiers) {
      this.clearModif();
      this.renderModif(productInfo);
    } else {
      this.containersModifiersEl = this.element.querySelector('.card__modifiers');
      this.containersModifiersEl.remove();
    }


    const imgEl = this.element.querySelector('.card__image');
    if (!canUseWebP()) {
      loadImgNotSquare(productInfo, imgEl, 'jpg');
    } else {
      loadImgNotSquare(productInfo, imgEl, 'webp');
    }

    return super.create(this.element);
  }

  renderModif(productInfo) {
    this.productInfo = productInfo;
    const addinTextArea = new CreateTextAreaAddinNew();
    this.containersModifiersEl = this.element.querySelector('.card__modifiers');
    this.modifierObjWithTitle = this.getModifiers(dataProductApi.successData.items[this.productInfo.id]);
    this.modifierArrWithTitle = Object.entries(this.modifierObjWithTitle);
    this.modifierArrWithTitle.forEach((item) => {
      this.containersModifiersEl.append(addinTextArea.create(item, this.productInfo));
    });

    switchAddNew(productInfo, this.element);
  }

  clearModif() {
    this.containersModifiersEl = this.element.querySelector('.card__modifiers');
    this.arrHtml = Array.from(this.containersModifiersEl.children);
    delete this.arrHtml[0];

    this.arrHtml.forEach((item) => item.remove());
  }

  getModifiers(productInfo) {
    /**
     * Тут показано как получить модификаторы, которые действительно доступны у товара,
     * также получаем сохраненную модификацию и по ней строим доступные категории модификаторов с проброшенным количеством
     */
    const { modifiers } = dataProductApi.successData;

    const itemId = productInfo.id;

    const itemModifiers = productInfo.modifiers;

    /*
    Составляем список действительно доступных модификаторов
     */
    const itemModifiersObj = [];
    for (const modifierKey of itemModifiers) {
      if (typeof modifiers[modifierKey] === 'object') {
        itemModifiersObj.push(modifiers[modifierKey]);
      }
    }

    /*
    Проходим все действительно доступные модификаторы и строим список с категориями
     */
    const itemModifierWithTitles = {};
    for (const itemModifiersObjElement of itemModifiersObj) {
      if (typeof itemModifierWithTitles[itemModifiersObjElement.category] !== 'object') {
        itemModifierWithTitles[itemModifiersObjElement.category] = {};
      }
      itemModifierWithTitles[itemModifiersObjElement.category][itemModifiersObjElement.id] = { ...itemModifiersObjElement };
    }
    return itemModifierWithTitles;
  }
}

class TextArea extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(productInfo) {
    this.element = document.createElement(this.parameters.selector);
    this.element.textContent = this.parameters.text;

    return super.create(this.element);
  }
}

class CreateTextAreaSharesDetail extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(productInfo) {
    this.element = document.createElement(this.parameters.selector);

    this.template = `
      <div class="shares-detail__touch"></div>
      <div class="shares-detail__container">
          <div class="shares-detail__title">Получи 6-й кофе в подарок</div>
          <ul class="shares-detail__terms">
              <div>Условия акции</div>
              <li>Покупай кофе в приложении</li>
              <li>Получай каждый шестой кофе в подарок</li>
              <li>Кофе добавиться в заказ автоматически после оплаты и при выполнении условий акции</li>
              <li>При активном абонементе подарочный кофе не начисляется</li>
          </ul>
          <div class="shares-detail__images-list">
              <div class="shares-detail__images-list-element"></div>
              <div class="shares-detail__images-list-element"></div>
              <div class="shares-detail__images-list-element"></div>
              <div class="shares-detail__images-list-element"></div>
              <div class="shares-detail__images-list-element"></div>
              <div class="shares-detail__images-list-element"></div>
          </div>
      </div>
      <div class="shares-detail__img-container shares-detail__img-container--hide">
        <div class="shares-detail__img-qr"></div>
      </div>
      
      <button class="button--hide shares-detail__button ${isIos ? 'shares-detail__button--ios' : 'shares-detail__button--no-ios'} button button--size--large button--theme--tangerin">Показать QR</button>
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.button = this.element.querySelector('.shares-detail__button');

    if (productInfo.success) {
      this.imageListElements = this.element.querySelectorAll('.shares-detail__images-list-element');
      for (let i = 0; i < productInfo.successData.count % 6; i++) {
        if (this.imageListElements[i]) {
          this.imageListElements[i].classList.add('shares-detail__images-list-element--not-empty');
        }
      }
    } else {
      toggleModal.rendering({
        subject: 'Ошибка',
        text: productInfo.errors[0] || 'Требуется авторизация для просмотра прогресса по акции',
      });
      this.button.classList.add('button--type--disabled');
    }

    return super.create(this.element);
  }
}

class CreateTextAreaAddinNew extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(modifierWithTitle, productInfo) {
    this.element = document.createElement('div');
    this.element.classList.add('text-area__wraper');
    this.templateTitle = `
    <div class="card__modifiers-section-name">${modifierWithTitle[0]}</div>
    <div class="card__modifiers-section-list"></div>
`;

    this.element.insertAdjacentHTML('beforeend', this.templateTitle);
    for (const item of Object.values(modifierWithTitle[1])) {
      this.template = `
        <div id="${item.id}" class="card__modifiers-section-list-element">
            <div class="card__modifiers-section-list-element-promo">
                <div class="card__modifiers-section-list-element-image" >
                  <div class="card__modifiers-section-list-element-quantity"></div>
                </div>
                <div class="card__modifiers-section-list-element-count">
                    <div class="card__modifiers-section-list-element-count-minus card__modifiers-section-list-element-count-minus--hidden"></div>
                    <div class="card__modifiers-section-list-element-count-plus text-area__icon--type--plus"></div>
                </div>
            </div>
            <div class="card__modifiers-section-list-element-title">
                <div class="card__modifiers-section-list-element-name">${item.name}</div>
                <div class="card__modifiers-section-list-element-price">+${item.price} ₽</div>
            </div>
        </div>
      `;

      if (typeof userDataObj === 'object' && typeof userDataObj[productInfo.id] === 'object') {
        for (const modifiersUserItem in userDataObj[productInfo.id]) {
          if (String(item.id) === modifiersUserItem) {
            const counter = userDataObj[productInfo.id][modifiersUserItem];
            if (counter !== 0) {
              /* this.template = `
                <div id="${item.id}" class="text-area text-area--theme--light text-area--type--add-ins">
                  <div class="text-area__container text-area__container--indentation--small text-area__container--type--modifier">
                    <div class="text-area__content-container text-area__content-container--direction--column">
                      <h3 class="text-area__title text-area__title--size--small text-area__title--type--bold text-area__title--theme--chocolate text-area__title--type--modifier">
                        ${counter} добав${number_of(counter, ['ка', 'ки', 'ок'])} ${item.name}
                      </h3>
                      <span class="text-area__price text-area__price--size--small">${item.price}</span>
                    </div>
                    <div class="text-area__icon-container text-area__icon-container--open">
                      <div class="text-area__icon-container text-area__icon-container--open">
                        <button class="button">
                          <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-remove-line.svg]]" alt=""
                               class="text-area__icon text-area__icon--type--minus text-area__icon--position--first">
                        </button>
                        <button class="button">
                          <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-add-plus.svg]]" alt="" class="text-area__icon text-area__icon--type--plus">
                        </button>
                      </div>
                    </div>
                    <button class="button button--theme--chocolate text-area__button text-area__button--type--add">
                      Добавить
                    </button>
                  </div>
                </div>
              `; */
              this.template = `
                <div id="${item.id}" class="card__modifiers-section-list-element text-area--type--add-ins">
                    <div class="card__modifiers-section-list-element-promo">
                        <div class="card__modifiers-section-list-element-image" >
                            <div class="card__modifiers-section-list-element-quantity">${counter}</div>
                        </div>
                        <div class="card__modifiers-section-list-element-count">
                            <div class="card__modifiers-section-list-element-count-minus text-area__icon--type--minus"></div>
                            <div class="card__modifiers-section-list-element-count-plus text-area__icon--type--plus"></div>
                        </div>
                    </div>
                    <div class="card__modifiers-section-list-element-title">
                        <div class="card__modifiers-section-list-element-name">${item.name}</div>
                        <div class="card__modifiers-section-list-element-price">+${item.price} ₽</div>
                    </div>
                </div>
              `;
            }
          }
        }
      }
      this.list = this.element.querySelector('.card__modifiers-section-list');
      this.list.insertAdjacentHTML('beforeend', this.template);
    }
    return this.element;
  }
}


class CreateTextAreaAccount extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  setData(nameData) {
    let infoApi;
    if (isEmptyObj(applicationDataObj)) {
      if (isEmptyObj(applicationDataObj[nameData])) {
        infoApi = applicationDataObj[nameData];
      }
    } else {
      infoApi = applicationDataObj[nameData];
    }
    return infoApi;
  }

  create() {
    this.element = document.createElement(this.parameters.selector);
    this.template = `       
        <section class="profile__info">
          <div class="profile__header">
              <div class="profile__title">Информация</div>
          </div>
          <div class="form__group profile__group profile__group-element text-area--type--gift form__group--hide">
              <label>6 кофе в подарок</label>
          </div>
          <div class="form__group profile__group profile__group-element text-area--type--support">
              <label>Поддержка</label>
          </div>
          <div class="form__group profile__group profile__group-element text-area--type--privacy">
              <label>Политика конфиденциальности</label>
          </div>
          <div class="form__group profile__group profile__group-element text-area--type--terms">
              <label>Пользовательское соглашение</label>
          </div>
          <div class="form__group profile__group profile__group-element text-area--type--public">
              <label>Публичная оферта</label>
          </div>
        </section>
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonSupport = this.element.querySelector('.text-area--type--support');
    this.buttonPrivacy = this.element.querySelector('.text-area--type--privacy');
    this.buttonTerms = this.element.querySelector('.text-area--type--terms');
    this.buttonPublic = this.element.querySelector('.text-area--type--public');
    this.buttonGift = this.element.querySelector('.text-area--type--gift');
    this.title = this.element.querySelector('.profile__title');
    // this.buttonSubscription = this.element.querySelector('.text-area--type--subscription');
    let count = 0;

    this.title.addEventListener('click', () => {
      count++;
      if (count % 5 === 0) {
        alert('[~30~]');
      }
    });

    this.buttonSupport.addEventListener('click', () => {
      stopAction(() => {
        toggleSubPageSupport.rendering();
      });
    });
    this.buttonPrivacy.addEventListener('click', () => {
      stopAction(() => {
        toggleSubPageApplication.rendering(this.setData('privacy-policy'));
      });
    });
    this.buttonTerms.addEventListener('click', () => {
      stopAction(() => {
        toggleSubPageApplication.rendering(this.setData('user-agreement'));
      });
    });
    this.buttonPublic.addEventListener('click', () => {
      stopAction(() => {
        toggleSubPageApplication.rendering(this.setData('public-offer'));
      });
    });
    this.buttonGift.addEventListener('click', () => {
      stopAction(() => {
        api.getClientCoffeeCount(toggleModalPageSharesDetail.rendering);
      });
    });

    return super.create(this.element);
  }
}

class CreateTextAreaApplication extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(info) {
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="text-area text-area--indentation--normal">
        <div class="text-area__content-container text-area__application text-area__content-container--direction--column text-area__content-container--indentation--normal">
          ${info.content}
        </div>
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}


class CreateTextAreaStoreInfo extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);

    this.template = `
      <div class="text-area">
        <div class="text-area__container text-area__container--indentation--normal">
          <div class="text-area__content-container text-area__content-container--direction--column text-area__content-container--indentation--right">
           <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">${this.parameters.address}</h2>
           <span class="text-area__title text-area__title--size--small text-area__title--theme--shadow">${this.parameters.distance}</span>
          </div>
          <a href="https://www.google.ru/maps/place/${this.parameters.address}/@${this.parameters.latitude},${this.parameters.longitude}z?hl=ru" target="_blank" class="shop-info__direction">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-on-map.svg]]" alt="" class="text-area__icon text-area__icon--position--center">
          </a>
        </div>
      </div>
      <div class="text-area">
        <div class="text-area__container text-area__container--indentation--normal">
          <a href="tel:${this.parameters.phone}" class="text-area__title text-area__title--size--small text-area__title--type--bold">${this.parameters.phone}</a>
          <a href="tel:${this.parameters.phone}">
           <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-phone.svg]]" alt="" class="text-area__icon text-area__icon--position--center text-area__icon--phone">
          </a>
        </div>
     </div>  
     <div class="text-area">
        <h2 class="text-area__title text-area__title--size--normal text-area__title--indentation--big text-area__title--theme--shadow">Режим работы:</h2>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Понедельник</h3>
         <span class="text-area__title text-area__title--size--small text-area__title--theme--shadow">${this.parameters.monday}</span>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Вторник</h3>
         <span class="text-area__title text-area__title--size--small text-area__title--theme--shadow">${this.parameters.tuesday}</span>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Среда</h3>
         <span class="text-area__title text-area__title--size--small text-area__title--theme--shadow">${this.parameters.wednesday}</span>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Четверг</h3>
         <span class="text-area__title text-area__title--size--small text-area__title--theme--shadow">${this.parameters.thursday}</span>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Пятница</h3>
         <span class="text-area__title text-area__title--size--small text-area__title--theme--shadow">${this.parameters.friday}</span>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Суббота</h3>
         <span class="text-area__title text-area__title--size--small text-area__title--theme--shadow">${this.parameters.saturday}</span>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Воскресенье</h3>
         <span class="text-area__title text-area__title--size--small text-area__title--theme--shadow">${this.parameters.sunday}</span>
        </div>
     </div>  
     
     <!--<div class="text-area">
        <h2 class="text-area__title text-area__title&#45;&#45;size&#45;&#45;normal text-area__title&#45;&#45;indentation&#45;&#45;big text-area__title&#45;&#45;theme&#45;&#45;shadow">Amenities</h2>
        <div class="text-area__content-container text-area__content-container&#45;&#45;direction&#45;&#45;row">
          <h3 class="text-area__title text-area__title&#45;&#45;size&#45;&#45;small">Google Wi-Fi</h3>
        </div>
        <div class="text-area__content-container text-area__content-container&#45;&#45;direction&#45;&#45;row">
          <h3 class="text-area__title text-area__title&#45;&#45;size&#45;&#45;small">Drive-Thru</h3>
        </div>
        <div class="text-area__content-container text-area__content-container&#45;&#45;direction&#45;&#45;row">
          <h3 class="text-area__title text-area__title&#45;&#45;size&#45;&#45;small">LaBoulange</h3>
        </div>
        <div class="text-area__content-container text-area__content-container&#45;&#45;direction&#45;&#45;row">
          <h3 class="text-area__title text-area__title&#45;&#45;size&#45;&#45;small">Mobile Payment</h3>
        </div>
        <div class="text-area__content-container text-area__content-container&#45;&#45;direction&#45;&#45;row">
          <h3 class="text-area__title text-area__title&#45;&#45;size&#45;&#45;small">Music Experience</h3>
        </div>
     </div>  -->
    `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    /* this.buttonHelp = this.element.querySelector('.text-area--type--help');
    this.buttonApplication = this.element.querySelector('.text-area--type--application');

    if (typeof this.parameters.eventHelp === 'object') {
      for (const event of this.parameters.eventHelp) {
        this.buttonHelp.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventApplication === 'object') {
      for (const event of this.parameters.eventApplication) {
        this.buttonApplication.addEventListener(event.type, event.callback);
      }
    } */
    return super.create(this.element);
  }
}

class CreateTextAreaBalance extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="text-area__container text-area__container--indentation--normal">
        <div>
          <span class="text-area__number text-area__price text-area__price--size--big text-area__number--type--${this.parameters.identifier}">${this.parameters.number()}</span>
          <svg class="text-area__icon text-area__icon--size--small" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 8.28003C23 5.10003 20.41 2.53003 17.25 2.53003C14.96 2.53003 12.98 3.87003 12.05 5.82003C12.03 5.86003 11.97 5.86003 11.96 5.82003C11.04 3.88003 9.05 2.53003 6.76 2.53003C3.58 2.53003 1 5.10003 1 8.28003C1 8.95003 1.11 9.59003 1.33 10.19C1.57 10.87 1.94 11.5 2.4 12.03C2.6 12.26 2.81 12.47 3.04 12.67L11.82 21.39C11.87 21.44 11.94 21.47 12.02 21.47C12.1 21.47 12.16 21.45 12.22 21.39L21.33 12.34C21.92 11.75 22.39 11.03 22.67 10.23C22.88 9.62003 23 8.96003 23 8.28003Z" fill="#E3562F"/>
          </svg>
          <p class="text-area__text text-area__text--theme--shadow">${this.parameters.text}</p>
        </div>
        <button class="button button--size--medium button${this.parameters.themeButton} text-area__button text-area__button--open text-area__button--type--${this.parameters.identifier} button-route">${this.parameters.buttonText}</button>
      </div>
    `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.button = this.element.querySelector(`.text-area__button--type--${this.parameters.identifier}`);
    this.price = this.element.querySelector('.text-area__price');

    if (typeof this.parameters.eventButton === 'object') {
      for (const event of this.parameters.eventButton) {
        this.button.addEventListener(event.type, event.callback);
      }
    }

    if (typeof this.parameters.heart === 'boolean') {
      if (this.parameters.heart === false) {
        this.heart = this.element.querySelector('.text-area__icon');
        this.heart.remove();
      } else {
        this.price.classList.remove('text-area__price', 'text-area__price--size--big');
      }
    }
    if (typeof this.parameters.button === 'boolean') {
      if (this.parameters.button === false) {
        this.button.remove();
      }
    }
    return super.create(this.element);
  }
}

class CreateTextAreaBalanceHistory extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="text-area__container text-area__container--indentation--normal">
        <div>
          <span class="text-area__number text-area__price text-area__price--size--big">${this.parameters.number}</span>
          <svg class="text-area__icon text-area__icon--size--small" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 8.28003C23 5.10003 20.41 2.53003 17.25 2.53003C14.96 2.53003 12.98 3.87003 12.05 5.82003C12.03 5.86003 11.97 5.86003 11.96 5.82003C11.04 3.88003 9.05 2.53003 6.76 2.53003C3.58 2.53003 1 5.10003 1 8.28003C1 8.95003 1.11 9.59003 1.33 10.19C1.57 10.87 1.94 11.5 2.4 12.03C2.6 12.26 2.81 12.47 3.04 12.67L11.82 21.39C11.87 21.44 11.94 21.47 12.02 21.47C12.1 21.47 12.16 21.45 12.22 21.39L21.33 12.34C21.92 11.75 22.39 11.03 22.67 10.23C22.88 9.62003 23 8.96003 23 8.28003Z" fill="#E3562F"/>
          </svg>
          <p class="text-area__text text-area__text--theme--shadow">${this.parameters.text}</p>
        </div>
      </div>
    `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.price = this.element.querySelector('.text-area__price');

    if (typeof this.parameters.heart === 'boolean') {
      if (this.parameters.heart === false) {
        this.heart = this.element.querySelector('.text-area__icon');
        this.heart.remove();
      } else {
        this.price.classList.remove('text-area__price', 'text-area__price--size--big');
      }
    }

    return super.create(this.element);
  }
}

class CreateTextAreaProfile extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create() {
    this.element = document.createElement(this.parameters.selector);
    let name = '';
    let email = '';
    let phoneFormatted = '';
    let shortDateBirthday = '';
    if (!isEmptyObj(userInfoObj)) {
      name = userInfoObj.successData.name;
      email = userInfoObj.successData.email;
      const { phone } = userInfoObj.successData;
      const { birthday } = userInfoObj.successData;
      if (birthday !== '') {
        shortDateBirthday = new Date(`${birthday.replace(/-/g, '/')} UTC`).toLocaleString('ru', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).replace('.', '').replace(' г.', '');
      }
      phoneFormatted = phone.replace(/(\+\d)(\d{3})(\d{3})(\d{2})(\d{2})/g, '$1 ($2) $3-$4-$5') || '';
    }

    this.template = `
      <div class="profile__header">
        <div class="profile__title">Персональные данные</div>
      </div>
      <form class="form profile__form">
        <div class="form__group profile__group profile__group-element" data-id="name">
            <label class="profile__form-label">Имя</label>
            <input class="profile__form-input" type="text" value="${name}" readonly>
        </div>
        <div class="form__group profile__group profile__group-element" data-id="birthday">
            <label class="profile__form-label">День рождения</label>
            <input class="profile__form-input" type="text" value="${shortDateBirthday}" readonly>
        </div>
        <div class="form__group profile__group">
            <label class="profile__form-label">Телефон</label>
            <input class="profile__form-input" type="text" value="${phoneFormatted}" readonly>
        </div>
        <div class="form__group profile__group profile__group-element" data-id="email">
            <label class="profile__form-label">Email</label>
            <input class="profile__form-input" type="text" value="${email}" readonly>
        </div>
    </form>
      
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonName = this.element.querySelector('.profile__group[data-id="name"]');
    this.buttonBirthday = this.element.querySelector('.profile__group[data-id="birthday"]');
    this.buttonEmail = this.element.querySelector('.profile__group[data-id="email"]');

    this.buttonName.addEventListener('click', () => {
      toggleSubPageEditUser.rendering({
        titleTopBar: 'Редактировать',
        inputLabel: 'Введите имя',
        identifier: 'name',
        inputType: 'text',
      });
    });

    if (!isEmptyObj(userInfoObj) && userInfoObj.successData.birthday === '') {
      this.buttonBirthday.addEventListener('click', () => {
        toggleSubPageEditUser.rendering({
          titleTopBar: 'Редактировать',
          inputLabel: '',
          identifier: 'birthday',
          inputType: 'text',
        });
      });
    } else {
      this.buttonBirthday.classList.remove('profile__group-element');
    }


    this.buttonEmail.addEventListener('click', () => {
      toggleSubPageEditUser.rendering({
        titleTopBar: 'Редактировать',
        inputLabel: 'Введите email',
        identifier: 'email',
        inputType: 'email',
      });
    });


    return super.create(this.element);
  }
}

class CreateTextAreaBalanceFill extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create() {
    this.element = document.createElement(this.parameters.selector);

    this.template = `
      <div class="balance__detail-text">Выберите сумму, на которую хотели бы пополнить баланс</div>
      <div class="balance__detail-image"></div>
      <form class="form balance__detail-count">
          <div class="form__group form__sums">
              <input id="sum1" name="sum" type="radio" value="100" checked>
              <label for="sum1">100</label>
              <input id="sum2" name="sum" type="radio" value="500">
              <label for="sum2">500</label>
              <input id="sum3" name="sum" type="radio" value="1000">
              <label for="sum3">1000</label>
              <input id="sum4" name="sum" type="radio" value="2000">
              <label for="sum4">2000</label>
              <input id="sum5" name="sum" type="radio" value="5000">
              <label for="sum5">5000</label>
          </div>
      </form>
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateTextAreaSearch extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create() {
    this.element = document.createElement(this.parameters.selector);

    this.template = `
    <div class="search__header ${isIos ? 'search__header--ios' : 'search__header--no-ios'}">
        <div class="search__top">
        
        <svg class="search__close" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.192 0.343994L5.949 4.58599L1.707 0.343994L0.292999 1.75799L4.535 5.99999L0.292999 10.242L1.707 11.656L5.949 7.41399L10.192 11.656L11.606 10.242L7.364 5.99999L11.606 1.75799L10.192 0.343994Z" fill="white"/>
                </svg>
            
            <div class="search__status">Поиск</div>
        </div>
        <form action="" class="form search__form">
            <div class="search__form-group">
                <input type="text" class="search__form-input" placeholder="Введите наименование товара...">
                <div class="search__form-input-clear"></div>
            </div>
        </form>
    </div>
    <div class="search__result search__result--empty">
        <div class="search__result-header">
            <div class="search__result-title">Результаты поиска</div>
            <div class="search__result-count">3 товара</div>
        </div>
        <div class="search__result-container"></div>
        <div class="search__result-empty">
            <div class="search__result-empty-img"></div>
            <div class="search__result-empty-text">
                <span>Ой!</span> По вашему запросу ничего не найдено.....
            </div>
        </div>
    </div>
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.iconClose = this.element.querySelector('.search__close');

    if (typeof this.parameters.eventCloseIcon === 'object') {
      for (const event of this.parameters.eventCloseIcon) {
        this.iconClose.addEventListener(event.type, () => {
          window.history.back();
          event.callback();
        });
      }
    }

    return super.create(this.element);
  }
}

class CreateTextAreaBalanceTabs extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create() {
    this.element = document.createElement(this.parameters.selector);

    let balance;
    let bonus;
    if (!isEmptyObj(userInfoObj)) {
      balance = userInfoObj.successData.balance;
      bonus = userInfoObj.successData.bonus;
    } else {
      balance = '0';
      bonus = '0';
    }
    const date = new Date();
    const timeNow = [date.getHours(), date.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(':');

    this.template = `
      <div class="balance__container balance__container--show" data-id="1">
        <div class="balance__image balance__image--balance"></div>
        <div class="balance__content">
            <div class="balance__currency balance__currency-balance">${balance} ₽</div>
            <div class="balance__date">сегодня, ${timeNow}</div>
        </div>
        <div class="balance__history">
            <div class="balance__history-title">История транзакций</div>

        </div>
    </div>
    <div class="balance__container" data-id="2">
        <div class="balance__image balance__image--balance"></div>
        <div class="balance__content">
            <div class="balance__currency balance__currency-bonus">${bonus} ❤️</div>
            <div class="balance__date">сегодня, ${timeNow}</div>
        </div>
        <div class="balance__history">
            <div class="balance__history-title">История транзакций</div>

        </div>
    </div>
      
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.balanceContainer = this.element.querySelector('.balance__container[data-id="1"]');
    this.bonusContainer = this.element.querySelector('.balance__container[data-id="2"]');

    this.renderContent(this.balanceContainer);
    this.renderContent(this.bonusContainer, true);

    return super.create(this.element);
  }


  renderContent(container, isBonus = false) {
    const reformattedLog = {};
    const log = isBonus ? userBonusLog : userBalanceLog;

    if (!isEmptyObj(log) && log.success) {
      log.successData.forEach((item) => {
        const dateElems = new Date(`${item.timestamp.replace(/-/g, '/')} UTC`).toLocaleString('ru', {
          year: 'numeric',
          month: 'long',
        }).replace('.', '').replace(' г', '');
        const dateEl = dateElems[0].toUpperCase() + dateElems.slice(1);
        if (!reformattedLog[dateEl]) {
          reformattedLog[dateEl] = [];
        }
        reformattedLog[dateEl].push(item);
      });
      Object.entries(reformattedLog).forEach(([key, value]) => {
        let temp = '';
        value.forEach((el) => {
          const date = new Date(`${el.timestamp.replace(/-/g, '/')} UTC`).toLocaleString('ru', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }).replace('.', '').replace(' г.', '');
          let classValue = '';

          if (Math.sign(el.amount) === 1) {
            classValue = 'balance__history-transaction-value--up';
          } else {
            classValue = 'balance__history-transaction-value--down';
          }
          this.templateBalanceEl = `
          <div class="balance__history-transaction">
              <div class="balance__history-transaction-date">${date}</div>
              <div class="balance__history-transaction-value ${classValue}">${el.amount} ${isBonus ? '❤' : '₽'}️</div>
          </div>
        `;
          temp += this.templateBalanceEl;
        });
        this.bonusSection = document.createElement('div');
        this.bonusSection.classList.add('balance__history-section');
        this.templateEl = `
              <div class="balance__history-section-group">${key}</div>
              <div class="balance__history-section-list">${temp}</div>
            `;
        this.bonusSection.insertAdjacentHTML('beforeend', this.templateEl);
        container.append(this.bonusSection);
      });
    }
  }
}

class CreateTextAreaResult extends CreateItem {
  constructor(parameters) {
    super(parameters);

    const { eventsButton } = this.parameters;

    this.template = `
      <section class="basket__result">
          <span class="basket__result-title">Итого</span>
          <span class="basket__result-price"></span>
      </section>
      <button type="submit" class="button--type--make-order button button--theme--tangerin button--theme--shadow-big button--size--large">Оплатить</button>
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    if (typeof eventsButton === 'object') {
      for (const event of eventsButton) {
        this.element.addEventListener(event.type, event.callback);
      }
    }
  }
}

class TextAreaNoSignIn extends CreateItem {
  constructor(parameters) {
    super(parameters);

    const { eventsButton } = this.parameters;

    this.template = `
      <div class="basket__empty-section">
        <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/no-sign-in.svg]]" class="basket__empty-section-img" alt="">
        <div class="basket__empty-section-title">Упс! Вход не выполнен</div>
        <div class="basket__empty-section-text">Для продолжения покупок Вам необходимо авторизоваться</div>
        <button class="basket__sign-in-button button button--theme--tangerin button--theme--shadow-big button--size--large">Перейти к авторизации</button>
    </img>
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    if (typeof eventsButton === 'object') {
      this.button = this.element.querySelector('.button');

      for (const event of eventsButton) {
        this.button.addEventListener(event.type || 'click', () => {
          stopAction(() => {
            returnPageObj.returnBalanceAfterSignIn = true;
            event.callback();
          });
        });
      }
    }
  }
}

class TextAreaNoBasket extends CreateItem {
  constructor(parameters) {
    super(parameters);

    const { eventsButton, textButton } = this.parameters;

    this.template = `
      <div class="basket__empty-section">
        <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/empty-basket.svg]]" class="basket__empty-section-img" alt="">
        <div class="basket__empty-section-title">У вас еще нет товаров в корзине</div>
        <div class="basket__empty-section-text">Переходите в меню, делайте заказ и наслаждайтесь</div>
        <button class="basket__empty-section-button button button--theme--tangerin button--theme--shadow-big button--size--large">${textButton}</button>
    </img>
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    if (typeof eventsButton === 'object') {
      this.button = this.element.querySelector('.button');

      for (const event of eventsButton) {
        this.button.addEventListener(event.type || 'click', event.callback);
      }
    }
  }
}
