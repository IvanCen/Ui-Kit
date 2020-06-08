class ToggleOrder extends ToggleMainPage {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    this.mainPageContent.classList.add('main-page__content--with--bottom-bar');

    function switchTabHits() {
      const elements = document.querySelectorAll('.main-page__tab-content');
      [...elements].forEach((item) => item.classList.remove('main-page__tab-content--open'));
      const element = document.querySelector('.main-page__tab-content--hits');
      element.classList.add('main-page__tab-content--open');
    }

    function switchTabMain() {
      const elements = document.querySelectorAll('.main-page__tab-content');
      [...elements].forEach((item) => item.classList.remove('main-page__tab-content--open'));
      const element = document.querySelector('.main-page__tab-content--main');
      element.classList.add('main-page__tab-content--open');
    }

    function switchTabHistory() {
      const elements = document.querySelectorAll('.main-page__tab-content');
      [...elements].forEach((item) => item.classList.remove('main-page__tab-content--open'));
      const element = document.querySelector('.main-page__tab-content--history');
      element.classList.add('main-page__tab-content--open');
    }

    function switchTabFavorite() {
      const elements = document.querySelectorAll('.main-page__tab-content');
      [...elements].forEach((item) => item.classList.remove('main-page__tab-content--open'));
      const element = document.querySelector('.main-page__tab-content--favorite');
      element.classList.add('main-page__tab-content--open');
    }

    const orderTopBar = new CreateTopBarOrder({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--indentation--top'],
      eventToggleMenu: [
        { type: 'click', callback: switchTabMain },
      ],
      eventToggleHits: [
        { type: 'click', callback: switchTabHits },
      ],
      eventToggleHistory: [
        { type: 'click', callback: switchTabHistory },
      ],
      eventToggleFavorite: [
        { type: 'click', callback: toggleOrderFavoriteContent.clearTab },
        { type: 'click', callback: toggleOrderFavoriteContent.rendering },
        { type: 'click', callback: switchTabFavorite },
      ],
      eventOpenSearch: [
        { type: 'click', callback: toggleFifthPageOrderSearch.rendering },
        { type: 'click', callback: toggleFifthPageOrderSearch.openPage },
      ],
    });

    const orderBottomBar = new CreateBottomBarOrder({
      selector: ['div'],
      style: ['bottom-bar'],
      modifier: ['--indentation--normal'],
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
      ],
    });

    this.mainPageContent.prepend(orderTopBar.create());
    const footer = document.querySelector('.footer');
    footer.before(orderBottomBar.create());
    counterBasket();
    const footerButtonOrder = document.querySelector('.footer__button--type--order');
    activeFooter(footerButtonOrder);
    const topBarTabs = document.querySelectorAll('.top-bar__tab');
    switchActive(topBarTabs, 'top-bar__tab--active');
  }
}
