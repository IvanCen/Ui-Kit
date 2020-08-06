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
        <div class="top-bar-search top-bar-search--size--small top-bar-search--theme--dark">
        <div class="top-bar-search__icon top-bar-search__icon--type--touch"></div>
          <span class="top-bar-search__info">пекарни рядом</span>
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

  get day() {
    this.date = new Date();
    this.weekday = this.date.getDay();
    this.daysArr = [
      {
        ru: 'Воскресенье',
        en: 'sunday',
      },
      {
        ru: 'Понедельник',
        en: 'monday',
      },
      {
        ru: 'Вторник',
        en: 'tuesday',
      }, {
        ru: 'Среда',
        en: 'wednesday',
      },
      {
        ru: 'Четверг',
        en: 'thursday',
      },
      {
        ru: 'Пятница',
        en: 'friday',
      },
      {
        ru: 'Суббота',
        en: 'saturday',
      }];
    return this.daysArr[this.weekday];
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
                <span class="map__item-text">${store.longTitle} <br>
                <span class="map__item-dist"></span>
                </span>
              </label>
              <div class="map__button-container">
                <svg class="map__button map__button--type--like"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path class="map__icon map__icon--type--like" d="M23 8.28003C23 5.10003 20.41 2.53003 17.25 2.53003C14.96 2.53003 12.98 3.87003 12.05 5.82003C12.03 5.86003 11.97 5.86003 11.96 5.82003C11.04 3.88003 9.05 2.53003 6.76 2.53003C3.58 2.53003 1 5.10003 1 8.28003C1 8.95003 1.11 9.59003 1.33 10.19C1.57 10.87 1.94 11.5 2.4 12.03C2.6 12.26 2.81 12.47 3.04 12.67L11.82 21.39C11.87 21.44 11.94 21.47 12.02 21.47C12.1 21.47 12.16 21.45 12.22 21.39L21.33 12.34C21.92 11.75 22.39 11.03 22.67 10.23C22.88 9.62003 23 8.96003 23 8.28003Z"/>
                </svg>
                
              </div>
            </div>
            <div class="map__content map__content--indentation--normal map__content--time">
             <h3 class="map__item-text map__item-text--indentation--right">${this.day.ru}:</h3>
             <span class="map__item-text">${store[this.day.en]}</span>
            </div>
            <div class="map__content map__content--info">
              <div class="map__container-phone">
                <a class="map__item-phone" href="tel:${store.phone}">
                 <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-phone.svg]]" alt="" class="text-area__icon text-area__icon--position--center text-area__icon--phone">
                </a>
                <a href="tel:${store.phone}" class="text-area__title text-area__title--size--small text-area__title--type--bold">${phone || store.phone}</a>
              </div>
              <a href="https://www.google.ru/maps/place/${store.shortTitle}/@${store.latitude},${store.longitude}z?hl=ru" target="_blank" class="shop-info__direction">
                <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-on-map.svg]]" alt="" class="text-area__icon text-area__icon--position--center">
              </a>
            </div>  
            `;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.buttonDetails = this.element.querySelector('.map__button--type--details');
    this.buttonLike = this.element.querySelector('.map__button--type--like');
    this.iconLike = this.element.querySelector('.map__icon--type--like');
    this.mapContent = this.element.querySelector('.map__content');

    if (!isEmptyObj(userFavoriteStore)) {
      for (const shop of Object.values(userFavoriteStore)) {
        if (shop.id === store.id) {
          this.iconLike.classList.add('map__icon--liked');
          this.element.classList.add('map__item--position--top');
        }
      }
    }

    const radioInputEl = this.element.querySelector('.radio__input');
    /* console.log(radioInputEl, `${identity()}${store.id}`, identity());
    if (!isEmptyObj(userStore) && userStore.store.id === Number(`${identity()}${store.id}`)) {
      radioInputEl.checked = 'checked';
    } */

    this.element.addEventListener('click', (e) => {
      if (e.target.classList.contains('map__content--info')
        || e.target.classList.contains('map__radio-label')
        || e.target.classList.contains('map__content--time')
        || e.target.classList.contains('map__radio-input')
        || e.target.classList.contains('map__item-text')
      ) {
        radioInputEl.checked = 'checked';
        toggleModalPage.closePage();
        toggleModalPage.deletePage();
        toggleModalPageSearch.closePage();
        toggleModalPageSearch.deletePage();
        if (placemark && myMap) {
          placemark.options.set('iconImageHref', 'data:image/svg+xml;base64,[[run-snippet? &snippetName=`file-to-base64` &file=[+chunkWebPath+]/img/icon-map-point-select.svg]]');
          myMap.panTo([Number(store.latitude), Number(store.longitude)], {
            delay: 1000,
          });
        }
        /* .then(() => {
          myMap.setZoom(15);
        }); */
      }
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
        icon.classList.add('map__icon--liked');
        storesDataObj.successData.forEach((item) => {
          if (item.id === store.id) {
            userFavoriteStore[store.id] = item;
            localStorage.setItem('userFavoriteStore', JSON.stringify(userFavoriteStore));
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
          storesDataObj.successData.forEach((el) => {
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
