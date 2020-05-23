class TogglePageOrderSearch extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const topBar = new CreateTopBarSearch({
      selector: ['div'],
      style: ['top-bar-search'],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const cardItemContainerSearch = new CreateCardItemContainer();
    this.page.append(topBar.create());
    this.page.append(cardItemContainerSearch.create('search'));
    clearSearchActive();
    this.openPage();
  }
}
