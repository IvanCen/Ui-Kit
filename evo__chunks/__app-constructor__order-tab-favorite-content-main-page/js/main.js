class ToggleOrderFavoriteContent extends ToggleOrderContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();

    const orderFavoriteMainCard = new CreateOrderMainCard({
      selector: ['div'],
      style: ['main-card'],
      title: ['No messages right now'],
      text: ['Check back for seasonal offers, new menu items and promotions'],
      eventOpenSignInPage: [{ type: 'click', callback: togglePageSignIn.rendering }],
      //Страницы еще нет
      //eventOpenJoinNowPage: [{ type: 'click', callback: togglePageSignIn.rendering }],
    });

    this.mainPageContent.append(orderFavoriteMainCard.create());

    activeButton();
  }
}
