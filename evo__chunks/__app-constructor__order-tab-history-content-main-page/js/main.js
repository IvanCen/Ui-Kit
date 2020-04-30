class ToggleOrderHistoryContent extends ToggleOrderContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();

    const orderHistoryMainCard = new CreateOrderMainCard({
      selector: ['div'],
      style: ['main-card'],
      title: ['Когда история повторяется'],
      text: ['Предыдущие заказы появятся здесь, для быстрого заказа сного'],
      eventOpenSignInPage: [{ type: 'click', callback: togglePageSignIn.rendering }],
      //Страницы еще нет
      //eventOpenJoinNowPage: [{ type: 'click', callback: togglePageSignIn.rendering }],
    });

    this.mainPageContent.append(orderHistoryMainCard.create());

    activeButton();
  }
}
