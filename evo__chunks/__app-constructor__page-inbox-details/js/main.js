class TogglePageInboxDetails extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering(messageInfo) {
    super.rendering();
    const topBar = new CreateTopBarWithBackButton({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [
        `--size--small${isIos ? '--ios' : ''}`,
        '--theme--dark',
      ],
      textTitle: 'Системные сообщения',
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const message = new CreateMessageDetail({
      selector: ['div'],
      style: ['messages__detail-group'],
    });
    const containerMessages = document.createElement('div');
    containerMessages.classList.add('messages__detail-container');

    userMessages.successData.messages.forEach((item) => {
      containerMessages.append(message.create(item));
    });
    //containerMessages.append(message.create(messageInfo));

    this.page.append(createTopBarIos());
    this.page.append(topBar.create());
    this.page.append(containerMessages);


    this.openPage();
  }
}
