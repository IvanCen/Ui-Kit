
class ToggleModalPagePaymentOrder extends ToggleModalPageOrderPaymentRoot {
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
      withOutAddress: true,
      modifier: ['--theme--dark', `--size--medium${isIos ? '--ios' : ''}`],
      eventClose: [
        {
          type: 'click',
          callback: () => {
            this.closePage();
            this.deletePage();
          },
        },
      ],
      eventStores: [
        {
          type: 'click',
          callback: () => {
            stopAction(() => {
              toggleStores.rendering();
              toggleStores.openPage();
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

    this.modalPageOrderPayment.append(createTopBarIos());
    this.modalPageOrderPayment.append(topBar.create());
    this.modalPageOrderPayment.append(textArea.create());

    this.openPage();
  }
}
