class ToggleSubPageProductCard extends ToggleSubPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const productCardMainCard = new CreateOrderProductMainCard({
      selector: ['div'],
      style: ['main-card'],
      title: ['Smoked Butterscotch Latte'],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const createTextAreaProductCard = new CreateTextAreaShareProductCard({
      selector: ['div'],
      style: ['text-area-wraper'],
      text: ['Contrary to popular belief, Lorem Ipsum is not simply\n          random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.\n          Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure\n          Latin words, consectetur, from a Lore'],
      eventShare: [],
    });


    this.subPage.append(productCardMainCard.create());
    this.subPage.append(createTextAreaProductCard.create());

    this.openPage();
  }
}
