class ToggleSubPageProductCard extends ToggleSubPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering(productInfo) {
    super.rendering();

    const productCard = new CreateOrderProductMainCard({
      selector: ['div'],
      style: ['main-card'],
      title: [productInfo.name],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const textAreaProductCard = new CreateTextAreaAddinsProductCard({
      selector: ['div'],
      style: ['text-area-wraper'],
      modifier: ['--indentation--bottom'],
      /* eventAddSize: [{
        nameCategory: 'Size',
        sizeNameMain: 'Big',
      }], */
    });

    this.subPage.append(productCard.create(productInfo));
    this.subPage.append(textAreaProductCard.create(productInfo));
    // activeSizeBar();
    activeButton();
    this.openPage();
  }
}
