class ToggleInboxTabLastOffersContent extends ToggleInboxTabContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering(dataId, isOpen) {
    super.rendering(dataId, isOpen);
    this.inboxMainCards = new CreateInboxMainCard({
      selector: ['div'],
      style: ['main-card'],
      title: ['Сейчас сообщений нет'],
      text: [''],
    });
    this.inboxMainCardsNews = new CreateInboxMainCardNews({
      selector: ['div'],
      style: ['messages__element'],
    });

    this.pageContent.append(this.pageTabContent);

    if (isEmptyObj(userMessages)) {
      //this.pageTabContent.append(this.inboxMainCards.create());
    } else {
      userMessages.successData.messages.forEach((item) => {
        console.log(item);
        if (item.promotion === 1) {
          this.pageTabContent.append(this.inboxMainCardsNews.create(item));
        }
      });
    }
  }
}
