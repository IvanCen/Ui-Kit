class ToggleSubPageStoresDetails extends ToggleSubPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  chooseShop(stores) {
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
  }

  rendering(store, info) {
    super.rendering();
    console.log(store);
    let phone;
    if (store.phone !== null) {
      const regExp = /(\+\d)(\d{3})(\d{3})(\d{2})(\d{2})/g;
      phone = store.phone.replace(regExp, '$1 ($2) $3-$4-$5');
    }

    const topBar = new CreateTopBarStoresInfo({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--small'],
      textTitle: [store.shortTitle],
      textSubTitle: [info.successData.timeState],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const textArea = new CreateTextAreaStoreInfo({
      selector: ['div'],
      style: ['text-area-wraper'],
      modifier: ['--indentation--bottom'],
      address: [store.longTitle],
      distance: [''],
      phone: [phone || ''],
      monday: [store.monday],
      tuesday: [store.tuesday],
      wednesday: [store.wednesday],
      thursday: [store.thursday],
      friday: [store.friday],
      saturday: [store.saturday],
      sunday: [store.sunday],
      longitude: [store.longitude],
      latitude: [store.latitude],

    });
    const buttonShowAllOrange = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: ['--size--big',
        '--theme--tangerin',
        '--position--right',
        '--theme--shadow-big',
        '--type--fixed',
        '--type--choose-details',
      ],
      text: ['Выбрать'],
      events: [
        {
          type: 'click',
          callback: () => {
            this.closePage();
            this.deletePage();
            this.chooseShop(storesDataObj);
            toggleModal.rendering(`Вы выбрали магазин ${store.shortTitle}`);
          },
        },
      ],
    });

    this.subPage.prepend(createTopBarIos());
    this.subPage.append(topBar.create());
    this.subPage.append(textArea.create());

    setTimeout(() => {
      this.subPage.append(buttonShowAllOrange.create());
      activeButton();
    }, 350);


    this.openPage();
  }
}
