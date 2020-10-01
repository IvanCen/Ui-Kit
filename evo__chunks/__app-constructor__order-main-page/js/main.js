class ToggleOrder extends ToggleMainPage {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering('order');
    this.mainPageContent.classList.add('main-page__content--with--bottom-bar');

    function switchTab(tabName) {
      const elements = document.querySelectorAll('.main-page__tab-content');
      [...elements].forEach((item) => item.classList.remove('main-page__tab-content--open'));
      const element = document.querySelector(`.main-page__tab-content--${tabName}`);
      if(element) {
        element.classList.add('main-page__tab-content--open');
      }
    }

    const orderTopBar = new CreateTopBarOrder({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [`${isIos ? '--indentation--top' : ''}`],
      eventToggleMenu: [
        {
          type: 'click',
          callback: () => {
            switchTab('main');
          },
        },
      ],
      eventToggleHits: [
        {
          type: 'click',
          callback: () => {
            switchTab('hits');
          },
        },
      ],
      eventToggleHistory: [
        {
          type: 'click',
          callback: () => {
            api.getClientOrdersApi(() => {
              switchTab('history');
            });
          },
        },
      ],
      eventToggleFavorite: [
        {
          type: 'click',
          callback: () => {
            toggleOrderFavoriteContent.clearTab();
            toggleOrderFavoriteContent.rendering();
            switchTab('favorite');
          },
        },
      ],
      eventOpenSearch: [
        {
          type: 'click',
          callback: () => {
            stopAction(() => {
              toggleModalPageOrderSearch.rendering(false);
            });
          },
        },
      ],
    });

    const orderBottomBar = new CreateBottomBarOrder({
      selector: ['div'],
      style: ['bottom-bar'],
      modifier: ['--indentation--normal'],
      eventStores: [
        {
          type: 'click',
          callback: () => {
            stopAction(() => {
              toggleStores.rendering();
              toggleStores.openPage();
            });
          },
        },
      ],
    });

    this.mainPageContent.prepend(createTopBarIos());
    this.mainPageContent.prepend(orderTopBar.create());
    const footer = document.querySelector('.footer');
    footer.before(orderBottomBar.create());
    emitter.emit('event:counter-changed');
    const footerButtonOrder = document.querySelector('.footer__button--type--order');

    const topBarTabs = document.querySelectorAll('.top-bar__tab');
    switchActive(topBarTabs, 'top-bar__tab--active');
  }
}
