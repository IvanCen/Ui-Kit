class StoresPage {
  constructor(parameters) {
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.initInput = this.initInput.bind(this);
    this.checkRadioInputs = this.checkRadioInputs.bind(this);
  }


  openPage(isNav = false) {
    this.modalPage = document.querySelector('.modal-page-stores');
    this.storesNavButton = document.querySelector('.main-panel__button--type--stores');
    this.navButton = document.querySelectorAll('.main-panel__button');
    this.mapSlide = this.modalPage.querySelector('.map');
    this.headerTitle = document.querySelector('.header__status');
    this.topBarStores = document.querySelector('.top-bar-stores');
    this.mapSearch = document.querySelector('.map-search');
    this.mapSearchInput = document.querySelector('.map-search__input');
    this.mapSearchHeaderInput = document.querySelector('.header__input');
    this.mapItems = document.querySelectorAll('.map__item');
    this.mapItems.forEach((item) => item.classList.remove('map__item--hide'));
    this.mapSearchInput.value = '';
    this.mapSearchHeaderInput.value = '';

    setTimeout(() => {
      if (isNav) {
        this.headerTitle.textContent = 'Магазины';
        this.modalPage.classList.add('modal-page--open-nav');
        this.topBarStores.classList.add('top-bar--hide');

        this.navButton.forEach((item) => item.classList.remove('main-panel__button--active'));
        this.storesNavButton.classList.add('main-panel__button--active');
      } else {
        this.mapSearch.classList.remove('map-search--show');
        this.modalPage.classList.add('modal-page--open');
        this.modalPage.classList.remove('modal-page--open-nav');
        this.topBarStores.classList.remove('top-bar--hide');
      }
      this.mapSlide.classList.add('map--show');
      this.body.classList.add('body');
    }, 100);
    history.pushState({ state: '#modal-page-stores' }, null, '#modal-page-stores');
    this.checkRadioInputs();
  }

  closePage() {
    this.modalPage = document.querySelector('.modal-page-stores');
    this.mapSlide = this.modalPage.querySelector('.map');
    if (this.modalPage) {
      this.modalPage.classList.remove('modal-page--open');
      this.modalPage.classList.remove('modal-page--open-nav');
      this.mapSlide.classList.remove('map--show');
    }
  }

  rendering() {
    this.body = document.querySelector('body');
    this.body.append(createModalPageStores());
    this.modalPage = document.querySelector('.modal-page-stores');
    this.modalPageContent = this.modalPage.querySelector('.modal-page__content');

    const storesTopBar = new CreateTopBarStores({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [
        `--size--medium${isIos ? '--ios' : ''}`,
        '--theme--dark',
        '-stores',
      ],
      eventOpenSearch: [
        {
          type: 'click',
          callback: () => {
            stopAction(() => {
              toggleModalPageStoresSearch.rendering();
            });
          },
        },
      ],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
      ],
    });
    const storesMap = new CreateMapStores({
      selector: ['div'],
      style: ['maps'],
      modifier: [`${isIos ? '--ios' : ''}`],
    });
    const search = new CreateFormMapSearch({
      selector: ['form'],
      style: ['map-search'],
      modifier: [`${isIos ? '--ios' : ''}`],
    });

    const storesMapItemWraper = new CreateMapItemStoresWraper({
      selector: ['div'],
      style: ['map'],
      modifier: ['--default'],

    });
    const storesMapItem = new CreateMapItemStores({
      selector: ['div'],
      style: ['map__item'],
    });


    this.modalPageContent.append(storesTopBar.create());
    this.modalPageContent.append(storesMap.create());
    this.modalPageContent.append(storesMapItemWraper.create());
    this.modalPageContent.append(search.create());


    function renderStores(stores, page) {
      try {
        console.log(stores.successData);
        if (ymaps) {
          ymaps.ready(() => {
            const myMap = new ymaps.Map('map', {
              center: [59.938, 30.3],
              zoom: 11,
              controls: ['geolocationControl'],
            });

            const myCollection = new ymaps.GeoObjectCollection();
            const userLocation = new ymaps.GeoObjectCollection(null, {
              preset: 'user',
            });
            const mainPageContainer = document.querySelector('.map__container');

            // Сравним положение, вычисленное по ip пользователя и
            // положение, вычисленное средствами браузера.
            function createUserPosition() {
              let crd;
              const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
              };

              function success(pos) {
                crd = pos.coords;
                // Дождемся ответа от сервера и получим ближайший и наиболее удаленный
                // объект по отношению к точке.
                crd.placemark = new ymaps.Placemark([crd.latitude, crd.longitude],
                  {
                    balloonContent: 'Вы находитесь здесь',
                  }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/assets/chunks/map/img/loc.svg',
                    // iconContentLayout: MyIconContentLayout,
                    iconImageSize: [20, 20],
                    iconImageOffset: [-10, -10],
                  });
                myMap.panTo([crd.latitude, crd.longitude], {
                  delay: 1000,
                });
                userLocation.add(crd.placemark);
                const storesElems = document.querySelectorAll('.map__item');
                let order;
                myCollection.each((item, index) => {
                  const distance = ymaps.coordSystem.geo.getDistance([item.geometry._coordinates[0], item.geometry._coordinates[1]], [crd.latitude, crd.longitude]);
                  if (storesElems[index]) {
                    order = Math.round(distance / 100);
                    storesElems[index].style.order = order;
                    const distEl = storesElems[index].querySelector('.map__item-dist');
                    const regExp = /(\d+\.?\d)\D+\d+;(\D+)/gi;
                    distEl.textContent = ymaps.formatter.distance(distance).replace(regExp, '$1 $2');
                  }


                  // console.log(storesElems[index], index, item, order);
                  /* console.log(ymaps.formatter.distance(distance));
                  console.log(distance); */
                });

                console.log('Ваше текущее метоположение:');
                console.log(`Широта: ${crd.latitude}`);
                console.log(`Долгота: ${crd.longitude}`);
                console.log(`Плюс-минус ${crd.accuracy} метров.`);
              }

              function error(err) {
                console.log(`ERROR(${err.code}): ${err.message}`);
              }

              navigator.geolocation.getCurrentPosition(success, error, options);
            }

            if ('geolocation' in navigator) {
              console.log('местоположение доступно');
              createUserPosition(myCollection);
            } else {
              console.log('местоположение НЕ доступно');
            }
            let activePlacemark;
            Object.values(stores.successData).forEach((store) => {
              let placemark;
              if (store.priceGroup === 'BreadRiots') {
                console.log(store);
                placemark = new ymaps.Placemark([store.latitude, store.longitude], {}, {
                  iconLayout: 'default#image',
                  iconImageHref: 'data:image/svg+xml;base64,[[run-snippet? &snippetName=`file-to-base64` &file=[+chunkWebPath+]/img/icon-map-xleb-point.svg]]',
                  iconImageSize: [35, 35],
                });
                placemark.properties.set('priceGroup', 'BreadRiots');
                placemark.properties.set('data-id', store.id);
                console.log(placemark.properties.get('priceGroup', 'BreadRiots'));
              } else {
                let phone;
                if (store.phone !== null) {
                  const regExp = /(\+\d)(\d{3})(\d{3})(\d{2})(\d{2})/g;
                  phone = store.phone.replace(regExp, '$1 ($2) $3-$4-$5');
                }
                placemark = new ymaps.Placemark([store.latitude, store.longitude], {
                  balloonContentHeader: store.shortTitle,
                  balloonContentBody: `
                <div class="map__content map__content--position--start map__content--time">
                 <h3 class="map__item-text map__item-text--indentation--right">${getNowDay().ru}:</h3>
                 <span class="map__item-text">${store[getNowDay().en]}</span>
                </div>
                <div class="map__content map__content--info">
                  <div class="map__container-phone">
                    <a class="map__item-phone" href="tel:${store.phone}">
                     <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-phone.svg]]" alt="" class="text-area__icon text-area__icon--position--center text-area__icon--phone">
                    </a>
                    <a href="tel:${store.phone}" class="text-area__title text-area__title--size--small text-area__title--type--bold">${phone || store.phone}</a>
                  </div>
                </div>
                  `,
                  balloonContentFooter: `
                <div class="map__content map__content--direction--column">
                  <span class="map__item-text map__item-text--indentation--bottom">Для заказа выбрана эта точка</span>
                  <button onclick="document.querySelector('.main-panel__button--type--main').click()" class="button button--size--small button--theme--tangerin button--position--right map__button map__button--type--balloon">Закрыть</button>
                </div>`,
                }, {
                  iconLayout: 'default#image',
                  iconImageHref: 'data:image/svg+xml;base64,[[run-snippet? &snippetName=`file-to-base64` &file=[+chunkWebPath+]/img/icon-map-point.svg]]',
                  iconImageSize: [25, 25],
                });
              }

              myCollection.add(placemark);
              placemark.events.add('click', () => {
                for (const day in store) {
                  if (Array.isArray(store[day])) {
                    store[day] = store[day].join(', ');
                  }
                }
                api.checkWorkTimeStore(store);
              });
              const classIdentifier = 'radio__input-default';
              mainPageContainer.append(storesMapItem.create(store, placemark, myMap));
            });

            myCollection.events.add('click', (e) => {
              activePlacemark = e.get('target');
              myCollection.each((item) => {
                if (item.properties.get('priceGroup') === 'BreadRiots') {
                  item.options.set('iconImageHref', 'data:image/svg+xml;base64,[[run-snippet? &snippetName=`file-to-base64` &file=[+chunkWebPath+]/img/icon-map-xleb-point.svg]]');
                } else {
                  item.options.set('iconImageHref', 'data:image/svg+xml;base64,[[run-snippet? &snippetName=`file-to-base64` &file=[+chunkWebPath+]/img/icon-map-point.svg]]');
                }
              });
              if (activePlacemark.properties.get('priceGroup') === 'BreadRiots') {
                activePlacemark.options.set('iconImageHref', 'data:image/svg+xml;base64,[[run-snippet? &snippetName=`file-to-base64` &file=[+chunkWebPath+]/img/icon-map-xleb-point-select.svg]]');
              } else {
                activePlacemark.options.set('iconImageHref', 'data:image/svg+xml;base64,[[run-snippet? &snippetName=`file-to-base64` &file=[+chunkWebPath+]/img/icon-map-point-select.svg]]');
              }
            });

            console.log(userLocation);
            myMap.geoObjects.add(myCollection);
            myMap.geoObjects.add(userLocation);
            /* myMap.events.add('click', (event) => {
              myCollection.getClosestTo(event.get('coords'));
            }); */
            myMap.controls.remove('geolocationControl');
          });
        }
      } catch (e) {
        console.log(e);
        Object.values(stores.successData).forEach((store) => {
          const mainPageContainer = document.querySelector('.map__container');
          mainPageContainer.append(storesMapItem.create(store));
        });
      }
    }
    renderStores(storesDataObj, this.modalPageContent);

    setTimeout(() => {
      const mapItem = this.modalPageContent.querySelector('.map__item');
      if (mapItem) {
        mapItem.addEventListener('mousedown', () => false);
      }

      this.checkRadioInputs();
      this.chooseShop(this.modalPageContent);
      this.initInput();
    }, 3000);

    const topBarSearch = this.modalPageContent.querySelector('.top-bar-search--size--small');
    const mapList = document.querySelector('.map');

    /* topBarSearch.addEventListener('click', () => {
      mapList.classList.toggle('map--hide');
    }); */
    this.activeMapTouch(mapList);
  }

  checkRadioInputs() {
    if (!isEmptyObj(userStore)) {
      const radioInputs = this.modalPageContent.querySelectorAll('.radio__input');
      [...radioInputs].forEach((item) => {
        const inputId = item.getAttribute('data-id');
        if (userStore.store.id === Number(inputId)) {
          item.checked = true;
        }
      });
    }
  }

  activeMapTouch(container) {
    const INDENT = isIos ? 242 : 182;
    let dragStart = INDENT;
    let dragEnd = INDENT;
    let offsetY = INDENT;
    let offsetYOnStart = INDENT;
    let isOpen = false;
    let delta = isIos ? 101 : 81;
    const isMapOpen = storesOpened;
    let windowHeight = container.clientHeight || window.innerHeight;
    if (isMapOpen === false) {
      offsetY = windowHeight - delta;
      offsetYOnStart = windowHeight - delta;
      container.style.transform = `translate3d(0,${offsetY}px,0)`;
    }
    window.storesAnimation = storesAnimation;
    function storesAnimation(action) {
      windowHeight = container.clientHeight || window.innerHeight;
      const stores = document.querySelector('.modal-page-stores');
      const mapSearch = document.querySelector('.map-search');
      const modalPage = document.querySelector('.modal-page-stores');
      if(isIos) {
        stores.classList.contains('stores--fullscreen') ? delta = 30 : delta = 101;
      } else {
        stores.classList.contains('stores--fullscreen') ? delta = 60 : delta = 81;
      }
      if (offsetY > (windowHeight / 5) && !isOpen && action === 'end') {
        offsetY = windowHeight - delta;
        offsetYOnStart = windowHeight - delta;
        isOpen = !isOpen;
        storesOpened = false;
        if (modalPage.classList.contains('modal-page--open-nav')) {
          mapSearch.classList.remove('map-search--show');
        }
      } else if (offsetY > (windowHeight - delta) && action === 'move' && isOpen) {
        offsetY = windowHeight - delta;
        offsetYOnStart = windowHeight - delta;
        dragStart = windowHeight - delta;
        dragEnd = windowHeight - delta;
      } else if (offsetY < (windowHeight) && action === 'end' && isOpen) {
        offsetY = INDENT;
        offsetYOnStart = INDENT;
        isOpen = !isOpen;
        storesOpened = true;
        if (modalPage.classList.contains('modal-page--open-nav')) {
          mapSearch.classList.add('map-search--show');
        }
      }
      if (offsetY < INDENT) {
        // тут действия, если тянется дальше максимума
        if (action === 'end') {
          offsetY = INDENT;
          dragStart = INDENT;
          dragEnd = INDENT;
          offsetYOnStart = INDENT;
        } else if (action === 'move') {
          offsetY = INDENT;// уменьшапем скорость смещения в 2 раза
        }
      }
      if (action === 'open') {
        container.classList.add('stores__list--animation');
        offsetY = INDENT;
        dragStart = INDENT;
        dragEnd = INDENT;
        offsetYOnStart = INDENT;
        container.style.transform = `translate3d(0,${offsetY}px,0)`;
        setTimeout(() => {
          container.classList.remove('stores__list--animation');
        }, 300);
        return;
      }
      // console.log(offsetY, dragStart, dragEnd, offsetYOnStart);
      container.style.transform = `translate3d(0,${offsetY}px,0)`;

    }

    const panelTouch = container.querySelector('.top-bar-search');
    panelTouch.addEventListener('touchstart', (event) => {
      container.classList.remove('stores__list--animation');
      event.preventDefault();
      dragStart = event.touches[0].clientY;
    }, { passive: false });

    panelTouch.addEventListener('touchmove', (event) => {
      event.preventDefault();
      dragEnd = event.touches[0].clientY;
      offsetY = offsetYOnStart + dragEnd - dragStart;
      storesAnimation('move');
    }, { passive: false });

    panelTouch.addEventListener('touchend', (event) => {
      event.preventDefault();
      offsetYOnStart = offsetY;
      container.classList.add('stores__list--animation');
      storesAnimation('end');
      const page = document.querySelector('.stores');
      if (page) page.classList.toggle('stores--list-open');
    }, { passive: false });
  }

  chooseShop(page) {
    const storesButtonBottomBar = document.querySelector('.bottom-bar__select-item');
    const shopSelector = document.querySelector('.shop-selector');
    const modalPageReview = document.querySelector('.modal-page-order-review');
    const radioInputs = page.querySelectorAll('.radio__input');
    const mapItem = page.querySelectorAll('.map__item');
    checkStore();
    console.log(radioInputs);
    [...radioInputs].forEach((radio) => {
      const radioId = radio.getAttribute('data-id');
      if (!isEmptyObj(userStore) && userStore.store.id === Number(radioId)) {
        radio.checked = true;
        console.log('checked');
      }
    });
    [...mapItem].forEach((input) => {
      input.addEventListener('click', () => {
        [...radioInputs].forEach((item) => {
          if (item.checked) {
            const inputId = item.getAttribute('data-id');
            Object.values(storesDataObj.successData).forEach((el) => {
              if (el.id === Number(inputId)) {
                api.getShopOutOfStockItemsAndModifiers(el.id);
                userStore.store = el;
                localStorage.setItem('userStore', JSON.stringify(userStore));
                checkStore();
                if (modalPageReview) {
                  toggleModalPageReviewOrder.deletePage();
                  setTimeout(() => toggleModalPageReviewOrder.rendering(), 100);
                }
                if (storesButtonBottomBar) {
                  storesButtonBottomBar.textContent = el.shortTitle;
                }
              }
            });
          }
        });
        shopSelector.classList.remove('shop-selector--show');
      });
    });
  }

  initInput() {
    const inputHeader = document.querySelector('.header__input');
    const inputFloat = document.querySelector('.map-search__input');

    [inputHeader, inputFloat].forEach((input) => {
      const AllStores = document.querySelectorAll('.map__item');

      input.addEventListener('click', () => {
        if (!storesOpened) {
          window.storesAnimation('end');
        }
      });
      console.log(AllStores, 'AllStores');
      input.addEventListener('input', () => {
        AllStores.forEach((store) => {
          const title = store.querySelector('.map__item-title').textContent.toLowerCase();
          if (title.indexOf(input.value.toLowerCase()) !== -1) {
            store.classList.remove('map__item--hide');
          } else {
            store.classList.add('map__item--hide');
          }
        });
      });
    });
  }
}
