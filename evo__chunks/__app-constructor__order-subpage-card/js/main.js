class ToggleSubPageProductCard extends ToggleSubPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering(productInfo) {
    super.rendering();
    const infoProduct = productInfo;
    console.log(infoProduct)
    const productCard = new CreateOrderProductMainCard({
      selector: ['div'],
      style: ['main-card'],
      title: [infoProduct.name],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const textAreaProductCard = new CreateTextAreaAddinsProductCard({
      selector: ['div'],
      style: ['text-area-wraper'],
      modifier: ['--indentation--bottom'],
    });

    this.subPage.append(productCard.create(infoProduct));
    this.subPage.append(textAreaProductCard.create(infoProduct));
    activeButton();
    this.openPage();
  }
}
