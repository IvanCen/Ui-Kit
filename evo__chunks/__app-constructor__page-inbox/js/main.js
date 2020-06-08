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
        {
          type: 'click',
          callback: () => {
            const dotMessage = document.querySelector('.top-bar__icon-dot');
            userMessages.successData.messages.every((message) => {
              if (message.wasRead === null) {
                dotMessage.classList.remove('top-bar__icon-dot--hide');
                return false;
              }
              return true;
            });
          },
        },
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

    function render() {
      toggleInboxTabMessagesContent.rendering();
    }
    api.getMessages(render);

    this.openPage();
    const topBarTabs = document.querySelectorAll('.top-bar__tab');
    switchActive(topBarTabs, 'top-bar__tab--active');
  }
}
