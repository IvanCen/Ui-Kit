class ToggleOrderHitsContent extends ToggleOrderTabContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();

    const orderTitleBarDrinks = new CreateTitleBarWithButton({
      selector: ['div'],
      style: ['title-bar'],
      title: ['Напитки'],
      modifier: ['--indentation--top'],
      titleSize: ['medium'],
      buttonText: ['Посмотреть 6'],
    });
    const orderTitleBarFoods = new CreateTitleBarWithButton({
      selector: ['div'],
      style: ['title-bar'],
      modifier: ['--indentation--top'],
      title: ['Еда'],
      titleSize: ['medium'],
      buttonText: ['Посмотреть 35'],
    });
    const orderFutureBannersDrinks = new CreateBannersTabHits({
      selector: ['div'],
      style: ['banners'],
      /* eventCard: [
        { type: 'click', callback: toggleSubPageProductCard.rendering },
      ], */
    });
    const orderFutureBannersFood = new CreateBannersTabHits({
      selector: ['div'],
      style: ['banners'],
      /* eventCard: [
        { type: 'click', callback: toggleSubPageProductCard.rendering },
      ], */
    });

    this.mainPageTabContent.append(orderTitleBarDrinks.create());
    this.mainPageTabContent.append(orderFutureBannersDrinks.create());
    this.mainPageTabContent.append(orderTitleBarFoods.create());
    this.mainPageTabContent.append(orderFutureBannersFood.create());
    this.mainPageContent.append(this.mainPageTabContent);
    activeBanners();
  }
}
