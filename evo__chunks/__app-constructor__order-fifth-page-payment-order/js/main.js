
class ToggleFifthPageReviewOrder extends ToggleFifthPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering(info) {
    super.rendering();
    const topBar = new CreateTopBarReviewOrder({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--theme--dark', '--size--medium'],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
      eventStores: [
        { type: 'click', callback: toggleStores.closePage },
        { type: 'click', callback: toggleStores.clearPage },
        { type: 'click', callback: toggleStores.rendering },
        { type: 'click', callback: toggleStores.openPage },
        { type: 'click', callback: togglePage.closePage },
        { type: 'click', callback: togglePage.deletePage },
        { type: 'click', callback: closeOrderPage },
        { type: 'click', callback: toggleSubPage.closePage },
        { type: 'click', callback: toggleSubPage.deletePage },
        { type: 'click', callback: toggleThirdPage.closePage },
        { type: 'click', callback: toggleThirdPage.deletePage },
        { type: 'click', callback: toggleFourthPage.closePage },
        { type: 'click', callback: toggleFourthPage.deletePage },
        { type: 'click', callback: toggleFifthPage.closePage },
        { type: 'click', callback: toggleFifthPage.deletePage },
      ],
    });

    const cardItemsPrice = document.querySelectorAll('.card-item__price');
    let counterPrice = 0;
    [...cardItemsPrice].forEach((item) => {
      counterPrice += Number(item.textContent);
    });
    const textArea = new CreateTextAreaOrderPayment({
      selector: ['div'],
      style: ['text-area'],
      modifier: [
        '--indentation--top',
        '--type--balance',
      ],
      identifier: ['pay'],
      number: [info.successData.orderTotal],
      comment: [info.successData.orderComment],
    });

    this.fifthPage.append(createTopBarIos());
    this.fifthPage.append(topBar.create());
    this.fifthPage.append(textArea.create());
    activeButton();
    this.openPage();
  }
}
