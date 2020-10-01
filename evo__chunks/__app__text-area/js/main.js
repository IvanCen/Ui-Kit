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
    let allCountAdds = 0;

    if (typeof userDataObj[productInfo.id] === 'object') {
      Object.entries(userDataObj[productInfo.id]).forEach(([key, value]) => {
        allCountAdds += value;

        if (String(textArea.id) === key) {
          counter += Number(value);
        }
      });
    }

    function setUserDataObj() {
      console.log(productInfo);
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
        allCountAdds += value;

        if (String(textArea.id) === key) {
          counter += Number(value);
        }
      });
    }

    function setUserDataObj() {
      console.log(productInfo);
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

class CreateTextAreaAddinsProductCard extends CreateItem {
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

  countPrice(productInfo, productItemModif, counter) {
    const priceEl = this.element.querySelector('.text-area__price');
    let price = Number(priceEl.textContent);
    price += productItemModif.price * counter;
    priceEl.textContent = price;
  }

  createModif(el, productItemModif, counter) {
    const textAreaListItem = document.createElement('li');
    const textAreaList = el.querySelector('.text-area__list');
    textAreaListItem.classList.add('text-area__list-item');
    textAreaListItem.id = productItemModif.id;
    textAreaListItem.textContent = `${counter} добав${number_of(counter, ['ка', 'ки', 'ок'])} ${productItemModif.name}`;
    textAreaList.append(textAreaListItem);
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

    if (typeof userDataObj === 'object' && userDataObj[productInfo.id] !== undefined && typeof userDataObj[productInfo.id] === 'object') {
      Object.keys(userDataObj[productInfo.id]).forEach((modifiersUserItem) => {
        const productItemModif = dataProductApi.successData.modifiers[Number(modifiersUserItem)];
        const counter = userDataObj[productInfo.id][modifiersUserItem];
        if (productItemModif.category === modifierName && counter !== 0) {
          const {
            caffeine, carbon, cholesterol,
            energy, energyFatValue, fats,
            fiber, netWeight, protein,
            saturatedFats, sodium, sugar,
            transFats, volume,
          } = productItemModif;
          this.countPrice(productInfo, productItemModif, counter);
          this.countNutrition({
            caffeine,
            carbon,
            cholesterol,
            energy,
            energyFatValue,
            fats,
            fiber,
            netWeight,
            protein,
            saturatedFats,
            sodium,
            sugar,
            transFats,
            volume,
          }, el, counter);
          this.createModif(element, productItemModif, counter);
        }
      });
    }
    element.addEventListener('click', () => {
      stopAction(() => {
        toggleThirdPageAddinsCard.rendering(productInfo, modifierName);
      });
    });
    descriptionArea.after(element);
  }

  removeEmptyNutrition(productInfo) {
    Object.entries(productInfo).forEach(([key, value]) => {
      const modifEl = this.element.querySelector(`.text-area__info-number--${key}`);
      if ((value === null || value === 0) && modifEl) {
        modifEl.parentElement.remove();
      }
    });
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

    if (!isEmptyObj(dataUserSeasons)) {
      Object.values(dataUserSeasons.successData).forEach((item) => {
        if (dataSeasons.successData[item.id]) {
          Object.values(dataSeasons.successData[item.id].items).forEach((el) => {
            if (el === productInfo.id) {
              price = dataSeasons.successData[item.id].price;
            }
          });
        }
      });
    }

    this.template = `
      <button class="button text-area__button text-area__button--type--like text-area__button--position--absolute">
        <svg class="text-area__icon text-area__icon--type--like" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.8 9.80005C1.6 9.25005 1.5 8.67005 1.5 8.05005C1.5 5.15005 3.86 2.80005 6.75 2.80005C8.84 2.80005 10.66 4.03005 11.5 5.80005C11.7 6.22005 12.29 6.22005 12.5 5.80005C13.35 4.02005 15.16 2.80005 17.25 2.80005C20.14 2.80005 22.5 5.15005 22.5 8.05005C22.5 8.67005 22.39 9.27005 22.19 9.83005C21.93 10.56 21.51 11.21 20.97 11.76L12.02 20.66L3.4 12.09L3.39 12.08L3.38 12.07C3.17 11.89 2.98 11.7 2.8 11.49C2.35 10.99 2.02 10.42 1.8 9.80005Z"/>
        </svg>
      </button>
      <div class="text-area text-area--theme--light">
        <div class="text-area__container text-area__container--indentation--normal text-area__container--indentation--normal">
          <span class="text-area__price text-area__price--size--big">${price}</span>
          <div class="text-area__icon-container text-area__icon-container--open"></div>
        </div>
      </div>
      <div class="text-area text-area--theme--light text-area--type--description">
        <div class="text-area__container text-area__container--indentation--normal">
          <div class="text-area__content-container text-area__content-container--direction--column">
            <p class="text-area__text text-area__text--theme--shadow">${productInfo.intro}</p>
            <div class="text-area__button-container">
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
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold text-area__info--netWeight">
              Масса нетто
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left text-area__info-number--netWeight">
              ${productInfo.netWeight || ''} г</span>
            </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold text-area__info--volume">
              Объём
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left text-area__info-number--volume">
              ${productInfo.volume || ''} мл</span>
            </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Калорий
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left text-area__info-number--energy">
              ${productInfo.energy || ''}</span>
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
      <div class="text-area__container text-area__container--type--ingredients text-area__container--indentation--normal">
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

    this.removeEmptyNutrition(productInfo);

    this.buttonShare = this.element.querySelector('.text-area__button--type--share');
    this.iconsLike = this.element.querySelector('.text-area__icon--type--like');
    this.blockLike = document.querySelector('.main-card__content-img');
    this.buttonMore = this.element.querySelector('.text-area__button--type--more');
    this.buttonAdd = this.element.querySelector('.text-area__button--type--add-product');
    this.nutritionArea = this.element.querySelector('.text-area__content-container--type--more');
    this.introEl = this.element.querySelector('.text-area--type--description');
    this.price = this.element.querySelector('.text-area__price');
    this.stickersContainer = this.element.querySelector('.text-area__icon-container');
    this.containerIngredients = this.element.querySelector('.text-area__container--type--ingredients');

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

    this.buttonAdd.addEventListener('click', () => {
      addProductToBasket(productInfo);
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

    if (productInfo.ingredients === null) {
      this.containerIngredients.remove();
    }

    const unicModifName = new Set(arrModifCategoryName);
    [...unicModifName].forEach((name) => {
      this.renderModifier(name, this.element, productInfo);
    });

    const descriptionArea = this.element.querySelector('.text-area--description-wraper');
    const modifiers = this.element.querySelectorAll('.text-area--type--modifier');
    if (typeof userDataObj === 'object' && userDataObj[productInfo.id] !== undefined && !isEmptyObj(userDataObj[productInfo.id])) {
      const buttonReset = document.createElement('button');
      buttonReset.classList.add('text-area__button', 'text-area__button--type--reset');
      buttonReset.textContent = 'сбросить модификаторы';
      descriptionArea.before(buttonReset);
      [...modifiers].pop().firstElementChild.classList.add('text-area__container--no-border');
    }

    return super.create(this.element);
  }
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

  countPrice(productInfo, productItemModif, counter) {
    const priceEl = this.element.querySelector('.text-area__price');
    let price = Number(priceEl.textContent);
    price += productItemModif.price * counter;
    priceEl.textContent = price;
  }

  createModif(el, productItemModif, counter) {
    const textAreaListItem = document.createElement('li');
    const textAreaList = el.querySelector('.text-area__list');
    textAreaListItem.classList.add('text-area__list-item');
    textAreaListItem.id = productItemModif.id;
    textAreaListItem.textContent = `${counter} добав${number_of(counter, ['ка', 'ки', 'ок'])} ${productItemModif.name}`;
    textAreaList.append(textAreaListItem);
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

    if (typeof userDataObj === 'object' && userDataObj[productInfo.id] !== undefined && typeof userDataObj[productInfo.id] === 'object') {
      Object.keys(userDataObj[productInfo.id]).forEach((modifiersUserItem) => {
        const productItemModif = dataProductApi.successData.modifiers[Number(modifiersUserItem)];
        const counter = userDataObj[productInfo.id][modifiersUserItem];
        if (productItemModif.category === modifierName && counter !== 0) {
          const {
            caffeine, carbon, cholesterol,
            energy, energyFatValue, fats,
            fiber, netWeight, protein,
            saturatedFats, sodium, sugar,
            transFats, volume,
          } = productItemModif;
          this.countPrice(productInfo, productItemModif, counter);
          this.countNutrition({
            caffeine,
            carbon,
            cholesterol,
            energy,
            energyFatValue,
            fats,
            fiber,
            netWeight,
            protein,
            saturatedFats,
            sodium,
            sugar,
            transFats,
            volume,
          }, el, counter);
          this.createModif(element, productItemModif, counter);
        }
      });
    }
    element.addEventListener('click', () => {
      stopAction(() => {
        toggleThirdPageAddinsCard.rendering(productInfo, modifierName);
      });
    });
    descriptionArea.after(element);
  }

  removeEmptyNutrition(productInfo) {
    Object.entries(productInfo).forEach(([key, value]) => {
      const modifEl = this.element.querySelector(`.text-area__info-number--${key}`);
      if ((value === null || value === 0) && modifEl) {
        modifEl.parentElement.remove();
      }
    });
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

    if (!isEmptyObj(dataUserSeasons)) {
      Object.values(dataUserSeasons.successData).forEach((item) => {
        if (dataSeasons.successData[item.id]) {
          Object.values(dataSeasons.successData[item.id].items).forEach((el) => {
            if (el === productInfo.id) {
              price = dataSeasons.successData[item.id].price;
            }
          });
        }
      });
    }

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
            <button class="button button--color-5 card__button">В корзину</button>
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
    this.iconsLike = this.element.querySelector('.card__bookmark-icon');
    this.buttonReset = this.element.querySelector('.card__modifiers-reset');

    if (!isEmptyObj(outOfStock) && outOfStock.successData.itemsAndModifiers.length !== 0) {
      let active = true;
      for (const id in outOfStock.successData.itemsAndModifiers) {
        if (Number(id) === productInfo.id) {
          this.cardPage.classList.add('card--ended');
          active = !active;
          break;
        }
      }
      if (active) {
        this.buttonAdd.addEventListener('click', () => {
          addProductToBasket(productInfo);
          this.cardPage.classList.add('card--animation');
          this.cardPage.style = 'transform: translate3d(0px, 760.2283px, 0px);';
          setTimeout(() => {
            toggleModalPageCard.deletePage();
          }, 1000);
        });
        this.iconAdd.addEventListener('click', () => {
          addProductToBasket(productInfo);
          this.cardPage = document.querySelector('.card');
          this.cardPage.classList.add('card--animation');
          this.cardPage.style = 'transform: translate3d(0px, 760.2283px, 0px);';
          setTimeout(() => {
            toggleModalPageCard.deletePage();
          }, 1000);
        });
      }
    }


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
        this.iconsLike.classList.add('card__bookmark-icon--liked');
      }
    });

    this.iconsLike.addEventListener('click', () => {
      this.iconsLike.classList.toggle('card__bookmark-icon--liked');
      if (this.iconsLike.classList.contains('card__bookmark-icon--liked')) {
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

class CreateTextAreaAddins extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(productInfo) {
    this.element = document.createElement(this.parameters.selector);

    this.template = `
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
    this.templateTitle = `<h2 class="text-area__title text-area__title--type--uppercase text-area__title--type--bold text-area__title--type--modifier">${modifierWithTitle[0]}</h2>`;

    this.element.insertAdjacentHTML('beforeend', this.templateTitle);
    for (const item of Object.values(modifierWithTitle[1])) {
      this.template = `
        <div id="${item.id}" class="text-area text-area--theme--light text-area--type--add-ins">
          <div class="text-area__container text-area__container--indentation--small text-area__container--type--modifier">
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
      if (typeof userDataObj === 'object' && typeof userDataObj[productInfo.id] === 'object') {
        for (const modifiersUserItem in userDataObj[productInfo.id]) {
          if (String(item.id) === modifiersUserItem) {
            const counter = userDataObj[productInfo.id][modifiersUserItem];
            if (counter !== 0) {
              this.template = `
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
                <div class="card__modifiers-section-list-element-image" data-img="[+chunkWebPath+]/img/mod1.png">
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
                        <div class="card__modifiers-section-list-element-image" data-img="[+chunkWebPath+]/img/mod2.png">
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
       <div class="text-area text-area--type--subscription">
        <div class="text-area__container text-area__container--indentation--small">
          <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Абонементы</h2>
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
    this.buttonSubscription = this.element.querySelector('.text-area--type--subscription');

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
    this.buttonSubscription.addEventListener('click', () => {
      stopAction(() => {
        toggleModalPageSubscription.rendering();
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
    console.log(info);
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

class CreateTextAreaResult extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <section class="basket__result">
          <span class="basket__result-title">Итого</span>
          <span class="basket__result-price">${this.parameters.sumPrice || ''} ₽</span>
      </section>
      <button type="submit" class="button button--type--make-order button--color-5">Оплатить</button>
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

    /* // делаем функцию подсчета стоимости корзины
    function calcBasketPrice(catalog, basket, priceGroup, replaceItemPrice){
      let totalAmount = 0;
      let priceGroupKey = 'price'+priceGroup;
      // проходимся по корзине
      for( let basketItem of basket){
        // получаем базовую цену элемента
        let basketItemPrice = catalog[items][basketItem.id][priceGroupKey];
        // подменяем цену элемента, если она была задана в подменном массиве
        if(replaceItemPriceByActiveSeasons[basketItem.id]){
          basketItemPrice=replaceItemPriceByActiveSeasons[basketItem.id];
        }
        let basketItemModifiersPrice = 0;
        // проходимся по модификаторам товара в корзине
        for( let modifier of basketItem.modifiers ){
          // получаем базовую цену модификатора
          let basketItemModifierPrice = catalog[modifiers][modifiers.id][priceGroupKey];
          // подменяем цену элемента, если она была задана в подменном массиве
          if(replaceItemPriceByActiveSeasons[modifiers.id]){
            basketItemModifierPrice=replaceItemPriceByActiveSeasons[modifiers.id];
          }
          // умножаем на количество модификаторов в товаре
          basketItemModifierPrice = basketItemModifierPrice*modifiers.count;
          // прибавляем к цене модификаторов этого товара
          basketItemModifiersPrice += basketItemModifierPrice;
        }
        //объединяем цену товара и модификатора
        basketItemPrice = basketItemPrice + basketItemModifiersPrice;
        // прибавляем к общей сумме покупки
        totalAmount += basketItemPrice;

      }
    }

// подготавливаем данные

// получаем каталог
    let catalog = localStorage.getItem('productData');
    catalog = JSON.parse(catalog);
    catalog = catalog.successData;

// получаем корзину
    let basket = localStorage.getItem('basket');
    basket = JSON.parse(basket);
// получаем магазин выбранный клиентом
    let store = localStorage.getItem('userStore');
    store = JSON.parse(store);
    store = store.store;
    let storeId = store.id;
// получаем ценовую группу
    let priceGroup;
    if(store.priceGroup){
      priceGroup = store.priceGroup;
    }
    else{
      priceGroup = '';
    }
// создаем переменную с подменой цен
    let replaceItemPrice={};

// получаем доступные абонементы
    let availableSeasons = localStorage.getItem('dataSeasons');
    availableSeasons = JSON.parse(availableSeasons);
    availableSeasons = availableSeasons.successData;
    let replaceItemPriceByActiveSeasons = {

    };
// получаем абонементы клиента
    let userSeasons = localStorage.getItem('dataUserSeasons');
    if(Object.values(userSeasons).length>0){
      // проходимся по абонементам клиента
      for(let userSeason of Object.values(userSeasons)){
        let seasonEndDate = new Date(userSeason.endDate);
        // если абонемент на магазин используемый в корзине и не закончился
        if(userSeason.shopId === storeId && seasonEndDate>(new Date)){
          // если есть товары, цены на которые можно подменить
          if(availableSeasons[userSeason.id]['items'] && availableSeasons[userSeason.id]['items'].length){
            // объединяем ебъект с подменой цен абонемента с товарами указанными в абонементе
            replaceItemPriceByActiveSeasons = Object.assign(replaceItemPriceByActiveSeasons, availableSeasons[userSeason.id]['items'];
          }
        }
      }
    }
// объединяем объект с подменой цен с локальными объектами подмены цен(абонементы, промокоды, т.д.)
    replaceItemPrice = Object.assign(replaceItemPrice, replaceItemPriceByActiveSeasons);

// получаем стоимость товаров в корзине

    calcBasketPrice(catalog, basket, priceGroup, replaceItemPrice); */

    return super.create(this.element);
  }
}

class CreateTextAreaNoBasket extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
  }

  create() {
    this.template = `
      <div class="basket__empty-section">
        <img src="[+chunkWebPath+]/img/empty-basket.svg" class="basket__empty-section-img" alt="">
        <div class="basket__empty-section-title">У вас еще нет товаров в корзине</div>
        <div class="basket__empty-section-text">Переходите в меню, делайте заказ и наслаждайтесь</div>
        <button class="basket__empty-section-button button button--color-5">${this.parameters.textButton}</button>
    </img>
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.button = this.element.querySelector('.basket__empty-section-button');
    if (typeof this.parameters.eventsButton === 'object') {
      for (const event of this.parameters.eventsButton) {
        this.button.addEventListener(event.type, event.callback);
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
    if (payInfo.success) {
      let successText = 'Ваш заказ успешно оплачен';
      let successTextTimeout = 300;
      if (typeof payInfo.successData.payUrl !== 'undefined') {
        successText = 'Если платеж был успешным, то скоро мы получим его и обновим статус вашего заказа или доставим средства на счет';
        successTextTimeout = 2000;
        const link = document.querySelector('.text-area__link');
        document.location.href = payInfo.successData.payUrl;
        link.href = payInfo.successData.payUrl;
        link.click();
      }
      closePages();
      while (basketArray.length > 0) {
        basketArray.pop();
      }
      localStorage.setItem('basket', JSON.stringify(basketArray));
      emitter.emit('event:counter-changed');

      setTimeout(() => {
        toggleModal.rendering(successText);
      }, successTextTimeout);
    }
  }

  /* <div class="radio">
            <input type="radio" class="radio__input" id="applePay" name="radio"/>
            <label class="radio__label radio__label--disable radio__label--default" for="applePay">Apple Pay</label>
          </div> */

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

    if (orderComment !== undefined && orderComment !== '') {
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

    if (promoCode !== undefined && promoCode !== '') {
      const textAreaPromoCode = document.createElement('div');
      textAreaPromoCode.classList.add('text-area__container', 'text-area__container--indentation--normal');
      const templateComment = `
        <div>
          <p class="text-area__text text-area__text--theme--shadow">Ваш промокод:</p>
          <span class="text-area__title text-area__title--size--normal">${promoCode}</span>
        </div>
      `;
      textAreaPromoCode.insertAdjacentHTML('beforeend', templateComment);
      this.button.before(textAreaPromoCode);
    }

    /* if (!isIos) {
      const applePayRadio = this.element.querySelector('#applePay').closest('.radio');
      applePayRadio.remove();
    } */

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

class CreateTextAreaBalanceMain extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
  }

  create() {
    let balance;
    if (userInfoObj.successData) {
      balance = userInfoObj.successData.balance;
    } else {
      balance = '0';
    }
    const date = new Date();
    const timeNow = [date.getHours(), date.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(':');

    this.template = `

        <div class="balance-section__header">
            <div class="balance-section__title">Баланс</div>
            <div class="balance-section__date">сегодня, ${timeNow}</div>
        </div>
        <div class="balance-section__content">
            <div class="balance-section__container">
                <div class="balance-section__fiat">${balance} ₽</div>
            </div>
            <button class="button-fill button--color-2">Пополнить</button>
        </div>

    `;

    this.element.insertAdjacentHTML('beforeend', this.template);
    this.button = this.element.querySelector('.button-fill');

    if (typeof this.parameters.eventsButton === 'object') {
      for (const event of this.parameters.eventsButton) {
        this.button.addEventListener(event.type, event.callback);
      }
    }
    return super.create(this.element);
  }
}
