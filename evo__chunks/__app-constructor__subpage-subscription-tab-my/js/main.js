class ToggleSubscriptionTabMy extends ToggleSubscriptionTabContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    this.inboxMainCards = new CreateInboxMainCard({
      selector: ['div'],
      style: ['main-card'],
      title: ['Сейчас сообщений нет'],
      text: [''],
    });
    this.inboxMainCardsNews = new CreateInboxMainCardNews({
      selector: ['div'],
      style: ['main-card'],
      modifier: ['--border--bottom'],
    });

    this.subPageContent.append(this.subPageTabContent);
    this.subPageTabContent.append(this.inboxMainCards.create());
    this.subPageTabContent.append(this.inboxMainCardsNews.create());
  }
}
