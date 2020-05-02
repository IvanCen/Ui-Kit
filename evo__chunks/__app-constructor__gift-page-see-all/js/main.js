class TogglePageSeeAll extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const giftSeeAllTopBar = new CreateTopBarWithBackButton({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--small', '--indentation--bottom'],
      textTitle: ['Популярные (16)'],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const giftMainCard = new CreateGiftMainCard({
      selector: ['div'],
      style: ['main-card'],
      modifier: ['--type--border'],
      title: ['You’re My Hero'],
      eventOpenCard: [
        { type: 'click', callback: toggleSubPageGiftCard.rendering },
        { type: 'click', callback: toggleSubPageGiftCard.openPage },
      ],
    });
    const giftMainCard2 = new CreateGiftMainCard({
      selector: ['div'],
      style: ['main-card'],
      modifier: ['--type--border'],
      title: ['You’re My Hero'],
    });
    const giftMainCard3 = new CreateGiftMainCard({
      selector: ['div'],
      style: ['main-card'],
      modifier: ['--type--border'],
      title: ['You’re My Hero'],
    });
    const giftMainCard4 = new CreateGiftMainCard({
      selector: ['div'],
      style: ['main-card'],
      modifier: ['--type--border'],
      title: ['You’re My Hero'],
    });

    this.page.append(giftSeeAllTopBar.create());
    this.page.append(giftMainCard.create());
    this.page.append(giftMainCard2.create());
    this.page.append(giftMainCard3.create());
    this.page.append(giftMainCard4.create());

    this.openPage();
  }
}
