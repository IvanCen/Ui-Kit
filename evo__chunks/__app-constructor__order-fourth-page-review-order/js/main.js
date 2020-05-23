
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
      eventStores: [
        { type: 'click', callback: toggleStores.closePage },
        { type: 'click', callback: toggleStores.clearPage },
        { type: 'click', callback: toggleStores.rendering },
        { type: 'click', callback: toggleStores.openPage },
        { type: 'click', callback: togglePage.closePage },
        { type: 'click', callback: togglePage.deletePage },
        { type: 'click', callback: toggleSubPage.closePage },
        { type: 'click', callback: toggleSubPage.deletePage },
        { type: 'click', callback: toggleThirdPage.closePage },
        { type: 'click', callback: toggleThirdPage.deletePage },
        { type: 'click', callback: toggleFourthPage.closePage },
        { type: 'click', callback: toggleFourthPage.deletePage },
      ],
    });
    const reviewCardItemContainer = new CreateCardItemContainerFavAndHisOrder({
      selector: ['div'],
      style: ['card-item__container'],
      modifier: [
        '--direction--column',
        '--indentation-column--normal',
        '--indentation--top',
        '--type--review',
      ],
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
    const reviewCardItem = new CreateCardItemReviewOrder({
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--border--bottom',
      ],
    });

    this.fourthPage.append(reviewTopBar.create());
    this.fourthPage.append(reviewCardItemContainer.create());
    this.fourthPage.append(reviewCheckboxTextSlide.create());
    this.fourthPage.append(reviewButton.create());

    this.cardItemContainer = document.querySelector('.card-item__container--type--review');

    const productsItems = dataProductApi.successData.items;
    basketArray.forEach((item) => {
      for (const el of Object.values(productsItems)) {
        if (item.id === el.id) {
          this.cardItemContainer.append(reviewCardItem.create(el));
        }
      }
    });

    activeLike();
    activeButton();
    this.openPage();
  }
}
