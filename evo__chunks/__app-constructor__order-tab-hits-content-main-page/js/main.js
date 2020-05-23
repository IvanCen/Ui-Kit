class ToggleOrderHitsContent extends ToggleOrderTabContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    const cardItemContainer = new CreateCardItemContainerProductCard();
    const orderCardItemHits = new CreateCardItemOrderProductCard();
    function renderTabHits(dataItems) {
      const hits = [];

      for (const item of Object.values(dataItems.successData.items)) {
        if (item.hitFlag === true) {
          hits.push(item);
        }
      }
      const cardItemContainerEl = document.querySelector('.card-item__container--hits');
      hits.forEach((el) => {
        cardItemContainerEl.append(orderCardItemHits.create(el));
      });
    }
    this.mainPageContent = document.querySelector('.main-page__content');
    this.mainPageTabContentHits = document.createElement('div');
    this.mainPageTabContentHits.classList.add('main-page__tab-content', 'main-page__tab-content--hits');
    this.mainPageContent.append(this.mainPageTabContentHits);
    this.mainPageTabContentHits.append(cardItemContainer.create('hits', 'card-item__container--indentation--top'));
    renderTabHits(dataProductApi);
  }
}
