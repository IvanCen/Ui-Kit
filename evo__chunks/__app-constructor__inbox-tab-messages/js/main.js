class ToggleInboxTabMessagesContent extends ToggleInboxTabContent {
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

    this.pageContent.append(this.pageTabContent);


    if (userMessages.successData.length === 0) {
      this.pageTabContent.append(this.inboxMainCards.create());
    } else {
      userMessages.successData.messages.forEach((item) => {
        console.log(item);
        this.pageTabContent.append(this.inboxMainCardsNews.create(item));
        if (item.wasRead === null) {
          api.markMessageRead(item.client, item.timestamp, item.id);
        }
      });
    }
  }
}
