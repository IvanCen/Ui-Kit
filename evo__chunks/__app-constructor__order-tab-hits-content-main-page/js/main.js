class ToggleOrderHitsContent extends ToggleOrderTabContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    const cardItemContainer = new CreateCardItemContainerProductCard();
    const orderCardItemHits = new CreateCardItemOrderProductCard();

    this.mainPageContent = document.querySelector('.main-page__content');
    this.mainPageTabContentHits = document.createElement('div');
    this.mainPageTabContentHits.classList.add('main-page__tab-content', 'main-page__tab-content--hits');
    this.mainPageContent.append(this.mainPageTabContentHits);
    this.mainPageTabContentHits.append(cardItemContainer.create('hits', 'card-item__container--indentation--top'));
    const cardItemContainerEl = document.querySelector('.card-item__container--hits');
    if(typeof dataProductApi.successData.items !== 'undefined') {
      const { items } = dataProductApi.successData;
      for (const item in items) {
        if (items[item].hitFlag === true) {
          cardItemContainerEl.append(orderCardItemHits.create(items[item]));
        }
      }
    }
  }
}
