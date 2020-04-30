class ToggleOrderHitsContent extends ToggleOrderContent {
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
      titleSize: ['medium'],
      buttonText: ['Посмотреть 6'],
    });
    const orderTitleBarFoods = new CreateTitleBarWithButton({
      selector: ['div'],
      style: ['title-bar'],
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

    this.mainPageContent.append(orderTitleBarDrinks.create());
    this.mainPageContent.append(orderFutureBannersDrinks.create());
    this.mainPageContent.append(orderTitleBarFoods.create());
    this.mainPageContent.append(orderFutureBannersFood.create());
    activeBanners();
  }
}
