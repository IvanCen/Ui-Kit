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

function switchAdd(productInfo) {
  let allCountAdds = 0;
  if (typeof userDataObj[productInfo.id] === 'object') {
    for (const modifiersUserItem of Object.values(userDataObj[productInfo.id])) {
      allCountAdds += modifiersUserItem;
    }
  }
  const textAreaButtonAdd = document.querySelectorAll('.text-area__button--type--add');
  [...textAreaButtonAdd].forEach((item) => {
    const textArea = item.closest('.text-area');
    const iconPlus = textArea.querySelector('.text-area__icon--type--plus');
    const iconMinus = textArea.querySelector('.text-area__icon--type--minus');
    const iconContainer = textArea.querySelector('.text-area__icon-container');
    const allCounter = document.querySelector('.text-area__all-counter-number');
    const title = textArea.querySelector('.text-area__title');
    const regexp = /^(\d+\sдобав[\D]{2}\s)([\D]+)/g;
    const replaceWord = title.textContent;
    const titleName = replaceWord.trim().replace(regexp, '$2');

    let counter = 0;

    if (typeof userDataObj[productInfo.id] === 'object') {
      for (const modifiersUserItem in userDataObj[productInfo.id]) {
        if (String(textArea.id) === modifiersUserItem) {
          counter += Number(userDataObj[productInfo.id][modifiersUserItem]);
        }
      }
    }

    function setUserDataObj() {
      console.log(productInfo);
      if (typeof userDataObj[productInfo.id] !== 'object') {
        userDataObj[productInfo.id] = {};
      }
      userDataObj[productInfo.id][textArea.id] = counter;
      localStorage.setItem('userData', JSON.stringify(userDataObj));
    }

    iconPlus.addEventListener('click', () => {
      counter += 1;
      allCountAdds += 1;
      allCounter.textContent = `${allCountAdds} добав${number_of(allCountAdds, ['ка', 'ки', 'ок'])}`;
      title.textContent = `${counter} добав${number_of(counter, ['ка', 'ки', 'ок'])} ${titleName}`;
      setUserDataObj();
    });
    iconMinus.addEventListener('click', () => {
      if (counter >= 1) {
        counter -= 1;
        allCountAdds -= 1;
        allCounter.textContent = `${allCountAdds} добав${number_of(allCountAdds, ['ка', 'ки', 'ок'])}`;
        title.textContent = `${counter} добав${number_of(counter, ['ка', 'ки', 'ок'])} ${titleName}`;
      }
      if (counter === 0) {
        title.textContent = titleName;
        iconContainer.classList.remove('text-area__icon-container--open');
        item.classList.add('text-area__button--open');
        title.classList.remove('text-area__title--theme--chocolate');
      }
      setUserDataObj();
    });
    item.addEventListener('click', () => {
      counter = 1;
      allCountAdds += 1;
      allCounter.textContent = `${allCountAdds} добав${number_of(allCountAdds, ['ка', 'ки', 'ок'])}`;
      item.classList.remove('text-area__button--open');
      iconContainer.classList.add('text-area__icon-container--open');
      title.classList.add('text-area__title--theme--chocolate');
      title.textContent = `${counter} добав${number_of(counter, ['ка', 'ки', 'ок'])} ${title.textContent}`;
      setUserDataObj();
    });
  });
}

class CreateTextAreaAddinsProductCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
  }

  countNutrition(obj, el, counter) {
    for (const nutritionItem in obj) {
      if (obj[nutritionItem] !== null) {
        const nutritionEl = el.querySelector(`.text-area__info-number--${nutritionItem}`);
        if (nutritionEl) {
          const regExp = /(\d*\.\d*).*/gm;
          const number = Number(nutritionEl.textContent.replace(regExp, '$1'));
          nutritionEl.textContent = `${number + (obj[nutritionItem] * counter)} г`;
        }
      }
    }
  }

  renderModifier(modifierName, el, productInfo) {
    const descriptionArea = el.querySelector('.text-area--type--description');
    const element = document.createElement('div');
    element.classList.add('text-area', 'text-area--theme--light', 'text-area--type--modifier');
    const template = `
            <div class="text-area__container text-area__container--indentation--small">
              <div class="text-area__content-container text-area__content-container--direction--column">
                <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">${modifierName}</h2>
                <ul class="text-area__list"></ul>
              </div>
              <button class="button">
                <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-expand-direction-right.svg]]" alt="" class="text-area__icon text-area__icon--position--center">
              </button>
            </div>`;
    element.insertAdjacentHTML('beforeend', template);

    if (typeof userDataObj[productInfo.id] === 'object') {
      const textAreaList = element.querySelector('.text-area__list');
      for (const modifiersUserItem in userDataObj[productInfo.id]) {
        const productItemModif = dataProductApi.successData.modifiers[Number(modifiersUserItem)];

        if (productItemModif.category === modifierName) {
          const counter = userDataObj[productInfo.id][modifiersUserItem];
          const textAreaListItem = document.createElement('li');
          if (counter !== 0) {
            textAreaListItem.classList.add('text-area__list-item');
            textAreaListItem.id = productItemModif.id;
            textAreaListItem.textContent = `${counter} добав${number_of(counter, ['ка', 'ки', 'ок'])} ${productItemModif.name}`;
            textAreaList.append(textAreaListItem);
            const {
              caffeine, carbon, cholesterol, energy, energyFatValue, fats, fiber, netWeight, protein, saturatedFats, sodium, sugar, transFats, volume,
            } = productItemModif;

            this.countNutrition({
              caffeine, carbon, cholesterol, energy, energyFatValue, fats, fiber, netWeight, protein, saturatedFats, sodium, sugar, transFats, volume,
            }, el, counter);
          }
        }
      }
    }

    element.addEventListener('click', () => {
      toggleThirdPageAddinsCard.rendering(productInfo);
    });
    descriptionArea.after(element);
  }

  create(productInfo) {
    console.log(productInfo);
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

    this.template = `
      <div class="text-area text-area--theme--light">
        <div class="text-area__container text-area__container--indentation--normal text-area__container--indentation--normal">
          <span class="text-area__price text-area__price--size--big">${price}</span>
          <div class="text-area__icon-container text-area__icon-container--open"></div>
        </div>
      </div>
      <div class="text-area text-area--theme--light text-area--type--description">
        <div class="text-area__container text-area__container--indentation--normal">
          <div class="text-area__content-container text-area__content-container--direction--column">
            <p class="text-area__text text-area__text--theme--shadow text-area__text--indentation--big">${productInfo.intro}</p>
            <div class="text-area__button-container">
              <button class="button text-area__button text-area__button--type--like text-area__button--position--absolute">
                <svg class="text-area__icon text-area__icon--type--like" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.8 9.80005C1.6 9.25005 1.5 8.67005 1.5 8.05005C1.5 5.15005 3.86 2.80005 6.75 2.80005C8.84 2.80005 10.66 4.03005 11.5 5.80005C11.7 6.22005 12.29 6.22005 12.5 5.80005C13.35 4.02005 15.16 2.80005 17.25 2.80005C20.14 2.80005 22.5 5.15005 22.5 8.05005C22.5 8.67005 22.39 9.27005 22.19 9.83005C21.93 10.56 21.51 11.21 20.97 11.76L12.02 20.66L3.4 12.09L3.39 12.08L3.38 12.07C3.17 11.89 2.98 11.7 2.8 11.49C2.35 10.99 2.02 10.42 1.8 9.80005Z"/>
                </svg>
              </button>
              <button class="button text-area__button text-area__button--type--share">
                <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-upload.svg]]" alt=""
                     class="text-area__icon text-area__icon--position--center">
              </button>
            </div>
          </div>
        </div>
      </div>
       <div class="text-area text-area--theme--light text-area--direction--column text-area--indentation--normal text-area--indentation--top text-area--description-wraper">
        <div class="text-area__content-container text-area__content-container--direction--row text-area__content-container--type--more">
          <div class="text-area__text-container">
            <h2 class="text-area__title text-area__title--size--normal">Подробная информация</h2>
            <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--top text-area__info--netWeight">
              Масса нетто
              <span class="text-area__info--text-size--normal text-area__info-number--indentation--left text-area__info-number--netWeight">
              ${productInfo.netWeight || ''} г</span>
              
            </span>
            <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--top text-area__info--volume">
              Объём
              <span class="text-area__info--text-size--normal text-area__info-number--indentation--left text-area__info-number--volume">
              ${productInfo.volume || ''} мл</span>
            </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Калорий
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left text-area__info-number--energy">
              ${productInfo.energy || ''} г</span>
            </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Жиров
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left text-area__info-number--fats">
                ${productInfo.fats || ''} г</span>
            </span>
                <span class="text-area__sub-info">
                  Насыщенных жиров 
                  <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left text-area__info-number--saturatedFats">
                    ${productInfo.saturatedFats || ''} г</span>
                </span>
                <span class="text-area__sub-info">
                  Трансжиров
                  <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left text-area__info-number--transFats">
                    ${productInfo.transFats || ''} г</span>
                </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Холестерин
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left text-area__info-number--cholesterol">
                ${productInfo.cholesterol || ''} г</span>
            </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Натрий
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left text-area__info-number--sodium">
                ${productInfo.sodium || ''} г</span>
            </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Углеводов
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left text-area__info-number--carbon">
                ${productInfo.carbon || ''} г</span>
            </span>
                <span class="text-area__sub-info">
                  Клетчатка
                  <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left text-area__info-number--fiber">
                    ${productInfo.fiber || ''} г</span>
                </span>
                <span class="text-area__sub-info">
                  Сахар
                <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left text-area__info-number--sugar">
                    ${productInfo.sugar || ''} г</span>
                </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Белок
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left text-area__info-number--protein">
                ${productInfo.protein || ''} г</span>
            </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Кофеин<span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left text-area__info-number--caffeine">
                ${productInfo.caffeine || ''} г</span>
            </span>
          </div>
          <button class="button button--theme--chocolate text-area__button text-area__button--type--more">
              узнать больше
          </button>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--column">
          <p class="text-area__text text-area__text--indentation--small text-area__text--theme--shadow">КБЖУ блюда рассчитывается автоматически. Модификация товара приведет к перерассчету информации на этой странице. Если модификации не выбраны - будет показана информация основного рецепта.</p>
        </div>
    </div>
    <div class="text-area text-area--theme--light">
      <div class="text-area__container text-area__container--indentation--normal">
        <div class="text-area__content-container text-area__content-container--direction--column">
          <h2 class="text-area__title text-area__title--size--normal text-area__title--indentation--bottom">Ингредиенты</h2>
          <span class="text-area__text text-area__text--theme--shadow text-area__text--type--ingredients"></span>
        </div>
       </div>
      <div class="text-area__container--indentation--normal">
        <div class="text-area__content-container text-area__content-container--direction--column">
          <h2 class="text-area__title text-area__title--size--normal text-area__title--indentation--bottom">Аллергены</h2>
          <span class="text-area__text text-area__text--theme--shadow text-area__text--type--allergens"></span>
          <p class="text-area__text text-area__text--theme--shadow">Мы не можем гарантировать отсутствие следов продуктов, которые могут вызвать аллергию в наших блюдах, так как мы используем общее оборудование для хранения.</p>
        </div>
       </div>
    </div>
    <button class="button button--size--big button--theme--tangerin button--type--fixed-with-bottom-bar button--theme--shadow-big text-area__button--type--add-product">В корзину</button>
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    for (const value in productInfo) {
      if (productInfo[value] === null) {
        if (this.element.querySelector(`.text-area__info-number--${value}`)) {
          this.element.querySelector(`.text-area__info-number--${value}`).parentElement.remove();
        }
      }
    }

    this.buttonShare = this.element.querySelector('.text-area__button--type--share');
    this.iconsLike = this.element.querySelector('.text-area__icon--type--like');
    this.blockLike = document.querySelector('.main-card__content-img');
    this.buttonMore = this.element.querySelector('.text-area__button--type--more');
    this.buttonAdd = this.element.querySelector('.text-area__button--type--add-product');
    this.nutritionArea = this.element.querySelector('.text-area__content-container--type--more');
    this.price = this.element.querySelector('.text-area__price');
    this.stickersContainer = this.element.querySelector('.text-area__icon-container');

    if (isEmptyObj(userInfoObj) || isEmptyObj(userStore)) {
      this.price.classList.add('text-area__price--hide');
    } else {
      this.price.classList.remove('text-area__price--hide');
    }
    if (productInfo.stickers.length !== 0) {
      productInfo.stickers.forEach((stickerName) => {
        const stickerEl = document.createElement('div');
        stickerEl.classList.add('text-area__icon', 'text-area__icon--size--big', `text-area__icon--type--${stickerName}`);
        this.stickersContainer.prepend(stickerEl);
      });
    }

    this.buttonMore.addEventListener('click', () => {
      this.nutritionArea.classList.remove('text-area__content-container--type--more');
      this.buttonMore.remove();
    });
    itemsArray.forEach((item) => {
      if (item.id === productInfo.id) {
        this.iconsLike.classList.add('text-area__icon--liked');
      }
    });
    this.iconsLike.addEventListener('click', () => {
      this.blockLike.click();
    });
    this.blockLike.addEventListener('click', () => {
      this.iconsLike.classList.toggle('text-area__icon--liked');
      if (this.iconsLike.classList.contains('text-area__icon--liked')) {
        console.log(productInfo);
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

    const basketPopupIcon = document.querySelector('.bottom-bar__icon-popup');
    const basketPopupIconImg = document.querySelector('.bottom-bar__icon-popup-img');
    this.buttonAdd.addEventListener('click', () => {
      basketArray.push({ id: productInfo.id, modifiers: [] });
      basketArray.forEach((el) => {
        if (el.id === productInfo.id) {
          for (const modifiersUserItem in userDataObj[productInfo.id]) {
            const counter = userDataObj[productInfo.id][modifiersUserItem];
            if (counter !== 0) {
              el.modifiers.push({ id: Number(modifiersUserItem), count: counter });
            }
          }
        }
      });
      localStorage.setItem('basket', JSON.stringify(basketArray));
      counterBasket();
      if (!canUseWebP()) {
        loadImg(productInfo, basketPopupIconImg, 'jpg');
      } else {
        loadImg(productInfo, basketPopupIconImg, 'webp');
      }
      basketPopupIcon.classList.add('bottom-bar__icon-popup--open');
      setTimeout(() => {
        basketPopupIcon.classList.remove('bottom-bar__icon-popup--open');
        basketPopupIconImg.style.backgroundImage = '';
      }, 3000);
      checkBasket();
    });

    const shareData = {
      title: productInfo.name,
      text: productInfo.intro,
      url: productInfo.shareLink.replace('//app.', '//'),
    };
    if (typeof navigator.canShare !== 'undefined' && navigator.canShare(shareData)) {
      this.buttonShare.addEventListener('click', () => {
        navigator.share(shareData);
      });
    } else {
      this.buttonShare.style.display = 'none';
    }

    const arrModifCategoryName = [];
    const arrModifProduct = [];
    const arrIngredientsProduct = [];
    const arrModifIngredients = [];
    const arrAllIngredientsProductName = [];
    const arrAllAllergensProductName = [];

    if (productInfo.modifiers !== null) {
      productInfo.modifiers.forEach((modifier) => {
        arrModifCategoryName.push(dataProductApi.successData.modifiers[modifier].category);
        arrModifProduct.push(dataProductApi.successData.modifiers[modifier]);
        if (dataProductApi.successData.modifiers[modifier].ingredients !== null) {
          dataProductApi.successData.modifiers[modifier].ingredients.forEach((modifierIngredient) => {
            arrModifIngredients.push(dataProductApi.successData.ingredients[Number(modifierIngredient)]);
          });
        }
      });
    }
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

    const elementIngredients = this.element.querySelector('.text-area__text--type--ingredients');
    const elementAllergens = this.element.querySelector('.text-area__text--type--allergens');
    elementIngredients.textContent = arrAllIngredientsProductName.join(', ');
    elementAllergens.textContent = arrAllAllergensProductName.join(', ');


    const unicModifName = new Set(arrModifCategoryName);
    [...unicModifName].forEach((name) => {
      this.renderModifier(name, this.element, productInfo);
    });

    const descriptionArea = this.element.querySelector('.text-area--description-wraper');
    if (!isEmptyObj(userDataObj[productInfo.id])) {
      const buttonReset = document.createElement('button');
      buttonReset.classList.add('text-area__button', 'text-area__button--type--reset');
      buttonReset.textContent = 'сбросить модификаторы';
      descriptionArea.before(buttonReset);
    }

    return super.create(this.element);
  }
}

class CreateTextAreaAddins extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(productInfo) {
    this.element = document.createElement(this.parameters.selector);

    let allCountAdds = 0;
    if (typeof userDataObj[productInfo.id] === 'object') {
      for (const modifiersUserItem of Object.values(userDataObj[productInfo.id])) {
        allCountAdds += modifiersUserItem;
      }
    }

    this.template = `
      <div class="text-area__counter-container">
        <span class="text-area__all-counter-title">У вашего напитка сейчас </span>
        <span class="text-area__all-counter"><span class="text-area__all-counter-number">${allCountAdds} добавок</span></span>
      </div>
      <button class="text-area__button text-area__button--type--reset">Очистить добавки</button>
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);
    return super.create(this.element);
  }
}

