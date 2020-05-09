class ToggleOrderFavoriteContent extends ToggleOrderTabContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();

    const favoriteCardItem = new CreateCardItemFavAndHisOrder({
      selector: ['div'],
      style: ['card-item__container'],
      modifier: ['--direction--column', '--indentation-column--normal', '--indentation--top'],
    });

    this.mainPageTabContent.append(favoriteCardItem.create());
    this.mainPageContent.append(this.mainPageTabContent);
    activeLike();
  }
}
