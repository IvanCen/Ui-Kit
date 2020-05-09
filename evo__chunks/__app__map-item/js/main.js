class CreateMapItemStoresWraper extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <div class="top-bar-search">
          <span class="top-bar-search__info">Поблизости</span>
        </div>
        <div class="map__container">
        </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateMapItemStores extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;

    this.create = this.create.bind(this);
  }

  create(store) {
    this.element = document.createElement('div');
    this.element.classList.add('map__item');
    this.template = `
            <div class="map__content">
              <input type="radio" class="radio__input" id="${store.id}" name="radio"/>
              <label class="map__item-title radio__label map__radio-label" for="${store.id}">${store.shortTitle} <br>
                <span class="map__item-text">${store.longTitle} <br>
                <span class="map__item-dist"></span>
                </span>
              </label>
            </div>
            <button class="map__button">
              <img src="[+chunkWebPath+]/img/icon-info.svg" alt="" class="map__icon map__icon--position--top">
            </button>`;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.buttonDetails = this.element.querySelector('.map__button');
    this.buttonDetails.addEventListener('click', () => {
      togglePageStoresDetails.rendering(store);
      togglePageStoresDetails.openPage();
    });


    return this.element;
  }
}

