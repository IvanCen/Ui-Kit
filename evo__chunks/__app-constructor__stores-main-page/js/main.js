class ToggleStores extends ToggleMainPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;

    this.rendering = this.rendering.bind(this);
  }

  chooseShop(stores) {
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
            }
          });
        }
      });
    });
  }

  rendering() {
    super.rendering();
    this.mainPage.classList.add('main-page--type--search');
    this.mainPageContent.classList.add('main-page__content--type--noscroll');

    const storesTopBar = new CreateTopBarStores({
      selector: ['div'],
      style: ['top-bar'],
      // modifier: ['--size--medium'],
      eventOpenFilter: [
        { type: 'click', callback: togglePageStoresFilter.rendering },
        { type: 'click', callback: togglePageStoresFilter.openPage },
      ],
      eventOpenSearch: [
        { type: 'click', callback: togglePageStoresSearch.rendering },
        { type: 'click', callback: togglePageStoresSearch.openPage },
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
      /* events: [
        { type: 'click', callback: toggleModal.rendering },
        { type: 'click', callback: toggleModal.openPage },
      ], */
    });

    const storesMapItemWraper = new CreateMapItemStoresWraper({
      selector: ['div'],
      style: ['map'],
    });
    const storesMapItem = new CreateMapItemStores({
      selector: ['div'],
      style: ['map__item'],
    });


    this.mainPageContent.append(storesTopBar.create());
    this.mainPageContent.append(storesMap.create());
    this.mainPageContent.append(storesMapItemWraper.create());

    function renderStores(stores) {
      console.log(stores.successData);

      ymaps.ready(() => {
        const myMap = new ymaps.Map('map', {
          center: [59.938, 30.3],
          zoom: 11,
          controls: [],
        });

        const myCollection = new ymaps.GeoObjectCollection();
        const mainPageContainer = document.querySelector('.map__container');
        stores.successData.forEach((item) => {
          const placemark = new ymaps.Placemark([item.latitude, item.longitude], {
          }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '[+chunkWebPath+]/img/icon-map-point.svg',
            // Размеры метки.
            iconImageSize: [25, 25],
          });
          mainPageContainer.append(storesMapItem.create(item, placemark, myMap));
          myCollection.add(placemark);
        });
        let activePlacemark;
        myCollection.events.add('click', (e) => {
          if (activePlacemark) {
            activePlacemark.options.set('iconImageHref', '[+chunkWebPath+]/img/icon-map-point.svg');
          }
          console.log(e.get('coords'));
          activePlacemark = e.get('target');
          activePlacemark.options.set('iconImageHref', '[+chunkWebPath+]/img/icon-map-point-select.svg');
        });
        myMap.geoObjects.add(myCollection);
      });
    }
    renderStores(storesDataObj);
    this.mainPageContent.append(storesButtonChoiceOrange.create());
    this.chooseShop(storesDataObj);
    console.log(userStore);
    setTimeout(() => {
      if (!isEmptyObj(userStore)) {
        const radioInputs = document.querySelectorAll('.radio__input');
        console.log(userStore.store);
        [...radioInputs].forEach((item) => {
          if (userStore.store.id === Number(item.id)) {
            item.checked = true;
          }
        });
      }
    }, 300);

    activeButton();
  }
}
