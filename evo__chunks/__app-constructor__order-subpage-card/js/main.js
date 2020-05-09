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
      text: ['hello'],
      eventAddSize: [{
        nameCategory: 'Size',
        sizeNameMain: 'Big',
      }],
      eventAddAddins: [
        'Coffee',
        'Adds',
      ],
    });
    const buttonProductCard = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: ['--size--big',
        '--theme--tangerin',
        '--type--fixed-with-bottom-bar',
        '--theme--shadow-big',
      ],
      text: ['В корзину'],
      events: [
        { type: 'click', callback: counterBasket },
        // { type: 'click', callback: toggleModal.openPage },
      ],
    });


    this.subPage.append(productCard.create(productInfo));
    this.subPage.append(textAreaProductCard.create(productInfo));
    this.subPage.append(buttonProductCard.create());
    activeSizeBar();
    activeButton();
    this.openPage();
  }
}
