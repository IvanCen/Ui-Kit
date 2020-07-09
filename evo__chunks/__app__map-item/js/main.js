class CreateMapItemStoresSearchWraper extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <div class="map__container map__container--type--search">
        </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateMapItemStoresWraper extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <div class="top-bar-search top-bar-search--size--small">
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

  create(store, placemark, myMap, id) {
    function identity() {
      if (id !== undefined) {
        return id;
      }
      return '';
    }
    this.element = document.createElement('div');
    this.element.classList.add('map__item');
    this.element.setAttribute('data-id', store.id);

    this.template = `
            <div class="map__content">
              <input type="radio" class="radio__input" id="${identity()}${store.id}" name="radio"/>
              <label class="map__item-title radio__label map__radio-label radio__label--available" for="${identity()}${store.id}">${store.shortTitle} <br>
                <span class="map__item-text">${store.longTitle} <br>
                <span class="map__item-dist"></span>
                </span>
              </label>
            </div>
            <div class="map__button-container">
            <svg class="map__button map__button--type--like"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path class="map__icon map__icon--type--like" d="M23 8.28003C23 5.10003 20.41 2.53003 17.25 2.53003C14.96 2.53003 12.98 3.87003 12.05 5.82003C12.03 5.86003 11.97 5.86003 11.96 5.82003C11.04 3.88003 9.05 2.53003 6.76 2.53003C3.58 2.53003 1 5.10003 1 8.28003C1 8.95003 1.11 9.59003 1.33 10.19C1.57 10.87 1.94 11.5 2.4 12.03C2.6 12.26 2.81 12.47 3.04 12.67L11.82 21.39C11.87 21.44 11.94 21.47 12.02 21.47C12.1 21.47 12.16 21.45 12.22 21.39L21.33 12.34C21.92 11.75 22.39 11.03 22.67 10.23C22.88 9.62003 23 8.96003 23 8.28003Z"/>
            </svg>
              <button class="map__button map__button--type--details">
                <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-info.svg]]" alt="" class="map__icon map__icon--position--top">
              </button>
            </div>
            `;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.buttonDetails = this.element.querySelector('.map__button--type--details');
    this.buttonLike = this.element.querySelector('.map__button--type--like');
    this.iconLike = this.element.querySelector('.map__icon--type--like');
    this.mapСontent = this.element.querySelector('.map__content');

    if (!isEmptyObj(userFavoriteStore)) {
      for (const shop of Object.values(userFavoriteStore)) {
        if (shop.id === store.id) {
          this.iconLike.classList.add('map__icon--liked');
          this.element.classList.add('map__item--position--top');
        }
      }
    }

    const radioInput = this.element.querySelector('.radio__input');

    function renderDetailStorePage(info) {
      if (info.success === true) {
        toggleSubPageStoresDetails.rendering(store, info);
        toggleSubPageStoresDetails.openPage();
      } else {
        toggleModal.rendering('Что то пошло не так');
        toggleModal.openPage();
      }
    }
    this.buttonDetails.addEventListener('click', () => {
      for (const day in store) {
        if (Array.isArray(store[day])) {
          store[day] = store[day].join(', ');
        }
      }
      api.checkWorkTimeStore(store, renderDetailStorePage);
    });
    this.buttonLike.addEventListener('click', function () {
      const icon = this.firstElementChild;
      if (icon.classList.contains('map__icon--liked')) {
        icon.classList.remove('map__icon--liked');
        for (const shop of Object.values(userFavoriteStore)) {
          if (shop.id === store.id) {
            delete userFavoriteStore[shop.id];
            localStorage.setItem('userFavoriteStore', JSON.stringify(userFavoriteStore));
          }
        }
      } else {
        //icon.closest('.map__item').style.order = -1;
        icon.classList.add('map__icon--liked');
        storesDataObj.successData.forEach((item) => {
          if (item.id === store.id) {
            userFavoriteStore[store.id] = item;
            localStorage.setItem('userFavoriteStore', JSON.stringify(userFavoriteStore));
          }
        });
      }
    });
    if (placemark !== undefined && myMap !== undefined) {
      placemark.events
        .add('click', (e) => {
          e.get('target').options.set('iconImageHref', 'data:image/svg+xml;base64,[[run-snippet? &snippetName=`file-to-base64` &file=[+chunkWebPath+]/img/icon-map-point-select.svg]]');
          const radioInputId = document.getElementById(store.id);
          radioInputId.checked = 'checked';
        })
        .add('click', (e) => {
          if (e.get('target') == false) {
            e.get('target').options.set('iconImageHref', 'data:image/svg+xml;base64,[[run-snippet? &snippetName=`file-to-base64` &file=[+chunkWebPath+]/img/icon-map-point.svg]]');
          }
        });
      this.mapСontent.addEventListener('click', (e) => {
        e.preventDefault();
        radioInput.checked = 'checked';
        placemark.options.set('iconImageHref', 'data:image/svg+xml;base64,[[run-snippet? &snippetName=`file-to-base64` &file=[+chunkWebPath+]/img/icon-map-point-select.svg]]');
        myMap.panTo([Number(store.latitude), Number(store.longitude)], {
          delay: 1000,
        }).then(() => {
          myMap.setZoom(15);
        });
      });
    }

    return this.element;
  }
}
