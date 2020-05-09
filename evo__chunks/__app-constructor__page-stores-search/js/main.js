class TogglePageStoresSearch extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const topBar = new CreateTopBarSearchStores({
      selector: ['div'],
      style: ['top-bar-search'],
      textTitle: ['Store filters'],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });

    this.page.append(topBar.create());
    clearSearchActive();
    this.openPage();
  }
}
