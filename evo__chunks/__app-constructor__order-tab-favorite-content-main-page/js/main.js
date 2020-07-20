class ToggleOrderFavoriteContent extends ToggleOrderTabContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  clearTab() {
    this.tabContent = document.querySelector('.card-item__container--type--favorite');
    if (this.tabContent) {
      this.arrHtml = Array.from(this.tabContent.children);
      this.arrHtml.splice(0, this.arrHtml.length).forEach((item) => item.remove());
    }
  }

  rendering() {
    const favoriteCardItemContainer = new CreateCardItemContainerFavAndHisOrder({
      selector: ['div'],
      style: ['card-item__container'],
      modifier: [
        '--direction--column',
        '--indentation-column--normal',
        '--indentation--top',
        '--type--favorite',
      ],
    });
    const favoriteCardItem = new CreateCardItemFavAndHisOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--border--bottom',
      ],
      iconLiked: true,
    });
    this.mainPageContent = document.querySelector('.main-page__content');
    this.mainPageTabContentFavorite = document.createElement('div');
    this.mainPageTabContentFavorite.classList.add('main-page__tab-content', 'main-page__tab-content--favorite');
    this.mainPageContent.append(this.mainPageTabContentFavorite);
    this.mainPageTabContentFavorite.append(favoriteCardItemContainer.create());
    this.cardItemContainer = document.querySelector('.card-item__container--type--favorite');

    const productsItems = dataProductApi.successData.items;
    itemsArray.forEach((item) => {
      if (productsItems[item.id] !== undefined && !isEmptyObj(item) && item.id === productsItems[item.id].id) {
        this.cardItemContainer.append(favoriteCardItem.create(item));
      }
    });
  }
}
