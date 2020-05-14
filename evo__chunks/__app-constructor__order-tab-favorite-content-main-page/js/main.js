class ToggleOrderFavoriteContent extends ToggleOrderTabContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {

    const favoriteCardItem = new CreateCardItemFavAndHisOrder({
      selector: ['div'],
      style: ['card-item__container'],
      modifier: ['--direction--column', '--indentation-column--normal', '--indentation--top'],
    });
    this.mainPageContent = document.querySelector('.main-page__content');
    this.mainPageTabContentFavorite = document.createElement('div');
    this.mainPageTabContentFavorite.classList.add('main-page__tab-content', 'main-page__tab-content--favorite');
    this.mainPageContent.append(this.mainPageTabContentFavorite);
    this.mainPageTabContentFavorite.append(favoriteCardItem.create());
    activeLike();
  }
}
