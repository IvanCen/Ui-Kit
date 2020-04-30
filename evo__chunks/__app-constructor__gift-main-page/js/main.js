class ToggleGift extends ToggleMainPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const giftTopBar = new CreateTopBarDefault({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--medium'],
      textTitle: ['Gift cards'],
    });

    const giftTitleBarFeatured = new CreateTitleBarWithButton({
      selector: ['div'],
      style: ['title-bar'],
      title: ['Featured'],
      titleSize: ['medium'],
      buttonText: ['Посмотреть 6'],
    });

    const giftTitleBarOther = new CreateTitleBarWithButton({
      selector: ['div'],
      style: ['title-bar'],
      title: ['Featured'],
      titleSize: ['small'],
      buttonText: ['Посмотреть 6'],
    });

    const mainPageBanners = new CreateBannersMain({
      selector: ['div'],
      style: ['banners'],
    });

    this.mainPageContent.append(giftTopBar.create());
    this.mainPageContent.append(giftTitleBarFeatured.create());
    this.mainPageContent.append(mainPageBanners.create());
    this.mainPageContent.append(giftTitleBarOther.create());


    activeBanners();
    activeButton();
  }
}
