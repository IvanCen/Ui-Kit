class ToggleStores extends ToggleModalPageStores {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;

    this.rendering = this.rendering.bind(this);
  }

  activeMapTouch(container) {
    let dragStart = 0;
    let dragEnd = 0;
    let offsetY = 0;
    let offsetYOnStart = 0;
    let isOpen = false;

    function mapAnimation(action) {
      if (offsetY > 50 && !isOpen && action === 'end') {
        offsetY = container.offsetHeight - 43;
        offsetYOnStart = container.offsetHeight - 43;
        isOpen = !isOpen;
      } else if (offsetY > (container.offsetHeight - 43) && action === 'move' && isOpen) {
        offsetY = container.offsetHeight - 43;
        offsetYOnStart = container.offsetHeight - 43;
      } else if (offsetY < (container.offsetHeight - 100) && action === 'end' && isOpen) {
        offsetY = 0;
        offsetYOnStart = 0;
        isOpen = !isOpen;
      }
      if (offsetY < 0) {
        // тут действия, если тянется дальше максимума
        if (action === 'end') {
          offsetY = 0;
          dragStart = 0;
          dragEnd = 0;
          offsetYOnStart = 0;
        } else if (action === 'move') {
          offsetY = 0;// уменьшапем скорость смещения в 2 раза
        }
      }
      //console.log(offsetY, dragStart, dragEnd, offsetYOnStart);

      container.style.transform = `translate3d(0,${offsetY}px,0)`;
    }

    const panelTouch = container.querySelector('.top-bar-search--size--small');
    panelTouch.addEventListener('touchstart', (event) => {
      dragStart = event.touches[0].clientY;
      container.classList.add('map--with-animation');
    }, { passive: false });

    panelTouch.addEventListener('touchmove', (event) => {
      dragEnd = event.touches[0].clientY;
      offsetY = offsetYOnStart + dragEnd - dragStart;
      mapAnimation('move');
    }, { passive: false });

    panelTouch.addEventListener('touchend', (event) => {
      offsetYOnStart = offsetY;
      container.classList.add('map--with-animation');
      mapAnimation('end');
    }, { passive: false });
  }

  chooseShop(page) {
    const storesButtonBottomBar = document.querySelector('.bottom-bar__select-item');
    const modalPageReview = document.querySelector('.modal-page-order-review');
    const radioInputs = page.querySelectorAll('.radio__input');
    const mapItem = page.querySelectorAll('.map__item');
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
            storesDataObj.successData.forEach((el) => {
              if (el.id === Number(inputId)) {
                api.getShopOutOfStockItemsAndModifiers(el.id);
                userStore.store = el;
                localStorage.setItem('userStore', JSON.stringify(userStore));
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
      });
    });
  }

  rendering() {
    super.rendering('stores');

    const storesTopBar = new CreateTopBarStores({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [`--size--medium${isIos ? '--ios' : ''}`],
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
        { type: 'click', callback: toggleModalPage.closePage },
        { type: 'click', callback: toggleModalPage.deletePage },
      ],
    });
    const storesMap = new CreateMapStores({
      selector: ['div'],
      style: ['maps'],
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

    this.modalPageContent.append(createTopBarIos());
    this.modalPageContent.append(storesTopBar.create());
    this.modalPageContent.append(storesMap.create());
    this.modalPageContent.append(storesMapItemWraper.create());


    function renderStores(stores, page) {
      console.log(stores.successData);

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
        stores.successData.forEach((store) => {
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
                  <button onclick="closeStores()" class="button button--size--small button--theme--tangerin button--position--right map__button map__button--type--balloon">Закрыть</button>
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

    renderStores(storesDataObj, this.modalPageContent);

    setTimeout(() => {
      if (!isEmptyObj(userStore)) {
        const radioInputs = this.modalPageContent.querySelectorAll('.radio__input');
        [...radioInputs].forEach((item) => {
          const inputId = item.getAttribute('data-id');
          if (userStore.store.id === Number(inputId)) {
            item.checked = true;
          }
        });
      }
      const mapItem = this.modalPageContent.querySelector('.map__item');
      mapItem.addEventListener('mousedown', () => false);
      this.chooseShop(this.modalPageContent);
    }, 300);

    const topBarSearch = this.modalPageContent.querySelector('.top-bar-search--size--small');
    const mapList = this.modalPageContent.querySelector('.map');

    /* topBarSearch.addEventListener('click', () => {
      mapList.classList.toggle('map--hide');
    }); */
    this.activeMapTouch(mapList);
  }
}