class CreateTextAreaAddin extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(modifierWithTitle, productInfo) {
    this.element = document.createElement('div');
    this.element.classList.add('text-area__wraper');
    this.templateTitle = `<h2 class="text-area__title text-area__title--type--uppercase text-area__title--type--bold">${modifierWithTitle[0]}</h2>`;

    this.element.insertAdjacentHTML('beforeend', this.templateTitle);
    for (const item of Object.values(modifierWithTitle[1])) {
      this.template = `
        <div id="${item.id}" class="text-area text-area--theme--light text-area--type--add-ins">
          <div class="text-area__container text-area__container--indentation--small">
            <div class="text-area__content-container text-area__content-container--direction--column">
              <h3 class="text-area__title text-area__title--size--small text-area__title--type--bold text-area__title--type--modifier">${item.name}</h3>
              <span class="text-area__price text-area__price--size--small">${item.price}</span>
            </div>
            <div class="text-area__icon-container">
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
            <button class="button button--theme--chocolate text-area__button text-area__button--type--add text-area__button--open">
              Добавить
            </button>
          </div>
        </div>
      `;
      if (typeof userDataObj[productInfo.id] === 'object') {
        for (const modifiersUserItem in userDataObj[productInfo.id]) {
          if (String(item.id) === modifiersUserItem) {
            const counter = userDataObj[productInfo.id][modifiersUserItem];
            if (counter !== 0) {
              this.template = `
                <div id="${item.id}" class="text-area text-area--theme--light text-area--type--add-ins">
                  <div class="text-area__container text-area__container--indentation--small">
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
              `;
            }
          }
        }
      }
      this.element.insertAdjacentHTML('beforeend', this.template);
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
      <div class="text-area text-area--type--balance">
        <div class="text-area__container text-area__container--indentation--small">
          <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Баланс</h2>
          <button class="button">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-expand-direction-right.svg]]" alt="" class="text-area__icon text-area__icon--position--center">
          </button>
        </div>
      </div>
      <div class="text-area text-area--type--order">
        <div class="text-area__container text-area__container--indentation--small">
          <div class="text-area__content-container text-area__content-container--direction--column">
            <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Заказы</h2>
          </div>
          <button class="button">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-expand-direction-right.svg]]" alt="" class="text-area__icon text-area__icon--position--center">
          </button>
      </div>
      </div>
      <div class="text-area text-area--type--reward">
        <div class="text-area__container text-area__container--indentation--small">
          <div class="text-area__content-container text-area__content-container--direction--column">
            <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Достижения</h2>
          </div>
          <button class="button">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-expand-direction-right.svg]]" alt="" class="text-area__icon text-area__icon--position--center">
          </button>
      </div>
      </div>
      <div class="text-area text-area--type--privacy">
        <div class="text-area__container text-area__container--indentation--small">
          <div class="text-area__content-container text-area__content-container--direction--column">
            <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Политика конфиденциальности</h2>
          </div>
          <button class="button">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-expand-direction-right.svg]]" alt="" class="text-area__icon text-area__icon--position--center">
          </button>
        </div>
      </div>
      <div class="text-area text-area--type--terms">
        <div class="text-area__container text-area__container--indentation--small">
          <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Пользовательское соглашение</h2>
          <button class="button">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-expand-direction-right.svg]]" alt="" class="text-area__icon text-area__icon--position--center">
          </button>
         </div>
       </div>  
       <div class="text-area text-area--type--public">
        <div class="text-area__container text-area__container--indentation--small">
          <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Публичная оферта</h2>
          <button class="button">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-expand-direction-right.svg]]" alt="" class="text-area__icon text-area__icon--position--center">
          </button>
         </div>
       </div>  
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonPrivacy = this.element.querySelector('.text-area--type--privacy');
    this.buttonTerms = this.element.querySelector('.text-area--type--terms');
    this.buttonPublic = this.element.querySelector('.text-area--type--public');
    this.buttonBalance = this.element.querySelector('.text-area--type--balance');
    this.buttonOrder = this.element.querySelector('.text-area--type--order');
    this.buttonReward = this.element.querySelector('.text-area--type--reward');

    this.buttonPrivacy.addEventListener('click', () => {
      toggleSubPageApplication.rendering(this.setData('privacy-policy'));
    });
    this.buttonTerms.addEventListener('click', () => {
      toggleSubPageApplication.rendering(this.setData('user-agreement'));
    });
    this.buttonPublic.addEventListener('click', () => {
      toggleSubPageApplication.rendering(this.setData('public-offer'));
    });
    this.buttonBalance.addEventListener('click', () => {
      renderMainPage.closePage();
      renderMainPage.clearPage();
      togglePage.closePage();
      togglePage.deletePage();
      toggleBalance.rendering();
      toggleBalance.openPage();
    });
    this.buttonOrder.addEventListener('click', () => {
      togglePage.closePage();
      togglePage.deletePage();
      openHistory();
    });
    this.buttonReward.addEventListener('click', () => {
      renderMainPage.closePage();
      renderMainPage.clearPage();
      togglePage.closePage();
      togglePage.deletePage();
      toggleGift.rendering();
      toggleGift.openPage();
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
    console.log(info);
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="text-area text-area--indentation--normal">
        <div class="text-area__content-container text-area__content-container--direction--column text-area__content-container--indentation--normal">
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
          <span class="text-area__number text-area__number--type--${this.parameters.identifier}">${this.parameters.number()}</span>
          <svg class="text-area__icon text-area__icon--size--small" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 8.28003C23 5.10003 20.41 2.53003 17.25 2.53003C14.96 2.53003 12.98 3.87003 12.05 5.82003C12.03 5.86003 11.97 5.86003 11.96 5.82003C11.04 3.88003 9.05 2.53003 6.76 2.53003C3.58 2.53003 1 5.10003 1 8.28003C1 8.95003 1.11 9.59003 1.33 10.19C1.57 10.87 1.94 11.5 2.4 12.03C2.6 12.26 2.81 12.47 3.04 12.67L11.82 21.39C11.87 21.44 11.94 21.47 12.02 21.47C12.1 21.47 12.16 21.45 12.22 21.39L21.33 12.34C21.92 11.75 22.39 11.03 22.67 10.23C22.88 9.62003 23 8.96003 23 8.28003Z" fill="#E3562F"/>
          </svg>
          <p class="text-area__text text-area__text--theme--shadow">${this.parameters.text}</p>
        </div>
        <button class="button button--size--medium button${this.parameters.themeButton} text-area__button text-area__button--open text-area__button--type--${this.parameters.identifier}">${this.parameters.buttonText}</button>
      </div>
    `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.button = this.element.querySelector(`.text-area__button--type--${this.parameters.identifier}`);

    if (typeof this.parameters.eventButton === 'object') {
      for (const event of this.parameters.eventButton) {
        this.button.addEventListener(event.type, event.callback);
      }
    }

    if (typeof this.parameters.heart === 'boolean') {
      if (this.parameters.heart === false) {
        this.heart = this.element.querySelector('.text-area__icon');
        this.heart.remove();
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
          <span class="text-area__number">${this.parameters.number}</span>
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

    if (typeof this.parameters.heart === 'boolean') {
      if (this.parameters.heart === false) {
        this.heart = this.element.querySelector('.text-area__icon');
        this.heart.remove();
      }
    }

    return super.create(this.element);
  }
}

class CreateTextArea extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="text-area__container text-area__container--indentation--normal">
        <div>
          <h2 class="text-area__title text-area__title--type--${this.parameters.identifier}">${this.parameters.title}</h2>
          <p class="text-area__text text-area__text--theme--shadow">${this.parameters.text}</p>
        </div>
      </div>
      
    `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    if (this.parameters.isButton) {
      this.textAreaContainer = this.element.querySelector('.text-area__container');
      this.button = document.createElement('button');
      this.button.classList.add('button');
      this.buttonTemplate = `
        <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-expand-direction-right.svg]]" alt="" class="text-area__icon text-area__icon--position--center">`;
      this.button.insertAdjacentHTML('beforeend', this.buttonTemplate);
      this.textAreaContainer.append(this.button);
      if (typeof this.parameters.eventButton === 'object') {
        for (const event of this.parameters.eventButton) {
          this.element.addEventListener(event.type, event.callback);
        }
      }
    }

    return super.create(this.element);
  }
}

