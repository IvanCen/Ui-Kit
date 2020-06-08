
class ToggleSixthPageReviewOrder extends ToggleSixthPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering(info) {
    super.rendering();
    const topBar = new CreateTopBarWithCloseIcon({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [
        '--theme--dark',
        '--size--small',
      ],
      textTitle: ['Информация'],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const textArea = new CreateTextAreaBankInfo({
      selector: ['div'],
      style: ['text-area'],
      modifier: [
        '--indentation--top',
        '--type--balance',
      ],
      text: ['Теперь вы можете вернуться в приложение'],
    });

    this.sixthPage.append(topBar.create());
    this.sixthPage.append(textArea.create());
    this.openPage();
  }
}
