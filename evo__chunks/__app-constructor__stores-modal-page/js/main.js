class ToggleStores extends ToggleModalPageStores {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;

    this.rendering = this.rendering.bind(this);
  }

  chooseShop() {
    const storesButtonBottomBar = document.querySelector('.bottom-bar__select-item');
    const storesButtonTopBar = document.querySelector('.top-bar__select-item--type--stores');
    const radioInputs = document.querySelectorAll('.radio__input');
    const mapItem = document.querySelectorAll('.map__item');
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
                if (storesButtonBottomBar) {
                  storesButtonBottomBar.textContent = el.shortTitle;
                }
                if (storesButtonTopBar) {
                  storesButtonTopBar.textContent = el.shortTitle;
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
      /* eventOpenFilter: [
        { type: 'click', callback: togglePageStoresFilter.rendering },
        { type: 'click', callback: togglePageStoresFilter.openPage },
      ], */
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
    const storesButtonChoiceOrange = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: ['--size--big',
        '--theme--tangerin',
        '--type--fixed',
        '--theme--shadow-big',
        '--type--choose',
      ],
      text: ['Выбрать'],
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

    function renderStores(stores) {
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
            placemark = new ymaps.Placemark([store.latitude, store.longitude], {
            }, {
              iconLayout: 'default#image',
              iconImageHref: 'data:image/svg+xml;base64,[[run-snippet? &snippetName=`file-to-base64` &file=[+chunkWebPath+]/img/icon-map-xleb-point.svg]]',
              iconImageSize: [35, 35],
            });
            placemark.properties.set('priceGroup', 'BreadRiots');
            placemark.properties.set('data-id', store.id);
            console.log(placemark.properties.get('priceGroup', 'BreadRiots'));
          } else {
            placemark = new ymaps.Placemark([store.latitude, store.longitude], {
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
      });
    }
    renderStores(storesDataObj);

    // this.modalPageContent.append(storesButtonChoiceOrange.create());
    setTimeout(() => {
      if (!isEmptyObj(userStore)) {
        const radioInputs = document.querySelectorAll('.radio__input');
        [...radioInputs].forEach((item) => {
          const inputId = item.getAttribute('data-id');
          if (userStore.store.id === Number(inputId)) {
            item.checked = true;
          }
        });
      }
      this.chooseShop();
    }, 300);
  }
}
