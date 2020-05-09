class TogglePageInbox extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const inboxTopBar = new CreateTopBarInbox({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--indentation--top'],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
      eventToggleMessages: [
        { type: 'click', callback: toggleInboxTabMessagesContent.clearPage },
        { type: 'click', callback: toggleInboxTabMessagesContent.rendering },
      ],
      eventToggleLastOffers: [
        { type: 'click', callback: toggleInboxTabLastOffersContent.clearPage },
        { type: 'click', callback: toggleInboxTabLastOffersContent.rendering },
      ],
    });

    this.page.prepend(inboxTopBar.create());
    toggleInboxTabMessagesContent.rendering();
    this.openPage();
    const topBarTabs = document.querySelectorAll('.top-bar__tab');
    switchActive(topBarTabs, 'top-bar__tab--active');
  }
}
