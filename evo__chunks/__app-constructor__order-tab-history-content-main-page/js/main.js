class ToggleOrderHistoryContent extends ToggleOrderTabContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  clearTab() {
    this.tabContent = document.querySelector('.main-page__tab-content--history');
    if (this.tabContent) {
      this.tabContent.remove();
    }
  }

  rendering() {
    const reviewCardItemNew = new CreateCardItemReview({
      style: ['order-history__offers-element'],
    });

    function render() {
      const mainPageTabContentHistory = document.querySelector('.main-page__tab-content--history');
      if (!isEmptyObj(userLastOrdersObj)) {
        for (const item of Object.values(userLastOrdersObj.successData.orders)) {
          mainPageTabContentHistory.prepend(reviewCardItemNew.create(item));
        }
      }
    }

    if (!isEmptyObj(userInfoObj)) {
      this.mainPageContent = document.querySelector('.main-page__content');
      this.mainPageTabContentHistory = document.createElement('div');
      this.mainPageTabContentHistory.classList.add('main-page__tab-content', 'main-page__tab-content--history');
      this.mainPageContent.append(this.mainPageTabContentHistory);
      api.getClientOrdersApi(render);
    }
  }
}
