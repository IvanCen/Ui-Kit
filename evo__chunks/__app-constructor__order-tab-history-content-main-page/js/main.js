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
    const orderHistoryMainCard = new CreateOrderMainCard({
      selector: ['div'],
      style: ['main-card'],
      title: ['Когда история повторяется'],
      text: ['Предыдущие заказы появятся здесь, для быстрого заказа сного'],
      eventOpenSignInPage: [{ type: 'click', callback: togglePageSignIn.rendering }],
    });
    const cardItem = new CreateCardItemHistory();

    this.mainPageContent = document.querySelector('.main-page__content');
    this.mainPageTabContentHistory = document.createElement('div');
    this.mainPageTabContentHistory.classList.add('main-page__tab-content', 'main-page__tab-content--history');
    this.mainPageContent.append(this.mainPageTabContentHistory);
    // this.mainPageTabContentHistory.append(orderHistoryMainCard.create());
    // this.mainPageTabContentHistory.append(cardItem.create());
    function render() {
      const mainPageTabContentHistory = document.querySelector('.main-page__tab-content--history');
      if (!isEmptyObj(userLastOrdersObj)) {
        for (const item of Object.values(userLastOrdersObj.successData.orders)) {
          mainPageTabContentHistory.prepend(cardItem.create(item));
        }
      }
    }
    api.getClientOrdersApi(render);

    activeLike();
    activeButton();
  }
}
