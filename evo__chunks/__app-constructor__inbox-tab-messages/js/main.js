class ToggleInboxTabMessagesContent extends ToggleInboxTabContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const inboxMainCards = new CreateInboxMainCard({
      selector: ['div'],
      style: ['main-card'],
      title: ['Сейчас сообщений нет'],
      text: [''],
    });
    const inboxMainCardsNoUser = new CreateInboxMainCard({
      selector: ['div'],
      style: ['main-card'],
      title: ['Войдите, что бы видеть сообщения'],
      text: [''],
    });
    const inboxMainCardsNews = new CreateInboxMainCardNews({
      selector: ['div'],
      style: ['main-card'],
      modifier: ['--border--bottom'],
    });

    this.pageContent.append(this.pageTabContent);


    if (userMessages.success === false) {
      this.pageTabContent.append(inboxMainCardsNoUser.create());
    } else if (userMessages.successData.length === 0) {
      this.pageTabContent.append(inboxMainCards.create());
    } else {
      userMessages.successData.messages.forEach((item) => {
        console.log(item)
        this.pageTabContent.append(inboxMainCardsNews.create(item));
        if (item.wasRead === null) {
          api.markMessageRead(item.client, item.timestamp, item.id);
        }
      });
    }


    
  }
}
