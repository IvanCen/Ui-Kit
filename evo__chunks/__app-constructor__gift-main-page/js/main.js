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
      modifier: ['--size--medium', '--indentation--bottom'],
      textTitle: ['Gift cards'],
    });
    const giftTitleBarFeatured = new CreateTitleBarWithButton({
      selector: ['div'],
      style: ['title-bar'],
      title: ['Featured'],
      titleSize: ['medium'],
      buttonText: ['Посмотреть все 16'],
      eventButton: [
        { type: 'click', callback: togglePageSeeAll.rendering },
        { type: 'click', callback: togglePageSeeAll.openPage },
      ],
    });
    const giftPageBannersFeatured = new CreateBannersRectangle({
      selector: ['div'],
      style: ['banners'],
      bannerSize: ['big'],
    });
    const giftTitleBarOther = new CreateTitleBarWithButton({
      selector: ['div'],
      style: ['title-bar'],
      title: ['Other'],
      titleSize: ['small'],
      buttonText: ['Посмотреть 8'],
    });
    const giftPageBannersOther = new CreateBannersRectangle({
      selector: ['div'],
      style: ['banners'],
      bannerSize: ['small'],
    });
    const giftTitleBarOther2 = new CreateTitleBarWithButton({
      selector: ['div'],
      style: ['title-bar'],
      title: ['Other2'],
      titleSize: ['small'],
      buttonText: ['Посмотреть 18'],
    });
    const giftPageBannersOther2 = new CreateBannersRectangle({
      selector: ['div'],
      style: ['banners'],
      bannerSize: ['small'],
    });


/*    this.mainPageContent.append(giftTopBar.create());
    this.mainPageContent.append(giftTitleBarFeatured.create());
    this.mainPageContent.append(giftPageBannersFeatured.create());
    this.mainPageContent.append(giftTitleBarOther.create());
    this.mainPageContent.append(giftPageBannersOther.create());

    this.mainPageContent.append(giftTitleBarOther2.create());
    this.mainPageContent.append(giftPageBannersOther2.create());*/

    activeBanners();
    activeButton();
  }
}
