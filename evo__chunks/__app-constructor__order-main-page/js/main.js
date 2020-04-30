class ToggleOrder extends ToggleMainPage {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const orderTopBar = new CreateTopBarOrder({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--indentation--top'],
      eventToggleMenu: [
        { type: 'click', callback: toggleOrderMenuContent.clearPage },
        { type: 'click', callback: toggleOrderMenuContent.rendering },
      ],
      eventToggleHits: [
        { type: 'click', callback: toggleOrderHitsContent.clearPage },
        { type: 'click', callback: toggleOrderHitsContent.rendering },
      ],
      eventToggleHistory: [
        { type: 'click', callback: toggleOrderHistoryContent.clearPage },
        { type: 'click', callback: toggleOrderHistoryContent.rendering },
      ],
      eventToggleFavorite: [
        { type: 'click', callback: toggleOrderFavoriteContent.clearPage },
        { type: 'click', callback: toggleOrderFavoriteContent.rendering },
      ],
    });

    const orderBottomBar = new CreateBottomBarOrder({
      selector: ['div'],
      style: ['bottom-bar'],
      modifier: ['--indentation--normal'],
      title: ['Снеки'],
    });

    this.mainPage.prepend(orderTopBar.create());
    const footer = document.querySelector('.footer');
    footer.before(orderBottomBar.create());

    const topBarTabs = document.querySelectorAll('.top-bar__tab');
    switchActive(topBarTabs, 'top-bar__tab--active');
  }
}