class CreateTextAreaOrderPayment extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  resPayOrder(payInfo) {
    console.log(payInfo);
    if (!isEmptyObj(payInfo.successData)) {
      const link = document.querySelector('.text-area__link');
      document.location.href = payInfo.successData.payUrl;
      link.href = payInfo.successData.payUrl;
      link.click();
      togglePage.closePage();
      togglePage.deletePage();
      toggleSubPage.closePage();
      toggleSubPage.deletePage();
      toggleThirdPage.closePage();
      toggleThirdPage.deletePage();
      toggleFourthPage.closePage();
      toggleFourthPage.deletePage();
      toggleFifthPage.closePage();
      toggleFifthPage.deletePage();
      while (basketArray.length > 0) {
        basketArray.pop();
      }
      localStorage.setItem('basket', JSON.stringify(basketArray));
      counterBasket();
      setTimeout(() => {
        toggleModal.rendering('Спасибо за оплату. Если платеж был успешным, то скоро мы получим его и обновим статус вашего заказа или доставим средства на счет');
      }, 2000);
    } else if (isEmptyObj(payInfo.successData)) {
      const textArea = document.querySelector('.text-area--type--balance');
      const fifthPage = document.querySelector('.fifth-page');
      textArea.classList.add('text-area--hide');
      const access = document.createElement('div');
      access.classList.add('text-area__title', 'text-area__title--position--center', 'text-area__title--indentation--big', 'text-area__title--size--big');
      access.textContent = 'Оплата прошла успешно';
      fifthPage.append(access);

      basketArray.splice(0, basketArray.length);
      localStorage.setItem('basket', JSON.stringify(basketArray));
      counterBasket();
      setTimeout(() => {
        togglePage.closePage();
        togglePage.deletePage();
        toggleSubPage.closePage();
        toggleSubPage.deletePage();
        toggleThirdPage.closePage();
        toggleThirdPage.deletePage();
        toggleFourthPage.closePage();
        toggleFourthPage.deletePage();
        toggleFifthPage.closePage();
        toggleFifthPage.deletePage();
      }, 3000);
    } else {
      toggleModal.rendering(payInfo.errors[0]);
    }
  }

  create() {
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="text-area__container">
        <div class="text-area__content-container text-area__content-container--indentation--normal text-area__content-container--direction--column">
          <p class="text-area__title text-area__title--size--normal text-area__title--indentation--bottom-big text-area__title--theme--shadow">Выберете способ отплаты</p>
          <div class="radio">
            <input type="radio" class="radio__input" id="creditCard" name="radio"/>
            <label class="radio__label radio__label--default radio__label--available" for="creditCard">Банковская карта</label>
          </div>
          <div class="radio">
            <input type="radio" class="radio__input" id="balance" name="radio"/>
            <label class="radio__label radio__label--default" for="balance">Баланс (Доступно ${userInfoObj.successData.balance})</label>
          </div>
          <div class="radio">
            <input type="radio" class="radio__input" id="bonus" name="radio"/>
            <label class="radio__label radio__label--default" for="bonus">Бонусы (Доступно ${userInfoObj.successData.bonus})</label>
          </div>
        </div>
      </div>
      <div class="text-area__container text-area__container--indentation--normal">
        <div>
          <span class="text-area__price text-area__price--size--big">${this.parameters.number}</span>
          <p class="text-area__text text-area__text--theme--shadow">Итого</p>
        </div>
      </div>
      <button class="button button--size--big button--theme--tangerin button--type--fixed-low button--theme--shadow-big text-area__button text-area__button--open text-area__button--type--${this.parameters.identifier}">Оплатить</button>
      <a class="text-area__link" href="" target="_blank" rel="noopener"></a>
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);


    this.button = this.element.querySelector(`.text-area__button--type--${this.parameters.identifier}`);
    this.radioInput = this.element.querySelectorAll('.radio__input');
    [...this.radioInput].forEach((item) => {
      for (const key in userInfoObj.successData) {
        if (item.id === key) {
          if (Number(userInfoObj.successData[key]) < this.parameters.number) {
            item.disabled = true;
            item.nextElementSibling.classList.add('radio__label--disable');
          } else {
            item.nextElementSibling.classList.add('radio__label--available');
          }
        }
      }
    });

    this.button.addEventListener('click', () => {
      [...this.radioInput].forEach((item) => {
        if (item.checked) {
          api.payOrderApi(item.id, orderInfo.successData, this.resPayOrder);
        }
      });
    });

    if (orderComment !== undefined) {
      const textAreaComment = document.createElement('div');
      textAreaComment.classList.add('text-area__container', 'text-area__container--indentation--normal');
      const templateComment = `
        <div>
          <p class="text-area__text text-area__text--theme--shadow">Ваш комментарий к заказу:</p>
          <span class="text-area__title text-area__title--size--normal">${this.parameters.comment}</span>
        </div>
      `;
      textAreaComment.insertAdjacentHTML('beforeend', templateComment);
      this.button.before(textAreaComment);
    }

    return super.create(this.element);
  }
}

class CreateTextAreaBankInfo extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `

          <h2 class="text-area__title ">${this.parameters.text}</h2>

    `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}
