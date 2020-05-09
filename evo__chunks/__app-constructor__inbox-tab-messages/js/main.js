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
      title: ['No messages right now'],
      text: ['Check back for seasonal offers, new menu items and promotions'],
    });

    this.pageTabContent.append(inboxMainCards.create());
    this.pageContent.append(this.pageTabContent);
    activeButton();
  }
}
