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

  create(store, placemark, myMap) {
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
    const radioInput = this.element.querySelector('.radio__input');
    this.buttonDetails.addEventListener('click', () => {
      togglePageStoresDetails.rendering(store);
      togglePageStoresDetails.openPage();
    });
    placemark.events
      .add('click', (e) => {
        e.get('target').options.set('iconImageHref', '[+chunkWebPath+]/img/icon-map-point-select.svg');
        const radioInputId = document.getElementById(store.id);
        radioInputId.checked = 'checked';
      })
      .add('click', (e) => {
        if (e.get('target') == false) {
          e.get('target').options.set('iconImageHref', '[+chunkWebPath+]/img/icon-map-point.svg');
        }
      });
    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      radioInput.checked = 'checked';
      placemark.options.set('iconImageHref', '[+chunkWebPath+]/img/icon-map-point-select.svg');
      myMap.panTo([Number(store.latitude), Number(store.longitude)], {
        delay: 1000,
      }).then(() => {
        myMap.setZoom(15);
      });
    });
    /*radioInput.addEventListener('change', function () {
      if (this.checked) {
        console.log(';hello');
      } else {
        console.log('s');
      }
    });*/
    return this.element;
  }
}
