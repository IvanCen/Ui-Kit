class TogglePageOrderCategory extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  openPage() {
    super.openPage();
    this.mainPage.classList.add('main-page--fixed');
  }

  closePage() {
    super.closePage();
    this.mainPage.classList.remove('main-page--fixed');
  }

  rendering() {
    super.rendering();
    const orderCardTopBar = new CreateTopBarOrderCard({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['__title--size--small'],
      title: ['Горячий кофе'],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const orderCardTitleAmericano = new CreateTitleBar({
      selector: ['div'],
      style: ['title-bar'],
      modifier: ['__title--size--medium', '__title'],
      text: ['Американо'],
    });
    const orderCardBannersAmericano = new CreateBannersOrder({
      selector: ['div'],
      style: ['banners'],
      eventCard: [
        { type: 'click', callback: toggleSubPageProductCard.rendering },
      ],
    });

    this.page.append(orderCardTopBar.create());
    this.page.append(orderCardTitleAmericano.create());
    this.page.append(orderCardBannersAmericano.create());

    activeBanners();
    this.openPage();
  }
}
