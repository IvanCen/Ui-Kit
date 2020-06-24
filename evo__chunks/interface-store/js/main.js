let dataProductApi;
let basketArray = [];

function counterBasket() {
  const basket = document.querySelector('.bottom-bar__icon--type--basket');
  const counterIcon = document.querySelector('.bottom-bar__counter');
  basket.classList.add('bottom-bar__icon--full');

  if (basketArray.length === 0) {
    counterIcon.textContent = '0';
    basket.classList.remove('bottom-bar__icon--full');
  } else {
    counterIcon.textContent = basketArray.length;
  }
}

function canUseWebP() {
  const elem = document.createElement('canvas');

  if (elem.getContext && elem.getContext('2d')) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
}

class CreateItem {
  constructor(parameters) {
    this.parameters = parameters;
    if (typeof this.parameters !== 'object') {
      this.parameters = {};
    }
  }

  create(element) {
    element.classList.add(this.parameters.style);

    if (typeof this.parameters.modifier === 'object') {
      const { className } = element;
      for (const style of this.parameters.modifier) {
        element.classList.add(className + style);
      }
    }
    return element;
  }
}

class ApiInterface {
  constructor() {
    this.options = {
      baseUrl: '[~30~]',
      headers: {
        'Content-Type': 'text/html',
      },
    };
  }

  productApi(func) {
    const request = {
      method: 'get-catalog',
      view: 'both',
      outputFormat: 'json',

    };
    fetch(this.options.baseUrl, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify(request),

    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((productsInfo) => {
        dataProductApi = productsInfo;
        return productsInfo;
      })
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }
}
const api = new ApiInterface();

class CreateCardItemOrderProductCard {
  constructor(parameters) {
    this.parameters = parameters;
  }

