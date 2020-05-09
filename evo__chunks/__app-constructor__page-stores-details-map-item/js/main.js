class TogglePageStoresDetails extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering(store) {
    super.rendering();
    const regExp = /(\+\d)(\d{3})(\d{3})(\d{2})(\d{2})/g;
    const phone = store.phone.replace(regExp, '$1 ($2) $3-$4-$5');
    const topBar = new CreateTopBarStoresInfo({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--small'],
      textTitle: [store.shortTitle],
      textSubTitle: ['Открыт до 21:00'],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const textArea = new CreateTextAreaStoreInfo({
      selector: ['div'],
      style: ['text-area-wraper'],
      address: [store.longTitle],
      distance: ['2.8 mi'],
      phone: [phone],
      monday: [store.monday],
      tuesday: [store.tuesday],
      wednesday: [store.wednesday],
      thursday: [store.thursday],
      friday: [store.friday],
      saturday: [store.saturday],
      sunday: [store.sunday],
    });
    const buttonShowAllOrange = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: ['--size--big',
        '--theme--tangerin',
        '--position--right',
        '--theme--shadow-big',
        '--type--fixed',
      ],
      text: ['Выбрать'],
    });

    this.page.append(topBar.create());
    this.page.append(textArea.create());

    setTimeout(() => this.page.append(buttonShowAllOrange.create()), 350);

    activeButton();
    this.openPage();
  }
}
