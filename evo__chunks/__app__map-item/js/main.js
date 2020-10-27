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
        <div class="top-bar-search top-bar-search--size--small top-bar-search--theme--light">
        <div class="top-bar-search__icon top-bar-search__icon--type--touch"></div>
          <div class="top-bar-search__info">Пекарни рядом</div>
        </div>
        <div class="map__container map__container--theme--light">
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

  create(store, placemark, myMap, id, page = document) {
    function identity() {
      if (id !== undefined) {
        return id;
      }
      return '';
    }
    this.element = document.createElement('div');
    this.element.classList.add('map__item');
    this.element.setAttribute('data-id', `${identity()}${store.id}`);
    console.log(this.element.getAttribute('data-id'));
    console.log(id);
    let phone;
    if (store.phone !== null) {
      const regExp = /(\+\d)(\d{3})(\d{3})(\d{2})(\d{2})/g;
      phone = store.phone.replace(regExp, '$1 ($2) $3-$4-$5');
    }
    this.template = `
            <div class="map__content">
              <input type="radio" class="radio__input map__radio-input" data-id="${identity()}${store.id}" name="radio"/>
              <label class="map__item-title radio__label map__radio-label radio__label--available" for="${identity()}${store.id}">${store.shortTitle} <br>
                <div class="map__item-text">${store.longTitle} <br>
                <span class="map__item-dist"></span>
                </div>
              </label>
              <div class="map__button-container">
                <svg class="map__button map__button--type--like" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path class="map__icon map__icon--type--like" d="M17 3H7C5.9 3 5.01 3.9 5.01 5L5 21L12 18L19 21V5C19 3.9 18.1 3 17 3ZM17 18L12 15.82L7 18V5H17V18Z"/>
                </svg>
              </div>
            </div>
            <div class="map__content-container map__content--indentation--normal">
              <div class="map__content map__content--time">
               <h3 class="map__item-text map__item-text--indentation--right">Понедельник:</h3>
               <span class="map__item-text">${store.monday[0]}</span>
              </div>
              <div class="map__content--time">
               <h3 class="map__item-text map__item-text--indentation--right">Вторник:</h3>
               <span class="map__item-text">${store.tuesday[0]}</span>
              </div>
              <div class="map__content--time">
               <h3 class="map__item-text map__item-text--indentation--right">Среда:</h3>
               <span class="map__item-text">${store.wednesday[0]}</span>
              </div>
              <div class="map__content--time">
               <h3 class="map__item-text map__item-text--indentation--right">Четверг:</h3>
               <span class="map__item-text">${store.thursday[0]}</span>
              </div>
              <div class="map__content--time">
               <h3 class="map__item-text map__item-text--indentation--right">Пятница:</h3>
               <span class="map__item-text">${store.friday[0]}</span>
              </div>
              <div class="map__content--time">
               <h3 class="map__item-text map__item-text--indentation--right">Суббота:</h3>
               <span class="map__item-text">${store.saturday[0]}</span>
              </div>
              <div class="map__content--time">
               <h3 class="map__item-text map__item-text--indentation--right">Воскресенье:</h3>
               <span class="map__item-text">${store.sunday[0]}</span>
              </div>
            </div>
            <div class="map__content--info stores__list-element-add-info">
              <div class="map__container-phone">
                <a href="tel:${store.phone}" class="stores__list-element-phone">${phone || store.phone}</a>
              </div>
              <div class="stores__list-element-add-info-group">
                <a class="map__item-phone stores__list-element-phone-icon" href="tel:${store.phone}">
                    <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/phone.svg]]" alt="" class="text-area__icon text-area__icon--position--center text-area__icon--phone">
                  </a>
                <a href="https://www.google.ru/maps/place/${store.shortTitle}/@${store.latitude},${store.longitude}z?hl=ru" target="_blank" class="shop-info__direction stores__list-element-map-icon">
                  <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/map.svg]]" alt="" class="text-area__icon text-area__icon--position--center">
                </a>
              </div>
            </div>  
            `;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.buttonLike = this.element.querySelector('.map__button--type--like');
    this.iconLike = this.element.querySelector('.map__icon--type--like');

    if (!isEmptyObj(userFavoriteStore)) {
      for (const shop of Object.values(userFavoriteStore)) {
        if (shop.id === store.id) {
          this.iconLike.classList.add('map__icon--liked');
          this.element.classList.add('map__item--position--top');
        }
      }
    }

    const radioInputEl = this.element.querySelector('.radio__input');


    this.element.addEventListener('click', (e) => {
      if (e.target.classList.contains('map__content--info')
        || e.target.classList.contains('map__radio-label')
        || e.target.classList.contains('map__content--time')
        || e.target.classList.contains('map__radio-input')
        || e.target.classList.contains('map__item-text')
      ) {
        radioInputEl.checked = 'checked';
        if (placemark && myMap) {
          placemark.options.set('iconImageHref', 'data:image/svg+xml;base64,[[run-snippet? &snippetName=`file-to-base64` &file=[+chunkWebPath+]/img/icon-map-point-select.svg]]');
          myMap.panTo([Number(store.latitude), Number(store.longitude)], {
            delay: 1000,
          });
        }
      }
    });

    this.buttonLike.addEventListener('click', function () {
      const icon = this.firstElementChild;
      const el = this.closest('.map__item');
      if (icon.classList.contains('map__icon--liked')) {
        icon.classList.remove('map__icon--liked');
        el.classList.remove('map__item--position--top');
        for (const shop of Object.values(userFavoriteStore)) {
          if (shop.id === store.id) {
            delete userFavoriteStore[shop.id];
            localStorage.setItem('userFavoriteStore', JSON.stringify(userFavoriteStore));
          }
        }
      } else {
        icon.classList.add('map__icon--liked');
        Object.values(storesDataObj.successData).forEach((item) => {
          if (item.id === store.id) {
            userFavoriteStore[store.id] = item;
            localStorage.setItem('userFavoriteStore', JSON.stringify(userFavoriteStore));
            el.classList.add('map__item--position--top');
          }
        });
      }
    });
    if (placemark && myMap) {
      placemark.events
        .add('click', (e) => {
          e.get('target').options.set('iconImageHref', 'data:image/svg+xml;base64,[[run-snippet? &snippetName=`file-to-base64` &file=[+chunkWebPath+]/img/icon-map-point-select.svg]]');
          const radioInput = document.querySelector(`.radio__input[data-id="${identity()}${store.id}"]`);
          const radioInputId = radioInput.getAttribute('data-id');
          const storesButtonBottomBar = document.querySelector('.bottom-bar__select-item');
          const storesButtonTopBar = page.querySelector('.top-bar__select-item--type--stores');
          const mapItem = radioInput.closest('.map__item');
          mapItem.scrollIntoView({ block: 'end', behavior: 'smooth' }); // на маленьких экранах только режим block: 'end' работает корректно
          radioInput.checked = 'checked';
          myMap.panTo([Number(store.latitude), Number(store.longitude)], {
            delay: 1000,
          });/* .then(() => {
            myMap.setZoom(15);
          }); */
          Object.values(storesDataObj.successData).forEach((el) => {
            if (Number(identity() + el.id) === Number(radioInputId)) {
              api.getShopOutOfStockItemsAndModifiers(el.id);
              userStore.store = el;
              localStorage.setItem('userStore', JSON.stringify(userStore));
              if (storesButtonBottomBar) {
                storesButtonBottomBar.textContent = el.shortTitle;
              }
              if (storesButtonTopBar) {
                storesButtonTopBar.textContent = el.shortTitle;
              }
            }
          });
        })
        .add('click', (e) => {
          if (e.get('target') == false) {
            e.get('target').options.set('iconImageHref', 'data:image/svg+xml;base64,[[run-snippet? &snippetName=`file-to-base64` &file=[+chunkWebPath+]/img/icon-map-point.svg]]');
          }
        });
    }

    return this.element;
  }
}
