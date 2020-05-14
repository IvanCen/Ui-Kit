class ToggleOrderHistoryContent extends ToggleOrderTabContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {

    const orderHistoryMainCard = new CreateOrderMainCard({
      selector: ['div'],
      style: ['main-card'],
      title: ['Когда история повторяется'],
      text: ['Предыдущие заказы появятся здесь, для быстрого заказа сного'],
      eventOpenSignInPage: [{ type: 'click', callback: togglePageSignIn.rendering }],
      //Страницы еще нет
      //eventOpenJoinNowPage: [{ type: 'click', callback: togglePageSignIn.rendering }],
    });

    this.mainPageContent = document.querySelector('.main-page__content');
    this.mainPageTabContentHistory = document.createElement('div');
    this.mainPageTabContentHistory.classList.add('main-page__tab-content', 'main-page__tab-content--history');
    this.mainPageContent.append(this.mainPageTabContentHistory);
    this.mainPageTabContentHistory.append(orderHistoryMainCard.create());
    activeButton();
  }
}
