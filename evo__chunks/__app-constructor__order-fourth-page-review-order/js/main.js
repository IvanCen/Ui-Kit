
class ToggleFourthPageReviewOrder extends ToggleFourthPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const reviewTopBar = new CreateTopBarReviewOrder({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--theme--dark'],
      textTitle: ['add-ins'],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const reviewCardItem = new CreateCardItemReviewOrder({
      selector: ['div'],
      style: ['card-item__container'],
      modifier: ['--direction--column', '--indentation-column--normal', '--indentation--top'],
    });
    const reviewCheckboxTextSlide = new CreateCheckboxTextSlide({
      selector: ['div'],
      style: ['checkbox-textslide'],
    });
    const reviewButton = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: ['--size--big',
        '--theme--tangerin',
        '--type--fixed-low',
        '--theme--shadow-big',
      ],
      text: ['Продолжить'],
      events: [
        { type: 'click', callback: counterBasket },
      ],
    });

    this.fourthPage.append(reviewTopBar.create());
    this.fourthPage.append(reviewCardItem.create());
    this.fourthPage.append(reviewCheckboxTextSlide.create());
    this.fourthPage.append(reviewButton.create());
    activeLike();
    activeButton();
    counterOrder();
    this.openPage();
  }
}
