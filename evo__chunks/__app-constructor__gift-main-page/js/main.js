class ToggleGift extends ToggleMainPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const topBar = new CreateTopBarDefault({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--medium', '--indentation--bottom'],
      textTitle: ['Достижения'],
    });
    /*const giftTitleBarOther = new CreateTitleBarWithButton({
      selector: ['div'],
      style: ['title-bar'],
      title: ['Ваши достижения'],
      titleSize: ['small'],
      buttonText: ['Посмотреть все'],
      eventButton: [
        { type: 'click', callback: togglePageSeeAll.rendering },
        { type: 'click', callback: togglePageSeeAll.openPage },
      ],
    });
    const cardBannersContainer = new CreateBannersContainerOrder();
    const bannersReward = new CreateBannerRectangle({
      bannerSize: ['small'],
    });*/


    const cardItemContainer = new CreateCardItemContainerProductCard();
    const cardItem = new CreateCardItemRewardCard();

    this.mainPageContent.append(topBar.create());
    this.mainPageContent = document.querySelector('.main-page__content');
    this.mainPageContent.append(cardItemContainer.create('reward', 'card-item__container--indentation--top'));

    this.cardItemContainerEl = this.mainPageContent.querySelector('.card-item__container');
    for (let i = 1; i < 7; i++) {
      this.cardItemContainerEl.append(cardItem.create());
    }

    const footerButtonGIft = document.querySelector('.footer__button--type--gift');
    activeFooter(footerButtonGIft);
    activeButton();
  }
}
