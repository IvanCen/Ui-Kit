
class ToggleModalPagePaymentOrder extends ToggleModalPageOrderPaymentRoot {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  closePaymentPage() {
    if (promoCode !== '' && promoCode !== undefined) {
      toggleModal.renderingPromoCodeClose(() => {
        window.history.back();
      });
    } else {
      this.closePage();
      this.deletePage();
    }
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
            stopAction(() => {
              this.closePaymentPage();
            });
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

    const checkboxSelect = new CreateCheckboxTextSlide({
      selector: ['div'],
      style: ['checkbox-textslide'],
    });

    this.modalPageOrderPayment.append(createTopBarIos());
    this.modalPageOrderPayment.append(topBar.create());
    this.modalPageOrderPayment.append(textArea.create());
    this.modalPageOrderPayment.append(checkboxSelect.create());

    this.openPage();
  }
}
