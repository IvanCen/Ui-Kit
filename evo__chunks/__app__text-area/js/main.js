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
      console.log(counter, allCountAdds);
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
      /* [...textAreaListItem].forEach(item=> {
        item
      })
      textArea
      if (typeof userDataObj[productInfo.id] === 'object') {
        for (const modifier of Object.values(dataProductApi.successData.modifiers)) {
          for (const modifiersUserItem in userDataObj[productInfo.id]) {
            if (String(modifier.id) === modifiersUserItem && modifier.category === modifierName) {
              const counter = userDataObj[productInfo.id][modifiersUserItem];
              const textAreaListItem = document.querySelectorAll('.text-area__list');

              if (counter !== 0) {
                textAreaListItem.classList.add('text-area__list-item');
                textAreaListItem.id = modifier.id;
                textAreaListItem.textContent = textAreaListItem.textContent = `${counter} добав${number_of(counter, ['ка', 'ки', 'ок'])} ${modifier.name}`;
                textAreaList.append(textAreaListItem);
              }
            }
          }
        }6+3

      } */
    });
  });
}

class CreateTextAreaAddinsProductCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
  }

  create(productInfo) {
    console.log(productInfo);
    this.template = `
      <div class="text-area text-area--theme--light">
        <div class="text-area__container text-area__container--indentation--normal">
          <span class="text-area__price text-area__price--size--big">${productInfo.price}</span>
        </div>
      </div>
      <div class="text-area text-area--theme--light text-area--type--description">
        <div class="text-area__container text-area__container--indentation--normal">
          <div class="text-area__content-container text-area__content-container--direction--column">
            <p class="text-area__text text-area__text--theme--shadow text-area__text--indentation--big">${productInfo.intro}</p>
            <div class="text-area__button-container">
              <button class="button text-area__button text-area__button--type--like">
                <svg class="text-area__icon text-area__icon--type--like" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.8 9.80005C1.6 9.25005 1.5 8.67005 1.5 8.05005C1.5 5.15005 3.86 2.80005 6.75 2.80005C8.84 2.80005 10.66 4.03005 11.5 5.80005C11.7 6.22005 12.29 6.22005 12.5 5.80005C13.35 4.02005 15.16 2.80005 17.25 2.80005C20.14 2.80005 22.5 5.15005 22.5 8.05005C22.5 8.67005 22.39 9.27005 22.19 9.83005C21.93 10.56 21.51 11.21 20.97 11.76L12.02 20.66L3.4 12.09L3.39 12.08L3.38 12.07C3.17 11.89 2.98 11.7 2.8 11.49C2.35 10.99 2.02 10.42 1.8 9.80005Z"/>
                </svg>
              </button>
              <button class="button text-area__button text-area__button--type--share">
                <img src="[+chunkWebPath+]/img/icon-upload.svg" alt=""
                     class="text-area__icon text-area__icon--position--center">
              </button>
            </div>
          </div>
        </div>
      </div>
     <button class="text-area__button text-area__button--type--reset">сбросить модификации</button>
       <div class="text-area text-area--theme--light text-area--direction--column text-area--indentation--normal text-area--indentation--top">
        <div class="text-area__content-container text-area__content-container--direction--row text-area__content-container--type--more">
          <div class="text-area__text-container">
            <h2 class="text-area__title text-area__title--size--normal">Подробная информация</h2>
            <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--top">
              Масса нетто г ${productInfo.netWeight || ''}</span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Калорий
              <span
                  class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
              ${productInfo.energyFatValue || ''}</span>
            </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Жиров
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                ${productInfo.fats || ''}</span>
            </span>
                <span class="text-area__sub-info">
                  Насыщенных жиров 
                  <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                    ${productInfo.saturatedFats || ''}</span>
                </span>
                <span class="text-area__sub-info">
                  Трансжиров
                  <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                    ${productInfo.transFats || ''}</span>
                </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Холестерин
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                ${productInfo.cholesterol || ''}</span>
            </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Натрий
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                ${productInfo.sodium || ''}</span>
            </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Углеводов
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                ${productInfo.carbon || ''}</span>
            </span>
                <span class="text-area__sub-info">
                  Клетчатка
                  <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                    ${productInfo.fiber || ''}</span>
                </span>
                <span class="text-area__sub-info">
                  Сахар
                <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                    ${productInfo.sugar || ''}</span>
                </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Белок
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                ${productInfo.protein || ''}</span>
            </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Кофеин<span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                ${productInfo.caffeine || ''}</span>
            </span>
          </div>
          <button class="button button--theme--chocolate text-area__button text-area__button--type--more">
              узнать больше
          </button>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--column">
          <p class="text-area__text text-area__text--theme--shadow">КБЖУ блюда рассчитывается автоматически. Модификация товара приведет к перерассчету информации на этой странице. Если модификации не выбраны - будет показана информация основного рецепта.</p>
        </div>
    </div>
    <div class="text-area text-area--theme--light">
      <div class="text-area__container text-area__container--indentation--normal">
        <div class="text-area__content-container text-area__content-container--direction--column">
          <h2 class="text-area__title text-area__title--size--normal text-area__title--indentation--bottom">Ингредиенты</h2>
          <span class="text-area__text text-area__text--theme--shadow text-area__text--type--ingredients">Ингридиент, Ингридиент</span>
        </div>
       </div>
      <div class="text-area__container text-area__container--indentation--normal">
        <div class="text-area__content-container text-area__content-container--direction--column">
          <h2 class="text-area__title text-area__title--size--normal text-area__title--indentation--bottom">Аллергены</h2>
          <p class="text-area__text text-area__text--theme--shadow">Мы не можем гарантировать отсутствие следов продуктов, которые могут вызвать аллергию в наших блюдах, так как мы используем общее оборудование для хранения.</p>
        </div>
       </div>
    </div>
    <button class="button button--size--big button--theme--tangerin button--type--fixed-with-bottom-bar button--theme--shadow-big text-area__button--type--add-product">В корзину</button>
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonShare = this.element.querySelector('.text-area__button--type--share');
    this.iconsLike = this.element.querySelector('.text-area__icon--type--like');
    this.buttonMore = this.element.querySelector('.text-area__button--type--more');
    this.buttonReset = this.element.querySelector('.text-area__button--type--reset');
    this.buttonAdd = this.element.querySelector('.text-area__button--type--add-product');
    this.nutritionArea = this.element.querySelector('.text-area__content-container--type--more');
    this.buttonMore.addEventListener('click', () => {
      this.nutritionArea.classList.toggle('text-area__content-container--open');
      this.buttonMore.remove();
    });
    itemsArray.forEach((item, index) => {
      if (item.id === productInfo.id) {
        this.iconsLike.classList.add('text-area__icon--liked');
      }
    });

    this.iconsLike.addEventListener('click', () => {
      this.iconsLike.classList.toggle('text-area__icon--liked');

      if (this.iconsLike.classList.contains('text-area__icon--liked')) {
        itemsArray.push({ id: productInfo.id });
        localStorage.setItem('items', JSON.stringify(itemsArray));
      } else {
        itemsArray.forEach((item, index) => {
          if (item.id === productInfo.id) {
            itemsArray.splice(index, 1);
          }
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
      loadImg(productInfo, basketPopupIconImg, 'webp');
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
      url: productInfo.shareLink,
    };

    this.buttonShare.addEventListener('click', async () => {
      try {
        await navigator.share(shareData);
      } catch (err) {
        window.open(productInfo.shareLink, '_blank');
      }
    });

    const arrIngredientsName = [];
    const elementIngredients = this.element.querySelector('.text-area__text--type--ingredients');
    if (productInfo.ingredients !== null) {
      for (const ingredientId of Object.values(productInfo.ingredients)) {
        for (const ingredient of Object.values(dataProductApi.successData.ingredients)) {
          if (ingredientId === ingredient.id) {
            arrIngredientsName.push(ingredient.name);
          }
        }
      }
    }
    elementIngredients.textContent = arrIngredientsName.join(', ');
    const arrModifCategoryName = [];
    const arrModif = [];
    if (productInfo.modifiers !== null) {
      for (const modifsItem of Object.values(productInfo.modifiers)) {
        for (const modif of Object.values(dataProductApi.successData.modifiers)) {
          if (modifsItem === modif.id) {
            arrModifCategoryName.push(modif.category);
            arrModif.push(modif);
          }
        }
      }
    }
    const descriptionArea = this.element.querySelector('.text-area--type--description');

    function renderModifier(modifierName) {
      const element = document.createElement('div');
      element.classList.add('text-area', 'text-area--theme--light', 'text-area--type--modifier');
      const template = `
            <div class="text-area__container text-area__container--indentation--small">
              <div class="text-area__content-container text-area__content-container--direction--column">
                <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">${modifierName}</h2>
                <ul class="text-area__list"></ul>
              </div>
              <button class="button">
                <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
              </button>
            </div>`;
      element.insertAdjacentHTML('beforeend', template);
      const textAreaList = element.querySelector('.text-area__list');

      if (typeof userDataObj[productInfo.id] === 'object') {
        for (const modifier of Object.values(dataProductApi.successData.modifiers)) {
          for (const modifiersUserItem in userDataObj[productInfo.id]) {
            if (String(modifier.id) === modifiersUserItem && modifier.category === modifierName) {
              const counter = userDataObj[productInfo.id][modifiersUserItem];
              const textAreaListItem = document.createElement('li');
              if (counter !== 0) {
                textAreaListItem.classList.add('text-area__list-item');
                textAreaListItem.id = modifier.id;
                textAreaListItem.textContent = textAreaListItem.textContent = `${counter} добав${number_of(counter, ['ка', 'ки', 'ок'])} ${modifier.name}`;
                textAreaList.append(textAreaListItem);
              }
            }
          }
        }
      }

      element.addEventListener('click', () => {
        toggleThirdPageAddinsCard.rendering(productInfo);
      });
      descriptionArea.after(element);
    }

    const unicModifName = new Set(arrModifCategoryName);
    [...unicModifName].forEach((name) => {
      renderModifier(name);
    });
    /*
    * готовый сайз бар (выбор размера)
    */
    /* if (typeof this.parameters.eventAddSize === 'object') {
      for (const event of this.parameters.eventAddSize) {
        const element = document.createElement('div');
        element.classList.add('size-bar', 'size-bar--main');
        const template = `
              <div class="size-bar__content-container">
              <h2 class="size-bar__title">${event.nameCategory}</h2>
              <span class="size-bar__info">${event.sizeNameMain}</span>
              </div>
              <div class="size-bar__button-container">
                <button class="size-bar__button">Short</button>
                <button class="size-bar__button size-bar__button--active">${event.sizeNameMain}</button>
                <button class="size-bar__button">Grande</button>
                <button class="size-bar__button">Venti</button>
              </div>`;
        element.insertAdjacentHTML('beforeend', template);

        this.descriptionArea = this.element.querySelector('.text-area--type--description');
        this.descriptionArea.after(element);
      }
    } */
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
                  <img src="[+chunkWebPath+]/img/icon-remove-line.svg" alt=""
                       class="text-area__icon text-area__icon--type--minus text-area__icon--position--first">
                </button>
                <button class="button">
                  <img src="[+chunkWebPath+]/img/icon-add-plus.svg" alt="" class="text-area__icon text-area__icon--type--plus">
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
                          <img src="[+chunkWebPath+]/img/icon-remove-line.svg" alt=""
                               class="text-area__icon text-area__icon--type--minus text-area__icon--position--first">
                        </button>
                        <button class="button">
                          <img src="[+chunkWebPath+]/img/icon-add-plus.svg" alt="" class="text-area__icon text-area__icon--type--plus">
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
            <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
          </button>
        </div>
      </div>
      <div class="text-area text-area--type--order">
        <div class="text-area__container text-area__container--indentation--small">
          <div class="text-area__content-container text-area__content-container--direction--column">
            <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Заказы</h2>
          </div>
          <button class="button">
            <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
          </button>
      </div>
      </div>
      <div class="text-area text-area--type--reward">
        <div class="text-area__container text-area__container--indentation--small">
          <div class="text-area__content-container text-area__content-container--direction--column">
            <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Достижения</h2>
          </div>
          <button class="button">
            <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
          </button>
      </div>
      </div>
      <div class="text-area text-area--type--privacy">
        <div class="text-area__container text-area__container--indentation--small">
          <div class="text-area__content-container text-area__content-container--direction--column">
            <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Политика конфиденциальности</h2>
          </div>
          <button class="button">
            <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
          </button>
        </div>
      </div>
      <div class="text-area text-area--type--terms">
        <div class="text-area__container text-area__container--indentation--small">
          <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Пользовательское соглашение</h2>
          <button class="button">
            <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
          </button>
         </div>
       </div>  
       <div class="text-area text-area--type--public">
        <div class="text-area__container text-area__container--indentation--small">
          <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Публичная оферта</h2>
          <button class="button">
            <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
          </button>
         </div>
       </div>  
    `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonPrivacy = this.element.querySelector('.text-area--type--privacy');
    this.buttonTerms = this.element.querySelector('.text-area--type--terms');
    this.buttonPublic = this.element.querySelector('.text-area--type--public');

    this.buttonPrivacy.addEventListener('click', () => {
      toggleSubPageApplication.rendering(this.setData('privacy-policy'));
    });
    this.buttonTerms.addEventListener('click', () => {
      toggleSubPageApplication.rendering(this.setData('user-agreement'));
    });
    this.buttonPublic.addEventListener('click', () => {
      toggleSubPageApplication.rendering(this.setData('public-offer'));
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
          <img src="[+chunkWebPath+]/img/icon-on-map.svg" alt="" class="text-area__icon text-area__icon--position--center">
        </div>
      </div>
      <div class="text-area">
        <div class="text-area__container text-area__container--indentation--normal">
          <div class="text-area__content-container text-area__content-container--direction--column text-area__content-container--indentation--right">
            <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">${this.parameters.phone}</h2>
          </div>
          <img src="[+chunkWebPath+]/img/icon-phone.svg" alt="" class="text-area__icon text-area__icon--position--center">
       </div>
     </div>  
     <div class="text-area">
        <h2 class="text-area__title text-area__title--size--normal text-area__title--indentation--big text-area__title--theme--shadow">Hours</h2>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small text-area__title--type--bold">Понедельник</h3>
         <span class="text-area__title text-area__title--size--small">${this.parameters.monday}</span>
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
     
     <div class="text-area">
        <h2 class="text-area__title text-area__title--size--normal text-area__title--indentation--big text-area__title--theme--shadow">Amenities</h2>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Google Wi-Fi</h3>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Drive-Thru</h3>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">LaBoulange</h3>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Mobile Payment</h3>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Music Experience</h3>
        </div>
     </div>  
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
          <span class="text-area__number text-area__number--type--${this.parameters.identifier}">${this.parameters.number}</span>
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
    if (this.parameters.button === false) {
      this.button.remove();
    }
    return super.create(this.element);
  }
}

class CreateTextAreaOrderPayment extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
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
            <label class="radio__label radio__label--default" for="balance">Баланс</label>
          </div>
          <div class="radio">
            <input type="radio" class="radio__input" id="bonus" name="radio"/>
            <label class="radio__label radio__label--default" for="bonus">Бонусы</label>
          </div>
        </div>
      </div>
      <div class="text-area__container text-area__container--indentation--normal">
        <div>
          <span class="text-area__price text-area__price--size--big">${this.parameters.number}</span>
          <p class="text-area__text text-area__text--theme--shadow">Итого</p>
        </div>
        <button class="button button--size--big button--theme--tangerin button--type--fixed-low button--theme--shadow-big text-area__button text-area__button--open text-area__button--type--${this.parameters.identifier}">Оплатить</button>
      </div>
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
    function resPayOrder(payInfo) {
      if (payInfo.success) {
        document.location.href = payInfo.successData.payUrl;
        console.log(payInfo);
      } else {
        toggleModal.rendering();
      }
    }
    this.button.addEventListener('click', () => {
      [...this.radioInput].forEach((item) => {
        if (item.checked) {
          api.payOrderApi(item.id, orderInfo.successData, resPayOrder);
        }
      });
    });

    return super.create(this.element);
  }
}