  create(productInfo) {
    this.element = document.createElement('div');
    this.element.classList.add('card-item', 'card-item--direction--column', 'card-item__container--with--border');
    let photo;
    if (productInfo.mainPhoto !== null && productInfo.mainPhoto.name !== null) {
      photo = productInfo.mainPhoto.name;
    }

    this.template = `
      <div /*style="background-image: url('${photo}')"*/ class="card-item__image card-item__image--size--big"></div>
      <div class="card-item__info-container">
        <h3 class="card-item__title card-item__title--text--normal card-item__title--position--center">${productInfo.name}</h3>
        <span class="card-item__available-info card-item__available-info--show">
      </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.element.addEventListener('click', () => {
      basketArray.push({ id: productInfo.id });
      localStorage.setItem('basket', JSON.stringify(basketArray));
      counterBasket();
    });

    return this.element;
  }
}

class ToggleFourthPage {
  constructor(parameters) {
    this.parameters = parameters;
    this.body = document.querySelector('body');
    this.fourthPage = document.querySelector('.fourth-page');
    this.fourthPageContent = document.querySelector('.fourth-page__content');
    this.classOpen = this.parameters.classOpen;

    this.closePage = this.closePage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.openPage = this.openPage.bind(this);

    if (typeof this.parameters !== 'object') {
      this.parameters = {};
    }
  }

  clearPage() {
    this.page = document.querySelector('.fourth-page');
    if (this.page !== null) {
      if (this.page.childNodes.length !== 0) {
        this.arrHtml = Array.from(this.page.children);
        this.arrHtml.splice(0, this.arrHtml.length).forEach((item) => item.remove());
      }
    }
  }

  deletePage() {
    if (this.fourthPage) {
      setTimeout(() => this.fourthPage.remove(), 100);
    }
  }

  closePage() {
    this.fourthPage = document.querySelector('.fourth-page');
    if (this.fourthPage) {
      if (typeof this.parameters.classOpen === 'object') {
        for (const style of this.parameters.classOpen) {
          this.fourthPage.classList.remove(style);
        }
      }
      setTimeout(() => this.body.classList.remove('body'), 100);
    }
  }

  openPage() {
    setTimeout(() => {
      this.fourthPage.classList.add(this.classOpen);
      this.body.classList.add('body');
    }, 100);
  }

  rendering() {
    function createFourthPage() {
      const element = document.createElement('div');
      element.classList.add('fourth-page');

      return element;
    }
    this.body.append(createFourthPage());
    this.fourthPage = document.querySelector('.fourth-page');
  }
}

class CreateTopBarReviewOrder extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }


  create() {
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <div class="top-bar__content-container top-bar__content-container--size--small">
          <div class="top-bar__header">
            <button class="button top-bar__button top-bar__button--theme--dark top-bar__button--type--back">
              <img src="[+chunkWebPath+]/img/icon-back.svg" alt="Кнопка назад"
                   class="top-bar__icon top-bar__icon-back">
            </button>
          </div>
          <h1 class="top-bar__title">Товаров в корзине (<span class="top-bar__all-counter-order"></span>)</h1>
        </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.counter = this.element.querySelector('.top-bar__all-counter-order');
    this.counter.textContent = basketArray.length.toString();
    this.buttonFilter = this.element.querySelector('.top-bar__filter-button');
    this.buttonSearch = this.element.querySelector('.top-bar__search-button');
    this.storesButton = this.element.querySelector('.top-bar__select-item--type--stores');

    if (typeof this.parameters.eventStores === 'object') {
      for (const event of this.parameters.eventStores) {
        this.storesButton.addEventListener(event.type, event.callback);
      }
    }

    this.iconBack = this.element.querySelector('.top-bar__button--type--back');
    if (typeof this.parameters.eventBack === 'object') {
      for (const event of this.parameters.eventBack) {
        this.iconBack.addEventListener(event.type, event.callback);
      }
    }

    return super.create(this.element);
  }
}

class CreateButton extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = this.parameters.template;
  }

  create() {
    if (typeof this.parameters.text === 'object') {
      this.element.textContent = this.parameters.text;
    }
    if (typeof this.parameters.events === 'object') {
      for (const event of this.parameters.events) {
        this.element.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventsOpen === 'object') {
      for (const eventOpen of this.parameters.eventsOpen) {
        this.element.addEventListener(eventOpen.type, eventOpen.callback);
      }
    }
    this.addEventListenerButton(this.element);
    return super.create(this.element);
  }

  addEventListenerButton(item) {
    this.buttonActive = 'button--active';
    item.addEventListener('click', function () {
      this.focus();
    });
    item.addEventListener('focus', function () {
      this.classList.add(this.buttonActive);
      this.innerText += '';
    });
    item.addEventListener('blur', function () {
      this.classList.remove(this.buttonActive);
    });
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

    // if()

    this.element = document.createElement('div');
    this.template = `
          <img alt="" class="card-item__image card-item__image--size--small">
          <div class="card-item__content-container">
            <h3 class="card-item__title card-item__title--text--bold">${dataProductApi.successData.items[productInfo.id].name}</h3>
            <ul class="card-item__list"></ul>
            <span class="card-item__price">${dataProductApi.successData.items[productInfo.id].price}</span>
          </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.iconsMinus = this.element.querySelector('.card-item__button--type--minus');
    this.iconsPlus = this.element.querySelector('.card-item__button--type--plus');
    this.price = this.element.querySelector('.card-item__price');
    const el = this.element;
    const counterTopBar = document.querySelector('.top-bar__all-counter-order');
    const counterBottomBar = document.querySelector('.bottom-bar__counter');


    let priceAllModifier = 0;


    /**
     * Если есть модификаторы
     */
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
          cardItemList.append(cardItemListItem);
        }
      }
    }
    this.price.textContent = priceAllModifier + dataProductApi.successData.items[productInfo.id].price;

    return super.create(this.element);
  }
}
class ToggleFourthPageReviewOrder extends ToggleFourthPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const reviewTopBar = new CreateTopBarReviewOrder({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--theme--dark'],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });

    const reviewCardItemContainer = new CreateCardItemContainerFavAndHisOrder({
      selector: ['div'],
      style: ['card-item__container'],
      modifier: [
        '--direction--column',
        '--indentation-column--normal',
        '--indentation--top',
        '--type--review',
      ],
    });

    const reviewButton = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: ['--size--big',
        '--theme--tangerin',
        '--type--fixed-low',
        '--theme--shadow-big',
        '--type--make-order',
      ],
      text: ['Очистить корзину'],
    });
    const reviewCardItem = new CreateCardItemReviewOrder({
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--border--bottom',
      ],
    });


    this.fourthPage.append(reviewTopBar.create());
    this.fourthPage.append(reviewCardItemContainer.create());
    this.fourthPage.append(reviewButton.create());

    this.cardItemContainer = document.querySelector('.card-item__container--type--review');


    const productsItems = dataProductApi.successData.items;
    basketArray.forEach((item) => {
      for (const el of Object.values(productsItems)) {
        if (item.id === el.id) {
          this.cardItemContainer.append(reviewCardItem.create(item));
        }
      }
    });
    const reviewButtonn = document.querySelector('.button--type--make-order');
    reviewButtonn.addEventListener('click', () => {
      basketArray = [];
      toggleFourthPageReviewOrder.clearPage();
      toggleFourthPageReviewOrder.rendering();
    });

    this.openPage();
  }
}

const toggleFourthPageReviewOrder = new ToggleFourthPageReviewOrder({
  classOpen: ['fourth-page--opened'],
});

const toggleFourthPage = new ToggleFourthPage({
  classOpen: ['fourth-page--opened'],
});


const cardItem = new CreateCardItemOrderProductCard();
function render(productsInfo) {
  const { items } = productsInfo.successData;
  for (item in items) {
    document.querySelector('.item-container').append(cardItem.create(items[item]));
  }
}
document.querySelector('.bottom-bar__select-item').addEventListener('click', () => {
  toggleFourthPageReviewOrder.rendering();
  toggleFourthPageReviewOrder.openPage();
});

api.productApi(render);
