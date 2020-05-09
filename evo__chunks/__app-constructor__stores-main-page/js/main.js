class ToggleStores extends ToggleMainPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;

    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    this.mainPage.classList.add('main-page--type--search');

    const storesTopBar = new CreateTopBarStores({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--medium'],
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
      ],
      text: ['Выбрать'],
      events: [
        { type: 'click', callback: toggleModal.rendering },
        { type: 'click', callback: toggleModal.openPage },
      ],
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
      const mainPageContainer = document.querySelector('.map__container');
      stores.successData.forEach((item) => {
        mainPageContainer.append(storesMapItem.create(item));
      });

      ymaps.ready(() => {
        const myMap = new ymaps.Map('map', {
          center: [59.938, 30.3],
          zoom: 11,
          controls: ['smallMapDefaultSet'],
        }, {
          searchControlProvider: 'yandex#search',
        });

        const myCollection = new ymaps.GeoObjectCollection();
        stores.successData.forEach((item) => {
          myCollection.add(new ymaps.Placemark([item.latitude, item.longitude], {
          }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '[+chunkWebPath+]/img/icon-map-point.svg',
            // Размеры метки.
            iconImageSize: [25, 25],
          }));
        });
        myCollection.getMap()
        myMap.geoObjects.add(myCollection);
      });
      /*ymaps.geocode(myMap.getCenter(), {
        /!**
         * Опции запроса
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
         *!/
        // Ищем только станции метро.
        kind: 'metro',
        // Запрашиваем не более 20 результатов.
        results: 20,
      }).then((res) => {
        // Задаем изображение для иконок меток.
        res.geoObjects.options.set('preset', 'islands#redCircleIcon');
        res.geoObjects.events
          // При наведении на метку показываем хинт с названием станции метро.
          .add('mouseenter', (event) => {
            const geoObject = event.get('target');
            myMap.hint.open(geoObject.geometry.getCoordinates(), geoObject.getPremise());
          })
          // Скрываем хинт при выходе курсора за пределы метки.
          .add('mouseleave', (event) => {
            myMap.hint.close(true);
          });
        // Добавляем коллекцию найденных геообъектов на карту.
        myMap.geoObjects.add(res.geoObjects);
        // Масштабируем карту на область видимости коллекции.
        myMap.setBounds(res.geoObjects.getBounds());
      });*/
    }

    this.parameters.api.storesApi(renderStores);
    this.mainPageContent.append(storesButtonChoiceOrange.create());


    activeButton();
  }
}
