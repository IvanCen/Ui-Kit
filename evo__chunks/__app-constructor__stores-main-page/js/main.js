class ToggleStores extends ToggleMainPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;

    this.rendering = this.rendering.bind(this);
  }

  chooseShop(stores, returnPage) {
    const buttonChoose = document.querySelector('.button--type--choose');
    buttonChoose.addEventListener('click', () => {
      const radioInputs = document.querySelectorAll('.radio__input');
      [...radioInputs].forEach((item) => {
        if (item.checked) {
          stores.successData.forEach((el) => {
            if (el.id === Number(item.id)) {
              localStorage.setItem('short-name-shop', el.shortTitle);
              userStore.store = el;
              localStorage.setItem('userStore', JSON.stringify(userStore));
              toggleModal.rendering(`Вы выбрали магазин ${el.shortTitle}`);
            }
          });
        }
      });

      /* toggleOrder.closePage();
      toggleOrder.clearPage();
      toggleOrder.rendering();
      toggleOrder.openPage();
      toggleOrderMenuContent.rendering();
      toggleOrderHitsContent.rendering();
      toggleOrderHistoryContent.rendering();
      togglePage.closePage();
      togglePage.deletePage();
      toggleSubPage.closePage();
      toggleSubPage.deletePage();
      toggleThirdPage.closePage();
      toggleThirdPage.deletePage(); */

      /* const footerButton = document.querySelectorAll('.footer__button');
      const footerButtonOrder = document.querySelector('.footer__button--type--order');
      [...footerButton].forEach((item) => {
        item.classList.remove('footer__button--active');
        item.firstElementChild.classList.remove('footer__icon--active');
      });
      footerButtonOrder.classList.add('footer__button--active');
      footerButtonOrder.firstElementChild.classList.add('footer__icon--active'); */
    });
  }

  rendering(returnPage) {
    super.rendering('stores');
    this.mainPage.classList.add('main-page--type--search');
    this.mainPageContent.classList.add('main-page__content--type--noscroll');

    const storesTopBar = new CreateTopBarStores({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--medium'],
      /* eventOpenFilter: [
        { type: 'click', callback: togglePageStoresFilter.rendering },
        { type: 'click', callback: togglePageStoresFilter.openPage },
      ], */
      eventOpenSearch: [
        { type: 'click', callback: togglePageStoresSearch.rendering },
      ],
    });
    const storesMap = new CreateMapStores({
      selector: ['div'],
      style: ['maps'],
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

    this.mainPageContent.append(createTopBarIos());
    this.mainPageContent.append(storesTopBar.create());
    this.mainPageContent.append(storesMap.create());
    this.mainPageContent.append(storesMapItemWraper.create());

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
                // order = Math.round((Math.abs(item.geometry._coordinates[0] - crd.latitude) + Math.abs(item.geometry._coordinates[1] - crd.longitude)) * 10000);
                storesElems[index].style.order = order;
                // console.log(Math.abs(item.geometry._coordinates[0] - crd.latitude) + Math.abs(item.geometry._coordinates[1] - crd.longitude));
                const distEl = storesElems[index].querySelector('.map__item-dist');
                const regExp = /(\d+\.?\d)\D+\d+\D+/gi;
                distEl.textContent = ymaps.formatter.distance(distance).replace(regExp, '$1 км');
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
          function renderDetailStorePage(info) {
            if (info.success === true) {
              toggleSubPageStoresDetails.rendering(store, info);
              toggleSubPageStoresDetails.openPage();
            } else {
              toggleModal.rendering('Что то пошло не так');
              toggleModal.openPage();
            }
          }
          if (store.priceGroup === 'BreadRiots') {
            console.log(store);
            placemark = new ymaps.Placemark([store.latitude, store.longitude], {
            }, {
              iconLayout: 'default#image',
              iconImageHref: 'data:image/svg+xml;base64,[[run-snippet? &snippetName=`file-to-base64` &file=[+chunkWebPath+]/img/icon-map-xleb-point.svg]]',
              iconImageSize: [35, 35],
            });
            placemark.properties.set('priceGroup', 'BreadRiots');
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
            api.checkWorkTimeStore(store, renderDetailStorePage);
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

        myMap.geoObjects.add(myCollection);
        myMap.geoObjects.add(userLocation);
      });
    }
    renderStores(storesDataObj);

    this.mainPageContent.append(storesButtonChoiceOrange.create());
    this.chooseShop(storesDataObj, returnPage);
    setTimeout(() => {
      if (!isEmptyObj(userStore)) {
        const radioInputs = document.querySelectorAll('.radio__input');
        [...radioInputs].forEach((item) => {
          if (userStore.store.id === Number(item.id)) {
            item.checked = true;
          }
        });
      }
    }, 300);
    const footerButtonStores = document.querySelector('.footer__button--type--stores');
    activeFooter(footerButtonStores);
    activeButton();
  }
}
