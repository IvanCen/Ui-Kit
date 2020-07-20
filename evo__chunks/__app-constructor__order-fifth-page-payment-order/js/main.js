
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
      modifier: ['--theme--dark', `--size--medium${isIos ? '--ios' : ''}`],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
      eventStores: [
        {
          type: 'click',
          callback: () => {
            stopAction(() => {
              toggleStores.closePage();
              toggleStores.clearPage();
              toggleStores.rendering();
              toggleStores.openPage();
              closePages();
            });
          },
        },
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
    
    this.openPage();
  }
}
